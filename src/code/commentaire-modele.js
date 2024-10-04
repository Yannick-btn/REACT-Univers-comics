import { collection, getDocs, addDoc } from 'firebase/firestore';
import { bd, collBandes, collComs } from './init';

/**
 * Ajouter un commentaire à une bande quotidienne.
 * @param {string} idBande Chaîne indiquant l'identifiant de la bande quotidienne à laquelle le commentaire est associé
 * @param {string} texte Texte du commentaire à ajouter
 * @param {string} idUtil ID de l'utilisateur qui a créé le commentaire
 * @param {string} nomUtil Nom de l'utilisateur qui a créé le commentaire
 * @returns {Promise<void>} Une promesse indiquant si l'opération a réussi ou échoué
 */
export async function ajouterCommentaire(idBande, texte, idUtil, nomUtil) {
    try {
        await addDoc(collection(bd, collBandes, idBande, collComs), {
            texte: texte,
            idUtil: idUtil,
            nomUtil: nomUtil,
            votes: {}
        });
        console.log("Commentaire ajouté avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
    }
}

/**
 * Obtenir les commentaires d'une bande quotidienne.
 * @param {string} idBande Chaîne indiquant l'identifiant de la bande quotidienne
 * @returns {Promise<Array>} Tableau contenant les commentaires (info complète) de la bande requise.
 */
export async function obtenirCommentaires(idBande) {
    try {
        const commentaires = await getDocs(collection(bd, collBandes, idBande, collComs));
        return commentaires.docs;
    } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
        return [];
    }
}

