import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './App.module.scss';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "../s4-feature/f1-login/Login";
import AdministratorMain from "../s4-feature/f2-administrator/a1-main/AdministratorMain";
import Profiles from "../s4-feature/f2-administrator/a2-profiles/Profiles";
import AssessmentCriteria from "../s4-feature/f2-administrator/a3-assessment-criteria/AssessmentCriteria";
import Dictionaries from "../s4-feature/f2-administrator/a4-dictionaries/Dictionaries";
import CallSettings from "../s4-feature/f2-administrator/a5-сall-settings/CallSettings";
import Supervisors from "../s4-feature/f2-administrator/a6-supervisors/Supervisors";
import {useAppSelector} from "../s2-bll/store";
import {useDispatch} from "react-redux";
import {initialize} from "../s2-bll/b0-initialize-reducer/initialize-reducer";
import {PATH} from "./routes/routes";
import CSpin from "../common/Spin/CSpin";
import OperatorsList from "../s4-feature/f3-supervisor/s1-operators-list/OperatorsList";
import SupervisorMain from "../s4-feature/f3-supervisor/s0-main/SupervisorMain";
import Operator from "../s4-feature/f3-supervisor/s1-operators-list/o1-operator/Operator";
import Assessment from "../s4-feature/f3-supervisor/s2-assessment/Assessment";
import Favorites from "../s4-feature/f3-supervisor/s3-favorites/Favorites";
import Search from "../s4-feature/f3-supervisor/s4-search/Search";
import History from "../s4-feature/f3-supervisor/s5-history/History";
import moment from "moment";
import {useAuthCheck} from "../common/hooks/useAuthChek";
import SearchQuery from "../s4-feature/f3-supervisor/s4-search/s1-search-query/SearchQuery";

export const App = () => {
    const initialized = useAppSelector(state => state.initializeData.initialized)
    const [startDate, setStartDate] = useState<string>(moment().subtract(1, 'days').format('YYYY-MM-DD'))
    const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const role = useAppSelector(state => state.authData.data.role)
    const isAuth = useAppSelector(state => state.authData.isAuth)
    useAuthCheck(isAuth)

    useEffect(() => {
        dispatch(initialize())
    }, [])

    if (!initialized) {
        return <CSpin/>
    }

    const onChangeStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        setStartDate(event.currentTarget.value)
    }

    const onChangeEndDate = (event: ChangeEvent<HTMLInputElement>) => {
        setEndDate(event.currentTarget.value)
    }

    return (
        <div className={s.container}>
            {role === 'Администратор' ?
                <Routes>
                    <Route path={'/'} element={<Navigate to={PATH.ADMINISTRATOR.PROFILES}/>}/>
                    <Route path={PATH.ADMINISTRATOR.PROFILES}
                           element={<AdministratorMain><Profiles/></AdministratorMain>}/>
                    <Route path={PATH.ADMINISTRATOR.ASSESSMENT_CRITERIA}
                           element={<AdministratorMain><AssessmentCriteria/></AdministratorMain>}/>
                    <Route path={PATH.ADMINISTRATOR.DICTIONARIES}
                           element={<AdministratorMain><Dictionaries/></AdministratorMain>}/>
                    <Route path={PATH.ADMINISTRATOR.CALL_SETTINGS}
                           element={<AdministratorMain><CallSettings/></AdministratorMain>}/>
                    <Route path={PATH.ADMINISTRATOR.SUPERVISORS}
                           element={<AdministratorMain><Supervisors/></AdministratorMain>}/>
                    <Route path={PATH.AUTH.LOGIN} element={<Login/>}/>
                </Routes>
                : role === "Супервизор"
                    ? <Routes>
                        <Route path={'/'} element={<Navigate to={PATH.SUPERVISOR.OPERATOR_LIST}/>}/>
                        <Route path={PATH.SUPERVISOR.OPERATOR_LIST} element={
                            <SupervisorMain
                                startDate={startDate}
                                endDate={endDate}
                                onChangeStartDate={onChangeStartDate}
                                onChangeEndDate={onChangeEndDate}>
                                <OperatorsList startDate={startDate} endDate={endDate}/>
                            </SupervisorMain>
                        }/>
                        <Route path={PATH.SUPERVISOR.OPERATOR} element={
                            <SupervisorMain>
                                <Operator startDate={startDate} endDate={endDate}/>
                            </SupervisorMain>
                        }/>
                        <Route path={PATH.SUPERVISOR.ASSESSMENT}
                               element={<SupervisorMain><Assessment/></SupervisorMain>}/>
                        <Route path={PATH.SUPERVISOR.FAVORITES}
                               element={<SupervisorMain><Favorites/></SupervisorMain>}/>
                        <Route path={PATH.SUPERVISOR.SEARCH} element={<SupervisorMain><Search/></SupervisorMain>}/>
                        <Route path={PATH.SUPERVISOR.SEARCH_QUERY} element={<SupervisorMain><SearchQuery/></SupervisorMain>}/>
                        <Route path={PATH.SUPERVISOR.HISTORY} element={<SupervisorMain><History/></SupervisorMain>}/>
                        <Route path={PATH.AUTH.LOGIN} element={<Login/>}/>
                    </Routes>
                    : role === "Оператор"
                        ? <div>Оператор</div>
                        : <Routes><Route path={PATH.AUTH.LOGIN} element={<Login/>}></Route></Routes>
            }
        </div>
    );
}


