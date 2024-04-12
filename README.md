Mini-Projet : Cinéma

Projet à réaliser seul.
Un cinéma d'un petit village isolé souhaite proposer des films à l'affiche pour attirer plus de jeunes des villages alentours. 

Pour atteindre cet objectif, les gérants du cinéma décident de vous missionner pour créer une application permettant de demander aux clients, via un site internet, quels films seront projetés chaque jour en salle.

Voici le cahier des charges fourni :
Livrables :

Un site web, contenant au moins les 3 pages suivantes :

    index.html : Page d'accueil du site internet montrant les films en tendance pour la journée,
    search.html : Page permettant de rechercher des films,
    movie.html : Page permettant de d'afficher les détails d'un film spécifique et d'y laisser un commentaire.

Un utilisateur devra pouvoir se connecter avec son compte TheMovieDB pour laisses des commentaires sous les films.
Attention :

Il est nécessaire d'utiliser un serveur http pour accéder à vos pages. Vous pourrez utiliser :

    Live Server sur VS CODE
    serve (un paquet NPM) - pour celui-ci, vous pouvez reprendre le script "npm start" des exercices avec batteries de tests

Il est fortement recommandé d'utiliser plusieurs fichiers JS (ou TS) et de les faire traiter par un bundler.
Il est fortement recommandé d'avoir un bundle par page au lieu d'un seul pour toutes les page (sauf logique partagé entre pages, comme l'authentification par exemple)
Critères de notation :
Index.html (25pts)

    Afficher les films en tendance (5 pts)
    Pour chaque film, les informations suivantes doivent êtres affichées : (5 pts)
        Son poster
        Son nom
        Sa date de sortie
        Un lien pour en savoir plus (devra rediriger vers movie.html)
        Un bouton pour charger plus de films en tendance (bonus: infinite scroll) (10pts + 5pts bonus)

Search.html (25pts)

La page devra contenir :

    Une barre de recherche
    Les résultats de la recherche en temps réel (20 pts)
    Interdiction de causer un rechargement de la page pendant ou après la recherche (0 pts sur l'ensemble de la partie si ce n'est pas respecté)
    Un bouton pour charger plus de résultats de recherche (bonus: infinite scroll) (5pts bonus)

Pour chaque résultat de la recherche afficher: (5 pts)

    Le poster du film
    Le titre du film
    Un lien pour en savoir plus (devra rediriger vers movie.html)

Movie.html (25pts)

La page devra contenir :

    Le titre du film
    Le poster du film
    Le résumé du film
    Les commentaires du film

Pour chaque commentaire, il est nécessaire d'afficher :

    Le nom de l'utilisateur qui a laissé le commentaire
    L'image de profil de l'utilisateur
    La date de publication
    Le contenu du commentaire

Authentification (25 pts)

    L'utilisateur doit pouvoir se connecter avec son compte TMDB (5 pts)
    Une fois connecté, l'utilisateur doit le rester à la réouverture du navigateur (5 pts)
    Une fois connecté, l'utilisateur doit pouvoir ajouter des reviews (10 pts)
