import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "./init";

export function connexion() {
    signInWithPopup(firebaseAuth, googleProvider).then(
        (u) => console.log("utilisateur", u)
    ).catch(
        (error) => console.error("Erreur lors de la connexion", error)
    );
}