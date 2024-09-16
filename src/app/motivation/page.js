"use client";

import React, { useState } from 'react';
import styles from '@/styles/MotivationPage.module.css';

const MotivationPage = () => {
    const [motivation, setMotivation] = useState("");

    const handleSave = () => {
        // Aquí puedes manejar el evento de guardar la motivación
        console.log("Motivación guardada:", motivation);
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <img src="/mountain-icon.png" alt="Mountain Icon" className={styles.icon} />
                <h1 className={styles.title}>
                    Saber qué te motiva es clave para llegar a la cumbre
                </h1>
                <p className={styles.subtitle}>
                    En este espacio, te invitamos a que respondas: <br />
                    ¿Cuál es tu motivación más profunda para aprender? <span role="img" aria-label="light bulb emoji">💡</span>
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