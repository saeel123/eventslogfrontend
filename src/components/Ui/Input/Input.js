import React from 'react';
import classes from './Input.module.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const input = (props) => {
    let inputElement =  null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched ) {
        inputClasses.push(classes.Invalid);
    }
    
    switch (props.elementType) {

        case ('input'):
            inputElement = <Form.Control 
                                onChange={props.changed}
                                className={inputClasses.join(' ')}
                                {...props.elementConfig} 
                                value={props.value} 
                            />
            break;
        default:
            inputElement = <input 
                                onChange={props.changed}
                                className={classes.InputElement}
                                {...props.elementConfig} 
                                value={props.value} 
                            />
            break;
    }

    return (
        <div className={classes.Input}>
            <Form.Group>
                <Form.Label className={classes.Label}>{props.label}</Form.Label>
                {inputElement}
            </Form.Group>
        </div>
    );
}

export default input;