import React, {useState} from 'react';
import {Button, Divider, Layout, Menu} from 'antd';
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

const {Header, Sider, Content, Footer} = Layout;

const SupervisorMain = ({children}: { children: React.ReactNode }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [collapsed, setCollapsed] = useState(true);

    const dispatch = useDispatch<any>()



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
    const onProfilesNavigate = () => {
        navigate('/')
    }
    const onAssessmentCriteriaNavigate = () => {
        navigate('/')
    }
    const onDictionariesNavigate = () => {
        navigate('/')
    }

    const onLogoutHandler = () => {
        dispatch(logout())
        navigate('/login')
    }


    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} theme={"dark"} collapsible collapsed={collapsed} style={{background: '#ffffff', boxShadow: '12px 0px 13px 0px rgba(34, 60, 80, 0.3)',}}
                   className={s.sidebar}>
                <div className="demo-logo-vertical"/>
                <Menu theme={"light"} mode="inline" defaultSelectedKeys={[getMenuSelectedKey()]}
                      style={{background: '#ffffff'}}>
                    <Menu.Item key="1" icon={<TeamOutlined />} onClick={onProfilesNavigate}>
                        Список операторов
                    </Menu.Item>
                    <Menu.Item key="2" icon={<StarFilled />} onClick={onAssessmentCriteriaNavigate}>
                        Избранные аудио
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SearchOutlined />} onClick={onDictionariesNavigate}>
                        Поиск
                    </Menu.Item>
                    <Divider style={{borderColor: '#ccd2d5'}}/>
                    <Menu.Item key="4" icon={<SettingFilled/>} onClick={onDictionariesNavigate}>
                        Настройки
                    </Menu.Item>
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