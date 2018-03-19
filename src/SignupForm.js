import React, { Component } from 'react';

const FormErrors = ({formErrors}) => (
  <div className='Form-errors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>
)

class SignupForm extends Component{

  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      formErrors: {name: '', email: '', phone: ''},
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      formValid: false
    };
    this.initialState = this.state;
  }

  submitHandler = (e) => {
    e.preventDefault();

    const newParticipant = {
      name: this.fullName.value,
      email: this.emailAdd.value,
      phone: this.phoneNum.value
    }

    this.props.addParticipant(newParticipant);
    this.signupForm.reset();
    this.setState(this.initialState);
  }

  userInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value}, 
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let phoneValid = this.state.phoneValid;

    switch(fieldName) {
      case 'name':
        nameValid = value.length > 0;
        fieldErrors.name = nameValid ? '' : 'Name is required';
        break;
      case 'email':
        emailValid = /\S+@\S+\.\S+/.test(value);
        fieldErrors.email = emailValid ? '' : 'Email address is invalid';
        break;
      case 'phone':
        phoneValid = /^\d+$/.test(value);
        fieldErrors.phone = phoneValid ? '': 'Phone number is invalid';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldErrors,
      nameValid: nameValid,
      emailValid: emailValid,
      phoneValid: phoneValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.emailValid && this.state.phoneValid});
  }


  render() {
    return (
      <form className="Main-form" onSubmit={this.submitHandler} ref={input => this.signupForm = input}>
        <div>
          <FormErrors formErrors={this.state.formErrors}/>
        </div>
        <input style={{width:'20%'}} 
               type="text" 
               name="name"
               required
               placeholder="Full name"
               ref={input => this.fullName = input}
               onChange={this.userInputHandler}/>
        <input style={{width:'30%'}} 
               type="email" 
               name="email"
               required
               placeholder="E-mail address"
               ref={input => this.emailAdd = input}
               onChange={this.userInputHandler}/>
        <input style={{width:'20%'}} 
               type="text" 
               name="phone"
               required
               placeholder="Phone number"
               ref={input => this.phoneNum = input}
               onChange={this.userInputHandler}/>

        <button disabled={!this.state.formValid} type="submit">Add new</button>
      </form>
    )
  }
}

export default SignupForm;
