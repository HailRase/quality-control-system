import React, {useState} from 'react';
import {Button, Divider, Layout, Menu} from 'antd';
import Icon, {
    HomeOutlined, LogoutOutlined,
    MenuOutlined,
    PhoneFilled,
    ProfileOutlined, SettingFilled,
    SettingOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import s from './AdministratorMain.module.scss'
import {ReactComponent as ExitIcon} from "../../../assets/exit-icon.svg";
import {useNavigate} from "react-router-dom";

const {Header, Sider, Content, Footer} = Layout;

const AdministratorMain = ({children}: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    const onProfilesNavigate = () => {
        navigate('/')
    }
    const onAssessmentCriteriaNavigate = () => {
        navigate('/assessment-criteria')
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider trigger={null} theme={"dark"} collapsible collapsed={collapsed} style={{background: '#2c3236'}}
                   className={s.sidebar}>
                <div className="demo-logo-vertical"/>
                <Menu theme={"dark"} mode="inline" defaultSelectedKeys={['1']} style={{background: '#2c3236'}}>
                    <Menu.Item key="1" icon={<HomeOutlined/>} onClick={onProfilesNavigate}>
                        Личные кабинеты
                    </Menu.Item>
                    <Menu.Item key="2" icon={<SettingFilled/>} onClick={onAssessmentCriteriaNavigate}>
                        Параметры оценивания
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined/>}>
                        Словари
                    </Menu.Item>
                    <Menu.Item key="4" icon={<PhoneFilled/>}>
                        Настройки звонков
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserAddOutlined/>}>
                        Супервизоры
                    </Menu.Item>
                    <Divider style={{borderColor: '#7c8489'}}/>
                    <Menu.Item key="6" icon={<LogoutOutlined/>}>
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
                    backgroundColor: '#2c3236',
                    boxShadow: '7px 1px 12px 6px rgba(19, 22, 24, 0.14) inset',
                    height: '50px'
                }}>
                    {collapsed ? (
                        <Button type={"text"} onClick={toggleSidebar} className={s.sidebarButton}
                                icon={<MenuOutlined className={s.hamburger}/>}/>
                    ) : (
                        <Button type={"text"} onClick={toggleSidebar} className={s.sidebarButton}
                                icon={<MenuOutlined className={`${s.hamburger} ${s.hamburgerActive}`}/>}/>
                    )}
                </Header>
                <Content style={{margin: '24px 16px', background: '#fff'}} >
                    {children}
                </Content>
                <Footer style={{
                    textAlign: 'left',
                    fontWeight: 500,
                    position: "fixed",
                    bottom: 0,
                    width: '100%',
                    backgroundColor: 'white',
                    borderTop: '1px solid #9ca5a9'
                }}>
                    Copyright ⓒ 2023 by Axata. All rights reserved.
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AdministratorMain;