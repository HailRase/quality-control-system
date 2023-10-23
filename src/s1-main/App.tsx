import React from 'react';
import s from './App.module.scss';
import {Route, Routes} from "react-router-dom";
import Login from "../s4-feature/f1-login/Login";
import AdministratorMain from "../s4-feature/f2-administrator/a1-main/AdministratorMain";
import Profiles from "../s4-feature/f2-administrator/a2-profiles/Profiles";

function App() {
    const user =
        {
            name: 'administrator',
            role: 0
        }
    /*{
        name: 'administrator',
        role: 1
    }*/
    /*{
        name: 'administrator',
        role: 2
    }*/

    return (
        <div className={s.container}>
            <AdministratorMain >
                <Profiles/>
            </AdministratorMain>
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
