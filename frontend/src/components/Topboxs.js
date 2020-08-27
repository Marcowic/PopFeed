import React from 'react';
import { Column } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite/no-important';
import './design.css'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        border: '1px solid #DFE0EB',
        borderRadius: 4,
        cursor: 'pointer',
        height: 70,
        maxWidth: 350,
        padding: '24px 32px 24px 32px',
        ':hover': {
            borderColor: '#3751FF',
            ':nth-child(n) > span': {
                color: '#3751FF'
            }
        }
    },
});

function Topbox({ className = '', title, value }) {
    const composedClassName = `${css(styles.container)} ${className}`;
    return (
        <Column flexGrow={1} className={composedClassName} horizontal="center" vertical="center">
            <span className="topboxTitle">{title}</span>
            <span className="topboxValue">{value}</span>
        </Column>
    );
}

export default Topbox;