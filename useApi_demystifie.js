import {
    useEffect, useState
} from 'react';

import axios from 'axios';

// useApi prend un seul parametre : l'url sur laquelle faire la requete GET
function useApi(url) {
    // on prépare un état qui contiendra nos données
    const [data, setData] = useState(null);
    // un autre état pour indiquer si la requete est en cours de chargement
    const [loading, setLoading] = useState(true);

    // un effet qui est joué lorsque l'url change
    useEffect(() => { // la fonction joué dans l'effet
        // la fonction async qui va faire la requête
        const loadData = async () => {
            // si l'url existe...
            if (url) {
                // je me met en chargement...
                setLoading(true);
                // je fais la requete
                const response = await axios.get(url);
                // je stocke les data
                setData(response.data);
            }
            // si jarrive ici, comme ya un await, c'est que c'est fini
            // je remet le loading a false.
            setLoading(false);
        };

        loadData();
        },
        [url], // le tableau de dépendance : si url change, l'effet est joué
    );

    // a la fin du hook, on renvoie 3 trucs :
    // les données
    // un booléen de chargement
    // une fonction pour modifier après ocup les données
    return [data, loading, setData];
}

export default useApi;