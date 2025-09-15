import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserUIDStore } from '../store';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUserUID } = useUserUIDStore();
    const navigate = useNavigate();

    const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
        if (error) setError('');
    };

    const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
        if (error) setError('');
    };

    const handleConfirmPasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(target.value);
        if (error) setError('');
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Please enter your email');
            return;
        }
        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try{
            const response = await axios.post('https://taskwise-ai.onrender.com/auth/signup', {
                username: username, 
                password: password
            })
            setIsLoading(false);
            setUserUID(response.data.UID);
            navigate('/login');
        }catch(error){
            setError('Sign up failed. Please try again.');
            navigate('/login');
            throw error;
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Create Account</h1>
                        <p className="login-subtitle">Sign up for your to-do-list workspace</p>
                    </div>
                    <form className="login-form" onSubmit={handleSignUp}>
                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}
                        {!error && (
                            <Alert severity="success">Sign up sucessfully</Alert>
                        )}
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Email</label>
                            <div className="input-wrapper">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    className='form-input'
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                                <div className="input-icon">
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={hide ? "password" : "text"}
                                    className='form-input'
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setHide((prev) => !prev)}
                                >
                                    {!hide ? "👁️" : "🙈"}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <div className="input-wrapper">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={hide ? "password" : "text"}
                                    className='form-input'
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="login-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Box sx={{ display: 'flex' }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </form>
                    <div className="login-footer">
                        <p>Already have an account? <Link to="/login" className="register-link">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SignUpPage };