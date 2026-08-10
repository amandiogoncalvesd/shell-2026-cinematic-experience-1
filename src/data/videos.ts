// SHELL 2026 — Vídeos & Trilha sonora
const V = "https://res.cloudinary.com/deeki0eou/video/upload/";
const v = (path: string) => `${V}${path}`;

// Cartaz automático: pede ao Cloudinary um fotograma do vídeo como imagem,
// para que os cartões de vídeo tenham pré-visualização sem descarregar o vídeo.
export function videoPoster(src: string, sec = 1.2, width = 900): string {
  if (!src.includes("cloudinary.com") || !src.includes("/video/upload/")) return "";
  return src
    .replace("/video/upload/", `/video/upload/so_${sec},w_${width},q_auto/`)
    .replace(/\.(mp4|webm|mov)$/i, ".jpg");
}

export const videoBackstage2026 = [
  v("v1784116659/Shelcia-bastidores-2026-01_t3trse.mp4"),
  v("v1784116657/Shelcia-bastidores-2026-03_inm4b9.mp4"),
  v("v1784116656/Shelcia-bastidores-2026-02_pauao2.mp4"),
];

export const videoRuthMoments = [
  v("v1782391665/shelcia-rurh-e-amigos-melhores-momentos-de-2026-69_f8fknn.mp4"),
  v("v1782391649/shelcia-rurh-e-amigos-melhores-momentos-de-2026-75_dbeatf.mp4"),
  v("v1782391646/shelcia-rurh-e-amigos-melhores-momentos-de-2026-44_dkouh7.mp4"),
  v("v1782391646/shelcia-rurh-e-amigos-melhores-momentos-de-2026-22_ozndhe.mp4"),
  v("v1782391644/shelcia-rurh-e-amigos-melhores-momentos-de-2026-73_xm1tub.mp4"),
  v("v1782391639/shelcia-rurh-e-amigos-melhores-momentos-de-2026-70_mwuxwa.mp4"),
  v("v1782391638/shelcia-rurh-e-amigos-melhores-momentos-de-2026-71_oc1aj6.mp4"),
  v("v1782391635/shelcia-rurh-e-amigos-melhores-momentos-de-2026-74_zbewpq.mp4"),
  v("v1782391629/shelcia-rurh-e-amigos-melhores-momentos-de-2026-72_kbtjrw.mp4"),
  v("v1782391626/shelcia-rurh-e-amigos-melhores-momentos-de-2026-65_rq15mo.mp4"),
  v("v1782391615/shelcia-rurh-e-amigos-melhores-momentos-de-2026-68_t6fov8.mp4"),
  v("v1782391611/shelcia-rurh-e-amigos-melhores-momentos-de-2026-66_ccom2f.mp4"),
  v("v1782391610/shelcia-rurh-e-amigos-melhores-momentos-de-2026-61_e1kczg.mp4"),
  v("v1782391610/shelcia-rurh-e-amigos-melhores-momentos-de-2026-63_ok1xbp.mp4"),
  v("v1782391610/shelcia-rurh-e-amigos-melhores-momentos-de-2026-67_kpprpt.mp4"),
  v("v1782391607/shelcia-rurh-e-amigos-melhores-momentos-de-2026-62_mhjwjf.mp4"),
  v("v1782391589/shelcia-rurh-e-amigos-melhores-momentos-de-2026-60_mlo6jv.mp4"),
  v("v1782391589/shelcia-rurh-e-amigos-melhores-momentos-de-2026-64_krmvgz.mp4"),
  v("v1782391586/shelcia-rurh-e-amigos-melhores-momentos-de-2026-59_dadxpi.mp4"),
  v("v1782391580/shelcia-rurh-e-amigos-melhores-momentos-de-2026-55_qnpwp9.mp4"),
  v("v1782391578/shelcia-rurh-e-amigos-melhores-momentos-de-2026-57_xakhn8.mp4"),
  v("v1782391570/shelcia-rurh-e-amigos-melhores-momentos-de-2026-58_gsfx9y.mp4"),
  v("v1782391567/shelcia-rurh-e-amigos-melhores-momentos-de-2026-56_lm8ym5.mp4"),
  v("v1782391551/shelcia-rurh-e-amigos-melhores-momentos-de-2026-54_wtfo0t.mp4"),
  v("v1782391550/shelcia-rurh-e-amigos-melhores-momentos-de-2026-49_rh1h2k.mp4"),
  v("v1782391545/shelcia-rurh-e-amigos-melhores-momentos-de-2026-52_vr7yl5.mp4"),
  v("v1782391540/shelcia-rurh-e-amigos-melhores-momentos-de-2026-51_bswen2.mp4"),
  v("v1782391536/shelcia-rurh-e-amigos-melhores-momentos-de-2026-53_lcgnto.mp4"),
  v("v1782391534/shelcia-rurh-e-amigos-melhores-momentos-de-2026-46_ekse8l.mp4"),
  v("v1782391532/shelcia-rurh-e-amigos-melhores-momentos-de-2026-50_qeoosv.mp4"),
  v("v1782391532/shelcia-rurh-e-amigos-melhores-momentos-de-2026-45_k9dlud.mp4"),
  v("v1782391516/shelcia-rurh-e-amigos-melhores-momentos-de-2026-48_ideagn.mp4"),
  v("v1782391510/shelcia-rurh-e-amigos-melhores-momentos-de-2026-41_u68ihh.mp4"),
  v("v1782391501/shelcia-rurh-e-amigos-melhores-momentos-de-2026-47_egjo2m.mp4"),
  v("v1782391496/shelcia-rurh-e-amigos-melhores-momentos-de-2026-34_ghyruc.mp4"),
  v("v1782391493/shelcia-rurh-e-amigos-melhores-momentos-de-2026-43_mz42ac.mp4"),
  v("v1782391493/shelcia-rurh-e-amigos-melhores-momentos-de-2026-42_fkjhrx.mp4"),
  v("v1782391492/shelcia-rurh-e-amigos-melhores-momentos-de-2026-38_nra7ec.mp4"),
  v("v1782391491/shelcia-rurh-e-amigos-melhores-momentos-de-2026-40_ba0s6f.mp4"),
  v("v1782391487/shelcia-rurh-e-amigos-melhores-momentos-de-2026-39_hcaxic.mp4"),
  v("v1782391485/shelcia-rurh-e-amigos-melhores-momentos-de-2026-37_ivmflr.mp4"),
  v("v1782391480/shelcia-rurh-e-amigos-melhores-momentos-de-2026-36_bf3vc8.mp4"),
  v("v1782391477/shelcia-rurh-e-amigos-melhores-momentos-de-2026-10_gbhylv.mp4"),
  v("v1782391475/shelcia-rurh-e-amigos-melhores-momentos-de-2026-35_nddei8.mp4"),
  v("v1782391465/shelcia-rurh-e-amigos-melhores-momentos-de-2026-31_hci6aa.mp4"),
  v("v1782391464/shelcia-rurh-e-amigos-melhores-momentos-de-2026-33_thfphx.mp4"),
  v("v1782391441/shelcia-rurh-e-amigos-melhores-momentos-de-2026-32_yd8ksm.mp4"),
  v("v1782391439/shelcia-rurh-e-amigos-melhores-momentos-de-2026-23_o0b0e5.mp4"),
  v("v1782391436/shelcia-rurh-e-amigos-melhores-momentos-de-2026-27_evomxn.mp4"),
  v("v1782391435/shelcia-rurh-e-amigos-melhores-momentos-de-2026-29_uwvkgq.mp4"),
  v("v1782391434/shelcia-rurh-e-amigos-melhores-momentos-de-2026-30_tre421.mp4"),
  v("v1782391424/shelcia-rurh-e-amigos-melhores-momentos-de-2026-28_o89cwr.mp4"),
  v("v1782391415/shelcia-rurh-e-amigos-melhores-momentos-de-2026-26_lrntbb.mp4"),
  v("v1782391414/shelcia-rurh-e-amigos-melhores-momentos-de-2026-25_bgkqgt.mp4"),
  v("v1782391414/shelcia-rurh-e-amigos-melhores-momentos-de-2026-16_b2rpvu.mp4"),
  v("v1782391402/shelcia-rurh-e-amigos-melhores-momentos-de-2026-24_xyaxi0.mp4"),
  v("v1782391401/shelcia-rurh-e-amigos-melhores-momentos-de-2026-20_imbaaq.mp4"),
  v("v1782391398/shelcia-rurh-e-amigos-melhores-momentos-de-2026-21_ie8bph.mp4"),
  v("v1782391396/shelcia-rurh-e-amigos-melhores-momentos-de-2026-17_rlv9vv.mp4"),
  v("v1782391394/shelcia-rurh-e-amigos-melhores-momentos-de-2026-18_kbqxb2.mp4"),
  v("v1782391389/shelcia-rurh-e-amigos-melhores-momentos-de-2026-19_u7r7m1.mp4"),
  v("v1782391383/shelcia-rurh-e-amigos-melhores-momentos-de-2026-15_srbvzy.mp4"),
  v("v1782391379/shelcia-rurh-e-amigos-melhores-momentos-de-2026-14_ydjlyb.mp4"),
  v("v1782391376/shelcia-rurh-e-amigos-melhores-momentos-de-2026-12_xpbs1j.mp4"),
  v("v1782391371/shelcia-rurh-e-amigos-melhores-momentos-de-2026-11_gyhmcm.mp4"),
  v("v1782391370/shelcia-rurh-e-amigos-melhores-momentos-de-2026-09_iovblk.mp4"),
  v("v1782391366/shelcia-rurh-e-amigos-melhores-momentos-de-2026-13_otkbya.mp4"),
  v("v1782391362/shelcia-rurh-e-amigos-melhores-momentos-de-2026-02_awm9ux.mp4"),
  v("v1782391350/shelcia-rurh-e-amigos-melhores-momentos-de-2026-08_uolioi.mp4"),
  v("v1782391344/shelcia-rurh-e-amigos-melhores-momentos-de-2026-07_atgfei.mp4"),
  v("v1782391342/shelcia-rurh-e-amigos-melhores-momentos-de-2026-01_nomggw.mp4"),
  v("v1782391341/shelcia-rurh-e-amigos-melhores-momentos-de-2026-04_ilx70z.mp4"),
  v("v1782391331/shelcia-rurh-e-amigos-melhores-momentos-de-2026-03_ietztm.mp4"),
];

export const videoRuthCeremony = [
  v("v1782391366/shelcia-rurh-besties-ceremony-2026-01.mp4_gwzjhz.mp4"),
  v("v1782391338/shelcia-rurh-besties-ceremony-2026-02.mp4_odjaul.mp4"),
];

export const videoSpecial = [
  v("v1782221757/shelcia-apresentando-o-poema-voltei-ao-meu-primeiro-amor_ksej7u.mp4"),
  v("v1782221704/shelcia-que-linda-eres_lqoywh.mp4"),
];

export const videoBackstageTop10 = [
  v("v1782213925/shelcia-bastidores-top10-2026-09_yf0g0r.mp4"),
  v("v1782213908/shelcia-bastidores-top10-2026-08_hidawp.mp4"),
  v("v1782213904/shelcia-bastidores-top10-2026-07_yiiitt.mp4"),
  v("v1782213898/shelcia-bastidores-top10-2026-05_gq2mf5.mp4"),
  v("v1782213898/shelcia-bastidores-top10-2026-04_idkbpu.mp4"),
  v("v1782213877/shelcia-bastidores-top10-2026-10_egy66j.mp4"),
  v("v1782213873/shelcia-bastidores-top10-2026-06_h5umt7.mp4"),
  v("v1782213866/shelcia-bastidores-top10-2026-01_tvmv1t.mp4"),
  v("v1782213156/shelcia-bastidores-top10-2026-03_ou7xfz.mp4"),
  v("v1782213154/shelcia-bastidores-top10-2026-02_iacdp8.mp4"),
];

export const videoBackstageMisc = [
  v("v1782213980/shelcia-bastidores-2026-33_msafdn.mp4"),
  v("v1782213156/shelcia-bastidores-2026-23_askmka.mp4"),
  v("v1782213095/shelcia-bastidores-2026-32_knjvxe.mp4"),
  v("v1782213095/shelcia-bastidores-2026-30_tyxv7r.mp4"),
  v("v1782213069/shelcia-bastidores-2026-31_boxl0z.mp4"),
  v("v1782213051/shelcia-bastidores-2026-29_o103cm.mp4"),
  v("v1782213046/shelcia-bastidores-2026-27_yjpmej.mp4"),
  v("v1782212470/shelcia-bastidores-2026-27_whenbs.mp4"),
  v("v1782212469/shelcia-bastidores-2026-26_sudbgo.mp4"),
  v("v1782212464/shelcia-bastidores-2026-17_fhmezp.mp4"),
  v("v1782212462/shelcia-bastidores-2026-25_jvlwgh.mp4"),
  v("v1782212456/shelcia-bastidores-2026-21_tro2h1.mp4"),
  v("v1782212456/shelcia-bastidores-2026-18_obcf67.mp4"),
  v("v1782212455/shelcia-bastidores-2026-19_dsflhl.mp4"),
  v("v1782212449/shelcia-bastidores-2026-16_vrpbe3.mp4"),
  v("v1782212438/shelcia-bastidores-2026-13_h73apx.mp4"),
  v("v1782212435/shelcia-bastidores-2026-10_kmflo9.mp4"),
  v("v1782212433/shelcia-bastidores-2026-06_usizuw.mp4"),
  v("v1782212429/shelcia-bastidores-2026-11_zsjyi8.mp4"),
  v("v1782212428/shelcia-bastidores-2026-02_gtkp96.mp4"),
  v("v1782212424/shelcia-bastidores-2026-03_rj4zlk.mp4"),
  v("v1782212423/shelcia-bastidores-2026-05_deuohs.mp4"),
  v("v1782212422/shelcia-bastidores-2026-09_xnulkr.mp4"),
  v("v1782212420/shelcia-bastidores-2026-12_dbu2we.mp4"),
];

export const videoBackstageClassic = [
  v("v1771954650/Bastidores-14_sbjzxz.mp4"), v("v1771954650/Bastidores-13_e4c85z.mp4"),
  v("v1771954623/Bastidores-10_tnbgz7.mp4"), v("v1771954591/Bastidores-84_rh0lyw.mp4"),
  v("v1771954589/Bastidores-82_m42nyd.mp4"), v("v1771954577/Bastidores-81_flcbh5.mp4"),
  v("v1771954538/Bastidores-03_vw8z3k.mp4"), v("v1771954537/Bastidores-83_tuyns0.mp4"),
  v("v1771954535/Bastidores-80_tkfcrt.mp4"), v("v1771954525/Bastidores-78_rnf6uj.mp4"),
  v("v1771954521/Bastidores-79_si4ubi.mp4"), v("v1771954518/Bastidores-77_yixy2r.mp4"),
  v("v1771954514/Bastidores-60_lb7eyd.mp4"), v("v1771954513/Bastidores-76_wjkrry.mp4"),
  v("v1771954511/Bastidores-75_giq8fh.mp4"), v("v1771954509/Bastidores-67_ds4nge.mp4"),
  v("v1771954506/Bastidores-71_zrzxgb.mp4"), v("v1771954501/Bastidores-74_zhkkhq.mp4"),
  v("v1771954499/Bastidores-73_tdihpe.mp4"), v("v1771954495/Bastidores-72_r95hgq.mp4"),
  v("v1771954491/Bastidores-70_nyfwgo.mp4"), v("v1771954488/Bastidores-69_iue4b5.mp4"),
  v("v1771954478/Bastidores-65_lpaozz.mp4"), v("v1771954479/Bastidores-68_jgo2kj.mp4"),
  v("v1771954471/Bastidores-63_yxqwj6.mp4"), v("v1771954470/Bastidores-66_nhxynk.mp4"),
  v("v1771954470/Bastidores-64_qgncwa.mp4"), v("v1771954448/Bastidores-62_gtlvmd.mp4"),
  v("v1771954436/Bastidores-56_h76ujc.mp4"), v("v1771954419/Bastidores-61_fwmqv4.mp4"),
  v("v1771954409/Bastidores-59_crfctg.mp4"), v("v1771954398/Bastidores-57_kgpjqg.mp4"),
  v("v1771954396/Bastidores-58_bhkikp.mp4"), v("v1771954395/Bastidores-50_zypp4i.mp4"),
  v("v1771954395/Bastidores-54_uszoz6.mp4"), v("v1771954385/Bastidores-51_xtylap.mp4"),
  v("v1771954383/Bastidores-53_fqxlw7.mp4"), v("v1771954383/Bastidores-55_zwavi2.mp4"),
  v("v1771954381/Bastidores-48_gotdoy.mp4"), v("v1771954373/Bastidores-52_ydec3r.mp4"),
  v("v1771954315/Bastidores-49_xehgkr.mp4"), v("v1771954305/Bastidores-45_zacknd.mp4"),
  v("v1771954304/Bastidores-47_mksuze.mp4"), v("v1771954290/Bastidores-43_tszna4.mp4"),
  v("v1771954288/Bastidores-46_ilw92d.mp4"), v("v1771954287/Bastidores-44_wlstul.mp4"),
  v("v1771954285/Bastidores-42_ltz7ga.mp4"), v("v1771954267/Bastidores-41_iassa7.mp4"),
  v("v1771954257/Bastidores-40_hleox7.mp4"), v("v1771954247/Bastidores-39_f8gpds.mp4"),
  v("v1771954248/Bastidores-35_oekgfk.mp4"), v("v1771954248/Bastidores-36_ezbkw4.mp4"),
  v("v1771954246/Bastidores-37_bucvbh.mp4"), v("v1771954247/Bastidores-38_qshply.mp4"),
  v("v1771954242/Bastidores-27_s9tknt.mp4"), v("v1771954226/Bastidores-32_tgxsq6.mp4"),
  v("v1771954225/Bastidores-31_yy6xby.mp4"), v("v1771954223/Bastidores-28_frk5oq.mp4"),
  v("v1771954223/Bastidores-34_redud8.mp4"), v("v1771954221/Bastidores-33_eoqadv.mp4"),
  v("v1771954218/Bastidores-30_dbaati.mp4"), v("v1771954218/Bastidores-29_arfbrv.mp4"),
  v("v1771954215/Bastidores-26_wddyub.mp4"), v("v1771954210/Bastidores-25_m0efmz.mp4"),
  v("v1771954209/Bastidores-22_mp76w5.mp4"), v("v1771954181/Bastidores-24_q7rm8u.mp4"),
  v("v1771954149/Bastidores-23_hw4dm7.mp4"), v("v1771954137/Bastidores-21_wirlgz.mp4"),
  v("v1771954136/Bastidores-20_pcvih1.mp4"), v("v1771954135/Bastidores-18_bpyjyt.mp4"),
  v("v1771954135/Bastidores-19_bb7oiy.mp4"), v("v1771954133/Bastidores-15_yqtgre.mp4"),
  v("v1771954131/Bastidores-17_cpmrmr.mp4"), v("v1771954131/Bastidores-16_ufskks.mp4"),
  v("v1771954127/Bastidores-12_rphox7.mp4"), v("v1771954123/Bastidores-11_lzlf80.mp4"),
  v("v1771954121/Bastidores-08_wsqcmb.mp4"), v("v1771954083/Bastidores-09_vzq0fc.mp4"),
  v("v1771954081/Bastidores-01_ivfqid.mp4"), v("v1771954081/Bastidores-02_nn0cju.mp4"),
  v("v1771954081/Bastidores-07_csgbpo.mp4"), v("v1771954036/Bastidores-05_wrnmzk.mp4"),
  v("v1771954020/Bastidores-06_gwyezk.mp4"), v("v1771954005/Bastidores-04_jegg9c.mp4"),
];

export const videoChapters2023 = [
  v("v1771953792/Cap%C3%ADtulos-de-2023-1_n5nuql.mp4"),
  v("v1771953789/Cap%C3%ADtulos-de-2023-3_okq2np.mp4"),
  v("v1771953788/Cap%C3%ADtulos-de-2023-6_vvumue.mp4"),
  v("v1771953784/Cap%C3%ADtulos-de-2023-5_t5thhq.mp4"),
  v("v1771953784/Cap%C3%ADtulos-de-2023-4_nxxqa9.mp4"),
  v("v1771953778/Cap%C3%ADtulos-de-2023-7_am5v8e.mp4"),
  v("v1771953760/Cap%C3%ADtulos-de-2023-2_txf83f.mp4"),
];

export const videoArtMagic = [
  v("v1771953602/Toque-de-Magia-31_ygdn5u.mp4"), v("v1771953590/Toque-de-Magia-30_mqbxdu.mp4"),
  v("v1771953589/Toque-de-Magia-28_vatc5d.mp4"), v("v1771953582/Toque-de-Magia-19_dzaszy.mp4"),
  v("v1771953579/Toque-de-Magia-17_wostiq.mp4"), v("v1771953579/Toque-de-Magia-18_gc96vy.mp4"),
  v("v1771953571/Toque-de-Magia-07_bruwoz.mp4"), v("v1771953566/Toque-de-Magia-06_q5ojis.mp4"),
  v("v1771953562/Toque-de-Magia-01_yspzym.mp4"),
];

export const videoFamilyFriends = [
  v("v1771953325/Familia-_-Amigos-8_jisaqe.mp4"), v("v1771953324/Familia-_-Amigos-6_ozcesj.mp4"),
  v("v1771953324/Familia-_-Amigos-9_gi1emh.mp4"), v("v1771953321/Familia-_-Amigos-7_gdqkej.mp4"),
  v("v1771953321/Familia-_-Amigos-5_ar7zfd.mp4"), v("v1771953320/Familia-_-Amigos-4_ooy5lj.mp4"),
  v("v1771953320/Familia-_-Amigos-1_enuo4z.mp4"), v("v1771953319/Familia-_-Amigos-3_pf0goh.mp4"),
  v("v1771953316/Familia-_-Amigos-2_dngpua.mp4"),
];

export const videoMemories = [
  v("v1771952852/Memorias-4_q44ply.mp4"), v("v1771952847/Memorias-3_g1k8sx.mp4"),
  v("v1771952826/Memorias-2_yf28nb.mp4"), v("v1771952823/Memorias-1_onkfmc.mp4"),
];

export const videoGeneric2026 = [
  v("v1771952522/2026-12_a3wpo4.mp4"), v("v1771952521/2026-13_olccte.mp4"),
  v("v1771952518/2026-15_qugvx8.mp4"), v("v1771952513/2026-14_yl9bfc.mp4"),
  v("v1771952510/2026-10_d7wzuv.mp4"), v("v1771952503/2026-09_jrdqs0.mp4"),
  v("v1771952502/2026-11_ib6lgp.mp4"), v("v1771952500/2026-08_qsoawv.mp4"),
  v("v1771952499/2026-07_lfe8hb.mp4"), v("v1771952493/2026-01_teggeo.mp4"),
  v("v1771952487/2026-06_xn1frn.mp4"), v("v1771952486/2026-04_whmnaw.mp4"),
  v("v1771952485/2026-02_c0k8nr.mp4"), v("v1771952485/2026-03_rl1vi1.mp4"),
  v("v1771952483/2026-05_iq2x6y.mp4"),
  v("v1771952324/2026-03_go96it.mp4"), v("v1771952315/2026-05_gagjbq.mp4"),
];

export const videoTop = [
  v("v1771805852/Top-02_wwqgfk.mp4"), v("v1771805842/Top-10_a54mko.mp4"),
  v("v1771805841/Top-09_an3y8r.mp4"), v("v1771805841/Top-08_ja1pgp.mp4"),
  v("v1771805840/Top-07_cmjtrk.mp4"), v("v1771805840/Top-03_nyszp7.mp4"),
  v("v1771805837/Top-05_fg7mjv.mp4"), v("v1771805836/Top-06_iahhjp.mp4"),
  v("v1771805836/Top-04_dfba7v.mp4"), v("v1771805835/Top-01_gtuwjp.mp4"),
];

export const allVideos = [
  ...videoBackstage2026, ...videoRuthMoments, ...videoRuthCeremony, ...videoSpecial,
  ...videoBackstageTop10, ...videoBackstageMisc, ...videoBackstageClassic,
  ...videoChapters2023, ...videoArtMagic, ...videoFamilyFriends, ...videoMemories,
  ...videoGeneric2026, ...videoTop,
];

export const guestVideos = [
  ...videoRuthMoments.slice(0, 24), ...videoRuthCeremony, ...videoFamilyFriends,
  ...videoMemories, ...videoTop,
];

export const privateVideos = [
  ...videoBackstage2026, ...videoSpecial, ...videoBackstageTop10, ...videoBackstageMisc,
  ...videoBackstageClassic, ...videoChapters2023, ...videoArtMagic, ...videoGeneric2026,
];

// Trilha sonora da Shelcia — playlist oficial.
// A PRIMEIRA faixa é a melodia que ela mais ama (Experience) e é a que toca
// automaticamente ao abrir a aplicação; as restantes seguem em ordem.
export const audioTracks = [
  {
    title: "Experience — Ludovico Einaudi",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345235/Shelcia-Fernanda_Musica_Ludovico_Einaudi_Experience_row3kd.mp4",
    note: "A melodia favorita dela — música principal",
  },
  {
    title: "Photograph — Ed Sheeran",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786010540/Ed_Sheeran_Photograph_Official_Music_Video_xps4ep.mp4",
  },
  {
    title: "Perfect — Ed Sheeran",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345235/Shelcia-Fernanda_Musica_Ed_Sheeran_Perfect_Official_Music_Video_jogfan.mp4",
    note: "A música preferida dela",
  },
  {
    title: "Golden Hour — JVKE",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345225/Shelcia-Fernanda_Musica_JVKE_golden_hour_official_music_video_r68r7b.mp4",
  },
  {
    title: "Wicked Game — Chris Isaak",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345225/Shelcia-Fernanda_Musica_Isaak_Wicked_Game_Lyrics_yaagr8.mp4",
    note: "“Parece que me teletransporta.”",
  },
  {
    title: "Interstellar (Piano) — Hans Zimmer",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345236/Shelcia-Fernanda_Musica_Hans_Zimmer_Interstellar_Main_Theme_Piano_Version_Sheet_Music_dqzepa.mp4",
  },
  {
    title: "Solas — Jamie Duffy",
    src: "https://res.cloudinary.com/deeki0eou/video/upload/v1786345227/Shelcia-Fernanda_Musica_Jamie_Duffy_Solas_Official_Video_gxhkmu.mp4",
  },
];
