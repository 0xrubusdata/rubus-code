import React from 'react';
import styles from '../../styles/Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;         // Button text
    isLoading?: boolean;  // Loading state
}

const Button: React.FC<ButtonProps> = ({ label, isLoading, ...props }) => {
    return (
        <button className={styles.button} disabled={isLoading} {...props}>
            {isLoading ? 'Loading...' : label}
        </button>
    );
};

export default Button;