import styles from './SuperHeader.module.css'
import img from './superHeaderImg.png'


export const SuperHeader = () => {

    return(
        <div style={{'background': `url(${img})`}} className={styles.headerWrapper}>
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


        </div>
    )
}





