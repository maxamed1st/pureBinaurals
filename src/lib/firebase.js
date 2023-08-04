import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRnIOpL4Sy-bjcCB8y7xYyHxhSekDyYZQ",
  authDomain: "purebinaurals-f48f0.firebaseapp.com",
  projectId: "purebinaurals-f48f0",
  storageBucket: "purebinaurals-f48f0.appspot.com",
  messagingSenderId: "536663524228",
  appId: "1:536663524228:web:249eb48c1d66fdc89d53d1",
  measurementId: "G-1B5HF9HLB1"
};

//initialize firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);