import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore, getDocs, doc, query, collection, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";



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
const storage = getStorage();


onAuthStateChanged(auth, (user) => {
    if (user) {
        const userfoto = document.getElementById('userfoto')
        const Nombre = document.getElementById('Nombre')
        const Apellido = document.getElementById('Apellido')
        const Telefono = document.getElementById('Telefono')
        const Direccion = document.getElementById('Direccion')
        const Correo = document.getElementById('Correo')


        getDocs(query(collection(db, "Users"), where("Id", "==", user.uid)))
            .then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    Nombre.value = doc.data().Nombre;
                    Apellido.value = doc.data().Apellido;
                    Telefono.value = doc.data().Telefono;
                    Correo.value = doc.data().Correo;
                    Direccion.value = doc.data().Direccion;



                    if (doc.data().foto == '') {
                        userfoto.style = "background-image: url('https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa-510x510.png');"
                    }
                    else {
                        userfoto.style = "background-image: url('" + doc.data().foto + "');"
                    }
                })
            })
    }

    var changephoto = document.getElementById("fotoboton")

    changephoto.addEventListener("click", (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Cambiar foto',
            cancelButtonColor: '##1e293b',
            confirmButtonColor: '#8cd19d', confirmButtonText: 'Cambiar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            html: `
                <input id="swal-input2" class=" w-full h-full cursor-pointer" type="file">

                `,
            focusConfirm: false,
        }).then((result) => {
            if (result.isConfirmed) {

                onAuthStateChanged(auth, (user) => {
                    if (user) {

                        const inputphoto = document.getElementById('swal-input2')

                        // Upload file and metadata to the object 'images/mountains.jpg'
                        const storageRef = ref(storage, 'images/' + user.uid);
                        const uploadTask = uploadBytesResumable(storageRef, inputphoto.files[0]);

                        // Listen for state changes, errors, and completion of the upload.
                        uploadTask.on('state_changed',
                            (snapshot) => {
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log('Upload is ' + progress + '% done');
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                }

                            },
                            (error) => {
                                // A full list of error codes is available at
                                // https://firebase.google.com/docs/storage/web/handle-errors
                                switch (error.code) {
                                    case 'storage/unauthorized':
                                        // User doesn't have permission to access the object
                                        break;
                                    case 'storage/canceled':
                                        // User canceled the upload
                                        break;

                                    // ...

                                    case 'storage/unknown':
                                        // Unknown error occurred, inspect error.serverResponse
                                        break;
                                }
                            },
                            () => {
                                // Upload completed successfully, now we can get the download URL

                                Swal.fire({
                                    icon: "success",
                                    title: "¡Felicidades!",
                                    text: "Foto actualizada con exito",
                                    iconColor: '#8cd19d',
                                    confirmButtonColor: '#8cd19d',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    allowEnterKey: false,
                                }).then(() => {
                                    location.reload();
                                })

                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    getDocs(query(collection(db, "Users"), where("Id", "==", user.uid))).
                                        then(querySnapshot => {
                                            querySnapshot.forEach((doc2) => {
                                                updateDoc(doc(db, "Users", doc2.id), {
                                                    foto: downloadURL
                                                })
                                            })
                                        })

                                });
                            }
                        );

                    }
                })
            }
        });
    })
}
)

