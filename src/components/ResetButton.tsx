import React from "react";
import { 
    IonRow, 
    IonCol, 
    IonButton, 
    IonIcon 
} from "@ionic/react";

/* Icons */
import { sync } from "ionicons/icons";

const ResetButton: React.FC<{onReset: () => void}> = props => {
    
    return (
        <IonRow>
            <IonCol className="ion-text-center">
                <IonButton onClick={props.onReset} onReset={props.onReset} color="tertiary" fill="outline">
                    <IonIcon slot="end" icon={sync}></IonIcon>
                    Réinitialiser
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default ResetButton;