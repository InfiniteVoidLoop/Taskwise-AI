import {createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import {auth} from '../config/firebaseConfig.js'

async function signUp(email, password){
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.uid;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

async function logIn(email, password){
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.uid;
    }catch(error){
        console.error(error.message);
        return null;
    }
}

async function sendEmailResetPass(email){
    try{
        await sendPasswordResetEmail(auth, email);
        console.log("Password reset email sent!");
        return true;
    }catch(error){
        console.error(error);
        return false;
    }
}

async function deleteAccount(){
    const user = auth.currentUser;
    try{
        if (!user){
            throw new Error('Can not delete user');
        }
        await deleteUser(user);
        return true;
    }catch(error){
        console.error(error)
        return false;
    }
}

export {signUp, logIn, sendEmailResetPass, deleteAccount, auth};