"use client";
import React, { useState } from "react";
import styles from '@/styles/CompletionPage.module.css';

const CompletionPage = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionChange = (event) => {
        const value = event.target.value;
        setSelectedOptions(prevSelectedOptions =>
            prevSelectedOptions.includes(value)
                ? prevSelectedOptions.filter(option => option !== value)
                : [...prevSelectedOptions, value]
        );
    };

    return (
        <div className={styles.pageComponent}>
            <h2 className={styles.title}>
                Antes de terminar... <span className={styles.emoji}>🏔️</span>
            </h2>
            <p className={styles.subtitle}>¿Qué rescatás de este ascenso?</p>

            <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="feedback"
                        value="option1"
                        checked={selectedOptions.includes('option1')}
                        onChange={handleOptionChange}
                        className={styles.checkbox}
                    />
                    Avancé en mis objetivos
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="feedback"
                        value="option2"
                        checked={selectedOptions.includes('option2')}
                        onChange={handleOptionChange}
                        className={styles.checkbox}
                    />
                    Me organicé de manera efectiva.
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="feedback"
                        value="option3"
                        checked={selectedOptions.includes('option3')}
                        onChange={handleOptionChange}
                        className={styles.checkbox}
                    />
                    Me mantuve enfocado/a durante la sesión.
                </label>
            </div>
            <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        name="feedback"
                        value="option4"
                        checked={selectedOptions.includes('option4')}
                        onChange={handleOptionChange}
                        className={styles.checkbox}
                    />
                    Aprendí algo nuevo.
                </label>
            </div>

            <button className={styles.finishButton}>Finalizar</button>
        </div>
    );
};

export default CompletionPage;