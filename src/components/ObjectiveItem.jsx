"use client";

import React from 'react';
import styles from '@/styles/StudySessionPage.module.css';

const ObjectiveItem = ({ name, date, onDelete }) => {
    return (
        <div className={styles.objectiveItem}>
            <div className={styles.objective}>
                <span>{name}</span>
            </div>
            <div className={styles.date}>
                <div className={styles.icon}></div>
                <span>{date}</span>
            </div>
            <button className={styles.deleteButton} onClick={onDelete}>Eliminar</button>
        </div>
    );
};

export default ObjectiveItem;