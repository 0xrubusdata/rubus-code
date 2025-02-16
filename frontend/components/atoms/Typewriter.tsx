// components/atoms/Typewriter.tsx
import React from 'react';
import styles from '../../styles/Typewriter.module.css';

interface TypewriterProps {
    lines: string[];
}

const Typewriter: React.FC<TypewriterProps> = ({ lines }) => {
    return (
        <div className={styles.typewriter}>
            {lines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
};

export default Typewriter;