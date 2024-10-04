'use client';
import React, { useState } from "react";
import axios from 'axios';
import styles from '@/styles/CompletionPage.module.css';
import LargeButton from '@/components/LargeButton';

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

    const handleSubmit = () => {
        const optionsWithValues = selectedOptions.map(option => {
            switch (option) {
                case 'option1':
                    return { option, value: 10 };
                case 'option2':
                    return { option, value: 20 };
                case 'option3':
                    return { option, value: 30 };
                case 'option4':
                    return { option, value: 40 };
                default:
                    return { option, value: 0 };
            }
        });

        axios.post('https://api.anteriorrepositorio.com/updateAccumulators', {
            selectedOptions: optionsWithValues
        })
            .then(response => {
                console.log('Success:', response.data);
                window.location.href = '/home';
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={styles.pageComponent}>
            <h2 className={styles.title}>
                Antes de terminar, ¿qué rescatás de esta sesión de estudio? <span className={styles.emoji}>❤️</span>
            </h2>

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
                    Me organicé de manera efectiva 📋
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
                    Logré enfocarme 📌
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
                    Aprendí algo nuevo 🎁
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
                    Mantuve la motivación 💪
                </label>
            </div>

            <div className={styles.buttonContainer}>
                <LargeButton label="Finalizar" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default CompletionPage;