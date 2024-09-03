

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
    emailjs.init("YOUR_USER_ID"); // Sostituisci "YOUR_USER_ID" con il tuo user_id di EmailJS
})();

// Altri script relativi alla tua applicazione
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene il comportamento predefinito del form

    // Parametri per l'email
    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    // Invio dell'email tramite EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", params)
        .then(function(response) {
            alert("Messaggio inviato con successo!", response.status, response.text);
        }, function(error) {
            alert("Errore nell'invio del messaggio:", error);
        });
});


//Recensioni click dot
let slideIndex = 1;
showSlides(slideIndex);

// Cambia la scheda corrente quando clicchi su un puntino
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Mostra la scheda corrispondente e attiva il puntino associato
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("carousel-item");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1} // Se supera il numero di schede, torna alla prima
    if (n < 1) {slideIndex = slides.length} // Se è inferiore a 1, vai all'ultima scheda
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  // Nascondi tutte le schede
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", ""); // Rimuovi la classe attiva da tutti i puntini
    }
    slides[slideIndex-1].style.display = "block";  // Mostra la scheda corrente
    dots[slideIndex-1].className += " active"; // Aggiungi la classe attiva al puntino corrente
}
