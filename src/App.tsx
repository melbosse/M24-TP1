import React from 'react';
import { useRef, useState } from 'react';
import { 
  IonAlert, 
  IonApp, 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCol, 
  IonContent, 
  IonFooter, 
  IonHeader, 
  IonIcon, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonRow, 
  IonTitle, 
  IonToast, 
  IonToolbar, 
  setupIonicReact, 
} from '@ionic/react';

/* Components */
import ResetButton from './components/ResetButton';

/* Icons */
import { calculator } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {

  const montantInputRef = useRef<HTMLIonInputElement>(null);

  const [calculTaxes, setCalculTaxes] = useState<number>();

  const [calculTPS, setCalculTPS] = useState<number>();
  const [calculTVQ, setCalculTVQ] = useState<number>();
  const [tpsTVQ, setCalculTPSTVQ] = useState<number>();
  const [montantEntre, setMontantEntre] = useState<number>();

  const [erreur, setErreur] = useState<string>();

  const [showAlert, setShowAlert] = useState(false);

  const reinitialiserCalcul = () => {
      montantInputRef.current!.value = "";
      setShowAlert(false);
      setErreur("");
    }

  const calculerTaxes = () => {
    const montantEntre = +montantInputRef.current!.value!;

    if(!montantEntre || isNaN(montantEntre) || montantEntre < 0){
      setErreur("Veuillez entrer un montant valide.");
      return;
    }

    // Calcul de la TPS et de la TVQ ainsi que le montant avec taxes
    const tpsCalcul = +montantEntre * (5 / 100);
    const tvqCalcul = +montantEntre * (9.965 / 100);
    const avecTaxes = +montantEntre + tpsCalcul + tvqCalcul
    setCalculTaxes(avecTaxes);

    // Affichage des résultats
    const tpsTVQ = +tpsCalcul + tvqCalcul

    setCalculTPS(tpsCalcul);
    setCalculTVQ(tvqCalcul);
    setCalculTPSTVQ(tpsTVQ);
    setMontantEntre(montantEntre);

    setShowAlert(true);
  }

  const viderErreur = () => {
    setErreur("");
  }

  return(
    <React.Fragment>
      <IonToast 
        isOpen={!!erreur}
        message={erreur}
        duration={2500}        
        buttons={[{
          text: "Ok",
          handler: viderErreur
      }]}
      />

    <IonApp>
      {/* HEADER */}
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Calculateur de taxes</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* CONTENT */}
      <IonContent className="ion-padding">

        {/* ROW Montant */}
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Entrez un montant ($)</IonLabel>
              <IonInput type="text" ref={montantInputRef} />
            </IonItem>
          </IonCol>
        </IonRow>

        {/* ROW Bouton Calculer */}
        <IonRow>
          <IonCol className="ion-text-center">
            <IonButton onClick={calculerTaxes} color="tertiary">
              <IonIcon slot="end" icon={calculator}></IonIcon>
              Calculer
            </IonButton>
          </IonCol>
        </IonRow>
        
        {/* Bouton Réinitialiser */}
        <ResetButton onReset={reinitialiserCalcul} />

        {/* AFFICHAGE RÉSULTAT */}
        <IonAlert
          isOpen={!!showAlert}
          header="Votre montant avec taxes"
          subHeader={calculTaxes?.toFixed(2) + "$"}
          buttons={['OK']}
        />

        {/* AFFICHAGE de tous les résultats */}
        <IonRow>
          <IonCol>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>Votre montant de départ : {montantEntre}$</h2>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>Le montant TVQ : {calculTVQ?.toFixed(2)}$</h2>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>Le montant TPS : {calculTPS?.toFixed(2)}$</h2>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>Le total des taxes : {tpsTVQ?.toFixed(2)}$</h2>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent className="ion-text-center">
                <h2>Le montant total : {calculTaxes?.toFixed(2)}$</h2>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

      </IonContent>

      {/* FOOTER */}
      <IonFooter className="ion-padding">
        <p>Travail pratique M24</p>
      </IonFooter>
    </IonApp>
    </React.Fragment>
  );
};

export default App;
