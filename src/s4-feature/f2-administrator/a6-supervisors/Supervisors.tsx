import React from 'react';
import style from './Supervisors.module.scss'
import s from '../a4-dictionaries/Dictionaries.module.scss'
import {Button, Flex, Input, Layout, Space, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {DeleteFilled, EditOutlined, KeyOutlined} from "@ant-design/icons";

interface DataType {
    key: React.Key
    fio: string
    login: string
    email: string
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ФИО',
        dataIndex: 'fio',
        key: 'fio',
        align: 'center',
        render: (value, record, index) => <Input value={value} disabled/>
    },
    {
        title: 'Логин',
        dataIndex: 'login',
        key: 'login',
        align: 'center',
        render: (value, record, index) => <Input value={value} disabled/>
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
        render: (value, record, index) => <Input value={value} disabled/>
    },
    {
        title: 'Обновить пароль',
        align: 'center',
        render: () => <Button type={"primary"} ghost icon={<KeyOutlined/>}/>
    },
    {
        title: 'Редактировать',
        align: 'center',
        render: () => <Button type={"primary"} ghost icon={<EditOutlined/>}/>
    },
    {
        title: 'Удалить',
        align: 'center',
        render: () => <Button danger ghost icon={<DeleteFilled/>}/>
    }
];
const dataSource = [
    {
        key: '1',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '2',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '3',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',

    },
    {
        key: '4',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '5',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '6',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '7',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '8',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '9',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '10',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '11',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '12',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        key: '13',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
];
const Supervisors = () => {
    return (
        <Space className={s.dictionariesWrapper}>
            <Flex vertical style={{width: '100%'}}>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Управление учётными записями супервизоров
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        <Table style={{marginTop: '15px'}} columns={columns} dataSource={dataSource}/>
                    </Content>
                </Layout>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Добавить новую учётную запись
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        <Flex gap={30} align={"center"} style={{margin: '15px 10px'}}>
                            <Input placeholder={'Введите ФИО пользователя...'}/>
                            <Input placeholder={'Введите логин пользователя...'}/>
                            <Input placeholder={'Введите почтовый адрес пользователя...'}/>
                            <Input placeholder={'Введите пароль пользователя...'}/>
                            <Button type={"default"}
                                    style={{color: '#797575', borderColor: '#797575', borderRadius: '3px'}}>
                                Отменить
                            </Button>
                            <Button type={"primary"} ghost style={{borderRadius: '3px'}}>Добавить</Button>
                        </Flex>
                    </Content>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Supervisors;