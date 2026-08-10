// SHELL 2026 — Arquivo Real (nova colheita)
// Fotografias e vídeos fornecidos para a experiência imersiva, organizados por capítulo emocional.
const B = "https://res.cloudinary.com/deeki0eou/image/upload/";
const V = "https://res.cloudinary.com/deeki0eou/video/upload/";

// Otimização na entrega (largura sensata + qualidade automática + melhor formato).
const p = (path: string, w = 1200) => `${B}w_${w},q_auto,f_auto/${path}`;
const v = (path: string) => `${V}${path}`;

/* ============================= VÍDEOS ============================= */

// ── DESTAQUE PRINCIPAL · os 18 anos da Shelcia (novo arquivo) ──
export const destaque18Videos = [
  v("v1786354447/Shelcia-Fernanda-Destaque-dos-seus-18-anos87_lewfis.mp4"),
  v("v1786354441/Shelcia-Fernanda-Destaque-dos-seus-18-anos76_uxfmu9.mp4"),
  v("v1786354441/Shelcia-Fernanda-Destaque-dos-seus-18-anos81_nrpeu3.mp4"),
  v("v1786354438/Shelcia-Fernanda-Destaque-dos-seus-18-anos75_ydvb06.mp4"),
  v("v1786354437/Shelcia-Fernanda-Destaque-dos-seus-18-anos73_ltdw8b.mp4"),
  v("v1786354434/Shelcia-Fernanda-Destaque-dos-seus-18-anos69_s2av9x.mp4"),
  v("v1786354433/Shelcia-Fernanda-Destaque-dos-seus-18-anos62_e4fb7x.mp4"),
  v("v1786354423/Shelcia-Fernanda-Destaque-dos-seus-18-anos64_l2tzrh.mp4"),
  v("v1786354422/Shelcia-Fernanda-Destaque-dos-seus-18-anos53_obg3xn.mp4"),
  v("v1786354419/Shelcia-Fernanda-Destaque-dos-seus-18-anos57_djfueg.mp4"),
  v("v1786354419/Shelcia-Fernanda-Destaque-dos-seus-18-anos61_miy6s4.mp4"),
  v("v1786354412/Shelcia-Fernanda-Destaque-dos-seus-18-anos65_ixd1z1.mp4"),
  v("v1786354409/Shelcia-Fernanda-Destaque-dos-seus-18-anos60_arwiye.mp4"),
  v("v1786354407/Shelcia-Fernanda-Destaque-dos-seus-18-anos54_gca71s.mp4"),
  v("v1786354402/Shelcia-Fernanda-Destaque-dos-seus-18-anos44_tgl5gx.mp4"),
  v("v1786354399/Shelcia-Fernanda-Destaque-dos-seus-18-anos51_l6ieae.mp4"),
  v("v1786354398/Shelcia-Fernanda-Destaque-dos-seus-18-anos39_ppa5t1.mp4"),
  v("v1786354396/Shelcia-Fernanda-Destaque-dos-seus-18-anos49_xqhpi2.mp4"),
  v("v1786354395/Shelcia-Fernanda-Destaque-dos-seus-18-anos38_cs1km5.mp4"),
  v("v1786354393/Shelcia-Fernanda-Destaque-dos-seus-18-anos37_ap5wtk.mp4"),
  v("v1786354372/Shelcia-Fernanda-Destaque-dos-seus-18-anos28_gxvbur.mp4"),
  v("v1786354368/Shelcia-Fernanda-Destaque-dos-seus-18-anos25_tkozk3.mp4"),
  v("v1786354364/Shelcia-Fernanda-Destaque-dos-seus-18-anos35_th82er.mp4"),
  v("v1786354363/Shelcia-Fernanda-Destaque-dos-seus-18-anos27_ho8csk.mp4"),
  v("v1786354363/Shelcia-Fernanda-Destaque-dos-seus-18-anos20_sqweuk.mp4"),
  v("v1786354363/Shelcia-Fernanda-Destaque-dos-seus-18-anos17_zrokep.mp4"),
  v("v1786354340/Shelcia-Fernanda-Destaque-dos-seus-18-anos11_ncjtoj.mp4"),
  v("v1786354334/Shelcia-Fernanda-Destaque-dos-seus-18-anos23_qnadzt.mp4"),
  v("v1786354333/Shelcia-Fernanda-Destaque-dos-seus-18-anos16_vcvjh1.mp4"),
  v("v1786354327/Shelcia-Fernanda-Destaque-dos-seus-18-anos15_sg5r2d.mp4"),
  v("v1786354325/Shelcia-Fernanda-Destaque-dos-seus-18-anos10_sqt3no.mp4"),
  v("v1786354253/Shelcia-Fernanda-Destaque-dos-seus-18-anos01_oghsit.mp4"),
  v("v1786354237/Shelcia-Fernanda-Destaque-dos-seus-18-anos06_jjkiab.mp4"),
  v("v1786354232/Shelcia-Fernanda-Destaque-dos-seus-18-anos14_gxrr6o.mp4"),
  v("v1786354231/Shelcia-Fernanda-Destaque-dos-seus-18-anos07_i5qmmw.mp4"),
  v("v1786354224/Shelcia-Fernanda-Destaque-dos-seus-18-anos04_iqosft.mp4"),
];

export const destaque18Photos = [
  p("v1786354440/Shelcia-Fernanda-Destaque-dos-seus-18-anos92_sajo2r.jpg", 1600),
  p("v1786354440/Shelcia-Fernanda-Destaque-dos-seus-18-anos91_dc74oc.jpg"),
  p("v1786354439/Shelcia-Fernanda-Destaque-dos-seus-18-anos90_lbu4wp.jpg"),
  p("v1786354439/Shelcia-Fernanda-Destaque-dos-seus-18-anos89_gnpvqo.jpg"),
  p("v1786354438/Shelcia-Fernanda-Destaque-dos-seus-18-anos88_jkxwz1.jpg"),
  p("v1786354438/Shelcia-Fernanda-Destaque-dos-seus-18-anos86_axmsaq.jpg"),
  p("v1786354437/Shelcia-Fernanda-Destaque-dos-seus-18-anos85_codcto.jpg"),
  p("v1786354437/Shelcia-Fernanda-Destaque-dos-seus-18-anos83_ledqjy.jpg"),
  p("v1786354436/Shelcia-Fernanda-Destaque-dos-seus-18-anos84_cqjpub.jpg"),
  p("v1786354435/Shelcia-Fernanda-Destaque-dos-seus-18-anos82_ojcuju.jpg"),
  p("v1786354431/Shelcia-Fernanda-Destaque-dos-seus-18-anos80_ginsup.jpg"),
  p("v1786354430/Shelcia-Fernanda-Destaque-dos-seus-18-anos79_f8lrkl.jpg"),
  p("v1786354428/Shelcia-Fernanda-Destaque-dos-seus-18-anos78_swsto9.jpg"),
  p("v1786354426/Shelcia-Fernanda-Destaque-dos-seus-18-anos77_bm7gjs.jpg"),
  p("v1786354424/Shelcia-Fernanda-Destaque-dos-seus-18-anos74_eft3xf.jpg"),
  p("v1786354423/Shelcia-Fernanda-Destaque-dos-seus-18-anos72_rskov1.jpg"),
  p("v1786354421/Shelcia-Fernanda-Destaque-dos-seus-18-anos71_ujupkj.jpg"),
  p("v1786354421/Shelcia-Fernanda-Destaque-dos-seus-18-anos70_ffkupl.jpg"),
  p("v1786354417/Shelcia-Fernanda-Destaque-dos-seus-18-anos68_eiglhb.jpg"),
  p("v1786354415/Shelcia-Fernanda-Destaque-dos-seus-18-anos67_qwhlch.jpg"),
  p("v1786354414/Shelcia-Fernanda-Destaque-dos-seus-18-anos66_z97hms.jpg"),
  p("v1786354409/Shelcia-Fernanda-Destaque-dos-seus-18-anos63_ty30gz.jpg"),
  p("v1786354401/Shelcia-Fernanda-Destaque-dos-seus-18-anos59_shgw9u.jpg"),
  p("v1786354400/Shelcia-Fernanda-Destaque-dos-seus-18-anos58_lmkiue.jpg"),
  p("v1786354400/Shelcia-Fernanda-Destaque-dos-seus-18-anos56_n2yhku.jpg"),
  p("v1786354398/Shelcia-Fernanda-Destaque-dos-seus-18-anos55_qgazlu.jpg"),
  p("v1786354395/Shelcia-Fernanda-Destaque-dos-seus-18-anos52_bz29vr.jpg"),
  p("v1786354382/Shelcia-Fernanda-Destaque-dos-seus-18-anos50_yumik7.jpg"),
  p("v1786354380/Shelcia-Fernanda-Destaque-dos-seus-18-anos47_hmg4kf.jpg"),
  p("v1786354379/Shelcia-Fernanda-Destaque-dos-seus-18-anos48_f5damd.jpg"),
  p("v1786354372/Shelcia-Fernanda-Destaque-dos-seus-18-anos46_nhc6ov.jpg"),
  p("v1786354371/Shelcia-Fernanda-Destaque-dos-seus-18-anos45_bgaaz5.jpg"),
  p("v1786354370/Shelcia-Fernanda-Destaque-dos-seus-18-anos42_zhoqvj.jpg"),
  p("v1786354369/Shelcia-Fernanda-Destaque-dos-seus-18-anos43_jyfn0n.jpg"),
  p("v1786354368/Shelcia-Fernanda-Destaque-dos-seus-18-anos41_kwoxia.jpg"),
  p("v1786354367/Shelcia-Fernanda-Destaque-dos-seus-18-anos40_dgvuht.jpg"),
  p("v1786354364/Shelcia-Fernanda-Destaque-dos-seus-18-anos36_zqfz8d.jpg"),
  p("v1786354362/Shelcia-Fernanda-Destaque-dos-seus-18-anos34_gchyxe.jpg"),
  p("v1786354349/Shelcia-Fernanda-Destaque-dos-seus-18-anos33_txmquf.jpg"),
  p("v1786354347/Shelcia-Fernanda-Destaque-dos-seus-18-anos32_jxv9lc.jpg"),
  p("v1786354346/Shelcia-Fernanda-Destaque-dos-seus-18-anos31_lxrryk.jpg"),
  p("v1786354344/Shelcia-Fernanda-Destaque-dos-seus-18-anos30_jzbn5u.jpg"),
  p("v1786354343/Shelcia-Fernanda-Destaque-dos-seus-18-anos29_giuj2z.jpg"),
  p("v1786354339/Shelcia-Fernanda-Destaque-dos-seus-18-anos26_fkzzwi.jpg"),
  p("v1786354334/Shelcia-Fernanda-Destaque-dos-seus-18-anos24_oipyt0.jpg"),
  p("v1786354333/Shelcia-Fernanda-Destaque-dos-seus-18-anos22_firznb.jpg"),
  p("v1786354327/Shelcia-Fernanda-Destaque-dos-seus-18-anos21_stqcez.jpg"),
  p("v1786354324/Shelcia-Fernanda-Destaque-dos-seus-18-anos19_riuhug.jpg"),
  p("v1786354279/Shelcia-Fernanda-Destaque-dos-seus-18-anos18_xncvnu.jpg"),
  p("v1786354227/Shelcia-Fernanda-Destaque-dos-seus-18-anos13_suec5r.jpg"),
  p("v1786354226/Shelcia-Fernanda-Destaque-dos-seus-18-anos12_q9nsax.jpg"),
  p("v1786354221/Shelcia-Fernanda-Destaque-dos-seus-18-anos09_k2ebn1.jpg"),
  p("v1786354218/Shelcia-Fernanda-Destaque-dos-seus-18-anos08_cingqo.jpg"),
  p("v1786354216/Shelcia-Fernanda-Destaque-dos-seus-18-anos05_frcurp.jpg"),
  p("v1786354215/Shelcia-Fernanda-Destaque-dos-seus-18-anos03_awxf6w.jpg"),
  p("v1786354215/Shelcia-Fernanda-Destaque-dos-seus-18-anos02_glfnh5.jpg"),
];

// A frase que resume o universo — porque as imagens dizem tudo.
export const universeQuote = {
  text: "A fotografia é a história que não consigo contar com palavras.",
  author: "Destin Sparks",
};

// Frases em vídeo-texto (para heróis com vídeo dentro das letras)
export const txtDestaqueVideos = [
  v("v1785929170/shelcia-fernanda-txt-video-frase-sobre-shelcia-destaque-01_pkg4oj.mp4"),
  v("v1785929174/shelcia-fernanda-txt-video-frase-sobre-shelcia-destaque-02_ximxzf.mp4"),
];

export const txtFraseVideo = v(
  "v1785929174/shelcia-fernanda-video-txt-frase-decidi-dizer-as-pessoas-o-que-penso-sobre-elas_s7xqdv.mp4"
);

// Destaques em vídeo (style tatuada homem-aranha + foto-vídeo)
export const destaqueVideos = [
  v("v1785929122/shelcia-fernanda-destaque-style-tatuada-de-homem-aranha-no-rosto-01_ounwft.mp4"),
  v("v1785929157/shelcia-fernanda-destaque-style-tatuada-de-homem-aranha-no-rosto-02_lquirl.mp4"),
  v("v1785929171/shelcia-fernanda-destaque-style-tatuada-de-homem-aranha-no-rosto-03_jhtdrl.mp4"),
  v("v1785929153/shelcia-fernanda-foto-video_fexa92.mp4"),
];

// Emocional — com os irmãos
export const irmaosVideos = [
  v("v1785929149/shelcia-fernanda-emocional-video-com-os-seus-irmaos-destaque-01_bwmp9l.mp4"),
  v("v1785929165/shelcia-fernanda-emocional-video-com-os-seus-irmaos-destaque-02_elb09a.mp4"),
  v("v1785929143/shelcia-fernanda-emocional-video-com-os-seus-irmaos-destaque-03_a9gkey.mp4"),
  v("v1785929166/shelcia-fernanda-emocional-video-com-os-seus-irmaos-destaque-04_mjn4y7.mp4"),
];

// Infância & escola
export const infanciaVideos = [
  v("v1785929167/shelcia-fernanda-infancia-defendendo-um-trabalho-escolar_hmmd4c.mp4"),
  v("v1785929170/shelcia-fernanda-primeiros-dias-na-escola-nono-ano-2023_u4tq15.mp4"),
];

// Capítulos de 2023 — aniversário de 15 anos
export const capitulos2023Videos = [
  v("v1785929100/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-01_mdersm.mp4"),
  v("v1785929102/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-02_n69kvd.mp4"),
  v("v1785929100/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-03_aa6vfa.mp4"),
  v("v1785929093/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-04_cxxjai.mp4"),
  v("v1785929119/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-05_xpdnpa.mp4"),
  v("v1785929125/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-06_riwtbl.mp4"),
  v("v1785929125/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-07_xnva8l.mp4"),
  v("v1785929125/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-08_rxrdax.mp4"),
  v("v1785929126/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-09_lvccu5.mp4"),
  v("v1785929134/shelcia-fernanda-capitulos-de-2023-aniversario-de-15-anos-10_lyus37.mp4"),
];

// Bastidores — top vídeos
export const bastidoresTopVideos = [
  v("v1785929055/shelcia-fernanda-bastidores-top-videos-01_fksv65.mp4"),
  v("v1785929071/shelcia-fernanda-bastidores-top-videos-02_c2cems.mp4"),
  v("v1785929068/shelcia-fernanda-bastidores-top-videos-03_qadriv.mp4"),
  v("v1785929077/shelcia-fernanda-bastidores-top-videos-04_wr7js6.mp4"),
  v("v1785929062/shelcia-fernanda-bastidores-top-videos-ultimos-de-2026-01_dok4ji.mp4"),
  v("v1785929087/shelcia-fernanda-bastidores-top-videos-ultimos-de-2026-02_gni2th.mp4"),
  v("v1785929115/shelcia-fernanda-bastidores-top-videos-ultimos-de-2026-03_ezll11.mp4"),
];

// Aventuras com os amigos
export const aventurasAmigosVideos = [
  v("v1785929026/shelcia-fernanda-aventuras-com-os-amigos-destaque-01_cetluq.mp4"),
  v("v1785929035/shelcia-fernanda-aventuras-com-os-amigos-destaque-02_u8z7gq.mp4"),
  v("v1785929030/shelcia-fernanda-aventuras-com-os-amigos-destaque-03_yapsxn.mp4"),
  v("v1785929044/shelcia-fernanda-aventuras-com-os-amigos-destaque-04_ollgjl.mp4"),
  v("v1785929048/shelcia-fernanda-aventuras-com-os-amigos-destaque-05_ss80fl.mp4"),
  v("v1785929033/shelcia-fernanda-aventuras-com-os-amigos-destaque-06_taytpe.mp4"),
  v("v1785929053/shelcia-fernanda-aventuras-com-os-amigos-destaque-07_wqy8y7.mp4"),
  v("v1785929058/shelcia-fernanda-aventuras-com-os-amigos-destaque-08_tjzd4t.mp4"),
  v("v1785929073/shelcia-fernanda-aventuras-com-os-amigos-destaque-09_dxni4x.mp4"),
  v("v1785929044/shelcia-fernanda-aventuras-com-os-amigos-destaque-10_xfesft.mp4"),
  v("v1785929078/shelcia-fernanda-aventuras-com-os-amigos-destaque-11_h8rpmr.mp4"),
];

export const novosVideos = [
  ...txtDestaqueVideos,
  txtFraseVideo,
  ...destaqueVideos,
  ...irmaosVideos,
  ...infanciaVideos,
  ...capitulos2023Videos,
  ...bastidoresTopVideos,
  ...aventurasAmigosVideos,
];

/* ============================= FOTOGRAFIAS ============================= */

// Imagens de destaque (20)
export const destaquePhotos = [
  p("v1785928939/shelcia-fernanda-imagens-de-destaque-01_kbz8qc.jpg"),
  p("v1785928941/shelcia-fernanda-imagens-de-destaque-02_n6ze54.jpg"),
  p("v1785928942/shelcia-fernanda-imagens-de-destaque-03_rnkf64.jpg"),
  p("v1785928942/shelcia-fernanda-imagens-de-destaque-04_ytl3ll.jpg"),
  p("v1785928943/shelcia-fernanda-imagens-de-destaque-05_nxk9od.jpg"),
  p("v1785928945/shelcia-fernanda-imagens-de-destaque-06_bgkbyv.jpg"),
  p("v1785928946/shelcia-fernanda-imagens-de-destaque-07_cgimpr.jpg"),
  p("v1785928946/shelcia-fernanda-imagens-de-destaque-08_pj2s5u.jpg"),
  p("v1785928947/shelcia-fernanda-imagens-de-destaque-09_t9y5up.jpg"),
  p("v1785928949/shelcia-fernanda-imagens-de-destaque-10_zeqnsd.jpg"),
  p("v1785928950/shelcia-fernanda-imagens-de-destaque-11_kjml8x.jpg"),
  p("v1785928951/shelcia-fernanda-imagens-de-destaque-12_goy7g0.jpg"),
  p("v1785928952/shelcia-fernanda-imagens-de-destaque-13_f1cxkl.jpg"),
  p("v1785928953/shelcia-fernanda-imagens-de-destaque-14_sbi6sa.jpg"),
  p("v1785928954/shelcia-fernanda-imagens-de-destaque-15_ogkubo.jpg"),
  p("v1785928955/shelcia-fernanda-imagens-de-destaque-16_hfqf4i.jpg"),
  p("v1785928956/shelcia-fernanda-imagens-de-destaque-17_p1ikup.jpg"),
  p("v1785928957/shelcia-fernanda-imagens-de-destaque-18_hjxv68.jpg"),
  p("v1785928958/shelcia-fernanda-imagens-de-destaque-19_aswk7u.jpg"),
  p("v1785928959/shelcia-fernanda-imagens-de-destaque-20_vdom2x.jpg", 1600),
];

// Arquitetura — o sonho dela (14)
export const arquiteturaSonhoPhotos = [
  p("v1785928924/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-01_lzygrp.jpg"),
  p("v1785928926/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-02_gs2zkn.jpg"),
  p("v1785928926/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-03_qhdnpf.jpg"),
  p("v1785928928/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-04_pg1kbu.jpg"),
  p("v1785928928/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-05_ypegwy.jpg"),
  p("v1785928929/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-06_yesu8q.jpg"),
  p("v1785928930/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-07_bk3uuu.jpg"),
  p("v1785928932/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-08_aecncd.jpg"),
  p("v1785928933/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-09_vypcbn.jpg"),
  p("v1785928934/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-10_gdmnue.jpg"),
  p("v1785928935/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-11_z0kbqc.jpg"),
  p("v1785928936/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-12_iwxev9.jpg"),
  p("v1785928937/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-13_hccdpb.jpg"),
  p("v1785928938/shelcia-fernanda-imagens-de-arquitetura-o-sonho-dela-14_bxfwql.jpg"),
];

// Natureza — paisagens (16)
export const naturezaPaisagensPhotos = [
  p("v1785928908/shelcia-fernanda-imagens-da-natureza-paisagens01_oruioo.jpg"),
  p("v1785928910/shelcia-fernanda-imagens-da-natureza-paisagens02_axincz.jpg"),
  p("v1785928910/shelcia-fernanda-imagens-da-natureza-paisagens03_acatmp.jpg"),
  p("v1785928911/shelcia-fernanda-imagens-da-natureza-paisagens04_tpieqt.jpg"),
  p("v1785928912/shelcia-fernanda-imagens-da-natureza-paisagens05_bmpowl.jpg"),
  p("v1785928913/shelcia-fernanda-imagens-da-natureza-paisagens06_lqu3du.jpg"),
  p("v1785928914/shelcia-fernanda-imagens-da-natureza-paisagens07_dd3jrp.jpg"),
  p("v1785928915/shelcia-fernanda-imagens-da-natureza-paisagens08_tw62kh.jpg"),
  p("v1785928917/shelcia-fernanda-imagens-da-natureza-paisagens09_ruzxkx.jpg"),
  p("v1785928917/shelcia-fernanda-imagens-da-natureza-paisagens10_xukv1l.jpg"),
  p("v1785928918/shelcia-fernanda-imagens-da-natureza-paisagens11_phsi2v.jpg"),
  p("v1785928919/shelcia-fernanda-imagens-da-natureza-paisagens12_mdxljw.jpg"),
  p("v1785928920/shelcia-fernanda-imagens-da-natureza-paisagens13_qykwzg.jpg"),
  p("v1785928921/shelcia-fernanda-imagens-da-natureza-paisagens14_v7fqau.jpg"),
  p("v1785928922/shelcia-fernanda-imagens-da-natureza-paisagens15_awn3ug.jpg"),
  p("v1785928923/shelcia-fernanda-imagens-da-natureza-paisagens16_yqrepr.jpg", 1600),
];

// Natureza — flores (22) · a rosa é a flor favorita
export const naturezaFloresPhotos = [
  p("v1785928885/shelcia-fernanda-imagens-da-natureza-flores-01_qfe3yx.jpg"),
  p("v1785928886/shelcia-fernanda-imagens-da-natureza-flores-02_lu4kzh.jpg"),
  p("v1785928887/shelcia-fernanda-imagens-da-natureza-flores-03_jsdvdv.jpg"),
  p("v1785928888/shelcia-fernanda-imagens-da-natureza-flores-04_n7uktz.jpg"),
  p("v1785928889/shelcia-fernanda-imagens-da-natureza-flores-05_cszhkf.jpg"),
  p("v1785928890/shelcia-fernanda-imagens-da-natureza-flores-06_fi3okw.jpg"),
  p("v1785928891/shelcia-fernanda-imagens-da-natureza-flores-07_pfbeh2.jpg"),
  p("v1785928892/shelcia-fernanda-imagens-da-natureza-flores-08_j4vyuy.jpg"),
  p("v1785928893/shelcia-fernanda-imagens-da-natureza-flores-09_wxvwzd.jpg"),
  p("v1785928893/shelcia-fernanda-imagens-da-natureza-flores-10_k3fw0z.jpg"),
  p("v1785928895/shelcia-fernanda-imagens-da-natureza-flores-11_jxwaxa.jpg"),
  p("v1785928896/shelcia-fernanda-imagens-da-natureza-flores-12_h8jlqb.jpg"),
  p("v1785928897/shelcia-fernanda-imagens-da-natureza-flores-13_bvhem8.jpg"),
  p("v1785928899/shelcia-fernanda-imagens-da-natureza-flores-14_r4plpd.jpg"),
  p("v1785928900/shelcia-fernanda-imagens-da-natureza-flores-15_hwxoqw.jpg"),
  p("v1785928901/shelcia-fernanda-imagens-da-natureza-flores-16_wtg7xq.jpg"),
  p("v1785928902/shelcia-fernanda-imagens-da-natureza-flores-17_xhoxah.jpg"),
  p("v1785928903/shelcia-fernanda-imagens-da-natureza-flores-18_zw1azh.jpg"),
  p("v1785928904/shelcia-fernanda-imagens-da-natureza-flores-19_bsrqqd.jpg"),
  p("v1785928905/shelcia-fernanda-imagens-da-natureza-flores-20_xx4u7s.jpg"),
  p("v1785928906/shelcia-fernanda-imagens-da-natureza-flores-21_l4xhek.jpg"),
  p("v1785928907/shelcia-fernanda-imagens-da-natureza-flores-22_mcesx5.jpg"),
];

// Natureza — bosques, pôr do sol e paisagens (33) · "gosto bastante da praia ao pôr do sol e de bosques"
export const naturezaBosquesPhotos = [
  p("v1785928845/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-01_sobbg9.jpg"),
  p("v1785928847/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-02_clrfah.jpg"),
  p("v1785928848/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-03_laenwv.jpg"),
  p("v1785928850/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-04_gzj1n9.jpg"),
  p("v1785928852/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-05_a0vyt0.jpg"),
  p("v1785928854/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-06_xpxllu.jpg"),
  p("v1785928856/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-07_nke573.jpg"),
  p("v1785928857/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-08_jkam3w.jpg"),
  p("v1785928858/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-09_v4rykf.jpg"),
  p("v1785928859/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-10_coqaad.jpg"),
  p("v1785928860/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-11_hvfwg8.jpg"),
  p("v1785928861/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-12_u2xgkd.jpg"),
  p("v1785928862/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-13_algakb.jpg"),
  p("v1785928864/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-14_ecpsqf.jpg"),
  p("v1785928865/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-15_l0yelr.jpg"),
  p("v1785928865/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-16_zkxvz6.jpg"),
  p("v1785928866/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-17_q9876u.jpg"),
  p("v1785928867/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-18_vrwgk0.jpg"),
  p("v1785928868/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-19_jiddly.jpg"),
  p("v1785928869/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-20_kceedm.jpg"),
  p("v1785928870/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-21_ubuhdx.jpg"),
  p("v1785928871/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-22_mayhr0.jpg"),
  p("v1785928872/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-23_s6jebh.jpg"),
  p("v1785928874/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-24_p7yd57.jpg"),
  p("v1785928874/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-25_sf8qhv.jpg"),
  p("v1785928875/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-26_b6e8ig.jpg"),
  p("v1785928876/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-27_pqzx6d.jpg"),
  p("v1785928877/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-28_getcnc.jpg"),
  p("v1785928878/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-29_dmuj3n.jpg"),
  p("v1785928879/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-30_cghmoz.jpg"),
  p("v1785928881/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-31_owp7ak.jpg"),
  p("v1785928884/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-32_sydlai.jpg"),
  p("v1785928884/shelcia-fernanda-imagens-da-natureza-bosques-por-do-sol-e-paisagens-33_j98fkx.jpg", 1600),
];

// Frases da série que ela ama (Bridgerton) + arte & texto
export const frasesSeriePhotos = [
  p("v1785928841/shelcia-fernanda-frases-da-serie-que-ela-ama01_t0i9l8.jpg"),
  p("v1785928829/shelcia-fernanda-frases-da-serie-que-ela-ama02_gvi5up.jpg"),
  p("v1785928844/shelcia-fernanda-frases-da-serie-que-ela-ama03_dsyq5j.jpg"),
  p("v1785928844/shelcia-fernanda-frases-da-serie-que-ela-ama04_i3prbq.jpg"),
];

export const artTxtPhotos = [
  p("v1785928630/shelcia-fernanda-art-e-txt-01_ah28mw.jpg"),
  p("v1785928630/shelcia-fernanda-art-e-txt-02_pezd1c.jpg"),
  p("v1785928629/shelcia-fernanda-art-e-txt-03_wga7en.jpg"),
  p("v1785928630/shelcia-fernanda-art-e-txt-04_ctcpcs.jpg"),
  p("v1785928631/shelcia-fernanda-art-e-txt-05_vzwf2s.jpg"),
  p("v1785928631/shelcia-fernanda-art-e-txt-06_ucnoyq.jpg"),
  p("v1785928632/shelcia-fernanda-art-e-txt-07_xavkqv.jpg"),
  p("v1785928634/shelcia-fernanda-art-e-txt-08_x8jrrr.jpg"),
  p("v1785928635/shelcia-fernanda-art-e-txt-09_vtamop.jpg"),
  p("v1785928844/shelcia-fernanda-art-e-txt-10_elnj4v.png"),
  p("v1785928740/shelcia-fernanda-art-e-txt-11_yljooo.png"),
  p("v1785928651/shelcia-fernanda-art-e-txt-12_mxcgj6.jpg"),
  p("v1785928638/shelcia-fernanda-art-e-txt-13_onacii.jpg"),
  p("v1785928700/shelcia-fernanda-art-e-txt-14_wqq4vl.jpg"),
  p("v1785928646/shelcia-fernanda-art-e-txt-15_bq1y4k.jpg"),
  p("v1785928661/shelcia-fernanda-art-e-txt-16_exq6u2.jpg"),
  p("v1785928664/shelcia-fernanda-art-e-txt-17_lgfyqg.jpg"),
  p("v1785928678/shelcia-fernanda-art-e-txt-18_im8pce.jpg"),
  p("v1785928732/shelcia-fernanda-art-e-txt-19_ejq5ee.jpg"),
];

// Peças únicas
export const aniversarioMaePhoto = p("v1785928960/shelcia-fernanda-txt-desejando-feliz-aniversario-para-a-sua-mae_scb1oj.jpg");
export const fraseBiblicaPhoto = p("v1785928735/shelcia-fernanda-frase-biblica-txt-ele-nos-amou-primeiro_jhm1ku.jpg");
export const bastidoresPhoto = p("v1785928828/shelcia-fernanda-bastidores_bxmsb7.jpg");

export const novasPhotos = [
  ...destaquePhotos,
  ...arquiteturaSonhoPhotos,
  ...naturezaPaisagensPhotos,
  ...naturezaFloresPhotos,
  ...naturezaBosquesPhotos,
  ...frasesSeriePhotos,
  ...artTxtPhotos,
  aniversarioMaePhoto,
  fraseBiblicaPhoto,
  bastidoresPhoto,
];
