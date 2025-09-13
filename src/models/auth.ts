import { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../config/firebaseConfig'
const auth = getAuth(app);

async function signUp(email: string, password: string): Promise<string|null> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.uid;
    } catch (error: any) {
        console.error(error.message);
        return null;
    }
}

async function logIn(email: string, password: string): Promise<string|null> {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.uid;
    }catch(error: any){
        console.error(error.message);
        return null;
    }
}

async function sendEmailResetPass(email: string){
    try{
        await sendPasswordResetEmail(auth, email);
    }catch(error: any){
        throw error;
    }
}

export {signUp, logIn, sendEmailResetPass};