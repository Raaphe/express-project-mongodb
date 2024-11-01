import httpApp from './app';
import mongoose, { connect, ConnectOptions } from 'mongoose';
import { config } from './config/config';
import  Book  from "./models/book.model"

const PORT = config.port;
const connectOptions : ConnectOptions = {dbName: "books", serverApi : {version : "1", deprecationErrors: true, strict: true}};

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  console.log(config.cluster_uri);
  
  await connect(config.cluster_uri ?? "", connectOptions);

  const book = new Book({
    author: "Joe mama",
    title: "oooo"
  });

  await book.save();

  console.log(book); 
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
  console.log('Connexion à MongoDB réussie');
});




// Démarrer le serveur
httpApp.listen(PORT, () => {
    console.log(`Serveur en écoute sur <http://localhost>:${PORT}`);
});

