'use client';
import React from 'react';
import styles from '@/styles/App.module.css';
import LargeButton from '@/components/LargeButton';

function App() {
    return (
        <div className={styles.pageComponent}>
            <div className={styles.welcomeHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}></div>
                    <h1 className={styles.h1}>Cumbre</h1>
                    <p className={styles.p}>Explorá la aventura de aprender</p>
                </div>
            </div>
            <div className={styles.welcomeButtons}>
                <LargeButton label="Iniciar sesión" onClick={() => window.location.href = '/login'} />
                <LargeButton label="Registrarse" onClick={() => window.location.href = '/register'} />
            </div>
        </div>
    );
}

export default App;