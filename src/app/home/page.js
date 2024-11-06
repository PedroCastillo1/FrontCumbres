// src/app/home/page.js
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/HomePage.module.css';
import LargeButton from '@/components/LargeButton';

const HomePage = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('http://localhost:8080/user/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUsername(response.data.name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const setupSession = () => {
        window.location.href = "/setupSession";
    };

    const objectivesPage = () => {
        window.location.href = "/objectives";
    };

    const goToProfile = () => {
        window.location.href = "/profile";
    };

    const goToMotivation = () => {
        window.location.href = "/motivation";
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    &#9776;
                </div>
                <span>Cumbre</span>
            </div>
            {menuOpen && (
                <div className={styles.menu}>
                    <ul>
                        <li onClick={goToProfile}>Mi perfil</li>
                        <li onClick={goToMotivation}>Mi motivación</li>
                    </ul>
                </div>
            )}
            <p className={styles.bigText}>¡Hola, {username}!</p>
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