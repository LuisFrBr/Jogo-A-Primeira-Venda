/* Cenas 2 a 10, finais e lições. Carregue DEPOIS de cenas.js. */

const N = (texto, o) => ({ quem: 'Eduardo', estilo: 'narracao', texto, ...o }); /* narração do Eduardo */
const E = (texto, o) => ({ quem: 'Eduardo', texto, ...o });                      /* fala do Eduardo */
const F = (quem, texto, o) => ({ quem, texto, ...o });                           /* fala de outro personagem */
const A = (texto, o) => ({ estilo: 'acao', texto, ...o });                       /* ação ou transição */

Object.assign(CENAS, {

  /* ---------- Cena 2: o mercadinho do Seu Zé ---------- */
  cena2: { proxima: 'cena3', passos: [
    N('Sábado de manhã. Lista na mão, potinho debaixo do braço e o coração batendo mais rápido do que deveria.', { fundo: 'bg_mercadinho', esq: 'eduardo_nervoso', dir: null }),
    N('O plano é simples: leite condensado, chocolate e manteiga. O difícil é fazer isso sem gastar tudo o que eu tenho.'),
    A('(Eduardo entra. Seu Zé levanta os olhos do jornal.)', { dir: 'seuze_serio', dirClasse: 'atras-balcao' }),
    F('Seu Zé', 'Eduardo? O filho da Cláudia? Vai levar o mercado inteiro hoje?'),
    E('Bom dia, Seu Zé. É que... eu vou fazer brigadeiro pra vender.'),
    F('Seu Zé', '(cruzando os braços) Vender. Hum. E você já fez a conta de quanto vai gastar e de quanto vai ganhar?'),
    N('Não tinha feito. Mas resolvi fingir que sim.'),
    E('Mais ou menos...'),
    F('Seu Zé', 'Mais ou menos não paga conta, garoto. Me dá essa lista.'),
    A('(Seu Zé lê, coça o bigode e soma tudo na calculadora.)'),
    F('Seu Zé', 'Dá R$ 90 certinho. E agora, como vai ser?'),
    { escolhas: [
      { texto: 'Contar o plano pro Seu Zé e pedir um desconto.', saldo: 250, resultado: [
        A('Seu Zé fica em silêncio e olha para a foto antiga do bairro na parede.', { dir: 'seuze_surpreso' }),
        F('Seu Zé', 'Sua avó me vendia brigadeiro quando eu era moleque. O melhor da rua.', { dir: 'seuze_sorrindo' }),
        A('Ele dá um desconto, coloca um granulado de brinde e ainda compra a primeira caixinha.'),
        N('Eu entrei pra comprar e saí com um cliente.', { esq: 'eduardo_animado' }) ] },
      { texto: 'Pagar o preço normal e levar só o necessário.', saldo: 100, resultado: [
        F('Seu Zé', 'Bom comércio, garoto.'),
        A('Eduardo leva o que precisa e faz as primeiras caixinhas para os vizinhos.'),
        N('Nada demais, mas tudo certo.') ] },
      { texto: 'Levar bastante e pagar depois, no fiado.', saldo: -50, resultado: [
        F('Seu Zé', 'Tem certeza? O que sobra, estraga.'),
        A('Eduardo, empolgado, leva o triplo. Em casa, parte dos ingredientes estraga antes de ele usar, e o fiado ainda precisa ser pago.'),
        E('Ok. Mais nem sempre é melhor.', { esq: 'eduardo_envergonhado' }) ] },
    ] },
    A('Ingredientes na mochila, Eduardo corre para casa. Na segunda-feira, no intervalo da escola, as vendas começam de verdade...'),
  ] },

  /* ---------- Cena 3: o primeiro intervalo ---------- */
  cena3: { proxima: 'cena4', passos: [
    N('Segunda-feira. Na mochila: doze caixinhas de brigadeiro, um coração disparado e nenhuma ideia de como começar.', { fundo: 'bg_patio', esq: 'eduardo_nervoso', dir: null }),
    N('O Seu Zé tinha razão: mais ou menos não paga conta. Eu precisava de um plano.'),
    A('(Ao longe, a coordenadora Sílvia atravessa o pátio com a prancheta.)', { dir: 'silvia_seria' }),
    E('Se eu abrir a mochila aqui, ou vendo tudo... ou sou parado.'),
    N('O intervalo estava no auge. Todo mundo com fome. Eu tinha o produto. Faltava decidir como entrar nessa.'),
    { escolhas: [
      { texto: 'Falar com a coordenadora Sílvia e pedir autorização.', saldo: 550, resultado: [
        F('Sílvia', 'Eduardo? Você nunca vem aqui por vontade própria. O que aconteceu?', { fundo: 'bg_coordenacao' }),
        E('Quero vender brigadeiro no intervalo. Mas só se a senhora deixar.'),
        F('Sílvia', 'Muita gente chega aqui pedindo desculpa. Poucos chegam pedindo licença.', { dir: 'silvia_sorrindo' }),
        A('Ela autoriza a venda perto da cantina e pede uma caixinha para ela. No intervalo, forma-se uma fila e tudo acaba em vinte minutos.'),
        N('Pedi autorização e ainda ganhei uma cliente fiel.', { esq: 'eduardo_animado' }) ] },
      { texto: 'Dar amostras grátis aos colegas e anotar encomendas.', saldo: 400, resultado: [
        N('Se ninguém conhece meu brigadeiro, ninguém compra. Então comecei dando de graça.', { dir: null }),
        A('Os colegas provam, ficam em silêncio e começam a pedir.'),
        F('Colega', 'Cara, isso é muito bom! Faz uma caixinha pra mim amanhã?'),
        A('Em vinte minutos, a lista tem doze nomes, mas o caixa do dia foi pequeno.'),
        N('Vendi pouco hoje. Mas amanhã tem fila.') ] },
      { texto: 'Vender escondido atrás do bloco das salas.', saldo: 50, resultado: [
        N('Se eu pedir, ela pode dizer não. Melhor não perguntar.', { dir: null }),
        A('Ele vende duas caixinhas rápidas, até uma sombra aparecer.'),
        F('Sílvia', 'Eduardo. Mochila. Agora.', { dir: 'silvia_seria' }),
        E('Eu... posso explicar.', { esq: 'eduardo_envergonhado' }),
        F('Sílvia', 'Venda escondida na escola não pode. O que não vendeu volta pra casa, e amanhã a gente conversa.'),
        N('Se eu tivesse perguntado, teria sido tão mais fácil.') ] },
    ] },
    A('Na saída do intervalo, uma colega de sala com um caderno de desenhos observava Eduardo de longe, e anotava alguma coisa...'),
  ] },

  /* ---------- Cena 4: a caixinha sem nome ---------- */
  cena4: { proxima: 'cena5', passos: [
    N('No corredor, entre uma aula e outra, alguém me puxou pela manga da camiseta.', { fundo: 'bg_corredor', esq: 'eduardo_nervoso', dir: null }),
    A('(Júlia aparece com o caderno de desenhos debaixo do braço.)', { dir: 'julia_curiosa' }),
    F('Júlia', 'Você é o Eduardo, do brigadeiro, né? Eu vi você no intervalo.'),
    E('Eu... tentei vender. Mais ou menos.'),
    F('Júlia', '(abrindo o caderno) Eu desenho. E olha o que eu anotei: a sua caixinha parece de remédio.'),
    N('Passei a noite fazendo brigadeiro. Ninguém tinha me avisado que a caixinha era o problema.'),
    E('É só uma caixinha branca...'),
    F('Júlia', 'Pois é. O brigadeiro é bom, mas ninguém sabe que é seu. Eu faço uma etiqueta e te ajudo a divulgar nos stories. Só quero meu nome na etiqueta e um brigadeiro por semana.', { dir: 'julia_animada' }),
    N('Eu nunca pedi ajuda pra ninguém. Pedir sempre me pareceu um jeito de perder.'),
    F('Júlia', 'Então, como vai ser?'),
    { escolhas: [
      { texto: 'Aceitar a ajuda da Júlia.', saldo: 550, resultado: [
        F('Júlia', 'Combinado! Amanhã você vai ficar surpreso.'),
        A('Naquela noite ela desenha uma etiqueta com uma panelinha sorridente e posta nos stories. No dia seguinte, o celular do Eduardo não para de vibrar.'),
        N('Entrei no corredor com uma caixinha sem nome e saí com uma aliada criativa.', { esq: 'eduardo_animado' }) ] },
      { texto: 'Divulgar sozinho no WhatsApp.', saldo: 350, resultado: [
        F('Júlia', 'Tudo bem. Se mudar de ideia, a oferta fica de pé.'),
        A('Eduardo manda mensagem nos grupos da turma e da família, e alguns respondem na hora.'),
        N('Funcionou mais ou menos. E a caixinha continuou parecendo de remédio.') ] },
      { texto: 'Não divulgar, só vender para quem passar.', saldo: 100, resultado: [
        A('Júlia dá de ombros: "Quem sabe numa outra hora."'),
        A('Eduardo vende para quem passa pelo corredor, mas quase ninguém passa.'),
        N('Quem passava comprava. O problema é que quase ninguém passava.') ] },
    ] },
    A('No sábado, com um sol de rachar, Eduardo segue para a praça com as caixinhas na mochila...'),
  ] },

  /* ---------- Cena 5: um sol de rachar ---------- */
  cena5: { proxima: 'cena6', passos: [
    N('Sábado, meio-dia. Trinta e oito graus na praça. O sol derretia até a sombra.', { fundo: 'bg_praca', esq: 'eduardo_animado', dir: null }),
    N('Eu tinha vinte caixinhas na mochila e um inimigo que nenhuma receita da vovó previa: o calor.'),
    A('(Eduardo abre uma caixinha. O brigadeiro está mole, quase escorrendo.)', { esq: 'eduardo_nervoso' }),
    E('Não, não, não... esse aqui desistiu antes de mim.'),
    F('Cliente (voz)', 'Moço, o brigadeiro tá meio molinho. É assim mesmo?'),
    N('Hora de decidir antes que o último brigadeiro virasse brigadeiro de colher.'),
    { escolhas: [
      { texto: 'Pedir gelo na banca de picolé e montar uma caixa térmica ali mesmo.', saldo: 550, resultado: [
        F('Moço do picolé (voz)', 'Gelo? Pra molhar brigadeiro?'),
        E('Pra salvar ele!', { esq: 'eduardo_determinado' }),
        A('Ele monta uma caixa de isopor com gelo e os brigadeiros voltam a ficar firmes.'),
        F('Cliente (voz)', 'Brigadeiro geladinho, nesse calor? Me vê três!'),
        N('Problema bem resolvido vira vantagem: o brigadeiro gelado virou meu diferencial.', { esq: 'eduardo_animado' }) ] },
      { texto: 'Vender assim mesmo, antes que derreta de vez.', saldo: 350, resultado: [
        A('Alguns clientes torcem o nariz, outros compram mesmo mole, e várias caixinhas voltam para a mochila meladas.'),
        N('Vendi, mas deixei muito brigadeiro derretido pelo caminho.') ] },
      { texto: 'Voltar para casa e tentar outro dia.', saldo: 50, resultado: [
        A('Eduardo guarda as caixinhas na geladeira e passa a tarde olhando o relógio. Só consegue vender para dois vizinhos.', { fundo: 'bg_cozinha' }),
        N('Fugir do problema não paga conta.', { esq: 'eduardo_envergonhado' }) ] },
    ] },
    A('Na terça-feira, no intervalo, Eduardo percebe uma fila diferente no pátio, e não era a dele...'),
  ] },

  /* ---------- Cena 6: o rival do pátio ---------- */
  cena6: { proxima: 'cena7', passos: [
    N('Terça-feira. No pátio, uma fila que não era minha: um garoto do terceiro ano vendia trufa, e vendia bem.', { fundo: 'bg_patio', esq: 'eduardo_nervoso', dir: 'rick_desafiador' }),
    F('Rick', 'Então você é o menino do brigadeiro. Rick. Parece que a gente vende a mesma coisa, só que a minha trufa é R$ 3 e o seu brigadeiro é R$ 4.'),
    E('O meu é feito com receita da família.', { esq: 'eduardo_determinado' }),
    F('Rick', '(rindo) E o meu é feito com vontade de ir pra Florianópolis com o time de futsal. Cada um tem seus motivos, né?', { dir: 'rick_rindo' }),
    N('Eu nunca tinha pensado que alguém ia disputar a mesma fila que eu. Mas ele também estava juntando dinheiro pra alguma coisa.'),
    F('Rick', 'A fila é grande, mas não dá pra todo mundo. Como vai ser?', { dir: 'rick_desafiador' }),
    { escolhas: [
      { texto: 'Propor uma parceria.', saldo: 600, resultado: [
        F('Rick', 'Você é o primeiro que me propõe isso em vez de brigar.', { dir: 'rick_surpreso' }),
        A('Eles criam um combo: um brigadeiro e uma trufa por R$ 6. A fila dobra.', { dir: 'rick_rindo' }),
        N('Meu concorrente virou meu parceiro de combo.', { esq: 'eduardo_animado' }) ] },
      { texto: 'Baixar o preço para competir.', saldo: 450, resultado: [
        A('Eduardo passa a cobrar R$ 3. Vende mais, mas lucra menos por caixinha, e o Rick baixa também.'),
        N('Quando todo mundo baixa o preço, só o cliente ganha.') ] },
      { texto: 'Provocar o Rick nas redes.', saldo: 0, resultado: [
        A('Eduardo posta uma indireta. Rick vê, e a discussão chega ao pátio. Alguns clientes se afastam e a coordenadora Sílvia fica de olho.'),
        N('Briga de pátio não vende brigadeiro.', { esq: 'eduardo_envergonhado' }) ] },
    ] },
    A('Na quinta-feira, uma vizinha bateu na porta de Eduardo com um sorriso e uma proposta enorme...'),
  ] },

  /* ---------- Cena 7: a encomenda da Dona Marta ---------- */
  cena7: { proxima: 'cena8', passos: [
    N('Quinta-feira à noite. A Dona Marta, nossa vizinha, me chamou na varanda com um sorriso e um pedido enorme.', { fundo: 'bg_varanda_marta', esq: 'eduardo_nervoso', dir: 'dona_marta_sorrindo' }),
    F('Dona Marta', 'Eduardo, minha neta faz quinze anos no sábado e eu preciso de cem brigadeiros. Você consegue?'),
    N('Cem. Eu nunca tinha feito mais de vinte.'),
    F('Dona Marta', 'Pago bem, mas tem que estar pronto até sábado de manhã. Combinado?', { dir: 'dona_marta_preocupada' }),
    E('Eu... preciso pensar em como fazer isso.'),
    N('Era a maior oportunidade até agora. E a maior chance de dar errado.'),
    { escolhas: [
      { texto: 'Aceitar e pedir ajuda à minha mãe.', saldo: 850, resultado: [
        F('Cláudia', 'Cem brigadeiros? Então vamos dividir as panelas.', { fundo: 'bg_cozinha', esq: 'claudia_rindo', dir: 'eduardo_nervoso' }),
        A('Os dois enrolam brigadeiro a noite toda, e ela conta como a vovó fazia. A entrega é perfeita e a Dona Marta indica o Eduardo para a vizinhança inteira.'),
        N('Eu achava que pedir ajuda era perder. Descobri que era ganhar tempo, e uma noite inesquecível.', { dir: 'eduardo_animado' }) ] },
      { texto: 'Aceitar e fazer tudo sozinho, a noite toda.', saldo: 650, resultado: [
        A('Eduardo faz a maior parte na cozinha, sozinho, dorme na aula na sexta e entrega com atraso. A Dona Marta paga, mas um pouco menos.', { fundo: 'bg_cozinha', esq: null, dir: 'eduardo_cansado' }),
        N('Entreguei. Mas quase não chego vivo.') ] },
      { texto: 'Recusar para estudar para a prova.', saldo: 100, resultado: [
        F('Dona Marta', 'Tudo bem, filho. Estudar vem primeiro.', { dir: 'dona_marta_sorrindo' }),
        A('A encomenda vai para uma padaria do bairro.'),
        N('Tirei uma boa nota. Mas esses cem brigadeiros eu ainda vou fazer um dia.') ] },
    ] },
    A('Na semana seguinte, o leite condensado ficou mais caro e as vendas caíram...'),
  ] },

  /* ---------- Cena 8: a semana difícil ---------- */
  cena8: { proxima: 'cena9', passos: [
    N('Semana difícil. O leite condensado subiu, as vendas caíram e eu fiquei olhando o potinho como quem olha uma conta que não fecha.', { fundo: 'bg_quarto', esq: 'eduardo_cansado', dir: null }),
    A('(O celular vibra. É o Thiago, em chamada de vídeo.)', { dir: 'thiago_animado' }),
    F('Thiago', 'E aí, parceiro! Cadê aquele sorriso de quem vai jogar GTA comigo?'),
    E('Thiago... eu acho que não vai dar. Tá tudo mais caro e as vendas caíram. Não sei se vale a pena continuar.'),
    F('Thiago', 'Cara, eu nem ligo do PS5. Eu só quero jogar com você. Mas se desistir agora, você vai se arrepender depois.', { dir: 'thiago_preocupado' }),
    A('(Cláudia aparece na porta com uma xícara de chocolate quente.)', { dir: 'claudia_emocionada' }),
    F('Cláudia', 'Eu ouvi um pouco. Não vou dizer o que fazer. Só que você já provou que sabe vender, Edu.'),
    N('Ninguém disse que seria fácil. Mas ninguém disse que eu estava sozinho.', { esq: 'eduardo_determinado' }),
    E('Tá bom... então o que eu faço?'),
    { escolhas: [
      { texto: 'Conversar com os clientes fiéis e manter o preço.', saldo: 500, resultado: [
        A('Na segunda-feira, no corredor, Eduardo pergunta o que os clientes mais gostam. Eles dizem que voltam pelo sabor e pelo carinho. Ele cria o combo da semana e a fila volta.', { fundo: 'bg_corredor', dir: null, esq: 'eduardo_animado' }),
        N('Escutar o cliente custa zero e rende muito.') ] },
      { texto: 'Aumentar um pouco o preço.', saldo: 350, resultado: [
        A('Eduardo sobe R$ 0,50 por brigadeiro. Alguns reclamam, mas a maioria entende.', { fundo: 'bg_patio', dir: null }),
        N('Mexi no preço com cuidado. Dessa vez deu certo.') ] },
      { texto: 'Parar de vender por uma semana.', saldo: 0, resultado: [
        A('Eduardo descansa e recupera as forças, mas os clientes procuram outros doces e as encomendas esfriam.', { dir: null }),
        N('Descansei, mas o brigadeiro não parou de ser vendido: só que por outras pessoas.') ] },
    ] },
    A('No fim do mês, a escola anunciou a Feira de Empreendedores. Era a grande chance do Eduardo...'),
  ] },

  /* ---------- Cena 9: a feira da escola ---------- */
  cena9: { proxima: 'cena10', passos: [
    N('Sábado de feira. A quadra virou um mar de barracas, bandeirinhas e gente com fome.', { fundo: 'bg_feira', esq: 'eduardo_determinado', dir: 'silvia_sorrindo' }),
    F('Sílvia', 'Eduardo, a sua barraca fica na entrada. Foi sorteio, então não me agradeça.'),
    E('Que sorte... ou será que não?'),
    N('Era o dia. Tudo o que eu aprendi, numa barraca só.'),
    E('Se eu investir um pouco na barraca, posso atrair muito mais gente...'),
    N('Ou posso gastar e não vender nada. Hora de escolher.'),
    { escolhas: [
      { texto: 'Montar uma barraca decorada e investir nela.', saldo: 1000, resultado: [
        A('Eduardo gasta R$ 100 em toalha, bandeirinhas, um cartaz com a receita da vovó Lúcia e uma panela de brigadeiro de colher para experimentar. A fila vira o corredor.', { dir: null, esq: 'eduardo_animado' }),
        A('Cláudia chega e chora de orgulho.', { dir: 'claudia_emocionada' }),
        N('O investimento voltou dez vezes.') ] },
      { texto: 'Montar uma barraca simples.', saldo: 850, resultado: [
        A('Uma mesa, uma toalha e as caixinhas. Eduardo vende bem, mas a barraca passa despercebida entre as outras. Cláudia chega no final e sorri.', { dir: 'claudia_emocionada' }),
        N('Foi bom, mas poderia ter sido ótimo.') ] },
      { texto: 'Vender só pela mochila, sem barraca.', saldo: 200, resultado: [
        A('Eduardo anda pela feira com a mochila na mão e ninguém para para olhar. Cláudia o encontra no meio da multidão.', { dir: 'claudia_emocionada', esq: 'eduardo_envergonhado' }),
        N('Sem lugar, sem placa... sem fila.') ] },
    ] },
    A('Fim da feira. O sol baixava e Eduardo despejou o potinho na mesa da cozinha. Era hora de contar...'),
  ] },

  /* ---------- Cena 10: o resultado (o final depende só do dinheiro) ---------- */
  cena10: { final: true, passos: [
    N('Domingo à noite. Eu, o potinho e o preço do PS5 na tela do celular. Hora de contar.', { fundo: 'bg_sala', esq: 'eduardo_determinado', dir: null }),
    A('(Eduardo vira o potinho sobre a mesa. As notas e as moedas se espalham.)'),
    N('Foram semanas de panela, de ideia, de erro e de acerto. Agora era só a conta.'),
    { decidirFinal: true },
  ] },
});

/* Fantástico: R$ 4.800 ou mais. Bom: a partir da meta (R$ 3.500). Ruim: abaixo da meta. */
const FINAIS = {
  fantastico: [
    A('Na loja de eletrônicos, Eduardo compra o PS5 e ainda sobra dinheiro. Ele paga uma conta da casa e compra um presente para a mãe.', { fundo: 'bg_loja', esq: 'eduardo_feliz', dir: 'claudia_emocionada' }),
    F('Cláudia', 'Você pagou o PS5... e ainda ajudou em casa?'),
    A('(O Thiago aparece na chamada de vídeo.)', { dir: 'thiago_animado' }),
    F('Thiago', 'Quando joga?'),
    E('Agora. E depois vou fazer cem brigadeiros pra festa de alguém.'),
    N('Eu queria um videogame. Acabei descobrindo um negócio: o Brigadeiro da Vovó Lúcia.'),
  ],
  bom: [
    A('Na loja de eletrônicos, Eduardo compra o PS5.', { fundo: 'bg_loja', esq: 'eduardo_feliz', dir: 'claudia_emocionada' }),
    F('Cláudia', 'Vi você contar cada moeda. Estou muito orgulhosa.'),
    A('(O Thiago aparece na chamada de vídeo.)', { dir: 'thiago_animado' }),
    F('Thiago', 'No dia do lançamento, a gente joga junto!'),
    N('Não foi fácil, mas foi meu. Cada moeda tem uma panela por trás.'),
  ],
  ruim: [
    A('Faltou dinheiro para o PS5. Eduardo fica quieto, olhando as moedas.', { esq: 'eduardo_triste', dir: 'claudia_emocionada' }),
    F('Cláudia', 'Faltou dinheiro, mas sobrou aprendizado. Isso você já não perde.'),
    A('(O Thiago aparece na chamada de vídeo.)', { dir: 'thiago_preocupado' }),
    F('Thiago', 'Eu espero. Jogo tem fase de novo.'),
    N('Ainda não foi desta vez. Mas a receita continua aqui, e eu também.', { esq: 'eduardo_determinado' }),
  ],
};

const TELA_FINAL = {
  fantastico: ['🌟 Final fantástico', 'O sonho virou negócio!'],
  bom: ['✅ Final bom', 'O PS5 é seu!'],
  ruim: ['Final ruim', 'Tente de novo!'],
};

const LICOES = [
  'Qualidade e custo andam juntos.',
  'Conversar e negociar abre portas.',
  'Pedir licença evita problemas.',
  'Divulgar e aceitar ajuda multiplicam as vendas.',
  'Antecipar problemas protege o produto.',
  'O concorrente também pode ser parceiro.',
  'Prazo e trabalho em equipe.',
  'Perseverar e ouvir os clientes.',
  'Investir na apresentação.',
];