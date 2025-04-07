import { useState, useEffect } from "react";
// import Layout from "../../components/general/layout/layout";
// import BackLink from "../components/general/backlink";
// import axios from "axios";
// import VerifEmail from "../../components/contact/verifyCriteres/VerifEmail";
// import VerifLength from "../../components/contact/verifyCriteres/VerifLength";
// import Layout from "../components/general/layout/layout";
// import ModalWindow from "../components/general/modalWindow.js";
export default function Contacter() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [motivation, setMotivation] = useState("");
  const [emailError, setEmailError] = useState("");
  const [motivationError, setMotivationError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalStatus, setModalStatus] = useState(null);
  const [resume, setResume] = useState(null);
  const [resumeError, setResumeError] = useState("");
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.type !== "application/pdf") {
      setResumeError("Veuillez sélectionner un fichier PDF.");
    } else {
      setResume(file);
      setResumeError("");
    }
  };
 
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
 
  const handleNomChange = (e) => {
    setNom(e.target.value);
  };
 
  const handlePrenomChange = (e) => {
    setPrenom(e.target.value);
  };
 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
 
  const handleMotivationChange = (e) => {
    setMotivation(e.target.value);
  };
 
  const verifyInputs = () => {
    let valid = true;
 
    // if (!VerifLength(email, 5, 40)) {
    //   setEmailError("L'adresse e-mail doit être comprise entre 5 et 40 caractères.");
    //   valid = false;
    // } else if (!VerifEmail(email)) {
    //   setEmailError("Adresse e-mail invalide.");
    //   valid = false;
    // } else {
    //   setEmailError("");
    // }
 
    // if (!VerifLength(motivation, 6, 2000)) {
    //   setMotivationError("Le champ motivation doit être compris entre 6 et 2000 caractères.");
    //   valid = false;
    // } else {
    //   setMotivationError("");
    // }
 
    return valid;
  };
 
  const sendEmail = async (e) => {
    e.preventDefault();
 
    if (!verifyInputs()) {
      return;
    }
 
    try {
      const formData = new FormData();
      formData.append("nom", nom);
      formData.append("prenom", prenom);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("motivation", motivation);
      formData.append("resume", resume);
 
      const { data } = await axios.post("/api/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
 
      // Réinitialisation des champs après envoi
      setEmail("");
      setMotivation("");
      setResume(null);
 
      // Gestion de la réponse du serveur
      if (data) {
        setModalTitle("Message transmis !");
        setModalDescription(
          "Une réponse vous sera remise prochainement."
        );
        setModalStatus("success");
      } else {
        setModalTitle("L'envoi a échoué !");
        setModalDescription(
          "Veuillez vérifier vos champs avant de soumettre le formulaire."
        );
        setModalStatus("failed");
      }
    } catch (error) {
      setModalTitle("Erreur serveur !");
      setModalDescription(
        "Une erreur est survenue, veuillez réessayer plus tard."
      );
      setModalStatus("failed");
    }
 
    setModalOpen(true);
  };
 
  return (
    // <Layout title="Candidature Spontanée" description="Envoyez votre candidature spontanée.">
     
       
          <section id="candidature-spontanee">
          {/* {modalOpen && (
                <ModalWindow
                  setModalOpen={setModalOpen}
                  title={modalTitle}
                  status={modalStatus}
                  description={modalDescription}
                />
          )} */}
        <div className="container">
          {/* <BackLink url="/nous-rejoindre" legend="Retour" /> */}
          <article>
            <h1>Postuler spontanément</h1>
            <p>Envoyez-nous votre candidature, même sans une offre d'emploi spécifique.</p>
          </article>
 
          <h2>Pour postuler :</h2>
 
          <form id="candidature-form" onSubmit={sendEmail}>
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={nom}
                onChange={handleNomChange}
                required
              />
            </div>
            <div>
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={prenom}
                onChange={handlePrenomChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="subject">Objet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={subject}
                onChange={handleSubjectChange}
                required
              />
            </div>
            <div>
              <label htmlFor="motivation">Motivation</label>
              <textarea
                id="motivation"
                name="motivation"
                value={motivation}
                onChange={handleMotivationChange}
                required
                rows="4"
                style={{ width: "100%" }}
              />
              {motivationError && <p className="error">{motivationError}</p>}
            </div>
            <div>
              <label htmlFor="resume">CV (PDF uniquement)</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {resumeError && <p className="error">{resumeError}</p>}
            </div>
            <button type="submit">Soumettre</button>
          </form>
 
          {/* {modalOpen && (
            <div style={{ width: "50%", margin: "auto" }} className={`modal ${modalStatus}`}>
              <h2 style={{ textAlign: "center" }}>{modalTitle}</h2>
              <p style={{ textAlign: "center" }}>{modalDescription}</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => setModalOpen(false)}>Fermer</button>
              </div>
            </div>
          )} */}
        </div>
        </section>
        
     
    //
  );
}