import React from "react"
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input, Textarea } from "../../Common/FormsControls/FormsControls";
import classes from './ProfileInfo.module.css';
import c from "./../../Common/FormsControls/FormsControls.module.css"

type PropsType = {
  
}

const ProfileDataForm: React.FC<InjectedFormProps< PropsType> & PropsType> = ({ handleSubmit, error }) => {
  return <form onSubmit={handleSubmit} >
    <div><button className={classes.bEdit}>Save</button></div>
    {error && <div className={c.formSummaryError}>
      {error}
    </div>}
    <h2><b>Full name:</b>
      <Field placeholder={"Full name"} name={"fullName"} component={Input} validate={[]} />
    </h2>
    <div> <b>About me:</b>
      <Field placeholder={"About me:"} name={"aboutMe"} component={Textarea} validate={[]} />
    </div>
    <div> <b>Contacts:</b>
      <div><b>Facebook:</b> <Field placeholder={"Facebook:"} name={"contacts.facebook"} component={Input} validate={[]} /> </div>
      <div><b>Website:</b> <Field placeholder={"Website:"} name={"contacts.website"} component={Input} validate={[]} /></div>
      <div><b>Twitter:</b>  <Field placeholder={"Twitter:"} name={"contacts.twitter"} component={Input} validate={[]} />  </div>
      <div><b>LinkedIn:</b>  <Field placeholder={"LinkedIn:"} name={"contacts.youtube"} component={Input} validate={[]} />  </div>
      <div><b>GitHub:</b>  <Field placeholder={"GitHub:"} name={"contacts.github"} component={Input} validate={[]} /> </div>
      <div><b>Instagram:</b>  <Field placeholder={"Instagram:"} name={"contacts.instagram"} component={Input} validate={[]} /> </div>
    </div>
    <div><b>Loking for a job:</b>
      <Field placeholder={""} name={"lookingForAJob"} component={Input} validate={[]} type={"checkbox"} />
    </div>
    <div><b>My proffessional skills:</b>
      <Field placeholder={"My proffessional skills:"} name={"lookingForAJobDescription"} component={Textarea} validate={[]} />
    </div>
  </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)

export default ProfileDataFormReduxForm;
