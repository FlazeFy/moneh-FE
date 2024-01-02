
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhK4bsLhb0f_lGCF3R4y0brMDGIqM5Gqc",
  authDomain: "animalpedia-e2a53.firebaseapp.com",
  projectId: "animalpedia-e2a53",
  storageBucket: "animalpedia-e2a53.appspot.com",
  messagingSenderId: "235737488664",
  appId: "1:235737488664:web:23aa96720387b1ce12926d",
  measurementId: "G-MZVWXRPLJR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const storage = getStorage(app)