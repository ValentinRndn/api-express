const express = require("express");


//Import des routes
const verifyToken = require('./middleware/verifyToken');
const characterRoute = require('./routes/characterRoute');
const messageRoute = require('./routes/messageRoute');
const universRoute = require('./routes/universRoute');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(express.json());

//Appel des différentes routes
app.use(verifyToken);
app.use('/character', characterRoute );
app.use('/message', messageRoute);
app.use('/univers', universRoute );
app.use('/user', userRoute);


// Démarrer le serveur Express sur un port
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
