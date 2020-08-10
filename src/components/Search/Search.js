import React , { Component } from 'react';
import Button from '../../components/Ui/Button/Button';
import Input from '../../components/Ui/Input/Input';
import Spinner from '../../components/Spinner/Spinner';
import DateTimePicker from 'react-datetime-picker';

import { connect } from 'react-redux';
import * as actionsCreators from  '../../store/actions/index';

import RButton from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './Search.css';







class Search extends Component {

    state = {
        controls: {
            search: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Search'
                },
                value: '',
            },
            // verbType: {
            //     elementType: 'select',
            //     elementConfig: {
            //         options: [
            //             {value: 'all', displayValue: 'All'},
            //             {value: 'create', displayValue: 'Fastest'},
            //             {value: 'destroy', displayValue: 'Destroy'},
            //             {value: 'published', displayValue: 'Published'},
            //             {value: 'unpublished', displayValue: 'Unpublished'}
            //         ]
            //     },
            //     value: 'fastest',
            //     isValid: true,
            //     touched: false
            // }
        },
        loading: false,
        formIsValid: false,
        toDateTime: '',
        fromDateTime: '',
        toDateMaxRange: new Date(),
        toDateMinRange: '',
        fromDateMaxRange: new Date(),
        fromDateMinRange: '',
    }

    inputChangedHadler = (value, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: value,
                isValid: this.checkValidity(value, this.state.controls[controlName].validation),
                touched: true
            }
        }

         this.setState({ controls: updatedControls });
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;

    }

    resetHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('searchString');
        localStorage.removeItem('toDateTime');
        localStorage.removeItem('fromDateTime');
        this.inputChangedHadler('', 'search')
        this.props.onFetchEvents(1, 10);
        this.onChangeFrom('');
        this.onChangeTo('');    
        this.setState({toDateMaxRange: new Date()});  
        this.setState({ fromDateMaxRange: new Date()});    
    }


    filterEventHandler = (event) => {
        event.preventDefault();
        localStorage.setItem('toDateTime', this.state.toDateTime);
        localStorage.setItem('fromDateTime', this.state.fromDateTime);
        localStorage.setItem('searchString', this.state.controls.search.value);
        this.props.onFetchEvents(1, 10);
    }
       
    onChangeFrom = (date) => {
        this.setState({ fromDateTime: date, toDateMinRange: date })
        
    }

    onChangeTo = (date) => {
        this.setState({ toDateTime: date, fromDateMaxRange: date })
    }

    componentDidMount() {
        localStorage.setItem('toDateTime', '');
        localStorage.setItem('fromDateTime', '');

        const searchString = localStorage.getItem('searchString');
        const toDateTime = localStorage.getItem('toDateTime');
        const fromDateTime = localStorage.getItem('fromDateTime');

        if (searchString) {
            this.inputChangedHadler(searchString, 'search')
        }

        if (toDateTime) {
            this.onChangeTo(toDateTime)
        }

        if (fromDateTime) {
            this.onChangeFrom(fromDateTime)
        }

        

    }

    render() {
        const formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form =(
            <form onSubmit={this.filterEventHandler}>
                {
                    formElementArray.map(formElement => (

                       
                        <Form.Group as={Row} controlId="formHorizontalEmail" key={formElement.id}>
                            <Form.Label className={'search-label'} column sm={2}>
                                Search Event
                            </Form.Label>
                            <Col className={'search-input'} sm={10}>
                                <Input  
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig}  
                                    changed={(event) => this.inputChangedHadler(event.target.value, formElement.id)}
                                    invalid={!formElement.config.isValid}
                                    touched={formElement.config.touched}
                                    shouldValidate={formElement.config.validation}
                                    value={formElement.config.value}/>
                            </Col>
                        </Form.Group>
                    ))
                }
                
           
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            From Date
                        </Form.Label>
                        <Col sm={10}>
                            <DateTimePicker
                                    onChange={this.onChangeFrom}
                                    value={this.state.fromDateTime}
                                    maxDate={this.state.fromDateMaxRange}
                                    minDate={this.state.fromDateMinRange}
                                    clearIcon={null}
                                    />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            To Date
                        </Form.Label>
                        <Col sm={10}>
                            <DateTimePicker
                                        onChange={this.onChangeTo}
                                        value={this.state.toDateTime}
                                        maxDate={this.state.toDateMaxRange}
                                        minDate	={this.state.toDateMinRange}
                                        clearIcon={null}
                                        />
                        </Col>
                    </Form.Group>
            
                <Row>
                    <Col>
                        <Button type="submit" btnType="Success">Submit</Button>
                        <RButton className={'button-space'} variant="danger" onClick={this.resetHandler}>Reset</RButton> 
                    </Col>
                </Row>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }
        

        return (
            <div>
                <h2>Events</h2>
                <Jumbotron >
                    <div>
                        <div>
                        
                            {form}
                        </div>
                    </div>
                </Jumbotron>
            </div>
            
        )
    }

}


const mapStateToProps = state => {
    return {
        events: state.event.events,
        resultCount: state.event.resultCount,
        totalCount: state.event.totalCount,
        loading: state.event.loading,
        pages: state.event.pages,
        limit: state.event.limit,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchEvents: (page, limit) => dispatch(actionsCreators.fetchEvents(page, limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);


// export default Search;