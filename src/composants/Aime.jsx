import { useState } from "react";
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from 'react-toastify';
import './Aime.scss';

function Aime({ aime, ajouterAime, userId, enleverAime }) {
    const [estAime, setEstAime] = useState(aime.includes(userId));

    const handleClick = () => {
        if (!userId) {
            toast.error("Veuillez vous connecter pour aimer ce post");
            return;
        }
        if (estAime) {
            enleverAime();
            setEstAime(false);
        } else {
            ajouterAime();
            setEstAime(true);
        }
    };

    return (
        <div className={`Aime ${estAime ? 'aime-active' : ''}`}>
            <p>{aime.length}</p>
            <IconButton onClick={handleClick}>
                {estAime ? <FavoriteIcon className='btn' /> : <FavoriteBorderIcon className='btn' />}
            </IconButton>
        </div>
    );
}

export default Aime;
