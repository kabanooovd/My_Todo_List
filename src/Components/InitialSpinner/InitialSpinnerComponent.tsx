import React from "react";
import st from './InitialSpinnerComponent.module.css'
import initialSpinner from '../../assets/initialSpinner.gif'


export const InitialSpinnerComponent = () => {

    return <div className={st.spinnerStyle}>
        <img src={initialSpinner}/>
    </div>

}