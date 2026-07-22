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
// 2. TYPEWRITER ANIMATION
// ==========================================
const subtitleText = "We build clean, modern, and high-performance websites tailored specifically to elevate your business and grow your brand.";

const codeText = `class DevCraft_Studio {
  mission = "Scalable & High-Performance";
  coreTech = ["HTML5", "CSS3", "JavaScript", "Node.js", "React", "Python", "Responsive Design"];

  public deployNextGen() {
    return "Custom & secure web platforms";
  }
}`;

function startTyping(elementId, fullText, speed, onComplete) {
    const targetElement = document.getElementById(elementId);
    if (!targetElement) return;

    let charIndex = 0;
    targetElement.textContent = "";

    function typeChar() {
        if (charIndex < fullText.length) {
            targetElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, speed);
        } else if (onComplete) {
            onComplete();
        }
    }

    typeChar();
}

window.addEventListener('DOMContentLoaded', () => {
    startTyping('typed-subtitle', subtitleText, 25, () => {
        startTyping('typed-code', codeText, 20);
    });
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

    // Attach animation observer to all cards, titles, and sections
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