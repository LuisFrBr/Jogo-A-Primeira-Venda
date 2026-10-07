/* Roteiro do jogo. Cada passo pode ter:
   fundo   - cenário (nome do arquivo em assets/bg, sem .png)
   esq/dir - personagem em cada lado (nome do arquivo em assets/personagens, sem .png; null tira o personagem)
   quem    - nome de quem fala (vazio para ações e transições)
   texto   - a fala
   estilo  - 'narracao' ou 'acao' (opcional)
   escolhas - lista de opções: { texto, saldo, resultado: [passos] } */

const FIM_CENA_1 = [
  { estilo: 'acao', texto: 'No sábado de manhã, com a lista na mão, Eduardo vai ao mercadinho do Seu Zé...' },
  { estilo: 'acao', texto: 'Fim da cena 1. A cena 2 chega no próximo passo.' },
];

const CENAS = {
  cena1: {
    passos: [
      { fundo: 'bg_cozinha', esq: 'eduardo_envergonhado', dir: null, quem: 'Eduardo', estilo: 'narracao',
        texto: 'Oi, eu sou o Eduardo e tenho 16 anos. Até algumas semanas atrás, minha maior preocupação era a prova de matemática.' },
      { quem: 'Eduardo', estilo: 'narracao',
        texto: 'Aí o Thiago, meu melhor amigo, se mudou pra outra cidade. Agora a gente só se vê por vídeo.' },
      { quem: 'Eduardo', estilo: 'narracao',
        texto: 'Mas a gente tem uma promessa: jogar GTA 6 juntos, no dia do lançamento. O problema é que meu videogame velho morreu, e o PS5 custa R$ 3.500.' },
      { quem: 'Eduardo', estilo: 'narracao',
        texto: 'Eu tenho R$ 300 nesse potinho. E uma ideia... meio queimada.' },

      { dir: 'claudia_cansada', estilo: 'acao', texto: '(A porta abre. Entra Cláudia.)' },
      { quem: 'Cláudia', texto: 'Edu? Ainda acordado? Que cheiro é esse... queimado?' },
      { quem: 'Eduardo', texto: 'É um brigadeiro. Quer dizer... era.' },
      { dir: 'claudia_rindo', quem: 'Cláudia', texto: '(rindo) Era. E por que você resolveu virar confeiteiro?' },
      { esq: 'eduardo_determinado', quem: 'Eduardo', texto: 'Mãe, eu quero comprar o PS5. Mas sozinho. Vou vender brigadeiro.' },
      { dir: 'claudia_cansada', quem: 'Eduardo', estilo: 'narracao',
        texto: 'Sei que você trabalha em dois turnos e que essas contas não se pagam sozinhas. Por isso eu não vou pedir nada.' },
      { dir: 'claudia_emocionada', quem: 'Cláudia',
        texto: 'Esse seu orgulho me deixa feliz... e preocupada. A escola vem primeiro, não esquece disso tá?' },
      { quem: 'Eduardo', texto: 'Combinado.' },
      { estilo: 'acao', texto: '(Ela pega o caderno antigo da mesa.)' },
      { quem: 'Cláudia',
        texto: 'Essa receita era da vovó Lúcia. Quando eu era criança, ela vendia doce pra ajudar em casa. E ela dizia que doce bom começa na hora de escolher o que vai na panela.' },
      { dir: 'claudia_cansada', quem: 'Cláudia', texto: 'Então me diz, Edu: com o que você vai fazer?' },

      { escolhas: [
        { texto: 'Chocolate bom e leite condensado de marca. Se é pra fazer, que seja o melhor.', saldo: 300,
          resultado: [
            { dir: 'claudia_emocionada', quem: 'Cláudia', texto: 'A vovó diria que doce bom se vende sozinho.' },
            { estilo: 'acao', texto: 'No dia seguinte, Cláudia leva uma caixinha para o trabalho. As colegas adoram e fazem encomendas.' },
            { quem: 'Eduardo', texto: 'Minha primeira encomenda, e eu nem saí de casa!' },
            ...FIM_CENA_1,
          ] },
        { texto: 'Marcas normais, com bom custo-benefício.', saldo: 200,
          resultado: [
            { quem: 'Cláudia', texto: 'Equilibrado. Gostei.' },
            { estilo: 'acao', texto: 'Ficou bom, e as colegas pedem uma caixinha ou outra.' },
            ...FIM_CENA_1,
          ] },
        { texto: 'O mais barato que tiver.', saldo: 0,
          resultado: [
            { quem: 'Cláudia', texto: 'Economizar é bom, Edu... só não deixa o sabor pagar a conta.' },
            { estilo: 'acao', texto: 'Os doces ficam sem graça. As colegas agradecem educadamente, mas ninguém encomenda.' },
            { quem: 'Eduardo', texto: 'Ok. Aprendi uma coisa.' },
            ...FIM_CENA_1,
          ] },
      ] },
    ],
  },
};