export type FlowerVideo = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  embedUrl: string;
  accent: string;
};

type VideoSource = [id: string, creator: string, postId: string, postType?: "video" | "photo"];

const sources: VideoSource[] = [
  ["buque-01", "cainne_lima", "7514462401325059333"],
  ["buque-02", "cainne_lima", "7495136986441813254"],
  ["buque-03", "monicalondrina", "7084303284697156869"],
  ["buque-04", "luanarosaa_", "7240593974619049221"],
  ["buque-05", "cainne_lima", "7455025401077763333"],
  ["buque-06", "dadivaemflor", "7633206787616836885"],
  ["buque-07", "angelsfloresfloricultura", "7321756863190584582"],
  ["buque-08", "andreiakusterk", "7469865278734634245"],
  ["buque-09", "anabananacestas.ofc", "7459480899776810245"],
  ["buque-10", "facavcmesmodicas2026", "7637587076359228679"],
  ["buque-11", "milasteil2", "7214099971199569158"],
  ["buque-12", "tem.nashopee", "7615101697026788616"],
  ["buque-13", "giftcorner00", "7266067634150558982"],
  ["buque-14", "ediceliaperfumaria", "7501092017011707141"],
  ["buque-15", "leandroduan", "6985920238781009158"],
  ["buque-16", "eduardo_boas", "7282441222298291461"],
  ["buque-17", "cainne_lima", "7449762570400959749"],
  ["buque-18", "bellas.rosas", "7333309840355249454"],
  ["buque-19", "doces_gourmet4k", "7218582959161380102"],
  ["buque-20", "centraldoces.taubate", "7555647784427310347"],
  ["buque-21", "floretipresentes", "7505118591851760902"],
  ["buque-22", "raylaneteles60", "7509587108042919173"],
  ["buque-23", "amorembuquees", "7336343218650385670"],
  ["buque-24", "luuh19017", "7435811692564548920"],
  ["buque-25", "raai.ariele06", "7225827684830432518"],
  ["buque-26", "floriculturaelaineflores", "7487995379787599159"],
  ["buque-27", "diypresentes", "7444636360943602999"],
  ["buque-28", "floriculturaelaineflores", "7552908146105126156"],
  ["buque-29", "palaksdiystudio", "7515741355272949022"],
  ["buque-30", "tuliipmakes", "7622322470107860244"],
  ["buque-31", "jainecristiny21", "7441709724136934711"],
  ["buque-32", "diypresentes", "7442438770139434296"],
  ["buque-33", "ediceliaperfumaria", "7477699960125885751"],
  ["buque-34", "feliciaheesen", "7512162120037944598"],
  ["buque-35", "carlalucatto2", "7484263083053976838"],
  ["buque-36", "artsparkle74", "7343277583515110662"],
  ["buque-37", "pradziastore", "7621193324225088776"],
  ["buque-38", "dilciashop", "7412208158241819909"],
  ["buque-39", "hassanzai.event", "7567031438525091090"],
  ["buque-40", "redpetalsflorist", "7365925240180034834"],
  ["buque-41", "maiafloresfw", "7378705498331532549"],
  ["buque-42", "laboite_afleurs", "7073848979473190150"],
  ["buque-43", "rodi_gift_tr", "7575200654449315092"],
  ["buque-44", "serene_bouquet", "7281646852007742726"],
  ["buque-45", "miss_aisyah92", "7009638219218210050"],
  ["buque-46", "loves.acs", "7414953601296076039"],
  ["buque-47", "luxe_florals", "7468052571412843781"],
  ["buque-48", "kellysflowersstore", "7195360808400964869"],
  ["buque-49", "golden_events4", "7413049098456091910"],
  ["buque-50", "bellas.rosas", "7378194754539900190"],
  ["buque-51", "dadivaemflor", "7640570460240874772"],
  ["buque-52", "dadivapresente", "7638013892408380693"],
  ["buque-53", "bucketsnackcimahi", "7471125437930802440"],
  ["buque-54", "cainne_lima", "7521404558103350533"],
  ["buque-55", "bouquetlab.my", "7129063732637977882"],
  ["buque-56", "tachovendodoce", "7226498576883485957"],
  ["buque-57", "lkcestass", "7497242400281201925"],
  ["buque-58", "angelsfloresfloricultura", "7311666426140511493"],
  ["buque-59", "29emflor", "7618373796373744916"],
  ["buque-60", "craft.by.maryam", "7535072591304822024"],
  ["buque-61", "confesserie", "7300935155366038790"],
  ["buque-62", "thy62142", "7512208481479314694"],
  ["buque-63", "dulcebuquee", "7206796205790137605"],
  ["buque-64", "atelie.natalia.ma", "7503657868583881990"],
  ["buque-65", "kb.blossom", "7271255192950050053"],
  ["buque-66", "ml.blooms", "7558090724357459208"],
  ["buque-67", "amoreartebuques", "7295018532901801221"],
  ["buque-68", "chocokaw_", "7228358996577520902"],
  ["buque-69", "jessydamacedo", "7240274935757688070"],
  ["buque-70", "natagifts", "7535712325635001622"],
  ["buque-71", "yasminartdrawing", "6922593889626983685"],
  ["buque-72", "dhynabernardo", "7329578850709458181", "photo"],
  ["buque-73", "cesta_spremium", "7652530681637014805", "photo"],
  ["buque-74", "rosas_eternas_sp1", "7607507718055693588", "photo"],
  ["buque-75", "serene_bouquet", "7329002388574964997", "photo"],
];

const accents = ["#FCE7F3", "#FFE4E6", "#FDF2F8", "#FFF1F2", "#FCE7F3"];

export const flowerVideos: FlowerVideo[] = sources.map(([id, creator, postId, postType = "video"], index) => {
  const videoUrl = `https://www.tiktok.com/@${creator}/${postType}/${postId}`;

  return {
    id,
    title: `Inspiração de Buquê #${index + 1}`,
    description: "Uma ideia para montar, divulgar e vender mais.",
    videoUrl,
    embedUrl: `https://www.tiktok.com/player/v1/${postId}?controls=1&loop=1&rel=0`,
    accent: accents[index % accents.length],
  };
});

export function getFlowerVideo(id: string) {
  return flowerVideos.find((video) => video.id === id);
}
