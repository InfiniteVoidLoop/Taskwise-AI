import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ResetPage.css';
import { sendEmailResetPass } from '../models/auth';

function ResetPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(target.value);
        if (error) setError('');
        if (message) setMessage('');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        await sendEmailResetPass(email);
        setIsLoading(true);
        setError('');

        try {
            // Simulate password reset API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setMessage('Password reset email sent! Check your inbox.');
            setEmail('');
        } catch (error) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                <span className="error-text">{error}</span>
                            </div>
                        )}

                        {message && (
                            <div className="success-message">
                                <span className="success-icon">✅</span>
                                <span className="success-text">{message}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email Address</label>
                            <div className="input-wrapper">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={`form-input ${error && !email.trim() ? 'input-error' : ''}`}
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                <div className="input-icon">
                                    <span>📧</span>
                                </div>
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
                                    Sending...
                                </>
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Remember your password? <Link to="/register" className="register-link">Sign in</Link></p>
                        <p>Don't have an account? <Link to="/signup" className="register-link">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {ResetPage};