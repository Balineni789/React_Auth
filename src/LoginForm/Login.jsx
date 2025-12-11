
import { useState } from 'react';
import { toast } from 'react-toastify';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

const firebaseConfig = {
    apiKey: "AIzaSyChqz1liDeBjgpUci4O-K-EMemq8DXoUhQ",
    authDomain: "login-form-d12b5.firebaseapp.com",
    projectId: "login-form-d12b5",
    storageBucket: "login-form-d12b5.firebasestorage.app",
    messagingSenderId: "129001954034",
    appId: "1:129001954034:web:d3ae337f5222772ece8e6b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const Login = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonText, setButtonText] = useState('Sign In');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedEmail = email?.trim();

        if (!trimmedEmail || !password) {
            toast.error("Please enter email and password.", { autoClose: 3000 });
            return;
        }

        setButtonDisabled(true);
        setButtonText('Signing in...');

        signInWithEmailAndPassword(auth, trimmedEmail, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success("Signed in successfully! Redirecting...", { autoClose: 3000 });
                setTimeout(() => {
                    window.location.href = "/Homepage.html";
                }, 2000);
            })
            .catch((err) => {
                toast.error("Error: " + err.message, { autoClose: 3000 });
            })
            .finally(() => {
                setButtonDisabled(false);
                setButtonText('Sign In');
            });
    };

    return (
        <div className="login-container">
            <h2>Login Here</h2>

            <form id="loginForm" method="post" action="" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="rEmail">Email</label>
                    <input 
                        type="email" 
                        id="rEmail" 
                        placeholder="Enter your email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="rPassword">Password</label>
                    <input 
                        type="password" 
                        id="rPassword" 
                        placeholder="Enter your password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button 
                    className="btn" 
                    id="submitSignUp" 
                    type="submit"
                    disabled={buttonDisabled}
                >
                    {buttonText}
                </button>
                <div className="social">
                    <p>Don't Have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>Register Here</a></p>
                </div>
            </form>
        </div>
    );
};

export default Login;