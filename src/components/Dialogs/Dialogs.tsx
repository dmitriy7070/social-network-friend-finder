import React from "react";
import classes from './Dialogs.module.css';
import DialogsItem from './DialogsItem/DialogsItem';
import Message from './Message/Message';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import { Textarea } from "../Common/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utility/validators/validators";
import { InitialStateType } from "../../redux/dialogsReducer";
//import {Navigate} from "react-router-dom"


type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (messageText: string) => void
}

type NewMessageFormType = {
    newMessageBody: string
}


const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let dialogsElement = state.dialogsData.map(d => <DialogsItem name={d.name} key={d.id} id={d.id} />);
    let messagesElement = state.messagesData.map(m => <Message message={m.message} key = {m.id} />);
    // let newMessageBody = state.newMessageBody;



    // let onNewMessageChange = (event) => {
    //     let body = event.target.value;
    //     props.updateNewMessageBody(body);

    // }

    // let onSendMessageClick = () => {
    //     props.sendMessage();
    // }

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody)
    }

//if (!props.isAuth) return <Navigate to="/login/" /> ;
    

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={classes.messages}>
                {messagesElement}
                <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>

        </div>
    )
    } 

const maxLength50 = maxLengthCreator(50);



type PropType = {}
type NewMessageFormValuesType = {
    newMessageBody: string
}

  const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType, PropType> & PropType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <div>
                    <Field className={classes.area} component ={Textarea} name="newMessageBody" placeholder="Enter your message" validate={[required, maxLength50]}/>
                </div>
                <div>
                    <button className={classes.buttonSent} >Send message</button>
                </div>
                </form>
    )
  }   


  const AddMessageReduxForm = reduxForm<NewMessageFormValuesType> ({form: 'dialogAddMessageForm'}) (AddMessageForm);

export default Dialogs;