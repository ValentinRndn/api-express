#Fil Rouge

REST API codé avec la librairie js Express.
Cette application permet de créer une discussion avec un personnage fictif dans un univers donné.
Le tout géré avec l'API d'Openai et de StableDiffusion.

##Environnement

NodeJs dans sa version v18.17.1
NPM dans sa version 10.1.0
MySql2

##Installation

- Clôner le dépôt 
```git clone https://github.com/ValentinRndn/api-express.git```

-Installer toutes les dépendances nécessaires au projet
```npm i```

-Mise en place de la base de données
Créer une base de données MySQL appelé "fil_rouge"
Importer le fichier fil_rouge.sql (assets/fil_rouge.sql)

-Mise en place de l'environnement


1. Créer le fichier .env
2. Créer une clé secrète pour créer le token
3. Ecrire les clés api pour Openai et StableDiffusion
4. S'identifier auprès de la base de données

##Lancement
1. Exécuter l'application: "node index.js"

##Utilisation
1. Ouvrir l'application Postman et importer la collection (assets/collection_postman)
2. Créer un utlisateur
3. Créer un token et inscrivant le pseudo & le mot de passe
4. Renseigner le token généré pour chacune des requêtes suivantes
5. Créer un univers
6. Créer un univers
7. Il ne vous reste plus qu'à dialoguer avec la personne
