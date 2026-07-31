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
// ================= THEME TOGGLE (DARK/LIGHT MODE) ================= //
// ================= THEME TOGGLE (DARK/LIGHT MODE) ================= //
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('i');

    themeToggleBtn.addEventListener('click', () => {
        // বডিতে 'light-mode' ক্লাস যুক্ত বা রিমুভ করবে
        document.body.classList.toggle('light-mode');
        
        // থিম অনুযায়ী আইকন পরিবর্তন
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });
}
// ================= AI CHATBOT LOGIC (BULLETPROOF VERSION) ================= //
const API_KEY = "AQ.Ab8RN6Le0NwfitvCIuqh5G-BGHPl-dwawCjHwYoDyMTHv1fcJQ"; 

document.addEventListener("DOMContentLoaded", () => {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const sendMsgBtn = document.getElementById('send-msg-btn');

    if (!chatToggleBtn || !chatWindow) return;

    // আপনার সম্পর্কে তথ্য
    const myInfo = `
    You are the personal AI assistant of Shoumik Ghosh. 
    Shoumik is a Software Engineering student at Daffodil International University.
    Skills: C, C++, JavaScript, Python, Arduino, ESP32, HTML/CSS.
    Projects: GreenNode BD (IoT urban farming), Automated Irrigation System, AdmitWise, Smart IoT Dustbin.
    Answer briefly, politely, and as his assistant.
    `;

    // Open/Close Chat
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });
    
    closeChatBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    // Add Message
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
        msgDiv.innerText = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Fetch Reply from Gemini API
    async function getAIReply(userText) {
        addMessage("Thinking...", "ai");
        const lastMsg = chatBody.lastElementChild;

        // সবচেয়ে স্ট্যাবল মডেলটি ব্যবহার করা হলো
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
        
        // ট্রিক: ইউজারের প্রশ্নের সাথেই আপনার তথ্যগুলো লুকিয়ে পাঠিয়ে দেওয়া হচ্ছে
        const combinedPrompt = `[System Info: ${myInfo}]\n\nUser Question: ${userText}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ 
                        role: "user",
                        parts: [{ text: combinedPrompt }] 
                    }]
                })
            });

            const data = await response.json();
            
            if(data.error) {
                lastMsg.innerText = "API Error: " + data.error.message;
                return;
            }

            const replyText = data.candidates[0].content.parts[0].text;
            lastMsg.innerText = replyText;
        } catch (error) {
            lastMsg.innerText = "Sorry, network issue! Try again later.";
            console.error(error);
        }
    }

    // Handle Send
    function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'user');
        chatInput.value = '';
        getAIReply(text);
    }

    sendMsgBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});
