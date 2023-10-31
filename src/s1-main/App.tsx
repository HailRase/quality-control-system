import React, {useEffect} from 'react';
import s from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import Login from "../s4-feature/f1-login/Login";
import AdministratorMain from "../s4-feature/f2-administrator/a1-main/AdministratorMain";
import Profiles from "../s4-feature/f2-administrator/a2-profiles/Profiles";
import AssessmentCriteria from "../s4-feature/f2-administrator/a3-assessment-criteria/AssessmentCriteria";
import Dictionaries from "../s4-feature/f2-administrator/a4-dictionaries/Dictionaries";
import CallSettings from "../s4-feature/f2-administrator/a5-сall-settings/CallSettings";
import Supervisors from "../s4-feature/f2-administrator/a6-supervisors/Supervisors";
import {useAppSelector} from "../s2-bll/store";
import {useDispatch} from "react-redux";
import {initialization} from "../s2-bll/b0-auth/auth-reducer";

function App() {
    const dispatch = useDispatch<any>()
    const isAuth = useAppSelector(state => state.authData.isAuth)
    const status = useAppSelector(state => state.authData.status)
    const role = useAppSelector(state => state.authData.data.role)

    useEffect(() => {
        dispatch(initialization())
    }, [])

    return (
        <div className={s.container}>
            {role === 'Администратор' ?
                <Routes>
                    <Route path={'/'} element={<AdministratorMain><Profiles/></AdministratorMain>}/>
                    <Route path={'/assessment-criteria'}
                           element={<AdministratorMain><AssessmentCriteria/></AdministratorMain>}/>
                    <Route path={'/dictionaries'} element={<AdministratorMain><Dictionaries/></AdministratorMain>}/>
                    <Route path={'/call-settings'} element={<AdministratorMain><CallSettings/></AdministratorMain>}/>
                    <Route path={'/supervisors'} element={<AdministratorMain><Supervisors/></AdministratorMain>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
                : role === "Оператор"
                    ? <div>Оператор</div>
                    : role === "Супервизор"
                        ? <div>Супервизор</div>
                        : status === 'loading'
                            ? ''
                            :<Login/>
            }

            {/*{
                user.role === 0 ?
                    <Routes>
                        <Route path={'/'} element={<div><h1>Администратор</h1></div>}/>
                        <Route path={'/main'} element={<div><h1>Администратор</h1></div>}/>
                    </Routes>
                    : user.role === 1
                        ? <Routes>
                            <Route path={''} element={<div><h1>Супервизор</h1></div>}/>

                        </Routes>
                        : <Routes>
                            <Route path={''} element={<div><h1>Оператор</h1></div>}/>
                        </Routes>
            }*/}
        </div>
    );
}

export default App;
