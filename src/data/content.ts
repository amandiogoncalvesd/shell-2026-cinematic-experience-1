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
      "Ruth conheceu Shelcia na 6ª classe, no Colégio Vladimir Edson. Em agosto de 2024, numa festa do pijama em casa de Shelcia, por volta das 22h, decidiram aquecer uma pizza congelada. A pizza queimou por baixo, ficou amarga e era muito cara para o tamanho — mesmo assim, comeram tudo e riram a noite inteira. A própria Ruth diz: é difícil escolher uma memória, mas essa é uma das melhores.",
    letter:
      "Quero que saibas o quanto sou grata a Deus por ter colocado-te na minha vida. És um presente, uma bênção que eu jamais poderia ter pedido, mas que Ele, na Sua infinita bondade, decidiu dar-me. Passamos por tantas coisas juntas — momentos bons, desafios, risos e lágrimas. Mas, apesar de tudo, nunca deixamos nada nos abalar. E espero, do fundo do coração, que nada nos afaste. Porém, se um dia a vida nos levar por caminhos diferentes, quero que saibas que és e sempre serás a minha melhor amiga. Nenhuma distância, nenhuma mudança, nada no mundo faria com que essa definição pertencesse a outra pessoa. A nossa amizade é única, e eu amo-te imensamente. Obrigada por seres quem és e por fazeres parte da minha vida.",
  },
  {
    name: "Miguel",
    role: "Amigo próximo",
    since: "Círculo de amizades da Shelcia",
    story: "Um dos amigos mais próximos da Shelcia — presença constante no círculo de quem ela confia.",
    letter: "",
  },
  {
    name: "José",
    role: "Amigo próximo",
    since: "Círculo de amizades da Shelcia",
    story: "Outro dos amigos queridos que fazem parte da história da Shelcia.",
    letter: "",
  },
];

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
    text: "Antes das câmaras profissionais, antes das cerimónias — havia uma menina curiosa, olhando o mundo com olhos grandes e um coração pensativo. Das primeiras memórias guardadas em imagem até aos primeiros dias na escola, conta-se aqui o início de tudo.",
  },
  {
    id: "amizade",
    title: "Amizade & Ruth",
    subtitle: "Bestas para sempre",
    text: "Uma amizade nascida na 6ª classe, no Colégio Vladimir Edson, que atravessou anos, festas do pijama, pizzas queimadas e risos intermináveis. Ruth: a única que conhece, entende, apoia — e nunca decepcionou.",
  },
  {
    id: "familia",
    title: "Família",
    subtitle: "As raízes",
    text: "Entre abraços, celebrações e momentos emocionais com os irmãos, a família de Shelcia é o alicerce sobre o qual ela constrói tudo o resto — como uma futura arquiteta que aprendeu, desde cedo, o valor de fundações fortes.",
  },
  {
    id: "escola",
    title: "Escola & Amigos",
    subtitle: "Capítulos de crescimento",
    text: "Salas de aula, corredores, os Capítulos de 2023 e o aniversário de 15 anos — retratos de uma jovem em constante descoberta de si mesma, rodeada de amigos que se tornaram família.",
  },
  {
    id: "magia",
    title: "Toque de Magia",
    subtitle: "Arte, luz e transformação",
    text: "Cada fotografia editada é uma pequena obra de arte — um retrato entre o real e o fantástico, entre a menina e a mulher em que Shelcia se está a tornar.",
  },
  {
    id: "celebracao",
    title: "Celebração 2026",
    subtitle: "18 anos, um novo capítulo",
    text: "A Cinderela cresceu. Não é o fim de um conto de fadas — é o início de um novo capítulo, escrito com a mesma leveza, mas com passos mais firmes rumo ao futuro.",
  },
];

export const dreamChapters = [
  { id: "dream", title: "THE DREAM", pt: "O Sonho", text: "Alguns sonhos começam como um desenho." },
  { id: "architect", title: "THE ARCHITECT", pt: "A Arquiteta", text: "Construir espaços é também construir sentido." },
  { id: "blueprint", title: "THE BLUEPRINT", pt: "O Projeto", text: "Toda grande construção começa numa simples linha." },
  { id: "structure", title: "THE STRUCTURE", pt: "A Construção", text: "Camada sobre camada, a vida ganha forma." },
  { id: "future", title: "THE FUTURE", pt: "O Futuro", text: "Uma linda família, uma vida bem desenhada." },
];

export const essenceWords = [
  "INTELIGÊNCIA", "PENSAMENTO", "CRIATIVIDADE", "ARTE", "MÚSICA", "NATUREZA",
  "ASTRONOMIA", "FILOSOFIA", "MITOLOGIA", "FANTASIA", "AMIZADE", "AMOR",
  "MEMÓRIAS", "SONHOS", "FUTURO",
];

export const skyText = {
  title: "O Céu Que Guarda o Que Ela Sente",
  subtitle: "WHEN SHE LOOKS AT THE SKY",
  text: "“Só tiro fotos do céu quando estou verdadeiramente feliz ou triste.” Por isso, cada nuvem, cada cor de entardecer aqui guardada, é uma emoção — uma linguagem silenciosa entre ela e o infinito.",
};

export const natureText = {
  title: "Onde a Alma Dela Respira",
  subtitle: "A NATUREZA ENCANTADA",
  text: "A praia ao pôr do sol, os bosques, as flores — qualquer paisagem natural encanta a Shelcia. Este jardim vivo reúne o olhar dela sobre o mundo: 71 fragmentos de natureza que nunca ficam parados, tal como ela.",
};

export const guestMessages = [
  {
    name: "Ruth A. B. Pereira",
    text: "Obrigada, Deus, por teres colocado a Shelcia na minha vida. Ela é um presente, uma bênção. Para sempre a minha melhor amiga.",
  },
  {
    name: "Família Van-Dúnem",
    text: "Vimos-te crescer com os olhos cheios de sonhos e o coração cheio de bondade. Hoje celebramos a mulher em que te tornaste.",
  },
  {
    name: "Amigos de sempre",
    text: "18 anos de risadas, memórias e momentos que vamos guardar para sempre. Feliz vida, Shelcia!",
  },
];
