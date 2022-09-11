import React, { ChangeEvent } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import classes from './ProfileInfo.module.css';
import userPhoto from './../../../resourses/images/User.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";
import { ProfileType } from "../../../types/types";


type PropsType = {
  profile: ProfileType
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  }

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(
      () => {
        setEditMode(false);
      }
    )
  }

  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img className={classes.pictureAva} src={props.profile.photos.large != null ? props.profile.photos.large : userPhoto} alt={'photo not found'} />
        <div className={classes.myInformation}>

          {editMode
            //@ts-ignore
            ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
            : <ProfileData status={props.status} updateStatus={props.updateStatus} goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}
        </div>
      </div>

      {props.isOwner &&
        <div className={classes.inputWrapper}>
          <input type={"file"} id={"input_file"} className={classes.inputFile} onChange={onMainPhotoSelected} />
          <label htmlFor="input_file">
            <span className={classes.inputFileButtonText}>Change image</span>
          </label>
        </div>}
    </div>
  )
}


type ProfileDataPropsType = {
  profile: ProfileType
  isOwner: boolean
  goToEditMode: () => void
  updateStatus: (status: string) => void
  status: string
}
const ProfileData: React.FC<ProfileDataPropsType> = (props) => {
  return <div>
    <h2 className={classes.name}>{props.profile.fullName}</h2>
    <div>  <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner} /> </div>
    {props.isOwner && <div><button className={classes.bEdit} onClick={props.goToEditMode}>Edit</button></div>}

    <div className={classes.blockMe}><b> About me: </b>{props.profile.aboutMe}</div>
    <div className={classes.contacts}> <b>Contacts:</b>
      <div><b>Facebook:</b> {props.profile.contacts.facebook} </div>
      <div><b>Website:</b> {props.profile.contacts.website} </div>
      <div><b>Twitter:</b> {props.profile.contacts.twitter} </div>
      <div><b>LinkedIn:</b> {props.profile.contacts.youtube} </div>
      <div><b>GitHub:</b> {props.profile.contacts.github} </div>
      <div><b>Instagram:</b> {props.profile.contacts.instagram} </div>
    </div>

    <div><b>Loking for a job:</b> {props.profile.lookingForAJob ? "yes" : "no"} </div>
    {props.profile.lookingForAJob &&
      <div><b>My proffessional skills:</b> {props.profile.lookingForAJobDescription}</div>}
  </div>
}

export default ProfileInfo;
