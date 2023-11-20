import React, {ChangeEvent, useState} from 'react';
import {Button, Divider, Flex, Input, Layout, Menu} from 'antd';
import {
    LogoutOutlined,
    MenuOutlined,
    SearchOutlined,
    SettingFilled,
    StarFilled,
    TeamOutlined,
} from '@ant-design/icons';
import s from './SupervisorMain.module.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../s2-bll/b1-auth/auth-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {useAuthCheck} from "../../../common/hooks/useAuthChek";
import {
    setOperatorsListDateData
} from "../../../s2-bll/b2-supervisor/s2-operators-list-reducer/operatorListDate-reducer";

const {Header, Sider, Content, Footer} = Layout;

interface SupervisorMainType {
    children: React.ReactNode
}


const SupervisorMain: React.FC<SupervisorMainType> = ({children}) => {

    const {startPeriod, endPeriod} = useAppSelector(state => state.supervisorOperatorsListDateData.data)

    const [startPeriodLocal, setStartPeriodLocal] = useState<string>(startPeriod)
    const [endPeriodLocal, setEndPeriodLocal] = useState<string>(endPeriod)


    const navigate = useNavigate()
    const location = useLocation()

    const [collapsed, setCollapsed] = useState(true);
    const isAuth = useAppSelector(state => state.authData.isAuth)
    useAuthCheck(isAuth)

    const dispatch = useDispatch<any>()

    const onSetOperatorListDateHandler = () => {
        dispatch(setOperatorsListDateData({startPeriod: startPeriodLocal, endPeriod: endPeriodLocal}))
    }

    const onChangeStartPeriodHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartPeriodLocal(e.currentTarget.value)
    }
    const onChangeEndPeriodHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEndPeriodLocal(e.currentTarget.value)
    }

    const getMenuSelectedKey = () => {
        if (location.pathname === '/operators-list') {
            return '1'
        } else if (location.pathname === '/operator') {
            return '2'
        } else if (location.pathname === '/dictionaries') {
            return '3'
        } else if (location.pathname === '/call-settings') {
            return '4'
        }
        return 'default'
    }

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    const onOperatorsListNavigate = () => {
        navigate('/')
    }
    const onFavoritesNavigate = () => {
        navigate('/favorites')
    }
    const onSearchNavigate = () => {
        navigate('/search')
    }

    const onLogoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} theme={"dark"} collapsible collapsed={collapsed}
                   style={{background: '#ffffff', boxShadow: '12px 0px 13px 0px rgba(34, 60, 80, 0.3)',}}
                   className={s.sidebar}>
                <div className="demo-logo-vertical"/>
                <Menu theme={"light"} mode="inline" defaultSelectedKeys={[getMenuSelectedKey()]}
                      style={{background: '#ffffff'}}>
                    <Menu.Item key="1" icon={<TeamOutlined/>} onClick={onOperatorsListNavigate}>
                        Список операторов
                    </Menu.Item>
                    <Menu.Item key="2" icon={<StarFilled/>} onClick={onFavoritesNavigate}>
                        Избранные аудио
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SearchOutlined/>} onClick={onSearchNavigate}>
                        Поиск
                    </Menu.Item>
                    <Divider style={{borderColor: '#ccd2d5'}}/>
                    {location.pathname === "/operator-list" &&
                        <Menu.SubMenu key="submenu" title={'Настройки'} icon={<SettingFilled/>}>
                            <Menu.Item key="submenu-item-1" disabled style={{paddingLeft: '10px'}}>
                                <Input value={startPeriodLocal} type={"date"} style={{width: '100%'}}
                                       onChange={onChangeStartPeriodHandler}/>
                            </Menu.Item>
                            <Menu.Item key="submenu-item-2" disabled style={{paddingLeft: '10px'}}>
                                <Input value={endPeriodLocal} type={"date"} style={{width: '100%'}}
                                       onChange={onChangeEndPeriodHandler}/>
                            </Menu.Item>
                            <Menu.Item key="submenu-item-3" disabled>
                                <Flex justify={'flex-end'}>
                                    <Button type={'primary'}
                                            onClick={onSetOperatorListDateHandler}
                                            style={{borderRadius: '3px'}}>
                                        Применить
                                    </Button>
                                </Flex>
                            </Menu.Item>
                        </Menu.SubMenu>}
                    <Menu.Item key="5" icon={<LogoutOutlined/>} onClick={onLogoutHandler}>
                        Выход
                    </Menu.Item>
                </Menu>
                <div className="logo-container"/>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                    backgroundColor: '#ffffff',
                    height: '50px'
                }}>
                    {collapsed ? (
                        <Button type={"default"} ghost onClick={toggleSidebar} className={s.sidebarButton}
                                icon={<MenuOutlined className={s.hamburger}/>}/>
                    ) : (
                        <Button type={"default"} ghost onClick={toggleSidebar} className={s.sidebarButton}
                                icon={<MenuOutlined className={`${s.hamburger} ${s.hamburgerActive}`}/>}/>
                    )}
                </Header>
                <Content>
                    {children}
                </Content>
                <Footer style={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'left',
                    fontWeight: 500,
                    position: "fixed",
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTop: '1px solid #9ca5a9',
                    height: '50px'
                }}>
                    Copyright ⓒ 2023 by Axata. All rights reserved.
                </Footer>
            </Layout>
        </Layout>
    );
};

export default SupervisorMain;