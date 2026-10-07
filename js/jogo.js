/* A Primeira Venda: motor do jogo. As cenas ficam em cenas.js. */

const META = 3500;
const VELOCIDADE = 20; /* milissegundos por letra */

let dinheiro = 300;
let fila = [];
let digitando = false;
let aguardandoEscolha = false;
let temporizador = null;
let textoCompleto = '';
const estado = { esq: null, dir: null };

const conteudo = document.getElementById('conteudo');
const elNome = document.getElementById('nome');
const elTexto = document.getElementById('texto');

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
  estado[lado] = arquivo;
  caixa.innerHTML = '';
  if (!arquivo) return;
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
  if (!arquivo) return;
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

/* ---------- Texto com efeito de digitação ---------- */
function digitar(texto, estilo) {
  clearInterval(temporizador);
  textoCompleto = texto;
  elTexto.className = estilo || '';
  elTexto.textContent = '';
  digitando = true;
  let i = 0;
  temporizador = setInterval(() => {
    i++;
    elTexto.textContent = textoCompleto.slice(0, i);
    if (i >= textoCompleto.length) terminarDigitacao();
  }, VELOCIDADE);
}

function terminarDigitacao() {
  clearInterval(temporizador);
  elTexto.textContent = textoCompleto;
  elTexto.classList.add('pronto');
  digitando = false;
}

/* ---------- Passos da cena ---------- */
function avancar() {
  if (aguardandoEscolha) return;
  if (digitando) { terminarDigitacao(); return; }
  if (fila.length === 0) return;
  executarPasso(fila.shift());
}

function executarPasso(p) {
  if (p.fundo) colocarCenario(p.fundo);
  if ('esq' in p) colocarPersonagem('esq', p.esq);
  if ('dir' in p) colocarPersonagem('dir', p.dir);
  if (p.escolhas) { mostrarEscolhas(p.escolhas); return; }

  elNome.textContent = p.quem || '';
  if (p.quem) {
    const arquivo = p.quem.startsWith('Eduardo') ? estado.esq : estado.dir;
    colocarRetrato(arquivo, p.quem.charAt(0));
  }
  digitar(p.texto, p.estilo);
}

/* ---------- Escolhas (a ordem é embaralhada) ---------- */
function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function mostrarEscolhas(lista) {
  const caixa = document.getElementById('escolhas');
  caixa.innerHTML = '';
  embaralhar(lista).forEach((item, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'escolha';
    botao.innerHTML = '<b>' + 'ABC'[i] + ')</b>';
    botao.append(item.texto);
    botao.addEventListener('click', (e) => { e.stopPropagation(); escolher(item); });
    caixa.appendChild(botao);
  });
  aguardandoEscolha = true;
  conteudo.classList.add('modo-escolhas');
}

function escolher(item) {
  aguardandoEscolha = false;
  conteudo.classList.remove('modo-escolhas');
  dinheiro += item.saldo;
  atualizarHUD();
  fila.unshift(...item.resultado);
  avancar();
}

/* ---------- Controles ---------- */
document.getElementById('dialogo').addEventListener('click', avancar);

document.addEventListener('keydown', (e) => {
  if (aguardandoEscolha) {
    const indice = 'abc123'.indexOf(e.key.toLowerCase());
    const botao = indice >= 0 ? document.querySelectorAll('.escolha')[indice % 3] : null;
    if (botao) botao.click();
    return;
  }
  if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
    e.preventDefault();
    avancar();
  }
});

document.getElementById('aba-objetivos').addEventListener('click', () => {
  const painel = document.getElementById('painel-objetivos');
  painel.hidden = !painel.hidden;
});

/* ---------- Início ---------- */
function iniciarCena(id) {
  fila = CENAS[id].passos.slice();
  avancar();
}

atualizarHUD();
iniciarCena('cena1');