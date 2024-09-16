"use client"
import React, { useState } from "react";
import LargeButton from "@/components/LargeButton.jsx";
import styles from '@/styles/RegisterPage.module.css';
import InputField from "@/components/InputField";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const registerUser = () => {
        if (!inputName || !inputEmail || !inputPassword || !inputConfirmPassword) {
            toast.error("Por favor, llena todos los campos.");
            return;
        }

        if (!emailRegex.test(inputEmail)) {
            toast.error("Por favor, introduce un correo electrónico válido.");
            return;
        }

        if (inputPassword !== inputConfirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        axios.post('http://localhost:8080/api/v1/auth/register', {
            name: inputName,
            email: inputEmail,
            password: inputPassword
        })
            .then((response) => {
                console.log(response.data);
                toast.success("Registro exitoso.");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error en el registro.");
            });
    };

    return (
        <div className={styles.pageComponent}>
            <ToastContainer />
            <div className={styles.header}>
                <div className={styles.logo}></div>
                <h1 className={styles.title}>Registro</h1>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Nombre completo</p>
                    <InputField value={inputName} onChange={(e) => setInputName(e.target.value)} />
                </div>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Mail</p>
                    <InputField value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
                </div>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Contraseña</p>
                    <InputField type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />
                </div>
                <div className={styles.inputComponent}>
                    <p className={styles.normalText}>Repetir contraseña</p>
                    <InputField type="password" value={inputConfirmPassword} onChange={(e) => setInputConfirmPassword(e.target.value)} />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <LargeButton label="Siguiente" onClick={registerUser} />
            </div>
        </div>
    );
}

export default RegisterPage;