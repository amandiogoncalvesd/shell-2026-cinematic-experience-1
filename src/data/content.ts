// SHELL 2026 — Conteúdo narrativo, identidade e cápsulas emocionais.
// Baseado nas respostas reais da Shelcia e da Ruth.

export const identity = {
  fullName: "Shelcia Fernanda Neves Van-Dúnem",
  birthday: "10 de Agosto",
  age: 18,
  words: ["Inteligente", "Pensativa", "Diletante"],
  favoriteColor: "Azul-claro",
  favoriteFlower: "Rosa",
  favoriteFoods: ["Batata frita", "Chocolate"],
  favoritePrincess: "Cinderela",
  identifiesWith: "Anna, de Frozen",
  loves: "Apaixonada pelas princesas Disney e pelas declarações de amor de Bridgerton",
  favoritePlaces: ["Praia ao pôr do sol", "Bosques", "Qualquer paisagem natural"],
  verse: {
    text: "O ódio excita contendas, mas o amor cobre todas as transgressões.",
    ref: "Provérbios 10:12",
  },
  dreams: ["Tornar-se uma arquiteta bem-sucedida", "Construir uma linda família"],
  skyNote: "Só tiro fotos do céu quando estou verdadeiramente feliz ou triste.",
  hobbies: [
    "Ler", "Escrever poesias", "Criar presentes à mão", "Fazer doces",
    "Fazer sobremesas", "Desenhar", "Pintar", "Tocar flauta",
    "Estudar astronomia", "Estudar filosofia", "Estudar mitologia grega",
  ],
  universes: [
    { id: "reader", title: "The Reader", subtitle: "A Leitora" },
    { id: "poet", title: "The Poet", subtitle: "A Poetisa" },
    { id: "artist", title: "The Artist", subtitle: "A Artista" },
    { id: "maker", title: "The Maker", subtitle: "A Criadora" },
    { id: "musician", title: "The Musician", subtitle: "A Musicista" },
    { id: "philosopher", title: "The Philosopher", subtitle: "A Filósofa" },
    { id: "astronomer", title: "The Astronomer", subtitle: "A Astrônoma" },
    { id: "mythologist", title: "The Mythologist", subtitle: "A Mitóloga" },
  ],
};

// A paleta oficial enviada pela própria Shelcia — o azul claro é a cor principal.
export const shelciaPalette = [
  { name: "Azul Céu Claro", hex: "#87C3E3", main: true },
  { name: "Azul Serenidade", hex: "#5A75C2" },
  { name: "Azul Noite Sonhadora", hex: "#3E4E90" },
  { name: "Lavanda Suave", hex: "#D9B8E3" },
  { name: "Roxo Violeta Suave", hex: "#9F7CA9" },
  { name: "Rosa Pétala", hex: "#DA8BA0" },
];

export const friends = [
  {
    name: "Ruth Antónia Bongue Pereira",
    role: "Melhor amiga",
    since: "6ª classe, Colégio Vladimir Edson",
    story:
      "Em agosto de 2024, numa festa do pijama em casa da Shelcia, por volta das 22h, tiveram a brilhante ideia de aquecer uma pizza congelada. A pizza queimou por baixo, ficou amarga e era muito cara para o tamanho — mesmo assim, comeram tudo e riram a noite inteira. Nas palavras da própria Ruth: é difícil escolher uma memória, mas essa é uma das melhores.",
    letter:
      "Quero que saibas o quanto sou grata a Deus por ter colocado-te na minha vida. És um presente, uma bênção que eu jamais poderia ter pedido, mas que Ele, na Sua infinita bondade, decidiu dar-me. Passamos por tantas coisas juntas — momentos bons, desafios, risos e lágrimas. Mas, apesar de tudo, nunca deixamos nada nos abalar. E espero, do fundo do coração, que nada nos afaste. Porém, se um dia a vida nos levar por caminhos diferentes, quero que saibas que és e sempre serás a minha melhor amiga. Nenhuma distância, nenhuma mudança, nada no mundo faria com que essa definição pertencesse a outra pessoa. A nossa amizade é única, e eu amo-te imensamente. Obrigada por seres quem és e por fazeres parte da minha vida.",
  },
];

// O círculo próximo — nomes reais, ditos pela própria Shelcia.
export const closeFriends = ["Ruth", "Miguel", "José"];

// A carta original da mãe.
export const momLetter = {
  from: "A Mãe",
  text: "Minha primogênita, minha princesa, hoje completas os teus 18 anos. Seja bem-vinda à idade adulta. Desejo tudo de bom para ti — que nessa nova caminhada seja com muita alegria, saúde, sabedoria e Deus sempre em primeiro lugar. Continue sempre a ser essa pessoa especial, linda por dentro e por fora, mana dos teus manos, filha responsável e muito madura. Deus te ilumine sempre. Te amo infinitamente. Feliz Aniversário.",
};

export const playlist = [
  { title: "Perfect", artist: "Ed Sheeran & Beyoncé", note: "A música preferida." },
  { title: "Golden Hour", artist: "JVKE", note: "Também gosta muito — inclusive da melodia." },
  { title: "Wicked Game", artist: "Chris Isaak", note: "“Amo a música, parece que me teletransporta.”" },
  { title: "Experience", artist: "Ludovico Einaudi", note: "A melodia favorita." },
  { title: "Interstellar", artist: "Hans Zimmer" },
  { title: "Solas", artist: "Ólafur Arnalds" },
];

export const instruments = ["Piano", "Violino", "Guitarra", "Harpa", "Flauta"];
export const musicStyles = ["Pop", "Gospel", "Trap Gospel", "Clássica", "Instrumental"];

export const chapters = [
  {
    id: "infancia",
    title: "A Infância",
    subtitle: "Onde tudo começou",
    text: "As primeiras memórias — antes das câmaras e das cerimónias, uma menina de olhos grandes a descobrir o mundo.",
  },
  {
    id: "amizade",
    title: "Shelcia & Ruth",
    subtitle: "Bestas para sempre",
    text: "Uma amizade nascida na 6ª classe, no Colégio Vladimir Edson, que atravessa anos, festas do pijama, pizzas queimadas e risos intermináveis.",
  },
  {
    id: "familia",
    title: "Família",
    subtitle: "As raízes",
    text: "Abraços, celebrações, momentos com os irmãos — o alicerce sobre o qual tudo é construído.",
  },
  {
    id: "escola",
    title: "Escola",
    subtitle: "Capítulos de crescimento",
    text: "Os Capítulos de 2023, o aniversário de 15 anos e os bastidores de uma jovem em constante descoberta.",
  },
  {
    id: "magia",
    title: "Toque de Magia",
    subtitle: "Arte, luz e transformação",
    text: "Retratos entre o real e o fantástico — entre a menina e a mulher em que Shelcia se está a tornar.",
  },
  {
    id: "celebracao",
    title: "18 Anos",
    subtitle: "A Cinderela cresceu",
    text: "Não é o fim de um conto de fadas — é o início de um novo capítulo.",
  },
];

export const dreamChapters = [
  { id: "dream", title: "THE DREAM", pt: "O Sonho" },
  { id: "architect", title: "THE ARCHITECT", pt: "A Arquiteta" },
  { id: "blueprint", title: "THE BLUEPRINT", pt: "O Projeto" },
  { id: "structure", title: "THE STRUCTURE", pt: "A Construção" },
  { id: "future", title: "THE FUTURE", pt: "O Futuro" },
];

export const essenceWords = [
  "INTELIGÊNCIA", "PENSAMENTO", "CRIATIVIDADE", "ARTE", "MÚSICA", "NATUREZA",
  "ASTRONOMIA", "FILOSOFIA", "MITOLOGIA", "FANTASIA", "AMIZADE", "AMOR",
  "MEMÓRIAS", "SONHOS", "FUTURO",
];

export const skyText = {
  title: "O Céu",
  subtitle: "WHEN SHE LOOKS AT THE SKY",
  text: "“Só tiro fotos do céu quando estou verdadeiramente feliz ou triste.”",
};

export const natureText = {
  title: "A Natureza",
  subtitle: "BOSQUES · PÔR DO SOL · FLORES",
};

// A carta original — escrita pelo próprio Amândio, palavra por palavra.
export const amandioLetter = {
  from: "Amândio Gonçalves",
  paragraphs: [
    "Olá, princesinha Shell.",
    "Neste dia tão especial, gostaria, primeiramente, de pedir ao Papai do Céu que continue cuidando de você e não permita que você deixe de ser essa menina inteligente, meiga, simpática, amorosa e, por mais incrível que pareça, extremamente, ridiculamente e absurdamente atraente. Não mais que a minha namorada, mas acho que uns 9,9/10.",
    "Só por segurança, caso ela mexa no meu computador sem querer. Não quero estragar a minha relação. 😂",
    "E, bom, continuando: você é uma garota muito especial para mim e, em nenhum plano do universo, eu deixaria de ser seu amigo. Repetindo: em nenhum plano do universo.",
    "Agora vamos entrar na parte das confissões. Começando.",
    "Quando eu conheci você, em 2023, confesso que eu quase me apaixonei. Tipo, quase. Só um pouquinho. Assim. Mas isso não aconteceu.",
    "Mesmo assim, de qualquer forma, eu acho você muito elegante, atraente, linda e incrível. E, sendo sincero, eu preferia ter você como minha amiga para todo... todo sempre.",
    "Além disso, eu acredito que você foi uma das minhas melhores motivações que já existiram.",
    "Bom, só no lado das garotas.",
    "Porque, quando eu conheci você, eu pensei mais ou menos o seguinte:",
    "“Não é possível existir uma garota tão perfeita assim. Ela deve ter algum defeito.”",
    "Então, fui logo correndo ver sua pauta. Mas daí eu pensei:",
    "“Poxa, afinal de contas, não sou o mais inteligente dessa escola.”",
    "Sem querer exagerar mais, a sua pauta estava brilhando de azul.",
    "E, desde aí, eu tive um novo foco: me tornar o melhor dos melhores daquela escola.",
    "Logo depois, quando você se foi, eu perguntei ao ChatGPT (eu já conhecia o GPT desde 2021) o seguinte:",
    "“ChatGPT, eu conheci uma garota chamada Shelcia Fernanda Neves Van-Dúnem, blá-blá-blá, e quero que você me dê uma ideia de um presente que mais ninguém poderia oferecer para ela. Algo único, original e autêntico.”",
    "E ele me sugeriu várias opções. Uma delas foi criar um website para você, algo que mais ninguém daria.",
    "Mas, naquela época, eu não sabia nada, absolutamente nada, de programação. E o meu plano nem sequer era fazer informática.",
    "Naquela época, eu iria seguir eletrônica, ser engenheiro elétrico, fazer instalação de casas, empresas, mobílias e o resto.",
    "Mas daí eu peguei a visão e falei:",
    "“ChatGPT, ok, está fixe. Criar um website, cria você.”",
    "Mas o ChatGPT respondeu:",
    "“Infelizmente, sou um assistente de chat. Não posso, nem consigo, criar um site. Para criar um site, tens que aprender HTML, CSS, JavaScript...”",
    "Blá-blá-blá, blá-blá-blá.",
    "Eu me vi assim:",
    "“Ya 🤦‍♂️.”",
    "Depois disso, eu pensei:",
    "“Ok, já que é assim, vamos aprender HTML.”",
    "Entrei no YouTube, pesquisei vários vídeos e vídeos e vídeos sobre HTML, introdução, criação de sites. Estudei, estudei, estudei durante uma semana completa.",
    "Uma semana depois, consegui criar algumas tags básicas em HTML. Já conseguia criar, tipo, uma página em branco que dizia:",
    "“Olá, mundo.”",
    "Depois disso, fui continuando: escrevendo, escrevendo, escrevendo, estudando bastante.",
    "Acho que não fez um mês.",
    "Em menos de um mês, já estava a pegar a visão.",
    "Infelizmente, naquela época, o ChatGPT não tinha o poder computacional que tem agora. Não conseguiu ajudar muito nisso, mas eu me dediquei, e o bom de tudo foi que eu havia encontrado um site chamado DigiMedia.",
    "Nesse site, eles disponibilizavam vários e vários templates de aplicativos.",
    "O Projeto Shell de 2023 eu criei à base de um template que foi criado para uma empresa de lavanderia.",
    "Mas, como o design era rosa e branco, eu peguei o código, adaptei, mudei algumas coisas, e foi uma experiência incrível.",
    "Desde aquele momento, eu comecei a estudar, estudar, estudar, estudar, estudar, me apaixonei pela programação e estamos aqui.",
    "O grande Amândio Gonçalves, o técnico de informática da família.",
    "Tudo graças a você Princesin. 🎂🌹",
  ],
};
