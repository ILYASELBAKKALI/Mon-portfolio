// const CONTACT_EMAIL = "ilyas.elbakkali101@gmail.com";
// const CONTACT_PASSWORD = "vkir xitg rbku ekod"; // Mot de passe d'application
// const EMAIL_DESTINATION = "jobilyaselbakkali@gmail.com";
// pages/api/contact.js
// Import des modules nécessaires
import multer from 'multer';
import nodemailer from 'nodemailer';
import { SITE_NAME } from '../../lib/constants';
 
// Configuration de multer pour gérer les fichiers
const upload = multer();
 
// Informations de connexion pour l'envoi d'e-mails
const CONTACT_HOST = 'smtp.office365.com';
const CONTACT_PORT = 587;
const CONTACT_EMAIL = 'webcontact@ife-france.fr';
const CONTACT_PASSWORD = 'EhJs25**';
const EMAIL_DESTINATION = 'ilyas.elbakkali101@gmail.com';
 
// Configuration de l'API Next.js
export const config = {
  api: {
    bodyParser: false, // Désactive le bodyParser intégré pour utiliser multer
  },
};
 
// Gestionnaire de route pour la méthode POST
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Utilisation du middleware multer pour gérer le téléchargement de fichier unique
    upload.single('resume')(req, res, (err) => {
      // Gestion des erreurs de multer
      if (err instanceof multer.MulterError) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur Multer' });
      } else if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur inconnue' });
      }
 
      // Récupération des données du formulaire
      const { nom, prenom, email, subject, motivation } = req.body;
     
      // Création d'un transporteur pour l'envoi d'e-mails
      const transporter = nodemailer.createTransport({
        host: CONTACT_HOST,
        port: CONTACT_PORT,
        secure: false, // true pour le port 465, false pour les autres ports
        auth: {
          user: CONTACT_EMAIL,
          pass: CONTACT_PASSWORD,
        },
      });
 
      // Configuration de l'e-mail à envoyer
      const mailOptions = {
        from: CONTACT_EMAIL,
        to: EMAIL_DESTINATION,
        subject: `Nouveau mail de ${email} - Pour le site ${SITE_NAME}`,
        text: `Message pour ${SITE_NAME}: \n\nNom : ${nom} \n\nPrénom : ${prenom} \n\nAdresse e-mail : ${email}\n\nObjet : ${subject}\n\n${motivation}`,
        attachments: [
          {
            filename: 'CV.pdf',
            content: req.file.buffer, // Contenu du fichier PDF
            contentType: 'application/pdf',
          },
        ],
      };
 
      // Envoi de l'e-mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send(false);
        } else {
          console.log('E-mail envoyé');
          res.status(200).send(true);
        }
      });
    });
  } else {
    // Méthode non autorisée
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} Non Autorisée`);
  }
}
 