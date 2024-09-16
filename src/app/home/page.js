'use client';

import React, { useState } from "react";
import styles from "@/styles/HomePage.module.css";
import LargeButton from "@/components/LargeButton";

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const setupSession = () => {
        window.location.href = "/setupSession";
    };

    const objectivesPage = () => {
        window.location.href = "/objectives";
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    &#9776;
                </div>
                <span>Cumbre</span>
            </div>
            <p className={styles.bigText}>¡Hola, Fer!</p>
            <p className={styles.subtitle}>¿Qué querés hacer hoy?</p>
            <div className={styles.buttonContainer}>
                <LargeButton label="Agendar nuevos exámenes y tareas 📅" onClick={objectivesPage} />
            </div>
            <div className={styles.buttonContainer}>
                <LargeButton label="Empezar una sesión de estudio 📚" onClick={setupSession} />
            </div>
        </div>
    );
};

export default HomePage;