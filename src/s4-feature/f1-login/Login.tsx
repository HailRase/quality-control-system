import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Card, Dropdown, Form, Input, MenuProps, Space} from "antd";
import {useDispatch} from "react-redux";
import {login} from "../../s2-bll/b1-auth/auth-reducer";
import {useAppSelector} from "../../s2-bll/store";
import {useLocation, useMatch, useNavigate} from "react-router-dom";


type FieldType = {
    username?: string;
    password?: string;
};

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Выйти',
    },
];

const Login = () => {


    const role = useAppSelector( state =>  state.authData.data.role)
    const isAuth = useAppSelector( state =>  state.authData.isAuth)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) navigate(-1)
    },[])

    const dispatch = useDispatch<any>()

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onChangeUsernameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.currentTarget.value)
    }
    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onClickSendUserData = () => {
        dispatch(login(username, password))
    }



    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#f8f9fb"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100vw",
                height: "70px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 3px 15px -5px rgba(34, 60, 80, 0.2)",
            }}>
                <div>Оценка оператора</div>
                <Dropdown
                    menu={{
                    items,
                        selectable: true,
                    }}
                >
                    <span style={{fontSize: "14px", color: "#c9c9c9"}}>Supervisor</span>
                </Dropdown>
            </div>
            <Space direction="vertical" size={16} style={{marginTop: "50px"}}>
                <Card type="inner"
                      title="Вход"
                      style={{width: 600, boxShadow: "0px 0px 0px 1.5px rgba(34, 60, 80, 0.2)", borderRadius: "3px"}}
                      size={"small"}
                      headStyle={{
                          backgroundColor: "#f6f6f6",
                          borderBottom: "1px solid #c7c4c4",
                          fontWeight: 400,
                          borderRadius: 0
                      }}>
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 16}}
                        style={{maxWidth: 500}}
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"

                    >
                        <Form.Item<FieldType>
                            label="Логин"
                            name="username"

                            rules={[{message: 'Введите логин'}]}
                            style={{marginTop: "20px"}}
                        >
                            <Input required value={username} onChange={onChangeUsernameHandler}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Пароль"
                            name="password"
                            rules={[{
                                message: 'Введите пароль'
                            }]}
                        >
                            <Input.Password required value={password} onChange={onChangePasswordHandler}/>
                        </Form.Item>


                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" style={{borderRadius: "3px"}} onClick={onClickSendUserData}>
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Space>
        </div>
    );
};

export default Login;