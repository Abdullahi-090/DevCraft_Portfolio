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

// 1. Clean Syntax Highlighter (No double-replacing attributes)
function highlightSyntax(code) {
    // Escape standard HTML first
    let escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Replace strings first (so string contents don't match keywords)
    escaped = escaped.replace(/(["'].*?["'])/g, '___STR___$1___ENDSTR___');

    // Highlight keywords, class, and function names
    escaped = escaped.replace(/\b(class|return|const|new)\b/g, '<span class="tok-keyword">$1</span>');
    escaped = escaped.replace(/\b(DevCraftEngine)\b/g, '<span class="tok-class">$1</span>');
    escaped = escaped.replace(/\b(deploy)\b/g, '<span class="tok-func">$1</span>');

    // Restore strings with string span tags
    escaped = escaped.replace(/___STR___(.*?)___ENDSTR___/g, '<span class="tok-string">$1</span>');

    return escaped;
}

// 2. Typewriter Function (Types live colored HTML without glitched tags)
function startTypewriter(elementId, fullText, speed, isCode = false) {
    const el = document.getElementById(elementId);
    if (!el) return;

    let index = 0;

    const interval = setInterval(() => {
        if (index <= fullText.length) {
            const currentText = fullText.substring(0, index);

            if (isCode) {
                // Update innerHTML using highlighted syntax at each character
                el.innerHTML = highlightSyntax(currentText);
            } else {
                el.textContent = currentText;
            }

            index++;
        } else {
            clearInterval(interval);
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
// CUSTOM MODAL FUNCTION
// ==========================================
function showModal(title, message) {
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.getElementById('modal-close-btn');
    const okBtn = document.getElementById('modal-ok-btn');

    if (!modal) return;

    modalTitle.innerHTML = title;
    modalMessage.textContent = message;
    modal.classList.add('active');

    const closeModal = () => modal.classList.remove('active');

    closeBtn.onclick = closeModal;
    okBtn.onclick = closeModal;
}

// ==========================================
// 4. PAYSTACK PAYMENT INTEGRATION
// ==========================================

// Triggered when user clicks "Support Campaign" button
function payWithPaystack() {
    const paymentModal = document.getElementById('payment-input-modal');
    const errorMsg = document.getElementById('payment-error-msg');
    
    if (errorMsg) errorMsg.style.display = 'none';
    if (paymentModal) paymentModal.classList.add('active');
}

function closePaymentModal() {
    const paymentModal = document.getElementById('payment-input-modal');
    if (paymentModal) paymentModal.classList.remove('active');
}

function proceedToPaystack() {
    const emailInput = document.getElementById('donor-email').value.trim();
    const amountInput = parseFloat(document.getElementById('donor-amount').value);
    const errorMsg = document.getElementById('payment-error-msg');

    // Email validation
    if (!emailInput || !emailInput.includes('@') || !emailInput.includes('.')) {
        errorMsg.textContent = 'Please enter a valid email address.';
        errorMsg.style.display = 'block';
        return;
    }

    // Minimum N5,000 validation
    if (isNaN(amountInput) || amountInput < 5000) {
        errorMsg.textContent = 'Minimum contribution amount is ₦5,000.';
        errorMsg.style.display = 'block';
        return;
    }

    // Hide input modal before opening Paystack iframe
    closePaymentModal();

    // Convert Naira to Kobo (multiply by 100)
    const amountInKobo = amountInput * 100;

    let handler = PaystackPop.setup({
        key: 'pk_test_b3450cd7031a6699fad0e30733063be6fd4da301', 
        email: emailInput,
        amount: amountInKobo, 
        currency: "NGN",
        ref: 'DC_' + Math.floor((Math.random() * 1000000000) + 1),
        onClose: function() {
            showModal('<i class="fas fa-info-circle text-yellow"></i> Notice', 'Payment window was closed.');
        },
        callback: function(response) {
            showModal('<i class="fas fa-check-circle text-green"></i> Thank You!', 'Thank you for your ₦' + amountInput.toLocaleString() + ' contribution! Reference: ' + response.reference);
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