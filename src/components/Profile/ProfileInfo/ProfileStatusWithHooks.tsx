import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import classes from './ProfileInfo.module.css';




const ProfileStatusWithHooks = (props: any) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if (props.isOwner) {
            setEditMode(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }


    const onStatusChange = (e: any) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>

            {!editMode &&
                <div>
                    <span className={classes.bStatus} onClick={activateEditMode}>{props.status || "Enter status"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }

        </div>
    )
}


export default ProfileStatusWithHooks; 