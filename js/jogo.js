/* A Primeira Venda: motor do jogo. As cenas ficam em cenas.js e cenas2.js. */

const META = 3500;
const LIMITE_FANTASTICO = 4800;
const VELOCIDADE = 20; /* milissegundos por letra */

let dinheiro = 300;
let fila = [];
let cenaAtual = null;
let finalChave = null;
let jogando = false;
let trocando = false;
let digitando = false;
let aguardandoEscolha = false;
let temporizador = null;
let textoCompleto = '';
const estado = { esq: null, dir: null };
const classes = { esq: '', dir: '' };
const tokens = { esq: 0, dir: 0 };

/* Altura de cada personagem em relação ao Eduardo (1 = mesma altura dele). Ajuste à vontade. */
const ALTURA_BASE = 38; /* em: a altura do Eduardo */
const ALTURAS = { eduardo: 1, claudia: 0.97, seuze: 0.86, silvia: 1, julia: 0.93, rick: 1.06, dona_marta: 0.86, thiago: 0.75 };
/* Para onde cada desenho olha. O jogo espelha a imagem quando o personagem precisa olhar para o outro lado. */
const OLHA_PARA_DIREITA = ['eduardo']; /* todos os outros olham para a esquerda */
const SEM_ESPELHO = ['thiago'];

const palco = document.getElementById('palco');
const conteudo = document.getElementById('conteudo');
const elNome = document.getElementById('nome');
const elTexto = document.getElementById('texto');
const elFade = document.getElementById('fade');

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

function prefixoArquivo(arquivo) {
  return arquivo.replace(/_[^_]+$/, '');
}

function prefixoFala(quem) {
  const nome = quem.replace(/\(.*?\)/g, '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return nome === 'seu ze' ? 'seuze' : nome.replace(/ /g, '_');
}

function deveEspelhar(prefixo, lado) {
  if (SEM_ESPELHO.includes(prefixo)) return false;
  return OLHA_PARA_DIREITA.includes(prefixo) ? lado === 'dir' : lado === 'esq';
}

function colocarPersonagem(lado, arquivo) {
  const caixa = document.getElementById('personagem-' + lado);
  const anterior = estado[lado];
  estado[lado] = arquivo;
  caixa.className = 'personagem ' + classes[lado];

  if (!arquivo) {
    caixa.classList.add('saindo');
    setTimeout(() => {
      if (!estado[lado]) { caixa.innerHTML = ''; caixa.classList.remove('saindo'); }
    }, 250);
    return;
  }

  const prefixo = prefixoArquivo(arquivo);
  const entrando = !anterior || prefixoArquivo(anterior) !== prefixo;
  const token = ++tokens[lado];
  const img = new Image();
  img.alt = arquivo;
  img.style.height = ALTURA_BASE * (ALTURAS[prefixo] || 1) + 'em';
  if (deveEspelhar(prefixo, lado)) img.classList.add('espelhado');
  img.onload = () => {
    if (token !== tokens[lado]) return;
    caixa.replaceChildren(img); /* a imagem antiga só sai quando a nova já está pronta */
    if (entrando) {
      caixa.classList.add('entrando-' + lado);
      caixa.addEventListener('animationend', () => caixa.classList.remove('entrando-' + lado), { once: true });
    }
  };
  img.onerror = () => {
    if (token === tokens[lado]) caixa.innerHTML = '<div class="placeholder">' + arquivo + '</div>';
  };
  img.src = 'assets/personagens/' + arquivo + '.png';
}

/* Retrato da caixa de diálogo. Vozes sem imagem (cliente, colega) mostram uma silhueta anônima. */
const SILHUETA = '<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="18" fill="#d8cdc4"/><path d="M14 94c0-21 16-33 36-33s36 12 36 33z" fill="#d8cdc4"/></svg>';

function mostrarSilhueta(caixa) {
  caixa.classList.add('anonimo');
  caixa.innerHTML = SILHUETA;
}

function atualizarRetrato(quem) {
  const caixa = document.getElementById('retrato');
  const prefixo = prefixoFala(quem);
  const arquivo = [estado.esq, estado.dir].find((f) => f && prefixoArquivo(f) === prefixo);
  if (!arquivo) { mostrarSilhueta(caixa); return; }

  const mostrar = (img) => { caixa.classList.remove('anonimo'); caixa.replaceChildren(img); };
  const img = new Image();
  img.onload = () => mostrar(img);
  img.onerror = () => { /* sem retrato pronto: usa um recorte do personagem */
    const corpo = new Image();
    corpo.className = 'corpo';
    corpo.onload = () => mostrar(corpo);
    corpo.onerror = () => mostrarSilhueta(caixa);
    corpo.src = 'assets/personagens/' + arquivo + '.png';
  };
  img.src = 'assets/retratos/' + arquivo + '.png';
}

/* Carrega antes as imagens da próxima cena, para não aparecer fundo vazio na troca. */
function coletarImagens(passos, fundos, personagens) {
  passos.forEach((p) => {
    if (p.fundo) fundos.add(p.fundo);
    if (p.esq) personagens.add(p.esq);
    if (p.dir) personagens.add(p.dir);
    if (p.escolhas) p.escolhas.forEach((e) => coletarImagens(e.resultado, fundos, personagens));
  });
}

function precarregarTudo() {
  const fundos = new Set();
  const personagens = new Set();
  Object.values(CENAS).forEach((c) => coletarImagens(c.passos, fundos, personagens));
  Object.values(FINAIS).forEach((f) => coletarImagens(f, fundos, personagens));
  fundos.forEach((n) => { new Image().src = 'assets/bg/' + n + '.png'; });
  personagens.forEach((n) => {
    new Image().src = 'assets/personagens/' + n + '.png';
    new Image().src = 'assets/retratos/' + n + '.png';
  });
}

/* ---------- Dinheiro e barra do PS5 ---------- */
function atualizarHUD() {
  const pct = Math.round((dinheiro / META) * 100);
  document.getElementById('dinheiro').textContent = dinheiro.toLocaleString('pt-BR');
  document.getElementById('ps5-pct').textContent = pct + '%';
  document.getElementById('ps5-preench').style.height = Math.max(0, Math.min(100, pct)) + '%';
}

function mostrarGanho(saldo) {
  if (!saldo) return;
  const el = document.createElement('div');
  el.className = 'ganho ' + (saldo > 0 ? 'positivo' : 'negativo');
  el.textContent = (saldo > 0 ? '+' : '−') + 'R$ ' + Math.abs(saldo).toLocaleString('pt-BR');
  palco.appendChild(el);
  setTimeout(() => el.remove(), 1800);
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

/* ---------- Passos e cenas ---------- */
function avancar() {
  if (!jogando || trocando || aguardandoEscolha) return;
  if (digitando) { terminarDigitacao(); return; }
  if (fila.length === 0) { terminarCena(); return; }
  executarPasso(fila.shift());
}

function executarPasso(p) {
  if (p.fundo) colocarCenario(p.fundo);
  if ('esqClasse' in p) classes.esq = p.esqClasse;
  if ('dirClasse' in p) classes.dir = p.dirClasse;
  if ('esq' in p) colocarPersonagem('esq', p.esq);
  if ('dir' in p) colocarPersonagem('dir', p.dir);
  if (p.escolhas) { mostrarEscolhas(p.escolhas); return; }
  if (p.decidirFinal) { decidirFinal(); return; }

  elNome.textContent = p.quem || '';
  if (p.quem) atualizarRetrato(p.quem);
  digitar(p.texto, p.estilo);
}

function iniciarCena(id) {
  cenaAtual = id;
  fila = CENAS[id].passos.slice();
  classes.esq = '';
  classes.dir = '';
  avancar();
}

function terminarCena() {
  const cena = CENAS[cenaAtual];
  if (cena.proxima) {
    trocando = true;
    elFade.classList.add('ativo');
    setTimeout(() => {
      trocando = false;
      iniciarCena(cena.proxima);
      elFade.classList.remove('ativo');
    }, 550);
  } else if (cena.final) {
    mostrarFim();
  }
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
  mostrarGanho(item.saldo);
  fila.unshift(...item.resultado);
  avancar();
}

/* ---------- Final (depende só do dinheiro) ---------- */
function decidirFinal() {
  finalChave = dinheiro >= LIMITE_FANTASTICO ? 'fantastico' : dinheiro >= META ? 'bom' : 'ruim';
  fila.unshift(...FINAIS[finalChave]);
  avancar();
}

function mostrarFim() {
  const [titulo, subtitulo] = TELA_FINAL[finalChave];
  document.getElementById('final-titulo').textContent = titulo;
  document.getElementById('final-sub').textContent = subtitulo;
  document.getElementById('final-dinheiro').textContent =
    'Dinheiro final: R$ ' + dinheiro.toLocaleString('pt-BR') + ' (meta: R$ ' + META.toLocaleString('pt-BR') + ')';
  document.getElementById('final-licoes').innerHTML = LICOES.map((l) => '<li>' + l + '</li>').join('');
  jogando = false;
  document.getElementById('tela-final').hidden = false;
}

/* ---------- Controles ---------- */
document.getElementById('dialogo').addEventListener('click', avancar);

document.addEventListener('keydown', (e) => {
  if (!jogando) return;
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

document.getElementById('btn-comecar').addEventListener('click', () => {
  document.getElementById('tela-inicial').hidden = true;
  jogando = true;
  iniciarCena('cena1');
});

document.getElementById('btn-reiniciar').addEventListener('click', () => location.reload());

/* ---------- Início ---------- */
atualizarHUD();
precarregarTudo();