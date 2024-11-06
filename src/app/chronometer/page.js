'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/ChronometerPage.module.css';

const StudySessionTimer = () => {
    const [isPaused, setIsPaused] = useState(true);
    const [time, setTime] = useState(0);
    const [objectives, setObjectives] = useState([]);
    const [motivation, setMotivation] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const minutes = parseInt(urlParams.get('minutes'), 10) || 0;
        const seconds = parseInt(urlParams.get('seconds'), 10) || 0;
        const initialTime = minutes * 60 + seconds;
        setTime(initialTime);

        const selectedObjectives = JSON.parse(localStorage.getItem('selectedObjectives')) || [];
        setObjectives(selectedObjectives.map(obj => obj.name));
    }, []);

    useEffect(() => {
        const fetchMotivation = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('Authorization token not found');
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('http://localhost:8080/user/motivation', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMotivation(response.data.motivation);
            } catch (error) {
                console.error('Error fetching motivation:', error);
            }
        };

        fetchMotivation();
    }, []);

    useEffect(() => {
        let timer;
        if (!isPaused && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time === 0 && !isPaused) {
            window.location.href = '/checkOut';
        }
        return () => clearInterval(timer);
    }, [isPaused, time]);

    const handlePause = () => {
        setIsPaused(!isPaused);
    };

    const handleReset = () => {
        setIsPaused(true);
        setTime(0);
        window.location.href = '/checkOut';
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
            <div className={styles.motivationText}>
                🌱 {motivation}
            </div>

            <div className={styles.timerDisplay}>
                {formatTime(time)}
            </div>

            <div className={styles.controlButtons}>
                <button className={styles.controlButton} onClick={handleReset}>
                    Terminar
                </button>
                <button className={styles.controlButton} onClick={handlePause}>
                    {isPaused ? '▶' : '❚❚'}
                </button>
            </div>

            <div className={styles.objectives}>
                🎯 <strong>Objetivos:</strong>
                <ul>
                    {objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudySessionTimer;