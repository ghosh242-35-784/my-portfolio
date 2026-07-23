// --- Mobile Menu Toggle ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Icon toggle (Bars to X)
    const icon = hamburgerBtn.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// --- Close Mobile Menu when clicking a link ---
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
});

// --- Navbar Border Shadow on Scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});
// ================= TYPEWRITER EFFECT ================= //
const textArray = [
    "Hello, everyone!", 
];
const typingDelay = 100; // টাইপ হওয়ার স্পিড
const erasingDelay = 50; // মুছে যাওয়ার স্পিড
const newTextDelay = 2000; // একটা লাইন শেষ হলে কতক্ষণ দাঁড়াবে
let textIndex = 0;
let charIndex = 0;

const typedTextSpan = document.querySelector(".typewriter-text");
const cursorSpan = document.querySelector(".cursor");

function type() {
    if (charIndex < textArray[textIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0; // সবগুলো শেষ হলে আবার প্রথম থেকে শুরু হবে
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // পেজ রিলোড হওয়ার ১ সেকেন্ড পর টাইপিং শুরু হবে
    if(textArray.length) setTimeout(type, 1000);
});