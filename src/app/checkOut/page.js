"use client"
import React, { useState, useEffect } from 'react';
import styles from '@/styles/CheckOutPage.module.css';
import LargeButton from '@/components/LargeButton';

const CompletionPage = () => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [progress, setProgress] = useState(0);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const totalCheckboxes = 2;
        const checkedCheckboxes = [isChecked1, isChecked2].filter(Boolean).length;
        setProgress((checkedCheckboxes / totalCheckboxes) * 100);
    }, [isChecked1, isChecked2]);

    const feedbackOptions = [
        { emoji: "😊", text: "Great!" },
        { emoji: "😐", text: "Okay" },
        { emoji: "😞", text: "Not Good" },
        { emoji: "😡", text: "Angry" },
        { emoji: "😢", text: "Sad" }
    ];

    return (
        <div className={styles.pageComponent}>
            <p className={styles.title}>¡Terminaste tu sesión de estudio! Marcá los objetivos que alcanzaste:</p>

            <div className={styles.objectiveItem}>
                <div className={styles.objective}>
                    <input type="checkbox" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} />
                    <span>Estudiar integradora de Química</span>
                </div>
                <div className={styles.date}>
                    <div className={styles.icon}></div>
                    <span>19/06/24</span>
                </div>
            </div>

            <div className={styles.objectiveItem}>
                <div className={styles.objective}>
                    <input type="checkbox" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} />
                    <span>Terminar tarea de Literatura</span>
                </div>
                <div className={styles.date}>
                    <div className={styles.icon}></div>
                    <span>21/06/24</span>
                </div>
            </div>

            <div className={styles.progressSection}>
                <p>Progreso en tu objetivos</p>
                <div className={styles.progressBarContainer}>
                    <div className={styles.progressBar}>
                        <div className={styles.progress} style={{ width: `${progress}%` }}></div>
                    </div>
                    <span className={styles.progressText}>{progress}%</span>
                </div>
            </div>

            <div className={styles.feedbackSection}>
                <p className={styles.feedbackTitle}>¿Cómo te sentiste durante la sesión?</p>
                <div className={styles.feedbackOptions}>
                    {feedbackOptions.map((option, index) => (
                        <button
                            key={index}
                            className={`${styles.feedbackButton} ${selectedFeedback === index ? styles.selected : ''}`}
                            onClick={() => setSelectedFeedback(index)}
                        >
                            <span className={styles.emoji}>{option.emoji}</span>
                            <span>{option.text}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.buttonContainer}>
                <LargeButton label="Volver al menú principal" />
            </div>
        </div>
    );
};

export default CompletionPage;