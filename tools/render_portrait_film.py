#!/usr/bin/env python3
"""Render a deterministic 60-second 9:16 SHELL 2026 motion film."""
import math, os, subprocess, tempfile, wave
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from imageio_ffmpeg import get_ffmpeg_exe

W, H, FPS, DURATION = 720, 1280, 30, 60
OUT = Path('amandio-goncalves-de-azevedo-caterca--shell-2026-cinematic-film--2026.mp4')
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf'
SANS = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
SANS_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
chapters = [
    (0, 10, 'Tudo começa', 'com um sonho.', 'SHELL 2026  ·  UMA HISTÓRIA PARA SHELCIA', 'ABERTURA'),
    (10, 20, 'Um brilho', 'que é só teu.', 'CAPÍTULO I  ·  A TUA LUZ', 'LUZ'),
    (20, 30, 'De cada memória,', 'nasce um universo.', 'CAPÍTULO II  ·  MEMÓRIAS', 'MEMORIA'),
    (30, 40, 'Amizades que', 'se tornam casa.', 'CAPÍTULO III  ·  QUEM CAMINHA CONTIGO', 'AMIZADE'),
    (40, 51, 'Dezoito anos.', 'Infinitas possibilidades.', 'CAPÍTULO IV  ·  O QUE VEM A SEGUIR', 'FUTURO'),
    (51, 60, 'A Cinderela', 'cresceu.', '10 DE AGOSTO  ·  O TEU PRÓXIMO CAPÍTULO', 'FINAL'),
]
PALETTES = [(5,15,35),(9,24,53),(14,23,55),(12,25,48),(22,20,53),(8,17,41)]
BLUE=(150,207,237); LILAC=(221,190,227); WHITE=(249,246,255)
font_title=ImageFont.truetype(FONT,56); font_title_b=ImageFont.truetype(FONT_BOLD,56)
font_small=ImageFont.truetype(SANS_BOLD,13); font_sub=ImageFont.truetype(FONT,24)
font_logo=ImageFont.truetype(FONT_BOLD,25); font_number=ImageFont.truetype(SANS,12)
# A stable field of stars, each with fixed position, phase and scale.
stars=[]
for i in range(150):
    x=((i*173+37)%997)/997*W; y=((i*293+121)%991)/991*H
    stars.append((x,y,.6+(i%5)*.35,i*1.71,(i%13==0)))

def smooth(x):
    x=max(0,min(1,x)); return x*x*(3-2*x)
def mix(a,b,u): return tuple(int(a[i]*(1-u)+b[i]*u) for i in range(3))
def centered(draw, text, y, font, fill, tracking=0):
    if tracking <= 0:
        box=draw.textbbox((0,0),text,font=font); draw.text(((W-(box[2]-box[0]))/2,y),text,font=font,fill=fill)
    else:
        widths=[draw.textlength(ch,font=font) for ch in text]; total=sum(widths)+tracking*(len(text)-1)
        x=(W-total)/2
        for ch,ww in zip(text,widths): draw.text((x,y),ch,font=font,fill=fill); x+=ww+tracking

def frame(t):
    idx=max(i for i,c in enumerate(chapters) if t>=c[0]); start,end,line1,line2,eyebrow,kind=chapters[idx]
    local=t-start; span=end-start
    fade_in=smooth(local/1.35); fade_out=smooth((end-t)/1.15) if idx<5 else 1
    alpha=min(fade_in,fade_out)
    base=PALETTES[idx]
    # Atmospheric gradient, gently shifting light wells.
    yy,xx=np.mgrid[0:H:4,0:W:4]
    light_x=W*(.5+.16*math.sin(t*.12)); light_y=H*(.43+.09*math.cos(t*.1))
    rad=np.sqrt(((xx-light_x)/W)**2+((yy-light_y)/H)**2)
    glow=np.maximum(0,1-rad*2.6)*(19+7*math.sin(t*.2))
    arr=np.empty((H//4,W//4,3),dtype=np.uint8)
    for k in range(3): arr[:,:,k]=np.clip(base[k]+glow*(.60 if k==0 else .79 if k==1 else 1.28),0,255)
    im=Image.fromarray(arr).resize((W,H),Image.Resampling.BILINEAR)
    d=ImageDraw.Draw(im,'RGBA')
    # Filigree star map and slow celestial particles.
    for x,y,r,phase,accent in stars:
        twinkle=.36+.64*(.5+.5*math.sin(t*(.9+(phase%2)) + phase))
        px=(x+((phase%4)-2)*t*1.4)%W
        d.ellipse((px-r,y-r,px+r,y+r),fill=(207,229,255,int((70 if accent else 48)*twinkle)))
    # Rings open gradually, like a crystalline portal; chapter motifs morph in scale.
    cx=W/2+math.sin(t*.095)*26; cy=H*.42+math.cos(t*.08)*20
    ring_phase=min(1,local/2.1)
    for n in range(6):
        radius=(86+n*37)*(0.5+0.5*smooth(ring_phase))+7*math.sin(t*.67+n*.6)
        bbox=(cx-radius*1.14,cy-radius,cx+radius*1.14,cy+radius)
        d.ellipse(bbox,outline=(BLUE[0],BLUE[1],BLUE[2],max(10,35-n*4)),width=1)
    # Soft center glow built as a small, subtle bloom.
    bloom=Image.new('RGBA',(W,H),(0,0,0,0)); bd=ImageDraw.Draw(bloom)
    for r in range(140,5,-8):
        a=int(1.5*(1-r/145)); bd.ellipse((cx-r,cy-r,cx+r,cy+r),fill=(128,181,240,max(0,a)))
    im=Image.alpha_composite(im.convert('RGBA'),bloom.filter(ImageFilter.GaussianBlur(24))).convert('RGB')
    d=ImageDraw.Draw(im,'RGBA')
    # A small hand-drawn star / crystal insignia at the heart of the film.
    scale=.75+.12*math.sin(t*math.pi/2)
    points=[]
    for j in range(8):
        a=-math.pi/2+j*math.pi/4; r=(31 if j%2==0 else 12)*scale
        points.append((cx+math.cos(a)*r,cy+math.sin(a)*r))
    d.polygon(points,fill=(193,223,245,65),outline=(229,208,237,150))
    d.ellipse((cx-3,cy-3,cx+3,cy+3),fill=(255,245,255,210))
    # Editorial title is kept within a phone-safe central region.
    title_y=H*.575+(1-fade_in)*24
    centered(d,eyebrow,int(H*.505),font_small,(*BLUE,int(220*alpha)),1.5)
    for j,txt in enumerate((line1,line2)):
        f=font_title_b if idx==5 else font_title
        # auto fit long phrases to portrait width
        while d.textlength(txt,font=f)>W-70: f=ImageFont.truetype(FONT, f.size-2)
        box=d.textbbox((0,0),txt,font=f); x=(W-(box[2]-box[0]))/2
        d.text((x+1,title_y+j*72+2),txt,font=f,fill=(2,5,19,int(150*alpha)))
        d.text((x,title_y+j*72),txt,font=f,fill=(*WHITE,int(255*alpha)))
    sub='Este universo é teu. Feliz aniversário, Shelcia.' if idx==5 else 'Uma história feita de luz, amor e possibilidades.'
    centered(d,sub,int(H*.755),font_sub,(*LILAC,int(220*alpha)))
    # brand lockup and a slowly drawing timeline line.
    centered(d,'S H E L L',int(H*.105),font_logo,(224,240,250,205))
    centered(d,'2 0 2 6',int(H*.132),font_number,(169,206,229,160))
    d.line((72,H*.895,W-72,H*.895),fill=(180,215,240,54),width=1)
    for i,c in enumerate(chapters):
        x=72+(W-144)*c[0]/DURATION
        d.ellipse((x-2,H*.895-2,x+2,H*.895+2),fill=(226,198,230,165 if i<=idx else 65))
    d.line((72,H*.895,72+(W-144)*t/DURATION,H*.895),fill=(157,211,239,220),width=2)
    centered(d,'SHELCIA FERNANDA',int(H*.92),font_small,(203,222,240,140),1.2)
    # Widescreen framing translated for 9:16: restrained edge vignette.
    va=np.array(im).astype(np.float32); yv,xv=np.mgrid[0:H:1,0:W:1]
    edge=np.maximum(np.abs(xv-W/2)/(W/2),np.abs(yv-H/2)/(H/2))
    shade=np.clip(1-.22*np.maximum(0,edge-.55),.76,1)[...,None]
    return np.clip(va*shade,0,255).astype(np.uint8)

def make_audio(path):
    sr=44100; count=sr*DURATION
    # Generate stereo, softly evolving pad with a high, delicate bell at chapter turns.
    tt=np.arange(count,dtype=np.float64)/sr
    chords=[[146.83,220,293.66,369.99],[130.81,196,261.63,329.63],[164.81,220,277.18,329.63],[146.83,196,246.94,293.66],[110,164.81,220,277.18],[146.83,220,293.66,369.99]]
    audio=np.zeros(count,dtype=np.float64)
    for ci,(s,e,*_) in enumerate(chapters):
        mask=(tt>=s)&(tt<e); lt=tt[mask]-s; envelope=np.sin(np.pi*np.clip(lt/(e-s),0,1))**.55
        pad=np.zeros(len(lt))
        for j,f in enumerate(chords[ci]): pad += np.sin(2*np.pi*f*lt + j*.35)*(.18/(1+j*.45))
        pad += .12*np.sin(2*np.pi*(chords[ci][0]/2)*lt)
        audio[mask]+=pad*envelope
    # Delicate tonal accents every four seconds; no percussive harshness.
    for at in [4,8,14,18,24,28,34,38,44,48,54,58]:
        i=int(at*sr); n=min(int(sr*2.5),count-i); x=np.arange(n)/sr
        bell=(np.sin(2*np.pi*659.25*x)+.45*np.sin(2*np.pi*987.77*x))*np.exp(-2.5*x)*.09
        audio[i:i+n]+=bell
    fade=np.minimum(1,tt/2)*np.minimum(1,(DURATION-tt)/3)
    audio=np.tanh(audio*fade*.7)*.68
    stereo=np.empty((count,2),dtype='<i2'); stereo[:,0]=(audio*32767).astype('<i2'); stereo[:,1]=(audio*np.roll(fade,220)*32767).astype('<i2')
    with wave.open(str(path),'wb') as wf: wf.setnchannels(2); wf.setsampwidth(2); wf.setframerate(sr); wf.writeframes(stereo.tobytes())

def main():
    ffmpeg=get_ffmpeg_exe()
    temp=Path(tempfile.mkdtemp(prefix='shell-film-')); silent=temp/'visual.mp4'; audio=temp/'score.wav'
    make_audio(audio)
    cmd=[ffmpeg,'-y','-f','rawvideo','-vcodec','rawvideo','-s',f'{W}x{H}','-pix_fmt','rgb24','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(silent)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    try:
        for f in range(DURATION*FPS):
            proc.stdin.write(frame(f/FPS).tobytes())
            if f%300==0: print(f'Rendered {f//FPS:02d}/{DURATION}s',flush=True)
    finally:
        proc.stdin.close()
    if proc.wait()!=0: raise RuntimeError('Video encode failed')
    mux=[ffmpeg,'-y','-i',str(silent),'-i',str(audio),'-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(OUT)]
    subprocess.run(mux,check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    print(f'Created {OUT} ({OUT.stat().st_size/1e6:.1f} MB), 720x1280, 30 fps, 60s',flush=True)
if __name__=='__main__': main()
