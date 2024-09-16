"use client";

import React, { useState, useEffect } from 'react';
import styles from '@/styles/ChronometerPage.module.css';

const StudySessionTimer = () => {
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(40 * 60);

    useEffect(() => {
        let timer;
        if (!isPaused && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPaused, time]);

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsPaused(true);
        setTime(40 * 60);
    };

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
        return `${getHours}:${getMinutes}:${getSeconds}`;
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.timerDisplay}>
                {formatTime(time)}
            </div>
            <div className={styles.controlButtons}>
                <div className={styles.controlButton}>
                    <button onClick={handleReset}>
                        &#8635;
                    </button>
                    <span>Reset</span>
                </div>
                <div className={styles.controlButton}>
                    <button onClick={handlePause}>
                        {isPaused ? '▶' : '❚❚'}
                    </button>
                    <span>{isPaused ? 'Reanudar' : 'Pausar'}</span>
                </div>
            </div>
            <div className={styles.motivationText}>
                "Tu Norte aquí"
            </div>
            <div className={styles.footerIcons}>
                <div className={styles.footerIcon}>
                    &#9200;
                </div>
                <div className={styles.footerIcon}>
                    &#9835;
                </div>
            </div>
        </div>
    );
};

export default StudySessionTimer;