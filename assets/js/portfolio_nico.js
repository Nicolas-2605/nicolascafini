//HambugerMenu
const hamburgerMenu = document.querySelector ('.hamburgerMenu');
const menuItems = document.querySelector ('.menuItems');
const menuChoices = document.querySelectorAll ('.menuChoice');

hamburgerMenu.addEventListener('click', () => {
  menuItems.classList.toggle('show');
  hamburgerMenu.classList.toggle('open');
});

menuChoices.forEach(choice => {
  choice.addEventListener('click', () => {
    menuItems.classList.remove('show');
    hamburgerMenu.classList.remove('open');
  });
});



// Inizializzazione di EmailJS
(function(){
    emailjs.init("PHmEwKVcEJUloj21D"); // Sostituisci "YOUR_USER_ID" con il tuo user_id di EmailJS
})();

// Altri script relativi alla tua applicazione
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento predefinito del form
    console.log("Form submit intercettato"); // Messaggio di debug
    document.getElementById('loading-spinner').style.display = 'flex'; // Mostra lo spinner
    document.getElementById('confirmation-message').style.display = 'none'; // Nascondi eventuali messaggi precedenti
    // Parametri per l'email
    const params = {
        from_name: document.getElementById('name').value,
        reply_to: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    // Invio dell'email tramite EmailJS
    emailjs.send("service_edozv64", "template_73l0sa4", params)
    .then(function(response) {
        // In caso di successo
        document.getElementById('loading-spinner').style.display = 'none'; // Nascondi lo spinner
        showMessage("Messaggio inviato con successo!", "success"); // Mostra messaggio di successo
    }, function(error) {
        // In caso di errore
        document.getElementById('loading-spinner').style.display = 'none'; // Nascondi lo spinner
        showMessage("Errore nell'invio del messaggio. Riprova più tardi.", "error"); // Mostra messaggio di errore
    });

});


// Funzione per mostrare il messaggio di conferma o errore
function showMessage(message, type) {
    const messageElement = document.getElementById('confirmation-message');
    messageElement.textContent = message;
    
    if (type === "success") {
        messageElement.style.color = "green"; // Colore verde per successo
    } else {
        messageElement.style.color = "red"; // Colore rosso per errore
    }

    messageElement.style.display = 'block'; // Mostra il messaggio
}


let slideIndex = 0;  // Inizia dalla prima slide
const slides = document.querySelectorAll(".carousel-item");
const dots = document.querySelectorAll(".dot");
const carouselInner = document.querySelector(".carousel-inner");

let startX = 0;
let endX = 0;
let isDragging = false;
const SWIPE_THRESHOLD = 30; // Soglia per il riconoscimento del swipe

// Mostra la slide corrispondente e aggiorna i puntini
function showSlide(index) {
    if (index >= slides.length) slideIndex = 0;  // Se supera l'ultima slide, torna alla prima
    if (index < 0) slideIndex = slides.length - 1;  // Se è inferiore alla prima slide, torna all'ultima
    carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;  // Sposta il carosello
    
    // Aggiorna i puntini attivi
    updateDots();
}

// Funzione per spostarsi alla prossima slide
function nextSlide() {
    showSlide(slideIndex += 1);
}

// Funzione per tornare alla slide precedente
function prevSlide() {
    showSlide(slideIndex -= 1);
}

// Aggiorna lo stato dei puntini attivi
function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.remove("active");
        if (i === slideIndex) {
            dot.classList.add("active");  // Aggiungi la classe "active" al puntino corrente
        }
    });
}

// Funzione per navigare alla slide cliccando sul puntino
function currentSlide(n) {
    showSlide(slideIndex = n - 1);
}

// Gestione del "swipe" e "drag" per dispositivi touch e mouse
function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    isDragging = true;
}

function handleTouchMove(event) {
    if (!isDragging) return;
    endX = event.touches[0].clientX;

    // Prevenire lo scroll verticale durante lo swipe orizzontale
    event.preventDefault(); // Aggiunta per prevenire il comportamento di scroll verticale
}

function handleTouchEnd() {
    if (!isDragging) return;
    const diffX = startX - endX;

    if (diffX > SWIPE_THRESHOLD) { // Swipe sinistra (prossima slide)
        nextSlide();
    } else if (diffX < -SWIPE_THRESHOLD) { // Swipe destra (slide precedente)
        prevSlide();
    }

    // Resetta il flag di dragging e le variabili
    isDragging = false;
    startX = 0;
    endX = 0;
}

function handleTouchCancel() {
    isDragging = false; // Resetta il flag se il tocco viene cancellato
}

// Gestione drag per il mouse
function handleMouseDown(event) {
    startX = event.clientX;
    isDragging = true;
}

function handleMouseMove(event) {
    if (!isDragging) return;
    endX = event.clientX;
}

function handleMouseUp() {
    if (!isDragging) return;
    const diffX = startX - endX;

    if (diffX > SWIPE_THRESHOLD) { // Trascinamento verso sinistra (prossima slide)
        nextSlide();
    } else if (diffX < -SWIPE_THRESHOLD) { // Trascinamento verso destra (slide precedente)
        prevSlide();
    }

    // Resetta il flag di dragging
    isDragging = false;
    startX = 0;
    endX = 0;
}

// Aggiungi event listener per il touch e il mouse
carouselInner.addEventListener('touchstart', handleTouchStart);
carouselInner.addEventListener('touchmove', handleTouchMove);
carouselInner.addEventListener('touchend', handleTouchEnd);
carouselInner.addEventListener('touchcancel', handleTouchCancel); // Aggiunto l'evento touchcancel

carouselInner.addEventListener('mousedown', handleMouseDown);
carouselInner.addEventListener('mousemove', handleMouseMove);
carouselInner.addEventListener('mouseup', handleMouseUp);

// Imposta la prima slide inizialmente
showSlide(slideIndex);
