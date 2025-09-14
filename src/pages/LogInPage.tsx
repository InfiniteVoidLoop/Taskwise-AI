import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useUserUIDStore } from '../store';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import axios from 'axios';

function LogInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hide, setHide] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSucess] = useState(false);
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
        if (isLoading)
            return;
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:5000/auth/login", {
                username: username,
                password: password
            })
            setUserUID(response.data.UID);
            setSucess(true);
            navigate('/');

        } catch (error) {
            setError('Log in failed! Wrong username or password');
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-card">
                    <div className="login-header">
                        <h1 className="login-title">Welcome Back</h1>
                        <p className="login-subtitle">Sign in to your to-do-list workspace</p>
                    </div>

                    <form className="login-form" onSubmit={handleSignIn}>
                        {error && (
                            <Alert severity="error">{error}</Alert>
                        )}
                        {success && (
                            <Alert severity="success">Log in sucessfully</Alert>
                        )}
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Email</label>
                            <div className="input-wrapper">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    className='form-input'
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={handleUsernameChange}
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
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Forgot your password? <Link to="/resetPassword" className="register-link">Reset it</Link></p>
                        <p>Don't have an account? <Link to="/signup" className="register-link">Create one</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { LogInPage };