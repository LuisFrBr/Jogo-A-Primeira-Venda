/* A Primeira Venda: passos 1 e 2 (layout). O motor de diálogo vem no passo 3. */

const META = 3500;
let dinheiro = 300;

/* ---------- Imagens ----------
   Se o arquivo ainda não existir, aparece uma caixa com o nome dele. */
function colocarCenario(arquivo) {
  const caixa = document.getElementById('cenario');
  caixa.innerHTML = '';
  const img = new Image();
  img.className = 'fundo';
  img.alt = '';
  img.onerror = () => {
    caixa.innerHTML = '<div class="placeholder-fundo">' + arquivo + '</div>';
  };
  img.src = 'assets/bg/' + arquivo + '.png';
  caixa.appendChild(img);
}

function colocarPersonagem(lado, arquivo) {
  const caixa = document.getElementById('personagem-' + lado);
  caixa.innerHTML = '';
  const img = new Image();
  img.alt = arquivo;
  img.onerror = () => {
    caixa.innerHTML = '<div class="placeholder">' + arquivo + '</div>';
  };
  img.src = 'assets/personagens/' + arquivo + '.png';
  caixa.appendChild(img);
}

function colocarRetrato(arquivo, letra) {
  const caixa = document.getElementById('retrato');
  caixa.innerHTML = '<span>' + letra + '</span>';
  const img = new Image();
  img.onload = () => caixa.appendChild(img);
  img.src = 'assets/personagens/' + arquivo + '.png';
}

/* ---------- Dinheiro e barra do PS5 ---------- */
function atualizarHUD() {
  const pct = Math.round((dinheiro / META) * 100);
  document.getElementById('dinheiro').textContent = dinheiro.toLocaleString('pt-BR');
  document.getElementById('ps5-pct').textContent = pct + '%';
  document.getElementById('ps5-preench').style.height = Math.max(0, Math.min(100, pct)) + '%';
}

/* ---------- Caixa de diálogo ---------- */
const conteudo = document.getElementById('conteudo');

function mostrarTexto(nome, texto) {
  document.getElementById('nome').textContent = nome;
  document.getElementById('texto').textContent = texto;
  conteudo.classList.remove('modo-escolhas');
}

function mostrarEscolhas(lista) {
  const caixa = document.getElementById('escolhas');
  caixa.innerHTML = '';
  lista.forEach((item, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'escolha';
    botao.innerHTML = '<b>' + 'ABC'[i] + ')</b>';
    botao.append(item.texto);
    botao.addEventListener('click', item.aoEscolher);
    caixa.appendChild(botao);
  });
  conteudo.classList.add('modo-escolhas');
}

/* ---------- Aba de objetivos ---------- */
document.getElementById('aba-objetivos').addEventListener('click', () => {
  const painel = document.getElementById('painel-objetivos');
  painel.hidden = !painel.hidden;
});

/* ---------- TESTE DO LAYOUT (será trocado pelo motor no passo 3) ---------- */
function testar(saldo) {
  dinheiro += saldo;
  atualizarHUD();
  mostrarTexto('Cláudia', 'O dinheiro e a barra do PS5 foram atualizados. Clique no texto para ver as escolhas de novo.');
}

colocarCenario('bg_cozinha');
colocarPersonagem('esq', 'eduardo_envergonhado');
colocarPersonagem('dir', 'claudia_cansada');
colocarRetrato('eduardo_envergonhado', 'E');
atualizarHUD();
mostrarTexto('Eduardo', 'Texto de teste do layout. Clique aqui para ver as escolhas.');

document.getElementById('texto').addEventListener('click', () => {
  mostrarEscolhas([
    { texto: 'Chocolate bom e leite condensado de marca. Se é pra fazer, que seja o melhor.', aoEscolher: () => testar(300) },
    { texto: 'Marcas normais, com bom custo-benefício.', aoEscolher: () => testar(200) },
    { texto: 'O mais barato que tiver.', aoEscolher: () => testar(0) },
  ]);
});
