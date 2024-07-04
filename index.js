import 'dotenv/config';
import { createServer } from 'http';
import app from './app/index.app.js';
import fetch from 'node-fetch'; // Assurez-vous d'avoir installé node-fetch

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000; // Fournir une valeur par défaut pour PORT

app.get('/login', async (req, res) => { // Utiliser async ici
    try {
        const login = {
            "email": "john.doe@example.com",
            "password": "hashed_password1"
          }
        const response = await fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login)
        });
        const data = await response.json(); // Attendre la conversion de la réponse en JSON
        console.log(data);
        res.send(data); // Envoyer la réponse JSON au client
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

app.get('/games', async (req, res) => { // Utiliser async ici
    try {
        const response = await fetch('http://localhost:3000/api/v1/games', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json(); // Attendre la conversion de la réponse en JSON
        console.log(data);
        res.send(data); // Envoyer la réponse JSON au client
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données');
    }
});

httpServer.listen(PORT, () => {
  console.log(`Server launched at localhost:${PORT}`);
});