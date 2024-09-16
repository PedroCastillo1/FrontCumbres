'use client';

import React from 'react';
import styles from '@/styles/LargeButton.module.css';

const defaultProps = {
    label: 'Registrarme',
    onClick: () => {},
};

const LargeButton = (props) => {
    const { label, onClick } = { ...defaultProps, ...props };

    return (
        <button className={styles.largeButton} onClick={onClick}>
            {label}
        </button>
    );
};

export default LargeButton;