
import { useState } from 'react';
import { toast } from 'react-toastify';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
const db = getFirestore();

const Register = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userData = {
                    email: email,
                    password: password,
                    uid: user.uid,
                    createdAt: new Date().toISOString()
                };

                return setDoc(doc(db, "users", user.uid), userData);
            })
            .then(() => {
                toast.success('✓ Account created successfully!', { autoClose: 3000 });
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                toast.error('Error: ' + error.message, { autoClose: 3000 });
            });
    };

    return (
        <div className="login-container">
            <h2>Register Here</h2>

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

                <button className="btn" id="submitSignUp" type="submit">Sign Up</button>
                <div className="social">
                    <p>Have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Login Here</a></p>
                </div>
            </form>
        </div>
    );
};

export default Register;
