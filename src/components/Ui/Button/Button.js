import React from 'react';
import Button from 'react-bootstrap/Button';

import classes from './Button.module.css';

const appButton = (props) => (
    <Button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        disabled={props.disabled}
        type={props.type}
        onClick={props.clicked}>
            {props.children}
    </Button>
);

export default appButton;