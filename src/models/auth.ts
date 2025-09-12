import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import {app} from '../config/firebaseConfig'

async function signUp(email: string, password: string): Promise<string|null> {
    const auth = getAuth(app);
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
    const auth = getAuth(app);
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user.uid;
    }catch(error: any){
        console.error(error.message);
        return null;
    }
}

export {signUp, logIn};