"use client";

import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/MotivationPage.module.css';

const MotivationPage = () => {
    const [motivation, setMotivation] = useState("");

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.put(`http://localhost:8080/user/updateMotivation/${motivation}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Motivación guardada:", response.data);
            window.location.href = "/home";
        } catch (error) {
            console.error("Error al guardar la motivación:", error);
        }
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <div className={styles.logo}></div>
                <h1 className={styles.title}>
                    Saber qué te motiva es clave para llegar a la cumbre
                </h1>
                <p className={styles.subtitle}>
                    En este espacio, te invitamos a que respondas: <br />
                    ¿cuál es tu motivación más profunda para aprender? <span role="img" aria-label="light bulb emoji">💡</span>
                </p>
            </div>
            <div>
                <textarea
                    className={styles.textArea}
                    placeholder="Me motiva..."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                />
                <button className={styles.saveButton} onClick={handleSave}>Guardar</button>
            </div>
        </div>
    );
};

export default MotivationPage;