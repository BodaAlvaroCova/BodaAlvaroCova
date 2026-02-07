(function () {

"use strict";

/* =========================
   HELPERS
========================= */

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function fadeIn(el) {
    if (!el) return;
    el.style.display = "flex";
    el.style.opacity = 0;
    requestAnimationFrame(() => {
        el.style.transition = "opacity 0.5s";
        el.style.opacity = 1;
    });
}

function fadeOut(el) {
    if (!el) return;
    el.style.transition = "opacity 0.5s";
    el.style.opacity = 0;
    setTimeout(() => {
        el.style.display = "none";
    }, 500);
}

/* =========================
   NAVBAR ON SCROLL
========================= */

window.addEventListener("scroll", () => {

    const navbar = qs('.navbar');
    const scrollBottom = qs('.scroll-to-bottom');
    const backTop = qs('.back-to-top');

    if (navbar) {
    navbar.style.display = "flex";
    navbar.style.opacity = 1;
    }

    if (window.scrollY > 200) {
        if (backTop) fadeIn(backTop);
    } else {
    if (backTop) fadeOut(backTop);
    }
    if (window.scrollY > 100) {
        if (scrollBottom) fadeOut(scrollBottom);
    } else {
        if (scrollBottom) fadeIn(scrollBottom);
    }

    // 👇 SOLO MÓVIL: mostrar menú al hacer scroll
    if (window.innerWidth <= 768 && navMenu && navbar) {
        if (window.scrollY > 200) {
            navMenu.classList.add("mobile-visible");
            navbar.classList.add("mobile-menu-active");
        } else {
            navMenu.classList.remove("mobile-visible");
            navbar.classList.remove("mobile-menu-active");
        }
    }

});

const navToggle = qs("#navToggle");
const navMenu = qs("#navMenu");

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}


/* =========================
   SMOOTH SCROLL NAV LINKS
========================= */

qsa(".navbar-nav a").forEach(link => {

    link.addEventListener("click", function(e) {

        if (this.hash !== "") {

            e.preventDefault();

            const target = document.querySelector(this.hash);

            if (target) {

                window.scrollTo({
                    top: target.offsetTop - 45,
                    behavior: "smooth"
                });

                document.querySelectorAll('.navbar-nav .active')
                    .forEach(el => el.classList.remove('active'));

                this.classList.add('active');
            }
        }
    });
});

/* =========================
   MODAL VIDEO (sin bootstrap)
========================= */

let videoSrc = "";

qsa('.btn-play').forEach(btn => {
    btn.addEventListener("click", function() {
        videoSrc = this.dataset.src;
    });
});

const videoModal = qs('#videoModal');
const video = qs('#video');

if (videoModal && video) {

    videoModal.addEventListener("show", () => {
        video.src = videoSrc + "?autoplay=1&modestbranding=1&showinfo=0";
    });

    videoModal.addEventListener("hide", () => {
        video.src = videoSrc;
    });
}

/* =========================
   PORTFOLIO FILTER (reemplazo isotope)
========================= */

const filters = qsa('#portfolio-flters li');
const items = qsa('.portfolio-item');

filters.forEach(filter => {

    filter.addEventListener("click", function() {

        filters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');

        const selector = this.dataset.filter;

        items.forEach(item => {

            if (selector === "*" || item.matches(selector)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });
    });

});

/* =========================
   BACK TO TOP
========================= */

const backTop = qs('.back-to-top');

if (backTop) {

    backTop.addEventListener("click", function(e) {

        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}

/* =========================
   GALLERY (reemplazo owlcarousel)
========================= */

const gallery = qs(".gallery-carousel");

if (gallery) {
    gallery.style.display = "flex";
    gallery.style.overflowX = "auto";
    gallery.style.scrollBehavior = "smooth";
}

/* =========================
   CONTADOR
========================= */

const fechaObjetivo = new Date("2026-12-06T13:00:00").getTime();

function actualizarContador() {

    const ahora = Date.now();
    const diferencia = fechaObjetivo - ahora;

    const contador = qs('#contador');

    if (!contador) return;

    if (diferencia <= 0) {
        contador.innerHTML = '<h3>¡Hoy es el gran día! 🎉</h3>';
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    qs('#dias').textContent = String(dias).padStart(2, '0');
    qs('#horas').textContent = String(horas).padStart(2, '0');
    qs('#minutos').textContent = String(minutos).padStart(2, '0');
    qs('#segundos').textContent = String(segundos).padStart(2, '0');
}

actualizarContador();
setInterval(actualizarContador, 1000);

})();
