import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import './Entete.scss';
import FavoriteIcon from '@mui/icons-material/Favorite';
import googleImage from '/admin/google.png';
import logo from '/admin/logo.png';
import { connexion } from '../code/utilisateurs';
import { firebaseAuth } from '../code/init'; // Assurez-vous d'importer firebaseAuth correctement

function Entete() {
    const [estConnecte, setEstConnecte] = useState(false);

    useEffect(() => {
        // Vérifiez l'état de la connexion utilisateur
        const desabonnement = firebaseAuth.onAuthStateChanged((utilisateur) => {
            if (utilisateur) {
                setEstConnecte(true);
            } else {
                setEstConnecte(false);
            }
        });

        // Nettoyage
        return () => desabonnement();
    }, []);

    const gestionClickConnexion = () => {
        if (estConnecte) {
            firebaseAuth.signOut();
        } else {
            connexion();
        }
    };

    return (
        <div className='Entete'>
            <div className='top'>
                <div className="titre">
                    <h3>Univers Comics</h3>
                    <img className='logo' src={logo} alt="logo" />
                </div>
                <div 
                    className={estConnecte ? 'deconnexion' : 'connexion'} 
                    onClick={gestionClickConnexion}
                >
                    <img className='google-img' src={googleImage} alt="Google" />
                    <h3>{estConnecte ? 'Déconnexion' : 'Connexion'}</h3>
                </div>
            </div>
        </div>
    );
}

export default Entete;
