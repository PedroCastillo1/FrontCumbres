"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/StudySessionPage.module.css';
import LargeButton from '@/components/LargeButton';

const StudySessionPage = () => {
    const [objectives, setObjectives] = useState([]);
    const [selectedObjectives, setSelectedObjectives] = useState([]);

    useEffect(() => {
        const fetchObjectives = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    toast.error('Authorization token not found');
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const response = await axios.get('http://localhost:8080/objective/getAll', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setObjectives(response.data);
            } catch (error) {
                toast.error('Error fetching objectives');
            }
        };

        fetchObjectives();
    }, []);

    const toggleObjective = (objective) => {
        if (selectedObjectives.some(obj => obj.id === objective.id)) {
            setSelectedObjectives(selectedObjectives.filter(obj => obj.id !== objective.id));
        } else {
            setSelectedObjectives([...selectedObjectives, objective]);
        }
    };

    const handleNext = () => {
        if (selectedObjectives.length === 0) {
            toast.error('Please select at least one objective');
            return;
        }

        localStorage.setItem('selectedObjectives', JSON.stringify(selectedObjectives));
        window.location.href = "/setupSession2";
    };

    const handleBack = () => {
        window.location.href = "/home";
    };

    const handleAddObjective = () => {
        window.location.href = "/objectives";
    };

    return (
        <div className={styles.pageComponent}>
            <ToastContainer />
            <div className={styles.header}>
                <span className={styles.backArrow} onClick={handleBack}>←</span>
                <h2 className={styles.progressText}>
                    Primero, definí cuáles van a ser los objetivos de tu sesión 🎯
                </h2>
            </div>

            {objectives.length === 0 ? (
                <LargeButton label="Agregar nuevo objetivo" onClick={handleAddObjective} />
            ) : (
                <div className={styles.objectiveList}>
                    {objectives.map((objective) => (
                        <label key={objective.id} className={styles.objectiveItem}>
                            <input
                                type="checkbox"
                                checked={selectedObjectives.some(obj => obj.id === objective.id)}
                                onChange={() => toggleObjective(objective)}
                            />
                            <span>{objective.name}</span>
                            <span className={styles.date}>{objective.expirationDate}</span>
                        </label>
                    ))}
                </div>
            )}

            <LargeButton label="Siguiente" onClick={handleNext} />
        </div>
    );
};

export default StudySessionPage;