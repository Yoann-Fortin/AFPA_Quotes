// Ceci est un commentaire sur une seule ligne

/* Et voici un exemple
de commentaire sur plusieurs lignes*/

/**
 * Ceci est un DocBlock, utile pour commenter une variable ou une fonction par exemple
 * et qui sera disonible dans son IDE, peu importe où est rappelée cette fonction, méthode ou autre.
 */

(function() {
    console.log("Je suis une fonction anonyme");
})();


const a = 1;
if (a === 1) {
    console.log(true)
} else {
    console.log(false)
}

(a === 1) ? console.log(true): false;