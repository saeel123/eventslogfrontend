import React , { Component } from 'react';
import Button from '../../components/Ui/Button/Button';
import Input from '../../components/Ui/Input/Input';
import Spinner from '../../components/Spinner/Spinner';
import DateTimePicker from 'react-datetime-picker';




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
            verbType: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'all', displayValue: 'All'},
                        {value: 'create', displayValue: 'Fastest'},
                        {value: 'destroy', displayValue: 'Destroy'},
                        {value: 'published', displayValue: 'Published'},
                        {value: 'unpublished', displayValue: 'Unpublished'}
                    ]
                },
                value: 'fastest',
                isValid: true,
                touched: false
            }
        },
        loading: false,
        formIsValid: false,
        toDateTime: new Date(),
        fromDateTime: new Date(),

    }

    inputChangedHadler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
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


    orderHandler = (event) => {
        event.preventDefault();
        const search = this.state.controls.search.value;
        const verbType = this.state.controls.verbType.value;
        const toDate = null;
        const fromDate = null;



        console.log(search);
        console.log(verbType);
        console.log(new Date(this.state.toDateTime).getTime() / 1000);
        console.log(new Date(this.state.fromDateTime).getTime() / 1000);
    }
       

    onChangeFrom = (date) => {
        this.setState({ fromDateTime: date })

    }

    onChangeTo = (date) => {
        this.setState({ toDateTime: date })
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
            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map(formElement => (
                        <Input  key={formElement.id}
                                elementType={formElement.config.elementType} 
                                elementConfig={formElement.config.elementConfig}  
                                changed={(event) => this.inputChangedHadler(event, formElement.id)}
                                invalid={!formElement.config.isValid}
                                touched={formElement.config.touched}
                                shouldValidate={formElement.config.validation}
                                value={formElement.config.value}/>
                    ))
                }

                <DateTimePicker
                        onChange={this.onChangeFrom}
                        value={this.state.fromDateTime}
                        />
                
                
                <DateTimePicker
                        onChange={this.onChangeTo}
                        value={this.state.toDateTime}
                        />


                <Button type="submit" btnType="Success">Submit</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>
        }
        

        return (
            <div>
                <div>
                    <h3>Search Events</h3>
                    {form}
                </div>
            </div>
        )
    }

}

export default Search;