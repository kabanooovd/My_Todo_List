import styles from './SuperHeader.module.css'
import {useDispatch, useSelector} from "react-redux";
import {logout_TC} from "../../state/auth-reducer";
import {AppRootStateType} from "../../state/store";


export const SuperHeader = () => {

    const dispatch = useDispatch()

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

    return(
        <div className={styles.headerWrapper}>
            <div className={styles.xxx}>
                <div>
                    <h1 className={styles.headerTitle}>
                        You are
                        <span className={styles.additionalTextStyles}> WELLCOMED </span>
                        to my
                        <span className={styles.additionalTextStyles}> TO-DO LIST </span>
                        application
                    </h1>
                </div>

            </div>
            <div className={styles.buttonWrapper}>
                {isLogged && <button onClick={() => dispatch(logout_TC())} className={styles.btnLogout}>Logout</button>}
            </div>
        </div>
    )
}





