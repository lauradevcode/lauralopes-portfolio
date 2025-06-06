function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}

// Typewriter Effect

const texts = [
    "especialista em Design para negócios digitais e físicos"
]

let speed = 80; // Aumentando um pouco a velocidade
let pauseTime = 2000; // Tempo de pausa entre os textos
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed); 
    }
    else{
        setTimeout(eraseText, pauseTime)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// Função para alternar o tamanho da fonte
let fontSizeIncreased = false;

function toggleFontSize() {
    const body = document.body;
    if (!fontSizeIncreased) {
        body.style.fontSize = '120%';
        fontSizeIncreased = true;
    } else {
        body.style.fontSize = '100%';
        fontSizeIncreased = false;
    }
}

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    // Alterna a classe do tema
    body.classList.toggle('light-theme');

    // Atualiza o ícone
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Função para debug dos cards
function debugCards() {
    console.log('Debugging cards...');
    const projectCards = document.querySelectorAll('.project-card');
    console.log(`Found ${projectCards.length} project cards`);
    
    projectCards.forEach((card, index) => {
        console.log(`Card ${index + 1}:`, {
            visibility: window.getComputedStyle(card).visibility,
            display: window.getComputedStyle(card).display,
            opacity: window.getComputedStyle(card).opacity,
            transform: window.getComputedStyle(card).transform
        });
    });
}

// Carrega o tema salvo ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // Debug cards
    debugCards();
    
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Remover qualquer estilo inline que possa estar causando problemas
        card.removeAttribute('style');
        
        // Aplicar estilos básicos
        card.style.opacity = '1';
        card.style.transform = 'none';
        card.style.display = 'block';
        card.style.visibility = 'visible';
    });
    
    // Typewriter effect
    typeWriter();
    
    // Debug cards novamente após aplicar estilos
    setTimeout(debugCards, 1000);
    
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        icon.className = 'fas fa-moon';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.getElementById('projects');
    const loadMoreProjectsBtn = document.getElementById('load-more-projects');

    // Inicializar os cards
    hideExtraCards(projectsSection);


    // Reset quando a seção sair da viewport
    window.addEventListener('scroll', function() {
        const projectsRect = projectsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (projectsRect.top > windowHeight || projectsRect.bottom < 0) {
            hideExtraCards(projectsSection);
            if (loadMoreProjectsBtn) loadMoreProjectsBtn.style.display = 'block';
        }

    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('#projects');
    
    sections.forEach(section => {
        section.addEventListener('mousemove', e => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            section.style.setProperty('--mouse-x', `${x}px`);
            section.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
