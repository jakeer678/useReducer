import React, {  useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";


// const emailReducer = (state,action) => {
//   if(action.type==='USER_INPUT') {
//     return { value: action.val , isValid: action.val.includes('@')}
//   }
//   if(action.type==='USER_BLUR') {
//     return { value: state.value, isValid: state.value.includes('@')}
//   }
//   return { value: '', isValid: false}
// }
const passwordReducer = (state,action) => {
  if(action.type==='USER_INPUT') {
    return { value: action.val , isValid: action.val.includes('@')}
  }
  if(action.type==='USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@')}
  }
  return { value: '', isValid: false}
}



const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


// const [emailState, dispatchEmail] = useReducer(emailReducer, {
//   value: '',
//   isValid:false,
// })
const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
  value: '',
  isValid:false,
})


  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("checking form validity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 5000);

  //   return () => {
  //     console.log("Clean up");
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail,enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
    
    setFormIsValid(
      event.target.value.includes("@") && passwordState.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    // event.target.value.trim().length > 6 && enteredEmail.includes("@")
    // );
    setFormIsValid(
      // emailState.isValid
      passwordState.isValid
      // enteredEmail.value.event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
    // dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(enteredEmail, enteredPassword);
    props.onLogin(enteredEmail, passwordState);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
             emailIsValid === false ? classes.invalid : ""
            // emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            // value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
