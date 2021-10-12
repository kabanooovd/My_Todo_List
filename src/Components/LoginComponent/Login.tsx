import React from "react";
import st from './Login.module.css'
import {UniversalButton} from "../UniversalButton/UniversalButton";
import {useFormik} from "formik";
import {login_TC} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Redirect} from "react-router-dom";

export const Login = () => {

    const isLogged = useSelector<AppRootStateType, boolean>(state => state.auth.isLogged)

    const minPasswordLength = 5
    const maxPasswordLength = 25

    const dispatch = useDispatch()

    type Values_T = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const validate = (values: Values_T) => {
        const errors: Values_T = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        } else if (values.password.length <= minPasswordLength || values.password.length >= maxPasswordLength) {
            errors.password = `Must be longer then ${minPasswordLength} or shorter then ${maxPasswordLength}`;
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: values => {
            dispatch(login_TC(values))
            formik.resetForm();
        },
    });

    if (isLogged) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={st.loginWrapper}>
            <div>
                <p>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
            <div className={st.formWrapper}>
                <form className={st.formWrapper} onSubmit={formik.handleSubmit}>
                    <div className={st.inputContainerStyles}>
                        <span>
                            Insert email address please:
                        </span>
                        <input type="email"
                               {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div className={st.errorStyles}>{formik.errors.email}</div>}
                    </div>
                    <div className={st.inputContainerStyles}>
                        <span>
                            Insert password please:
                        </span>
                        <input type="password"
                               {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div className={st.errorStyles}>{formik.errors.password}</div>}
                    </div>
                    <div className={st.checkboxStyles}>
                        <input type="checkbox"
                               checked={formik.values.rememberMe}
                               {...formik.getFieldProps('rememberMe')}
                        /> Remember me
                    </div>
                    <div className={st.loginButtonStyles}>
                        <UniversalButton buttonName={'Login'}
                                         type={'submit'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}








