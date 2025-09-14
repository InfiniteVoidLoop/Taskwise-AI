import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResetPage.css';
import { sendEmailResetPass } from '../models/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

function ResetPage() {
    
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(false);

    const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(target.value);
        if (error) setError('');
        if (message) setMessage(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        await sendEmailResetPass(email);
        setMessage(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
        setError('');
        setEmail('');
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Reset Password</h1>
                        <p className="login-subtitle">Enter your email to receive a password reset link</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}

                        {message && (
                           <Alert severity="success">'If an account with this email exists, you will receive a password reset link shortly.'</Alert>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className='form-input'
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className='login-button'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Remember your password? <Link to="/login" className="register-link">Sign in</Link></p>
                        <p>Don't have an account? <Link to="/signup" className="register-link">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {ResetPage};