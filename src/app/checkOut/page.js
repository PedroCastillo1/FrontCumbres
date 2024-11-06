'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/CheckOutPage.module.css';
import LargeButton from '@/components/LargeButton';

const CheckOutPage = () => {
    const [objectives, setObjectives] = useState([]);

    useEffect(() => {
        const selectedObjectives = JSON.parse(localStorage.getItem('selectedObjectives')) || [];
        setObjectives(selectedObjectives);
    }, []);

    const handleCheckboxChange = (index) => {
        const updatedObjectives = [...objectives];
        updatedObjectives[index].completed = !updatedObjectives[index].completed;
        setObjectives(updatedObjectives);

        axios.post('https://api.otroservidor.com/updateObjective', {
            id: updatedObjectives[index].id,
            completed: updatedObjectives[index].completed,
        })
            .then(response => {
                console.log('Success:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const handleNext = () => {
        window.location.href = '/completion';
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <button className={styles.backButton}>&#8592;</button>
                <p className={styles.title}>
                    ¡Llegaste al final de la sesión! Marcá los objetivos que cumpliste hoy <span className={styles.flag}>🚩</span>
                </p>
            </div>

            {objectives.map((objective, index) => (
                <div key={objective.id} className={styles.checkboxContainer}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={objective.completed}
                            onChange={() => handleCheckboxChange(index)}
                            className={styles.checkbox}
                        />
                        {objective.name}
                    </label>
                    <div className={styles.date}>
                        <span>{objective.date}</span>
                    </div>
                </div>
            ))}

            <div className={styles.buttonContainer}>
                <LargeButton label="Siguiente" onClick={handleNext} />
            </div>
        </div>
    );
};

export default CheckOutPage;