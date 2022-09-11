import React from "react";
import classes from './Post.module.css';
import userPost from '../../../../resourses/images/userPost.png'



type PropsType = {
  likesCount: any
  message: any
 
}


const Post: React.FC<PropsType> = (props) => {

 
  return (
    <div>
      
    <div className={classes.item}>
   <img src={userPost}></img>
      {props.message}
      </div>
      <div className={classes.likes}>
        <span>Like {props.likesCount}</span> 
      </div>
      
    </div>

  )
}

export default Post;