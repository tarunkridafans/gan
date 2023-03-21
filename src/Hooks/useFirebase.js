import { setDoc, onSnapshot, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { v4 as uuidv4 } from "uuid";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const useFirebase = () => {
  async function getDataByCollection(collection) {
    let data = [];
    onSnapshot(collection, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
    });
    return data;
  }

  async function getDataByQuery(query) {
    let data = [];
    onSnapshot(query, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
    });
    return data;
  }

  async function updateByDocRef(docRef, updatesObj) {
    try {
      await updateDoc(docRef, updatesObj);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteByDocRef(docRef) {
    try {
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
    }
  }

  async function addDoc(collection, docData) {
    try {
      setDoc(doc(db, collection, uuidv4()), docData);
    } catch (err) {
      console.error(err);
    }
  }

  async function signUpWithEmailAndPassword(email, password) {
    try {
      let user = createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async function logInWithEmailAndPassword(email, password) {
    try {
      let user = signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  }

  return {
    getDataByCollection,
    getDataByQuery,
    updateByDocRef,
    deleteByDocRef,
    addDoc,
    signUpWithEmailAndPassword,
    logInWithEmailAndPassword,
    logOut,
  };
};

export default useFirebase;
