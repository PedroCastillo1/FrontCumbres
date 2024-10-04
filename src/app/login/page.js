"use client"
import React, { useState } from "react";
import LargeButton from "@/components/LargeButton.jsx";
import styles from '@/styles/LoginPage.module.css';
import InputField from "@/components/InputField";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleLogin = () => {
        if (!inputEmail || !inputPassword) {
            toast.error("Por favor, llena todos los campos.");
            return;
        }

        if (!emailRegex.test(inputEmail)) {
            toast.error("Por favor, introduce un correo electrónico válido.");
            return;
        }

        axios.post('http://localhost:8080/api/v1/auth/login', {
            email: inputEmail,
            password: inputPassword
        })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                toast.success("Login exitoso.");
                window.location.href = "/home";
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error en el login.");
            });
    };

    return (
        <div className={styles.pageComponent}>
            <ToastContainer />
            <div className={styles.header}>
                <div className={styles.logo}></div>
                <h1 className={styles.title}>Inicio de Sesión</h1>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Mail institucional</p>
                    <InputField value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                </div>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Contraseña</p>
                    <InputField type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                </div>
                <div className={styles.checkboxContainer}>
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    <label>Remember Me</label>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <LargeButton label="Login" onClick={handleLogin} />
            </div>
        </div>
    );
}

export default LoginPage;