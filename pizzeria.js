// la pizzeria.

let tomatoStock = 10;

function calculerTempsDeCuissonAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createPizza(type) {
    return new Promise((resolve, reject) => {
        if (tomatoStock < 2) {
            // on n'a pas assez de tomate. 
            // nous allons donc ROMPRE / REJETER notre promesse.
            reject('Plus de tomate déso lol salut');
        }
        else {
            // c'est bon j'ai assez de tomate

            // je réduis mon stock
            tomatoStock = tomatoStock - 2;

            // je met la pizza au four
            // la pizza met entre 5 et 10 secondes a se faire.
            setTimeout(() => {
                const newPizza = {
                    base: 'tomate',
                    type: type
                };
                // quand la pizza est prête, je vais "résoudre ma promesse"
                resolve(newPizza);
            }, calculerTempsDeCuissonAleatoire(5, 10) * 1000); // x1000 car milissecondes);
        }
    });
}

Promise.all([
    createPizza('calzone'),
    createPizza('ananas'),
    createPizza('chèvre miel')
]).then((pizzas) => {
    console.log('Les pizza pour la table 55');

    pizzas.forEach((pizza) => {
        console.log('voici la :', pizza.type);
    });
}).catch((error) => {
    console.log('On se casse, vous me dites ' + error + ' cest nimporte quoi je vous mettrai un mauvais avis');
});
