'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/ObjectivesPage.module.css';
import { FaTrash } from 'react-icons/fa';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [newTask, setNewTask] = useState({ name: '', expirationDate: '' });

    useEffect(() => {
        const fetchTasks = async () => {
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
                setTasks(response.data);
            } catch (error) {
                toast.error('Error fetching tasks');
            }
        };

        fetchTasks();
    }, []);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => {
        setIsFormOpen(false);
        setNewTask({ name: '', expirationDate: '' });
    };

    const handleSubmit = async () => {
        if (newTask.name && newTask.expirationDate) {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    toast.error('Authorization token not found');
                    return;
                }

                const response = await axios.post('http://localhost:8080/objective', newTask, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 200) {
                    setTasks((prevTasks) => [...prevTasks, response.data]);
                    closeForm();
                    toast.success('Task created successfully');
                }
            } catch (error) {
                toast.error('Error creating task');
            }
        }
    };

    const handleDelete = async (taskId, index) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                toast.error('Authorization token not found');
                return;
            }

            const response = await axios.delete(`http://localhost:8080/objective/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
                toast.success('Task deleted successfully');
            }
        } catch (error) {
            toast.error('Error deleting task');
        }
    };

    const goToHome = () => {
        window.location.href = "/home";
    };

    return (
        <div className={styles.pageComponent}>
            <ToastContainer />
            <div className={styles.header}>
                <span className={styles.backArrow} onClick={goToHome}>←</span>
                <h2>Agendá los exámenes, tareas y pendientes que tenés por delante ✍️</h2>
            </div>

            <div className={styles.taskList}>
                {tasks.map((task, index) => (
                    <div key={index} className={styles.task}>
                        <p>{task.name}</p>
                        <div className={styles.taskActions}>
                            <span>Fecha límite: {task.expirationDate}</span>
                            <button className={styles.deleteButton} onClick={() => handleDelete(task.id, index)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                <div className={styles.newTask} onClick={openForm}>
                    <span>+ Agregar nueva tarea o examen</span>
                </div>
            </div>

            <button className={styles.saveButton} onClick={goToHome}>Guardar</button>

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
                            value={newTask.expirationDate}
                            onChange={(e) => setNewTask({ ...newTask, expirationDate: e.target.value })}
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