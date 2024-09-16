"use client";

import React from 'react';
import styles from '@/styles/ProfilePage.module.css';
import LargeButton from '@/components/LargeButton';

const ProfilePage = () => {
    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <h1 className={styles.title}>Tu perfil</h1>
                <select className={styles.timeframeSelect}>
                    <option>Últimos 7 días</option>
                    <option>Últimos 30 días</option>
                </select>
            </div>

            <div className={styles.section}>
                <p className={styles.sectionTitle}>Promedio de progreso en tus objetivos</p>
                <div className={styles.progressContainer}>
                    <span className={styles.progressPercentage}>82%</span>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: '82%' }}></div>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <p className={styles.sectionTitle}>Sesiones de estudio completadas en los últimos 7 días</p>
                <div className={styles.chart}>
                    <img src="/resources/chart-placeholder.png" alt="Chart" />
                </div>
            </div>

            <LargeButton label="Volver al menú principal" />
        </div>
    );
};

export default ProfilePage;
