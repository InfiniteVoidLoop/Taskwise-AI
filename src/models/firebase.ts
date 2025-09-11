import { initializeApp } from "firebase/app";
import {getDatabase, set, ref, push, query, remove, equalTo, orderByChild, get, update} from "firebase/database";
import type {Note} from '../utils/interface'
import dayjs, {Dayjs} from "dayjs";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function addUser(username: string, password: string): Promise<boolean>{
  try{
    const userRef = ref(database, 'members');
    const newUserRef = push(userRef);
    await set(newUserRef, {
      username: username, 
      password: password
    });
    console.log('Successfuly add user');
    return true;
  }catch(error){
    console.error(error);
    return false;
  }
}

async function getKey(username: string, timestamp: number): Promise<string[]|null>{
  const userRef = ref(database, username);
  const q = query(userRef, orderByChild("timestamp"), equalTo(timestamp));
  const snapshot = await get(q);
  if(snapshot.exists()){
    const result: string[] = [];
    snapshot.forEach((childSnap) => {
      result.push(childSnap.key)
    })
    return result;
  }
  else{
    return null;
  }
}

async function addNote(username: string, title: string, description: string, timestamp: number, type: string): Promise<boolean>{
  try{
    const key = await getKey(username, timestamp);
    if (key){
      const noteRef = ref(database, username + '/' + key[0]);
      const postData = {
        title: title, 
        description: description, 
        timestamp: timestamp,
        type: type,
      }
      await update(noteRef, postData);
    }
    else{
      const noteRef = ref(database, username);
      const newNoteRef = push(noteRef);
      await set(newNoteRef, {
        title: title, 
        description: description,
        timestamp: timestamp,
        type: type, 
        marked: false
      });
    }
    return true;
  }catch(error){
    console.error(error);
    return false;
  }
}

async function updataMarkNote(username: string, timestamp: number, marked: boolean): Promise<boolean>{
  try{
    const key = await getKey(username, timestamp);
    if (key){
        const noteRef = ref(database, username + '/' + key[0]);
        await update(noteRef, {marked: marked});
        return true;
    }
    return false;
  }catch(error){
    console.error(error);
    return false;
  }
}

async function deleteNote(username: string, timestamp: number): Promise<boolean>{
  try{
    const key = await getKey(username, timestamp);
    const noteRef = ref(database, username + '/' + key);
    await remove(noteRef);
    return true;
  }catch(error){  
    console.error(error);
    return false;
  }
}

async function fetchNote(username: string, dateMonth: Dayjs | null): Promise<Note[]>{
  try{
    const noteRef = ref(database, username);
    const snapshot = await get(noteRef);
    const result: Note[] = [];
    if (snapshot.exists()){
      (snapshot).forEach(childSnap => {
        if (dayjs(childSnap.val().timestamp).isSame(dateMonth, "day"))
          result.push(childSnap.val() as Note)
      })
    }
    return result;
  }catch(error){
    console.error(error);
    throw error;
  }
}

export {addUser, addNote, deleteNote, fetchNote,  updataMarkNote};  