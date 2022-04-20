/* eslint-disable */
import React, { useState } from 'react';

// == Composant
function App() {
  // useState nous permet de manipuler un état.
  // il nous renvoie un tableau.
  // la premiere case est la donnée.
  // la seconde case est une fonction, pour modifier la donnée
  // le parametre de useState sera la valeur initiale de mon état.
  // lorsque j'appelerai la fonction de modif, je donnerai la nouvelle valeur que je veux.
  const [isPlaying, setIsPlaying] = useState(false);

  // un état pour notre email. Je veux le brancher sur mon input
  const [email, setEmail] = useState('toto@oclock.fr');

  return (
    <div className="app">
      <button
        type="button"
        onClick={() => {
          // ici jappelle la fonction de modif pour inverser la valeur.
          // ce qui déclenchera ensuite un nouveau rendu.
          setIsPlaying(!isPlaying);
        }}
      >
        {isPlaying ? 'Mettre en pause la musique' : 'Jouer la musique'}
      </button>
      <input
        value={email}
        // lorsque l'input est modifié par l'utilisateur
        onChange={(event) => {
          // dans event.target.value, je vais récupérer la saisie utilisateur
          setEmail(event.target.value);
        }}
        type="text"
        placeholder="Votre email"
      />
    </div>
  );
}

// == Export
export default App;
