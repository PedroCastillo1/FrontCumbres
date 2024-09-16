'use client';

import React, { useState } from 'react';
import styles from '@/styles/ObjectivesPage.module.css';
import { FaTrash } from 'react-icons/fa';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', deadline: '' });

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => {
        setIsFormOpen(false);
        setNewTask({ name: '', deadline: '' });
    };

    const handleSubmit = () => {
        if (newTask.name && newTask.deadline) {
            setTasks([...tasks, newTask]);
            closeForm();
        }
    };

    const handleDelete = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className={styles.pageComponent}>
            <div className={styles.header}>
                <span className={styles.backArrow}>←</span>
                <h2>Agendá los exámenes, tareas y pendientes que tenés por delante ✍️</h2>
            </div>

            <div className={styles.taskList}>
                {tasks.map((task, index) => (
                    <div key={index} className={styles.task}>
                        <p>{task.name}</p>
                        <div className={styles.taskActions}>
                            <span>Fecha límite: {task.deadline}</span>
                            <button className={styles.deleteButton} onClick={() => handleDelete(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                <div className={styles.newTask} onClick={openForm}>
                    <span>+ Agregar nueva tarea o examen</span>
                    <span>📅 Fecha límite</span>
                </div>
            </div>

            <button className={styles.saveButton}>Guardar</button>

            {isFormOpen && (
                <div className={styles.formOverlay}>
                    <div className={styles.form}>
                        <h3>Agregar tarea o examen</h3>
                        <input
                            type="text"
                            placeholder="Nombre de la tarea"
                            value={newTask.name}
                            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        />
                        <input
                            type="date"
                            value={newTask.deadline}
                            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                        />
                        <div className={styles.formButtons}>
                            <button onClick={handleSubmit}>Agregar</button>
                            <button onClick={closeForm}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;