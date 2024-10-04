import objetConfig from './config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialiser les services de Firebase (crééer une référence à une appli)
export const appli = initializeApp(objetConfig);

// Initialiser Firebase Authentication
export const firebaseAuth = getAuth(appli);

// Initialiser l'authentification fédérée avec Google (GoogleAuthProvider)
export const googleProvider = new GoogleAuthProvider(); 

//initialiser Firestore
export const bd = getFirestore(appli); 


// Noms des collections Firestore utilisées dans l'appli
export const collBandes = 'jse-bandes';
export const collComs = 'commentaires';
export const collUtilisateurs = 'jse-utilisateurs';
