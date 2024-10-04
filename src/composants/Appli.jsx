import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { obtenirCommentaires } from '../code/commentaire-modele';
import { bd, collBandes } from '../code/init';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import Entete from './Entete';
import Acceuil from './Acceuil';
import Footer from './Footer';

function Appli() {
    const auth = getAuth();
    const [indexBande, setIndexBande] = useState(0);
    const [commentaires, setCommentaires] = useState([]);
    const [urlImage, setUrlImage] = useState("");
    const [aime, setAime] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return unsubscribe;
    }, [auth]);

    async function chargerCommentaires() {
        const refCollBandes = collection(bd, collBandes);
        const snapshot = await getDocs(refCollBandes);
        const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (documents[indexBande]) {
            const idBandeActuelle = documents[indexBande].id;
            const urlBandeActuelle = documents[indexBande].url;
            const commentaires = await obtenirCommentaires(idBandeActuelle);
            const aime = documents[indexBande].aime || [];

            setCommentaires(commentaires);
            setUrlImage(urlBandeActuelle);
            setAime(aime);
        }
    }

    async function ajouterAime() {
        if (!userId) {
            toast.error("Veuillez vous connecter pour aimer ce post");
            return;
        }
        const idBandeActuelle = (await getDocs(collection(bd, collBandes))).docs[indexBande].id;
        const bandeRef = doc(bd, collBandes, idBandeActuelle);
        
        if (!aime.includes(userId)) {
            await updateDoc(bandeRef, {
                aime: arrayUnion(userId)
            });
            setAime([...aime, userId]);
        }
    }

    async function enleverAime() {
        if (!userId) {
            toast.error("Veuillez vous connecter pour enlever votre like");
            return;
        }
        const idBandeActuelle = (await getDocs(collection(bd, collBandes))).docs[indexBande].id;
        const bandeRef = doc(bd, collBandes, idBandeActuelle);
        
        if (aime.includes(userId)) {
            await updateDoc(bandeRef, {
                aime: arrayRemove(userId)
            });
            setAime(aime.filter(id => id !== userId));
        }
    }

    useEffect(() => {
        chargerCommentaires();
    }, [indexBande]);

    return (
        <div className="Appli">
            <Entete />
            <Acceuil
                commentaires={commentaires}
                chargerCommentaires={chargerCommentaires}
                urlImage={urlImage}
                setIndexBande={setIndexBande}
                indexBande={indexBande}
                aime={aime}
                ajouterAime={ajouterAime}
                enleverAime={enleverAime}
                userId={userId}
            />
            <Footer />
            <ToastContainer /> {/* Ajouter le conteneur de toast ici */}
        </div>
    );
}

export default Appli;
