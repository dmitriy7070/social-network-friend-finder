import React from "react";
import classes from './MyPosts.module.css';
import Post from "./Post/Post";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { maxLengthCreator, required } from "../../../utility/validators/validators";
import { Textarea } from "../../Common/FormsControls/FormsControls";
import { PostType } from "../../../types/types";

const maxLength10 = maxLengthCreator(10);


type PropsTypes = {
  postData: Array<PostType>
  addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsTypes> = (props) => {

  console.log("render");

  let postsElement = props.postData.map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);

  let onAddPost = (values: any) => {
    props.addPost(values.newPostText);
  }
  return (
    
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostFormReduxForm onSubmit={onAddPost} />
      </div>
      <div className={classes.posts}>
        {postsElement}
      </div>
    </div>
  )
}

type PropsType = {
}

const AddNewPostForm: React.FC<InjectedFormProps<PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div >
        <Field className={classes.textArea} component={Textarea} name="newPostText" placeholder='Enter your post' validate={[required, maxLength10]} />
      </div>
      <div>
        <button className={classes.buttonAddPost}> Add post </button>
      </div>
    </form>
  )
}

const AddNewPostFormReduxForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddNewPostForm);


export default MyPosts;


