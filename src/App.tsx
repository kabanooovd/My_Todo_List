import React, {useEffect} from 'react';
import './App.css';
import {SuperHeader} from "./Components/SuperHeader/SuperHeader";
import {TodoListsCollection} from "./Components/TodolistsCollection/TodolistsCollection";
import {SuperLoader} from "./Components/SuperLoader/SuperLoader";
import {ErrorHandler} from "./Components/ErrorHandler/ErrorHandler";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AppReducer_T, checkWhoAmI, initApp_AC} from "./state/app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from "./Components/LoginComponent/Login";
import {InitialSpinnerComponent} from "./Components/InitialSpinner/InitialSpinnerComponent";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const dispatch = useDispatch()

    const initApp_AC = useSelector<AppRootStateType, boolean>(state => state.appData.isInitialized)

    const appData = useSelector<AppRootStateType, AppReducer_T>(state => state.appData)

    useEffect( () => {
        dispatch(checkWhoAmI)
    }, [] )

    if (!initApp_AC) {
        return <InitialSpinnerComponent />
    }

    return (
        <div>
            <SuperHeader/>
            <div className={'loaderWrapper'}>
                {appData.loaderStatus === 'loading' && <SuperLoader/>}
                {appData.errorMode !== null && <ErrorHandler/>}
            </div>
            <div className="App">
                <Switch>
                    <Route exact path={'/'} render={() => <TodoListsCollection/>}/>
                    <Route path={'/login'} render={() => <Login />}/>
                    <Route path={'/404'} render={() => <h1>404, Page not found</h1>}/>
                    <Redirect from={'*'} to={'/404'} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
