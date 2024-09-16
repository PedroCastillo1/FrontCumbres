"use client"
import React, { useState } from 'react';
import styles from '@/styles/StudySessionPage.module.css';
import LargeButton from '@/components/LargeButton';

const StudySessionPage = () => {
    const predefinedObjectives = [
        { id: 1, name: 'Integradora de Química', date: '2024-09-24' },
        { id: 2, name: 'Tarea de Geografía', date: '2024-09-26' },
        { id: 3, name: 'Oral de Literatura', date: '2024-09-27' }
    ];

    const [selectedObjectives, setSelectedObjectives] = useState([]);

    const toggleObjective = (objective) => {
        if (selectedObjectives.some(obj => obj.id === objective.id)) {
            setSelectedObjectives(selectedObjectives.filter(obj => obj.id !== objective.id));
        } else {
            setSelectedObjectives([...selectedObjectives, objective]);
        }
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <span className={styles.backArrow}>←</span>
                <h2 className={styles.progressText}>
                    Primero, definí cuáles van a ser los objetivos de tu sesión 🎯
                </h2>
            </div>

            <div className={styles.objectiveList}>
                {predefinedObjectives.map((objective) => (
                    <label key={objective.id} className={styles.objectiveItem}>
                        <input
                            type="checkbox"
                            checked={selectedObjectives.some(obj => obj.id === objective.id)}
                            onChange={() => toggleObjective(objective)}
                        />
                        <span>{objective.name}</span>
                        <span className={styles.date}>{objective.date}</span>
                    </label>
                ))}
            </div>

            <LargeButton label="Siguiente" onClick={() => console.log('Objetivos seleccionados:', selectedObjectives)} />
        </div>
    );
};

export default StudySessionPage;