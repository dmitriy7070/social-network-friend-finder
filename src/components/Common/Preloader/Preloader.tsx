import preloader from '../../../resourses/images/preloader.svg';
import classes from './Preloader.module.css';

let Preloader = (props: any) => {
    return (
        <div className={classes.preloader}>
            <img className={classes.preloaderImg} src={preloader} />
        </div>
    )
}

export default Preloader;