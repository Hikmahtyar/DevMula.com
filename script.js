document.addEventListener('DOMContentLoaded', function() {
    
    // Init AOS Animation
    AOS.init({
        once: true,
        offset: 100,
        duration: 800,
    });

    // Dark Mode Logic
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlTag = document.documentElement;
    const icon = toggleBtn.querySelector('i');

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlTag.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlTag.setAttribute('data-theme', newTheme);
        icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });

    // Navbar Scroll Logic
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '1.2rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); 
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

});

// Modal Logic
const modal = document.getElementById("demoModal");
const link1 = document.getElementById("linkDemo1");
const link2 = document.getElementById("linkDemo2");

function bukaModal(kategori) {
    if (kategori === 'kopi') {
        link1.href = "projects/coffee/demo1.html";
        link1.innerHTML = "☕ Rustic Theme";
        link2.href = "projects/coffee/demo2.html";
        link2.innerHTML = "🏙️ Modern Theme";
    } else if (kategori === 'laundry') {
        link1.href = "projects/laundry/demo1.html";
        link1.innerHTML = "☀️ Bright Theme";
        link2.href = "projects/laundry/demo2.html";
        link2.innerHTML = "🌙 Dark Theme";
    } else if (kategori === 'undangan') {
        link1.href = "projects/undangan/demo1.html";
        link1.innerHTML = "🎎 Wayang";
        link2.href = "projects/undangan/demo2.html";
        link2.innerHTML = "🌸 Floral";
    }
    modal.style.display = "flex";
}

function tutupModal() {
    modal.style.display = "none";
}

window.onclick = function(e) {
    if (e.target == modal) tutupModal();
}