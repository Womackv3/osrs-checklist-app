// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDa3wZzS-_nO2fMXegbrReCOruaaTDtRNs",
    authDomain: "osrsironbible.firebaseapp.com",
    projectId: "osrsironbible",
    storageBucket: "osrsironbible.firebasestorage.app",
    messagingSenderId: "1078815537911",
    appId: "1:1078815537911:web:59c488f9ed25e5e7a031f2",
    measurementId: "G-CKC35ZZVE0"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Make Firebase available globally with simplified API
window.firebase = {
    auth,
    db,
    signInWithEmailAndPassword: auth.signInWithEmailAndPassword.bind(auth),
    createUserWithEmailAndPassword: auth.createUserWithEmailAndPassword.bind(auth),
    signOut: auth.signOut.bind(auth),
    onAuthStateChanged: auth.onAuthStateChanged.bind(auth),
    doc: (database, path) => database.doc(path),
    setDoc: (docRef, data) => docRef.set(data),
    getDoc: (docRef) => docRef.get(),
    collection: (database, path) => database.collection(path),
    addDoc: (collectionRef, data) => collectionRef.add(data),
    getDocs: (queryRef) => queryRef.get(),
    deleteDoc: (docRef) => docRef.delete(),
    onSnapshot: (ref, callback) => ref.onSnapshot(callback)
};