import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    addDoc,
    serverTimestamp,
    collection,
} from "firebase/firestore";

import { useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "gallivanter-ae8ae.firebaseapp.com",
    projectId: "gallivanter-ae8ae",
    storageBucket: "gallivanter-ae8ae.appspot.com",
    messagingSenderId: "543946443820",
    appId: "1:543946443820:web:8c74cfeb2e3903b0b95589",
    measurementId: "G-0RT2W5PK1R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleSubmit = async (
    userName,
    email,
    phone,
    job,
    organization
) => {
    try {
        const collectionRef = collection(db, "waitlist");
        await addDoc(collectionRef, {
            userName,
            email,
            phone,
            job, organization
        });

        return true;
    } catch (error) {

        return false;
    }
};