// =====================================
// MODO ESCURO / CLARO
// =====================================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function atualizarBotaoTema() {
    if (body.classList.contains("dark")) {
        themeToggle.innerHTML = "☀️ Modo Claro";
    } else {
        themeToggle.innerHTML = "🌙 Modo Escuro";
    }
}

const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "dark") {
    body.classList.add("dark");
}

atualizarBotaoTema();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
            localStorage.setItem("tema", "dark");
        } else {
            localStorage.setItem("tema", "light");
        }
        atualizarBotaoTema();
    });
}

// =====================================
// PESQUISA DE SELEÇÕES
// =====================================
const pesquisa = document.getElementById("pesquisaSelecao");

if (pesquisa) {
    pesquisa.addEventListener("keyup", () => {
        const texto = pesquisa.value.toLowerCase();
        const times = document.querySelectorAll(".time");

        times.forEach(time => {
            const nome = time.textContent.toLowerCase();
            if (nome.includes(texto)) {
                time.style.display = ""; // Corrigido: remove o 'none' e mantém o layout padrão do CSS Grid
            } else {
                time.style.display = "none";
            }
        });
    });
}

// =====================================
// BOTÃO SAIBA MAIS
// =====================================
const btnSaibaMais = document.getElementById("btnSaibaMais");

if (btnSaibaMais) {
    btnSaibaMais.addEventListener("click", () => {
        const secaoSedes = document.querySelector("#sedes");
        if (secaoSedes) {
            secaoSedes.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// =====================================
// ANIMAÇÕES AO ROLAR (Intersection Observer)
// =====================================
const elementos = document.querySelectorAll(".card, .time, section h2");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

elementos.forEach(elemento => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(50px)";
    elemento.style.transition = "all .8s ease";
    observer.observe(elemento);
});

// =====================================
// MENU ATIVO & MENU HAMBÚRGUER
// =====================================
const secoes = document.querySelectorAll("section");
const menuHamburger = document.getElementById('menuHamburger');
const navMenu = document.getElementById('navMenu');
const links = document.querySelectorAll(".nav-menu a"); // Atualizado para usar os links corretos

// Lógica de Scroll (Menu Ativo & Parallax unificados para melhor performance)
window.addEventListener("scroll", () => {
    let atual = "";
    const topoJanela = window.scrollY; // Substituído pageYOffset por scrollY

    // 1. Menu Ativo
    secoes.forEach(secao => {
        const topoSecao = secao.offsetTop - 150;
        const alturaSecao = secao.clientHeight;

        if (topoJanela >= topoSecao && topoJanela < topoSecao + alturaSecao) {
            atual = secao.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("ativo");
        if (link.getAttribute("href") === "#" + atual) {
            link.classList.add("ativo");
        }
    });

    // 2. Efeito Parallax Hero
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.backgroundPositionY = (topoJanela * 0.4) + "px";
    }
});

// Controle do Menu Hambúrguer
if (menuHamburger && navMenu) {
    menuHamburger.addEventListener('click', () => {
        menuHamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fecha o menu automaticamente ao clicar em um link
    links.forEach(link => {
        link.addEventListener('click', () => {
            menuHamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// =====================================
// CONTADOR DE VISITAS & BOAS-VINDAS
// =====================================
let visitas = localStorage.getItem("visitas") || 0;
visitas++;
localStorage.setItem("visitas", visitas);

console.log(`🏆 Visitante número ${visitas}`);

window.addEventListener("load", () => {
    console.log("🏆 Bem-vindo ao Portal da Copa do Mundo 2026!");
});

// =====================================
// RELÓGIO AO VIVO
// =====================================
function atualizarRelogio() {
    const relogio = document.getElementById("relogio");
    if (!relogio) return;

    const agora = new Date();
    relogio.innerHTML = agora.toLocaleTimeString("pt-BR");
}
setInterval(atualizarRelogio, 1000);

// =====================================
// CONTAGEM REGRESSIVA PARA A COPA
// =====================================
function atualizarContagem() {
    const contador = document.getElementById("contador");
    if (!contador) return;

    const copa = new Date("2026-06-11T00:00:00");
    const agora = new Date();
    const diferenca = copa - agora;

    if (diferenca <= 0) {
        contador.innerHTML = "⚽ A Copa do Mundo Começou!";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    contador.innerHTML = `🏆 Faltam ${dias} dias para a Copa!`;
}

setInterval(atualizarContagem, 1000);
atualizarContagem();