"use client";

import React, { useState } from 'react';
import styles from '@/styles/StudySessionPage2.module.css';
import LargeButton from "@/components/LargeButton";

const StudySessionPage = () => {
    const [focusHours, setFocusHours] = useState(0);
    const [focusMinutes, setFocusMinutes] = useState(40);
    const [breakHours, setBreakHours] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(10);
    const [totalFocusBlocks, setTotalFocusBlocks] = useState(3);

    const handleStart = () => {
        alert('Empezar');
    };

    return (
        <div className={styles.pageComponent}>
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
                            value={focusHours}
                            onChange={(e) => setFocusHours(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                        />
                        <span>h</span>
                        <input
                            type="number"
                            value={focusMinutes}
                            onChange={(e) => setFocusMinutes(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                            max="59"
                        />
                        <span>m</span>
                    </div>
                </div>
                <div className={styles.timeItem}>
                    <span>Duración de los recreos</span>
                    <div>
                        <input
                            type="number"
                            value={breakHours}
                            onChange={(e) => setBreakHours(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                        />
                        <span>h</span>
                        <input
                            type="number"
                            value={breakMinutes}
                            onChange={(e) => setBreakMinutes(e.target.value)}
                            className={styles.timeInput}
                            min="0"
                            max="59"
                        />
                        <span>m</span>
                    </div>
                </div>
                <div className={styles.timeItem}>
                    <span>Cantidad total de bloques de estudio</span>
                    <input
                        type="number"
                        value={totalFocusBlocks}
                        onChange={(e) => setTotalFocusBlocks(e.target.value)}
                        className={styles.blockInput}
                    />
                </div>
            </div>
            <LargeButton label="Empezar" onClick={handleStart} />
        </div>
    );
};

export default StudySessionPage;