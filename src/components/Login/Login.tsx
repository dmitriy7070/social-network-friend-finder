import React from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utility/validators/validators";
import { connect } from "react-redux";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import classes from "./../Common/FormsControls/FormsControls.module.css"
import { AppStateType } from "../../redux/redux-store";

// const maxLength15 = maxLengthCreator(15);

type LoginFormOwnProps = {
   captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
   return (
      <div className={classes.formLog}>
         <form onSubmit={handleSubmit}>
            <div>
               <Field className={classes.formLog} placeholder={"Email"} name={"email"} component={Input} validate={[required]} />
            </div>
            <div>
               <Field className={classes.formLog} placeholder={"Password"} name={"password"} component={Input} validate={[required]} type={"password"} />
            </div>
            <div>
               <Field className={classes.remember} component={'input'} name={"rememberMe"} type={"checkbox"} /> Remember Me
            </div>

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && <Field placeholder="Symbol from image" name={"captcha"} component={Input} validate={[required]} />}

            {error && <div className={classes.formSummaryError}>
               {error}
            </div>}
            <div>
               <button className={classes.login}>Login</button>
            </div>
         </form>
      </div>
   )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)


type MapStatePropsType = {
   captchaUrl: string | null
   isAuth: boolean
}

type MapDispatchPropsType = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
   email: string
   password: string
   rememberMe: boolean 
   captcha: string
}

// type LoginFormValuesTypeKeys = keyof LoginFormValuesType

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
   const onSubmit = (formData: LoginFormValuesType) => {
      props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
   }

   if (props.isAuth) {
      return (
         <Navigate to={"/profile"} />
      )
   }

   return (
      <div>
         <h1 className={classes.log}>Login</h1>
         <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
      </div>
   )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
   captchaUrl: state.auth.captchaUrl,
   isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);

