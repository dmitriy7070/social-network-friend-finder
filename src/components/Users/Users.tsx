import React from 'react'
import classes from './Users.module.css'
import userPhoto from '../../resourses/images/User.png'
import { NavLink } from 'react-router-dom';
import Paginator from '../Common/Paginator/Paginator';
import { UserType } from '../../types/types';

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    followingInProgress: Array<number>
    users: Array<UserType>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.usersPage}>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'./../profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={classes.userPhoto} />
                            </NavLink>
                        </div>
                        <div>

                            {u.followed
                                ? <button className={classes.buttonsUF} disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.unfollow(u.id);
                                }}>Unfollow</button>
                                : <button className={classes.buttonsUF} disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                                    props.follow(u.id);
                                }}>Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                    </span>
                </div>)
            }
            <Paginator currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                pageSize={props.pageSize}
                totalUsersCount={props.totalUsersCount} />
        </div>
    )
}


export default Users;