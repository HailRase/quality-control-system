import React from 'react';
import s from './Profiles.module.scss'
import {Flex, Input, InputNumber, Layout, Pagination, Space, Table} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";

interface DataType {
    key: React.Key;
    login: string;
    number: number;
    fio: string;
    email: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
        align: 'center',
        sorter: (a: any, b: any) => a.login.length - b.login.length,
    },
    {
        title: 'Внутренний номер',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        sorter: (a: any, b: any) => a.number - b.number,
    },
    {
        title: 'ФИО',
        dataIndex: 'fio',
        key: 'fio',
        align: 'center',
        sorter: (a: any, b: any) => a.fio.length - b.fio.length,
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        sorter: (a: any, b: any) => a.email.length - b.email.length,
        render: () => <Input/>
    },
];
const dataSource = [
    {
        key: '1',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '2',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '3',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '4',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '5',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '6',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '7',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '8',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '9',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '10',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '11',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '12',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
    {
        key: '13',
        login: 'Mike',
        number: 32,
        fio: '10 Downing Street',
        email: '10 Downing Street',
    },
];

const Profiles = () => {
    return (
        <Space style={{width: '100%'}}>
            <Layout style={{width: '100%'}}>
                <Header style={{backgroundColor: '#6a757b', color: "white", fontSize: "18px"}}>
                    Личные кабинеты
                </Header>
                <Content style={{height: '100%', width: "100%", maxWidth: "100%", backgroundColor: 'white',}}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: '91vw',
                        margin: "20px 10px"
                    }}>
                        <div>Показать <InputNumber min={1} max={15} defaultValue={3}
                                                   style={{width: "55px", display: "inline-block"}}/> записей
                        </div>
                        <div>Поиск: <Input style={{width: '200px'}}/></div>
                    </div>
                    <Table columns={columns} dataSource={dataSource} style={{width: "100%"}} pagination={false}/>
                </Content>
                <Footer style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    backgroundColor: 'white',
                    marginBottom: '40px'
                }}>
                    <Flex style={{width:'100%'}} justify={"space-between"} align={"center"}>
                        <div>Показано от 1 до 10 из 161 записей</div>
                        <div><Pagination
                            showSizeChanger={false}

                            defaultCurrent={3}
                            total={500}
                        /></div>
                    </Flex>
                </Footer>
            </Layout>

        </Space>
    );
};

export default Profiles;