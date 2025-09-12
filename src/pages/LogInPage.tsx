import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import '../styles/LoginPage.css';
import {logIn} from '../models/auth';
import { useUserUIDStore } from '../store';

function LogInPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {setUserUID} = useUserUIDStore();
    const navigate = useNavigate();
    const handleUsernameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(target.value);
        if (error) setError(''); 
    };

    const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(target.value);
        if (error) setError(''); 
    };
    
    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!username.trim()) {
            setError('Please enter your username');
            return;
        }
        
        if (!password.trim()) {
            setError('Please enter your password');
            return;
        }
        const response = await logIn(username, password);
        if (response){
            setUserUID(response);
            navigate('/');
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your note-taking workspace</p>
                    </div>
                    
                    <form className="login-form" onSubmit={handleSignIn}>
                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <span className="error-text">{error}</span>
                            </div>
                        )}
                        
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-wrapper">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className={`form-input ${error && !username.trim() ? 'input-error' : ''}`}
                                    placeholder="Enter your username"
                                    value = {username}
                                    onChange = {handleUsernameChange}
                                    required
                                />
                                <div className="input-icon">
                                    <span>👤</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={hide?"password":"text"}
                                    className={`form-input ${error && !password.trim() ? 'input-error' : ''}`}
                                    placeholder="Enter your password"
                                    value = {password}
                                    onChange = {handlePasswordChange}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick = {()  => setHide((prev) => !prev)}
                                >
                                    {!hide?"👁️":"🙈"}
                                </button>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-wrapper">
                                <input type="checkbox" className="checkbox" />
                                <span className="checkmark"></span>
                                Remember me
                            </label>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>

                        <button 
                            type="submit" 
                            className={`login-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/register" className="register-link">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {LogInPage};