import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK9M8ivS9mj-KCpHgr0f-hPLdyz98ADNU",
  authDomain: "cupcake-app-f0234.firebaseapp.com",
  projectId: "cupcake-app-f0234",
  storageBucket: "cupcake-app-f0234.firebasestorage.app",
  messagingSenderId: "616317544096",
  appId: "1:616317544096:web:80fd5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
