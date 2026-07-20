// Mobile Navbar Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('active'));
});

// Typewriter Effect for DevCraft Terminal
const textToType = "// DevCraft: Deploying tailored digital experiences...";
const typedTextElement = document.getElementById('typed-text');
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        typedTextElement.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeWriter, 50);
    }
}

window.addEventListener('DOMContentLoaded', typeWriter);

// Paystack Integration for DevCraft
function payWithPaystack() {
    let handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Public Paystack Key
        email: 'abdullahibashirgov@gmail.com',
        amount: 500000, // Amount in kobo (5000 NGN)
        currency: "NGN",
        ref: '' + Math.floor((Math.random() * 1000000000) + 1),
        onClose: function() {
            alert('Donation window closed.');
        },
        callback: function(response) {
            alert('Thank you for supporting DevCraft! Ref: ' + response.reference);
        }
    });
    handler.openIframe();
}

// Intersection Observer for Smooth Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    // Target elements to animate
    document.querySelectorAll('.scroll-reveal, .serve-card').forEach(el => {
        el.classList.add('scroll-reveal');
        revealObserver.observe(el);
    });
});
