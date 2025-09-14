import {getDatabase, set, ref, push, query, remove, equalTo, orderByChild, get, update} from "firebase/database";
import dayjs from "dayjs";
import {app} from '../config/firebaseConfig.js';
import {auth} from '../auth/controllers.js';

const database = getDatabase(app);

async function getKey(username, timestamp){
  const userRef = ref(database, 'users/' + username);
  const q = query(userRef, orderByChild("timestamp"), equalTo(timestamp));
  const snapshot = await get(q);
  if(snapshot.exists()){
    const result = [];
    snapshot.forEach((childSnap) => {
      result.push(childSnap.key)
    })
    return result;
  }
  else{
    return null;
  }
}

async function addNote(username, title, description, timestamp, type){
  try{
    const key = await getKey(username, timestamp);
    if (key){
      const noteRef = ref(database, 'users' + '/' + username + '/' + key[0]);
      const postData = {
        title: title, 
        description: description, 
        timestamp: timestamp,
        type: type,
      }
      await update(noteRef, postData);
      return 1;
    }
    else{
      const noteRef = ref(database, 'users' + '/' + username);
      const newNoteRef = push(noteRef);
      await set(newNoteRef, {
        title: title, 
        description: description,
        timestamp: timestamp,
        type: type, 
        marked: false
      });
      return 2;
    }
  }catch(error){
    console.error(error);
    return 3;
  }
}


async function updataMarkNote(username, timestamp, marked){
  try{
    const key = await getKey(username, timestamp);
    if (key){
        const noteRef = ref(database, 'users' + '/' + username + '/' + key[0]);
        await update(noteRef, {marked: marked});
        return true;
    }
    return false;
  }catch(error){
    console.error(error);
    return false;
  }
}



async function deleteNote(username, timestamp){
  try{
    const key = await getKey(username, timestamp);
    const noteRef = ref(database, 'users' + '/' + username + '/' + key);
    await remove(noteRef);
    return true;
  }catch(error){  
    console.error(error);
    return false;
  }
}


async function fetchNote(username, dateMonth){
  try{
    const noteRef = ref(database, 'users' + '/' + username);
    const snapshot = await get(noteRef);
    const result = [];
    if (snapshot.exists()){
      (snapshot).forEach(childSnap => {
        if (dayjs(childSnap.val().timestamp).isSame(dateMonth, "day"))
          result.push(childSnap.val())
      })
    }
    return result;
  }catch(error){
    console.error(error);
    throw error;
  }
}


async function getDateState(username){
  try{
    const noteRef = ref(database, 'users' + '/' + username);
    const finishedDate = [];
    const unFinishedDate = [];
    const snapshot = await get(noteRef);
    if (snapshot.exists()){
      (snapshot).forEach(childSnap => {
        if (!childSnap.val().marked) {
          unFinishedDate.push(dayjs(childSnap.val().timestamp).format('YYYY-MM-DD'))
        }
      });
      (snapshot).forEach(childSnap => {
        if (!unFinishedDate.includes(dayjs(childSnap.val().timestamp).format('YYYY-MM-DD'))){
            finishedDate.push(dayjs(childSnap.val().timestamp).format('YYYY-MM-DD'))
        }
      })
    }
    return { finishedDate, unFinishedDate };

  }catch(error){
    throw error;
  }
};


async function deleteAccountData(){
    const uid = auth.currentUser?.uid;
    if (uid){
      await remove(ref(database, `users/${uid}`));
      return true;
    }
    return false;
}

export { addNote, deleteNote, fetchNote,  updataMarkNote, getDateState, deleteAccountData};  