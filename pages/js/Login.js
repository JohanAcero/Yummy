import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCi4AalTIsj6Ky8I0HTUta_5w8JNhijHIY",
    authDomain: "yummy-39a53.firebaseapp.com",
    projectId: "yummy-39a53",
    storageBucket: "yummy-39a53.appspot.com",
    messagingSenderId: "853867830862",
    appId: "1:853867830862:web:8afbe4301633a17da26d1f",
    measurementId: "G-LHZVKK9FP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const Enviar = document.getElementById('enviar')

Enviar.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (email.length !== 0 && password.length !== 0) {
        getAuth().signOut()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                if (getAuth().currentUser.emailVerified) {
                    location.href="/pages/Home.html"
                } else {
                    Swal.fire({
                        title: "Vefifica tu correo",
                        text: "Tienes que verificar tu correo para continuar",
                        icon: "error",
                        iconColor: "#8cd19d",
                        confirmButtonColor: "#8cd19d"
                    })
                }

                console.log(signInWithEmailAndPassword)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }else{
        Swal.fire({
            title: "Faltan datos",
            text: "Tienes que llenar todos los campos para continuar",
            icon: "error",
            iconColor: "#8cd19d",
            confirmButtonColor: "#8cd19d"
        });
    }
})