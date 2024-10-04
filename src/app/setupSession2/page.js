"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/StudySessionPage2.module.css';
import LargeButton from "@/components/LargeButton";

const StudySessionPage = () => {
    const [focusMinutes, setFocusMinutes] = useState(50);
    const [focusSeconds, setFocusSeconds] = useState(0);

    const handleStart = async () => {
        const selectedObjectives = JSON.parse(localStorage.getItem('selectedObjectives')) || [];

        if (selectedObjectives.length === 0) {
            toast.error('No objectives selected');
            return;
        }

        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                toast.error('Authorization token not found');
                return;
            }

            const response = await axios.post('http://localhost:8080/study-session', {
                name: "Sesion de estudio",
                objectives: selectedObjectives.map(obj => obj.id),
                timer: {
                    minutes: focusMinutes,
                    seconds: focusSeconds
                }
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success('Study session created successfully');
                // Redirigir al cronómetro con los tiempos
                window.location.href = `/chronometer?minutes=${focusMinutes}&seconds=${focusSeconds}`;
            }
        } catch (error) {
            toast.error('Error creating study session');
        }
    };

    return (
        <div className={styles.pageComponent}>
            <ToastContainer />
            <span className={styles.backArrow}>&larr;</span>
            <h2 className={styles.title}>
                Ahora, decidí cuánto querés que duren tus bloques de estudio y tus recreos <span role="img" aria-label="clock emoji">⏲️</span>
            </h2>
            <div className={styles.timeSettings}>
                <div className={styles.timeItem}>
                    <span>Duración de los bloques de estudio</span>
                    <div>
                        <input
                            type="number"
                            value={focusMinutes}
                            onChange={(e) => setFocusMinutes(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                        />
                        <span>m</span>
                        <input
                            type="number"
                            value={focusSeconds}
                            onChange={(e) => setFocusSeconds(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                            max="59"
                        />
                        <span>s</span>
                    </div>
                </div>
            </div>
            <LargeButton label="Empezar" onClick={handleStart} />
        </div>
    );
};

export default StudySessionPage;