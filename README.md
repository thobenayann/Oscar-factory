# O'Scar

## Exo J4

J'ai vu avec le dev back, il y a une query dont tu ne t'es pas servi, `GetAllFavorites`. Elle permet de récupérer TOUS les films mis en favoris par TOUS les utilisateurs.

Du coup je me dis que ca serait sympa de faire une page, qui liste tous les films favoris, et par qui ils ont été ajoutés en favori.

Tu es totalement libre niveau design. La route pourrait s'apeller `/most-liked-movies` ?

Bonus : Ah. Si un film a été ajouté en favori par plusieurs personnes :) :) Ce serait bizarre de l'afficher 2 fois :) Il faudrait afficher le film, et toutes les personnes qui l'ont mis en favori.

## Exo J3

Super je vois que tu maitrise bien les mutations maintenant.

On a une nouvelle demande, le patron voudrait qu'on ait un système de favoris.

En tant qu'utilisateur, je peux ajouter certains des films en favoris, et retrouver mes favoris sur une autre page.

Du coup il faudrait un bouton sur les cartes de film de la page d'accueil, et peut être aussi sur le détail d'un film "mettre en favori ce film".

Et dans le header, un lien vers une route, du genre /my-favorites.

J'ai vu avec le dev back, l'api est prête pour ça, bien sur n'oublie pas de la git pull dans le doute.

Pour le design, je te laisse faire a ta sauce, fais nous un truc stylé ! Et essaye d'utiliser Material UI : <https://mui.com/material-ui/material-icons/?query=heart&selected=FavoriteBorder>.

### CHALLENGE jour 2

T'a vu c'est pas mal les LazyQuery ! Même si c'est un peu plus désagréable a écrire.

Bon tu commence a bien maitriser le truc, tu te doute de la suite, faut continuer d'adapter nos composants.

Je te propose de commencer par `<UserReviews />`. Fais attention car il utilise le composant `<Review>` qui est aussi utilisé du côté de `<MovieDetail />`.

Pour rappel :

- Dans MovieDetail, le composant `<Review />` affiche dans son titre le nom du user
- Dans UserReviews, il doit afficher le titre du film noté

Si tu arrive pas a rendre `<Review />` générique c'est pas grave, tu as le droit de faire un autre sous-composant.

Une fois que tu as fini, en `bonus`, tu peux aller voir du côté de `<MovieAdd />`. Il y a dedans 2 inputs : recherche du film, et choix des catégories. Il te faudra utiliser des `useQuery` et / ou des `useLazyQuery` pour les faire marcher.

Si tu en veux encore, je suppose que tu peux commencer a te renseigner sur `useMutation` :)

----------------

Salut le plus si nouveau, comment ca va ?

Bon je vois que le lead dev t'a montré comment utiliser le hook useQuery pour récupérer des données sur notre endpoint GraphQL. Il me dit que vous avez aussi vu les variables et la génération de type.
Du coup je te propose d'adapter petit a petit les composants :

- Commence par Categories
  - juste affichage d'une liste de catégories
- Puis CategoryDetail
  - affichage du titre de la catégorie + de tous les films dedans
- Si tu as toujours du jus, essaye MovieDetail (il pique un peu)

Remarques :

- teste bien tes requêtes dans le studio apollo
- **n'oublie pas de générer les types et de t'en servir**
- avance progressivement et commit souvent !
- n'oublie pas d'effacer les anciens imports dont tu ne te sers plus (typiquement les anciens types)
- Si tu te rapelle plus a quoi ca ressemblait, tu peux relancer ton api REST temporairement pour voir le rendu.

## Intro

Bienvenue le nouveau chez Aleo Technologies.

On va te mettre sur un projet pour un client, c'est pour faire un petit site de critiques de film.

Le but est que des utilisateurs puissent ajouter des films, les catégoriser, et poster des critiques dessus.

Pour faire ce projet on s'est appuyé sur une api externe, je te laisse créer ton compte : <https://www.omdbapi.com/apikey.aspx>

L'idée c'est d'utiliser cette API externe pour récupérer les info des films, et la notre pour les stocker, définir leurs catégories, et poster des reviews.

Du coup je te laisse voir avec le développeur back pour faire marcher localement notre api, il te faudra créer un user et un role postgres, regarde bien le Readme. Elle a une documentation avec Swagger.

Le dev front va prendre un peu de temps pour te présenter le projet et comment fonctionne React.

On utilise une librairie de composants : Material UI, il te faudra sans doute lire sa documentation : <https://mui.com/>

N'oublie pas d'installer les dépendances avec `npm install` avant de lancer le projet avec `npm start`.

Il y a aussi un .env à mettre en place, tu peux te baser sur le .env.example et y placer ta clé api.

Ensuite on a préparé un ensemble de tickets, on a essayé de te donner quelques pistes dedans. Tu peux les faire dans l'ordre que tu veux, on a noté la difficulté.

Ah et je crois que le stagiaire a tout cassé avant de partir en Thailande vendredi, on dirait que ca ne marche plus du tout, une histoire sur le composant Header.

### Tickets jour 4

| Type       | Titre                                                       | Description                                                                                                                                                                                                                                                                                                        | Difficulté  |
|----------- |------------------------------------------------------------ |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |------------ |
| Evolution  | Récupérer le User dans tous nos composants                  | Le User, on en a besoin de partout dis-donc ! C' est un peu pénible de le transmettre par les props sur plusieurs niveaux... Il me semble qu'on peut utiliser les Context de React pour répondre à cette problématique, tu peux regarder ça ?                                                                      | Moyen       |
| Feature    | Ajouter une page pour les catégories et une page catégorie  | Bon pour l'instant on a pas beaucoup de films, on s'y retrouve mais ça va pas durer cette histoire... Il faudrait faire une page qui permette de présenter toutes les catégories de film et une page affichant la liste des films par catégories. J'ai vérifié avec le développeur back, l'API est prête pour ça.  | Moyen       |

### Tickets jour 3

| Type      | Titre                                             | Description                                                                                                                                                                                                                                                     | Difficulté   |
|-----------|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| Evolution | Faire un formulaire de saisie de review plus sexy | Bon c'est bien gentil ton truc sans CSS mais c'est naze. Trouve de jolis composants MUI pour que ce soit plus beau.                                                                                                                                             | Moyen        |
| Feature   | Voir les reviews saisies par un utilisateur       | Je voudrais une page pour voir toutes les reviews saisies par un utilisateur. La route ce serait genre /user/:id/reviews. Je crois que l'api est prete, tu es grand maintenant je te laisse regarder hihi (ne pas oublier de git pull l'api)                    | Difficile    |
| Evolution | Ajouter une page 404                              | Si on essaye d'aller sur une URL qui existe pas, ca fait un truc tout bizarre et moche. Tu peux nous faire une jolie page 404 ? Il te faudra probablement regarder la doc de react-router-dom (attention on est en v6)                                          | Facile       |
| Evolution | Conserver le token                                | Bon ca fait un peu pitié de devoir se reconnecter a chaque visite. Tu peux essayer de trouver un systeme pour conserver les infos de connexion ? Je crois que tu peux essayer avec le local storage, ou les cookies je sais plus je confonds toujours les deux. | Exploratoire |

### Tickets jour 2

| Type      | Titre                             | Description                                                                                                                                                                                                 | Difficulté                |
|-----------|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Evolution | Afficher plus d'infos sur le film | On affiche déja les acteurs du film depuis OMDB. Je voudrais aussi voir le réalisateur (Director) et le résumé (Plot). Ah et utilise des composants de Material UI ein, je te vois.                         | Facile                    |
| Evolution | Changer le titre de la page       | Il faudrait que le titre de la page affiche "O'scar - N films" pour la page d'accueil et "Film - N critiques" pour la page d'un film. Je crois qu'il faut utiliser useEffect.                               | Moyen                     |
| Feature   | Ajouter un filtrage de film       | Je voudrais, sur la page d'accueil, avoir un champ controlé pour filtrer les films ajoutés. Attention je ne parle pas de la création, mais bien de filtrer par leur nom les films qui ont déja été ajoutés. | Moyen+                    |
| Feature   | Pouvoir créer un compte.          | Je voudrais pouvoir m'inscrire sur le site. Le dev back m'a dit que l'api est prete pour ca. Tu peux t'inspirer de la connexion, ca devrait pas être très différent je crois                                | Difficile et exploratoire |
| Feature   | Pouvoir poster une review.        | J'aimerais aussi pouvoir poster une review. L'api est prete pour m'a dit le dev back.                                                                                                                       | Difficile et exploratoire |

### Tickets jour 1

| Type      | Titre                                         | Description                                                                                                                                                                                                                                                                                  | Difficulté                |
|-----------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|
| Bug       | Problème dans le composant Header             | Je crois que y'a un problème avec ce que recoit le composant Header Je crois que c'est "user" c'est bizarre avec Typescript on devrait pas avoir ce problème, bon vérifie qu'on donne bien ce qu'il faut au composant                                                                        | Moyen                     |
| Bug       | Problème d'affichage du logo                  | Le logo du site ne s'affiche pas. Tu peux regarder ? Je crois que les images ca marche différemment en React.                                                                                                                                                                                | Facile                    |
| Evolution | Afficher les catégories sur la page d'un film | Il manque les catégories d'un film sur la page détail. Les données sont déja présentes je crois, il faut juste les afficher. Hésite pas a bien regarder la doc de material ui pour trouver un composant adapté. Il te faudra un map, tu peux regarder celui de MovieList                     | Moyen                     |
| Evolution | Afficher les reviews sur la page d'un film    | Il manque les reviews d'un film sur la page détail. Les données sont déja présentes je crois, il faut juste les afficher. Ah il y a un composant déja créé que tu peux utiliser, MovieDetail/Review. Il te faudra un map, tu peux regarder celui de MovieList                                | Facile                    |
| Evolution | Masquer le bouton login / logout              | Il faudrait masquer le bouton login / logout en fonction de si l'on est connecté ou pas. Pour faire un affichage conditionnel tu peux utiliser un ternaire il me semble ou bien l'opérateur &&                                                                                               | Moyen                     |
| Feature   | Ajouter un thème sombre                       | On a déja mis en place un bouton pour passer en thème sombre. Il faudrait le brancher sur notre état et material ui, je te laisse lire la doc pour trouver comment faire                                                                                                                     | Difficile et exploratoire |
| Feature   | Récupérer les infos supplémentaires du film   | Sur la page détail du film, il faudrait déclencher une requete sur l'api externe pour obtenir plus de détails sur le film et les afficher : <https://www.omdbapi.com/?i=ID_IMDB_DU_FILM&apikey=CLE_API>. Tu peux t'inspirer des autres appels à useApi, n'oublie pas de bien donner ton apiKey | Difficile et exploratoire |
| Evolution | Afficher de jolies étoiles pour les notes     | J'ai vu dans la doc de Material Ui que y'a un composant pour afficher des étoiles, mais j'ai oublié son nom. Je te laisse regarder :)                                                                                                                                                        | Facile                    |
