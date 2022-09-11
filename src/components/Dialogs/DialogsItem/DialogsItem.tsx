import classes from './../Dialogs.module.css';
import { NavLink } from "react-router-dom"


type PropsType = {
    name: string
    id: number
}

const DialogsItem: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return (
        <div className={classes.dialog}>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    )
}


export default DialogsItem; 