import {signUp, logIn, sendEmailResetPass, deleteAccount} from './controllers.js';

async function signUpHandler(req, res){
    const {username, password} = req.body;
    const response = await signUp(username, password);
    if (response){
        res.status(200).json({UID: response});
    }
    else{
        res.status(500).json({message: 'Failed to sign up'});
    }
}

async function logInHandler(req, res){
    const {username, password} = req.body;
    const response = await logIn(username, password);
    if (response){
        res.status(200).json({UID: response});
    }
    else{
        res.status(500).json({message: 'Failed to log in'});
    }
}

async function sendEmailResetPassHandler(req, res){
    const {username} = req.body;
    const response = await sendEmailResetPass(username);
    if (response){
        res.status(200).json({messages: 'Email send'});
    }
    else{
        res.staus(201).json({messages: 'Failed to send email'});
    }
}

async function deleteAccountHandler(req, res){
    const response = await deleteAccount();
    if (response){
        res.status(200).json({messages: 'Delete Account Auth Sucessfully'});
    }
    else{
        res.status(201).json({message: 'Error when delete'});
    }
} 

export {signUpHandler, logInHandler, sendEmailResetPassHandler, deleteAccountHandler};