"use client";

import React from 'react';
import styles from '@/styles/StudySessionPage.module.css';

const ProgressBar = ({ step, totalSteps }) => {
    return (
        <div className={styles.progressContainer}>
            <span className={styles.backArrow}>&larr;</span>
            <span className={styles.progressText}>Nueva sesión de estudio</span>
            <span className={styles.progressStep}>{step}/{totalSteps}</span>
            <div className={styles.progressBar}>
                <div className={styles.progress} style={{ width: `${(step / totalSteps) * 100}%` }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
