import { cert, initializeApp } from "firebase-admin/app";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import * as serviceAccount from "../../serviceAccountKey.json"; // Import JSON directly

const serviceAccountKey = serviceAccount as any; // Cast as any if you're sure about the structure, but be cautious

initializeApp({
  credential: cert(serviceAccountKey),
});

export const db: Firestore = getFirestore();
