import React from 'react';
import {Button, Card, Dropdown, Form, Input, MenuProps, Space} from "antd";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Выйти',
    },
];

const Login = () => {


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };



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
                            <Input/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Пароль"
                            name="password"
                            rules={[{
                                message: 'Введите пароль' +
                                    ''
                            }]}
                        >
                            <Input.Password/>
                        </Form.Item>


                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit" style={{borderRadius: "3px"}}>
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