'use client';
import React from 'react';
import styles from '@/styles/App.module.css';
import LargeButton from '@/components/LargeButton';

function App() {
    return (
        <div className={styles.pageComponent}>
            <div className={styles.welcomeHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <img src="https://img.icons8.com/ios/452/mountain.png" alt="logo" />
                    </div>
                    <h1 className={styles.h1}>Cumbre</h1>
                    <p className={styles.p}>Explorá la aventura de aprender</p>
                </div>
            </div>
            <div className={styles.welcomeButtons}>
                <LargeButton label="Iniciar sesión" onClick={() => alert('Iniciar sesión')} />
                <LargeButton label="Registrarse" onClick={() => alert('Registrarse')} />
            </div>
        </div>
    );
}

export default App;