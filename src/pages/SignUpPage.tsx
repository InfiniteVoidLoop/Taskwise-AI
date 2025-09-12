import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignUpPage.css';
import { signUp } from '../models/auth';
import { useUserUIDStore } from '../store';

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
        const response = await signUp(username, password);
        setIsLoading(false);
        if (response) {
            setUserUID(response);
            navigate('/');
        } else {
            setError('Sign up failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Create Account</h1>
                        <p className="login-subtitle">Sign up for your note-taking workspace</p>
                    </div>
                    <form className="login-form" onSubmit={handleSignUp}>
                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <span className="error-text">{error}</span>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Email</label>
                            <div className="input-wrapper">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    className={`form-input ${error && !username.trim() ? 'input-error' : ''}`}
                                    placeholder="Enter your email"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                                <div className="input-icon">
                                    <span>📧</span>
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
                                    className={`form-input ${error && !password.trim() ? 'input-error' : ''}`}
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
                                    className={`form-input ${error && !confirmPassword.trim() ? 'input-error' : ''}`}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`login-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Signing up...
                                </>
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