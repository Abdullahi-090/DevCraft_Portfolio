// ==========================================
// 1. MOBILE NAVBAR TOGGLE
// ==========================================
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// ==========================================
// 2. TYPEWRITER ANIMATION (devcraft_engine.ts)
// ==========================================
const subtitleText = "We build clean, modern, and high-performance websites tailored specifically to elevate your business and grow your brand.";

const codeText = "class DevCraftEngine {\n  deploy() {\n    return \"Deployment Successful\";\n  }\n}\n\nconst app = new DevCraftEngine();\napp.deploy();";

function startTypewriter(elementId, fullText, speed, isCode = false) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let index = 0;
    el.textContent = "";

    const interval = setInterval(() => {
        if (index < fullText.length) {
            el.textContent += fullText.charAt(index);
            index++;
        } else {
            clearInterval(interval);
            // Apply colors using innerHTML AFTER typing finishes
            if (isCode) {
                el.innerHTML = highlightSyntax(fullText);
            }
        }
    }, speed);
}

// Start both typewriters simultaneously
window.addEventListener('load', () => {
    startTypewriter('typed-subtitle', subtitleText, 25, false);
    startTypewriter('typed-code', codeText, 20, true);
});

// ==========================================
// 3. ZOOM-UP SCROLL REVEAL OBSERVER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// ==========================================
// 4. PAYSTACK PAYMENT INTEGRATION
// ==========================================
function payWithPaystack() {
    let handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', 
        email: 'abdullahibashirgov@gmail.com',
        amount: 500000, 
        currency: "NGN",
        ref: 'DC_' + Math.floor((Math.random() * 1000000000) + 1),
        onClose: function() {
            alert('Payment window closed.');
        },
        callback: function(response) {
            alert('Thank you for supporting DevCraft! Reference: ' + response.reference);
        }
    });
    handler.openIframe();
}

// ==========================================
// 5. AUTOMATIC IMAGE SLIDESHOW
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.portfolio-img-box.carousel');

    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.slide');
        if (slides.length <= 1) return;

        let currentIndex = 0;

        setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 3500);
    });
});