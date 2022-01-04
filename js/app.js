// --- Events ---
// une liste d'évènements est mise à disposition par JS et le navigateur
// par exemple, l'évènement "click"
// Quand l'évènement arrive/survient, JS exécute toutes les fonctions attachées à cet évènement
// => l'exécution de la fonction attachée est désynchronisée

// On place notre code dans un module
const app = {
    // Propriété "counter"
    currentQuoteIndex: 0,

    // Appel de  propriétées
    quote: document.getElementById('quote'),
    author: document.getElementById('author'),
    citationDisplay: document.getElementById('input-quote'),
    authorDisplay: document.getElementById('input-author'),

    // !============= Liste des Méthodes =============

    // ==== Méthode appelée au chargement du DOM ====

    init: function() {
        // attache la méthode app.handleClickOnDisplayAddFormButton à l'évènement "click" sur le bouton "ajouter une citation"
        document.getElementById('btnDisplayAddForm').addEventListener('click', app.handleClickOnDisplayAddFormButton);

        // Afficher la première excuse de dév
        app.displayCurrentQuote();

        // Attacher les différentes méthodes selon les boutons
        document.getElementById('nav-first').addEventListener('click', app.handleClickOnFirstButton);
        document.getElementById('nav-prev').addEventListener('click', app.handleClickOnPrevButton);
        document.getElementById('nav-next').addEventListener('click', app.handleClickOnNextButton);
        document.getElementById('nav-last').addEventListener('click', app.handleClickOnLastButton);

        // Ajout du listener sur le bouton soumission du formulaire
        document.getElementById('addQuoteForm').addEventListener('submit', app.handleSubmit);

        // Ajout d'évènements sur les champs d'ajouts de citation et auteur
        app.citationDisplay.addEventListener('keyup', app.handleKeyUp);
        app.authorDisplay.addEventListener('keyup', app.handleKeyUp);

    },

    // !==== Méthodes gérant le Formulaire ====!

    // Méthode gérant le click pour afficher le form d'ajout 

    handleClickOnDisplayAddFormButton: function(e) {
        document.getElementById('divAddQuote').classList.remove('d-none');
    },

    // Méthode pour vérifier le nombre de caractères dans les champs de soumissions

    handleKeyUp: function(e) {

        // La fonction 'trim' permet de ne pas compter les espaces avant et après le texte
        if (e.currentTarget.value.trim().length < 3) {
            // Une alternative à l'ajout de style, sans passer par un fichier CSS
            e.currentTarget.style.borderColor = "red";
        } else {
            e.currentTarget.style.borderColor = "green";
        }
    },

    // Méthode pour soumettre le formulaire
    handleSubmit: function(e) {
        e.preventDefault();

        // On cible les input pour les citations et les auteurs et on récupère les valeurs
        let citation = document.getElementById('input-quote').value;
        let author = document.getElementById('input-author').value;

        // On crée un tableau avec les mêmes clés et on lui affecte les valeurs récupéré plus haut
        let tab = {
            quote: citation,
            author: author
        };

        // On push les données dans le tableau si les champs sont correctement remplis
        if (citation.length >= 3 && author.length >= 3) {
            quotes.push(tab);
            document.getElementById('input-quote').value = '';
            document.getElementById('input-quote').style.borderColor = "lightgray";
            document.getElementById('input-author').value = '';
            document.getElementById('input-author').style.borderColor = "lightgray";
            document.getElementById('divAddQuote').classList.add('d-none');
        } else if (citation.length >= 3) {
            alert("Le nom de l'auteur doit faire plus de 2 caractères")
        } else if (author.length >= 3) {
            alert("La citation doit faire plus de 2 caractères")
        } else {
            alert("Le nom de l 'auteur et la citation doivent faire plus de 2 caractères")
        }
    },

    // !==== Méthode permettant de modifier le DOM pour afficher la quote "courante" ====!

    displayCurrentQuote: function() {
        // TSe baser sur app.currentQuoteIndex pour afficher la quote "courante"
        app.quote.textContent = quotes[app.currentQuoteIndex]['quote'];
        app.author.textContent = quotes[app.currentQuoteIndex]['author'];
    },

    // !==== Méthodes gérant les event sur les boutons de défilement des citations ====!

    //  Méthode pour la gestion du click sur le bouton "First" 
    handleClickOnFirstButton: function() {
        app.currentQuoteIndex = 0;
        app.displayCurrentQuote();
    },

    // Méthode pour la gestion du click sur le bouton "Previous"
    handleClickOnPrevButton: function() {
        // On ne lance l'evt que si l'index est différent de 0
        if (app.currentQuoteIndex !== 0) {
            app.currentQuoteIndex--;
            app.displayCurrentQuote();
        }
    },

    // Méthode pour la gestion du click sur le bouton "Next"
    handleClickOnNextButton: function() {
        // On ne lance l'event que si l'index est inférieur à la longueur du tableau -1
        if (app.currentQuoteIndex < quotes.length - 1) {
            app.currentQuoteIndex++;
            app.displayCurrentQuote();
        }
    },

    // Méthode pour la gestion du click sur le bouton "Last"
    handleClickOnLastButton: function() {
        app.currentQuoteIndex = quotes.length - 1;
        app.displayCurrentQuote();
    }

};

// Appel "synchronisé" de la méthode init
// app.init();

// Permet d'exécuter notre code une fois le DOM chargé
// => lorsque l'event DOMContentLoaded survient => la méthode app.init est appelée
// donc app.init n'est pas exécuter lorsque JS lit cette ligne de code
// ici, ne jamais mettre les (), sinon, la fonction/méthode sera aussitôt exécutée
document.addEventListener('DOMContentLoaded', app.init);

// Attention à la syntaxe, on ne doit pas mettre les () après la fonction, sinon elle est appelée aussitôt
// Explications :
// envoie de l'eau, au lancement du détecteur
// document.addEventListener('détecteurActivé', envoyerDeLeau());
// Lorsque de la fumée sera détectée, envoie de l'eau
// document.addEventListener('fuméeDetectée', envoyerDeLeau)