import { useEffect, useState } from "react";
import './Commentaires.scss';
import { IconButton } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { ThumbDownAlt } from "@mui/icons-material";

function Commentaires({ indexBande, chargerCommentaires, commentaires, urlImage }) {
    const [afficherTous, setAfficherTous] = useState(false);

    useEffect(() => {
        chargerCommentaires();
    }, [indexBande]);

    const toggleAfficherTous = () => {
        setAfficherTous(prevState => !prevState);
    };

    const commentairesAffiches = afficherTous ? commentaires : commentaires.slice(0, 3);

    return (
        <div className='Commentaires'>
            <h2 className="titre-com">Commentaires</h2>
            <ul>
                {commentairesAffiches.map(commentaire => {
                    const votes = Object.values(commentaire.data().votes);
                    const votePositif = votes.filter(vote => vote === 1).length;
                    const voteNegatif = votes.filter(vote => vote === -1).length;

                    return (
                        <li key={commentaire.id}>
                            <p className="texte">Nom Utilisateur : {commentaire.data().nomUtil}</p>
                            <p className="texte">Texte : {commentaire.data().texte}</p>
                            <div className="vote">
                                <p><IconButton> <ThumbUpIcon /> </IconButton>{votePositif}</p>
                                <p> <IconButton> <ThumbDownAlt /> </IconButton>{voteNegatif}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            {commentaires.length > 3 && (
                <div className="afficher" onClick={toggleAfficherTous}>
                    {afficherTous ? "Afficher moins" : "Afficher plus"}
                </div>
            )}
        </div>
    );
}

export default Commentaires;
