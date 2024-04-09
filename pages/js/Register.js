import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, addDoc, collection, } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


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
const auth = getAuth();
const db = getFirestore(app);

const Enviar = document.getElementById('send')



Enviar.addEventListener("click", (e) => {
    e.preventDefault();
    

    const name = document.getElementById('Nombre').value
    const lastname = document.getElementById('Apellido').value
    const email = document.getElementById('Correo').value
    const phone = document.getElementById('Telefono').value
    const password = document.getElementById('Contraseña').value

    if (name.length !== 0 && lastname.length !== 0 && phone.length !==0 && email.length !== 0 && password.length !== 0) {
        createUserWithEmailAndPassword(auth, email, password)

            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                Swal.fire({
                    title: "Vefifica tu correo",
                    text: "Verifica tu correo para continuar",
                    icon: "success",
                    iconColor: "#8cd19d",
                    confirmButtonColor: "#8cd19d"
                }).then(() => (
                    location.href = "/pages/Login.html"
                ));

                addDoc(collection(db, "Users"), {
                    Nombre: name,
                    Apellido: lastname,
                    Correo: email,
                    Telefono: phone,
                    Direccion: "",
                    foto: "",
                    Id: user.uid
                });

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        // ...
                    });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    } else {
        Swal.fire({
            title: "Faltan datos",
            text: "Tienes que llenar todos los campos para continuar",
            icon: "error",
            iconColor: "#8cd19d",
            confirmButtonColor: "#8cd19d"
        });
    }
});




