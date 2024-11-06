'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/styles/ProfilePage.module.css';

const ProfilePage = () => {
    const [progress, setProgress] = useState(0);
    const [concentration, setConcentration] = useState(0);
    const [organization, setOrganization] = useState(0);
    const [learning, setLearning] = useState(0);
    const [motivated, setMotivated] = useState(0);
    const [totalSessions, setTotalSessions] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('http://localhost:8080/user/stats');
                const data = response.data;

                setTotalSessions(data.totalStudySessions);

                const calculatePercentage = (value) => (totalSessions > 0 ? Math.round((value / totalSessions) * 100) : 0);

                setProgress(calculatePercentage(data.progress));
                setConcentration(calculatePercentage(data.concentration));
                setOrganization(calculatePercentage(data.organization));
                setLearning(calculatePercentage(data.learning));
                setMotivated(calculatePercentage(data.motivated));
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [totalSessions]);

    const handleButtonClick = () => {
        window.location.href = '/home';
    };

    return (
        <div className={styles.pageComponent}>
            <h1 className={styles.title}>Mis estadísticas</h1>

            <div className={styles.section}>
                <p className={styles.sectionTitle}>Rescates de las sesiones</p>

                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabel}>
                        <span>Organización efectiva 📋</span>
                        <span>{organization}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={organization}
                        className={styles.slider}
                        readOnly
                    />
                </div>

                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabel}>
                        <span>Concentración 📌</span>
                        <span>{concentration}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={concentration}
                        className={styles.slider}
                        readOnly
                    />
                </div>

                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabel}>
                        <span>Nuevos aprendizajes 🌱</span>
                        <span>{learning}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={learning}
                        className={styles.slider}
                        readOnly
                    />
                </div>

                <div className={styles.sliderContainer}>
                    <div className={styles.sliderLabel}>
                        <span>Motivación 💪</span>
                        <span>{motivated}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={motivated}
                        className={styles.slider}
                        readOnly
                    />
                </div>
            </div>

            <div className={styles.section}>
                <p className={styles.sectionTitle}>Total de sesiones</p>
                <div className={styles.progressContainer}>
                    <span className={styles.progressPercentage}>{totalSessions}</span>
                </div>
            </div>

            <button className={styles.finishButton} onClick={handleButtonClick}>Volver al inicio</button>
        </div>
    );
};

export default ProfilePage;