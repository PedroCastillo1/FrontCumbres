import React from 'react';

const styles = {
    Input: {
        width: '100%',
        height: '32px',
        padding: '0px 8px',
        border: '1px solid #787878',
        boxSizing: 'border-box',
        borderRadius: '2px',
        backgroundColor: '#ffffff',
        color: '#787878',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        lineHeight: '16px',
        outline: 'none',
    },
};

const defaultProps = {
    text: '',
    value: '',
    onChange: () => {},
    maxLength: 255,
};

const InputField = (props) => {
    const { text, value, onChange, maxLength } = { ...defaultProps, ...props };

    return (
        <input
            style={styles.Input}
            placeholder={text}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
        />
    );
};

export default InputField;