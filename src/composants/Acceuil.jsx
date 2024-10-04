import { IconButton } from '@mui/material';
import { NavigateNext, NavigateBefore, SkipNext, SkipPrevious } from '@mui/icons-material';
import { useState } from 'react'; // Importer useState pour gérer l'état du formulaire
import { toast } from 'react-toastify';
import Commentaires from './Commentaires';
import Aime from './Aime';
import { collBandes } from '../code/init';
import { ajouterCommentaire } from '../code/commentaire-modele';
import './Acceuil.scss';

function Acceuil({ commentaires, chargerCommentaires, urlImage, setIndexBande, indexBande, aime, ajouterAime, enleverAime, userId }) {
    const [nouveauCommentaire, setNouveauCommentaire] = useState('');

    const soumettreNouveauCommentaire = () => {
        if (!userId) {
            toast.error("Veuillez vous connecter pour ajouter un commentaire");
            return;
        }
        if (nouveauCommentaire.trim() !== '') {
            ajouterCommentaire(collBandes[indexBande].id, nouveauCommentaire, userId);
            setNouveauCommentaire('');
            chargerCommentaires();
        }
    };

    const suivant = () => {
        if (indexBande < collBandes.length - 1) {
            setIndexBande(indexBande + 1);
        }
    };

    const precedent = () => {
        if (indexBande > 0) {
            setIndexBande(indexBande - 1);
        }
    };

    const dernier = () => {
        setIndexBande(collBandes.length - 1);
    };

    const premier = () => {
        setIndexBande(0);
    };

    return (
        <div className='Acceuil'>
            <img src={urlImage} className='img-comics' alt="Image de la bande dessinée" />
            <div className="icon">
                <IconButton onClick={premier} disabled={indexBande === 0}>
                    <SkipPrevious className='btn' />
                </IconButton>
                <IconButton onClick={precedent} disabled={indexBande === 0}>
                    <NavigateBefore className='btn' />
                </IconButton>
                <IconButton onClick={suivant} disabled={indexBande === collBandes.length - 1}>
                    <NavigateNext className='btn' />
                </IconButton>
                <IconButton onClick={dernier} disabled={indexBande === collBandes.length - 1}>
                    <SkipNext className='btn' />
                </IconButton>
            </div>
            <div className='like-com'>
                <Aime 
                    aime={aime} 
                    ajouterAime={ajouterAime} 
                    enleverAime={enleverAime} 
                    userId={userId} 
                />
                <div className='ajouter-commentaire'>
                    <input
                        type="text"
                        value={nouveauCommentaire}
                        onChange={(e) => setNouveauCommentaire(e.target.value)}
                        placeholder="Ajouter un commentaire"
                    />
                    <button onClick={soumettreNouveauCommentaire}>Ajouter</button>
                </div>
            </div>
            <Commentaires 
                commentaires={commentaires} 
                chargerCommentaires={chargerCommentaires} 
                indexBande={indexBande} 
                urlImage={urlImage}
            />
        </div>
    );
}

export default Acceuil;
