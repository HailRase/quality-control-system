import React, {ChangeEvent, useState} from 'react';
import style from './Supervisors.module.scss'
import s from '../a4-dictionaries/Dictionaries.module.scss'
import {Button, Flex, Input, Layout, Modal, Space, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {DeleteFilled, EditOutlined, KeyOutlined, SaveTwoTone} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    addNewAdministratorSupervisorData, deleteNewAdministratorSupervisorData, editNewAdministratorSupervisorPasswordData
} from "../../../s2-bll/b1-administrator/a5-administrator-supervisor-reducer/administratorSupervisor-reducer";
import {
    editNewAdministratorDictionariesData
} from "../../../s2-bll/b1-administrator/a3-administrator-dictionaries-reducer/administratorDictionaries-reducer";

interface DataType {
    id: string
    key: React.Key
    fio: string
    login: string
    email: string
}


const dataSource = [
    {
        id: '1111',
        key: '1',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '13333',
        key: '2',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '454545',
        key: '3',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',

    },
    {
        id: '323123',
        key: '4',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '6565656',
        key: '5',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '234534',
        key: '6',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '34789789',
        key: '7',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '2345463456',
        key: '8',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '678935645',
        key: '9',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '11145634561',
        key: '10',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '112363474567811',
        key: '11',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '345634563456',
        key: '12',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
    {
        id: '1111werwerwer',
        key: '13',
        fio: '10 Downing Street',
        login: 'Mike',
        email: '10 Downing Street',
    },
];
const Supervisors = () => {


    const [userID, setUserID] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [statusEditing, setStatusEditing] = useState<null | string>(null)
    const [editingFIO, setEditingFIO] = useState<string>()
    const [editingLogin, setEditingLogin] = useState<string>()
    const [editingEmail, setEditingEmail] = useState<string>()

    const [fio, setFIO] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch<any>()

    const onAddNewSupervisorHandler = () => {
        dispatch(addNewAdministratorSupervisorData(email, fio, fio, fio))
        setFIO('')
        setLogin('')
        setEmail('')
        setPassword('')
    }
    const onClearAddInputs = () => {
        setFIO('')
        setLogin('')
        setEmail('')
        setPassword('')
    }

    const onSavePasswordModalHandler = () => {
        dispatch(editNewAdministratorSupervisorPasswordData(userID, newPassword))
        setIsModalOpen(false)
        setNewPassword('')
    }
    const onCancelModalHandler = () => {
        setIsModalOpen(false);
        setNewPassword('')
    };
    const onDeleteSupervisorHandler = (id: number) => {
        dispatch(deleteNewAdministratorSupervisorData(id))
    }
    const onChangeStatusEditingTrue = (id: number | null) => {
        setStatusEditing(null)
        if (id && editingFIO && editingEmail && editingLogin)
            dispatch(editNewAdministratorDictionariesData(id, editingFIO, editingEmail, editingLogin))

    }
    const onChangeStatusEditingFalse = (id: string | null, editingFIO: string, editingEmail: string, editingLogin: string) => {
        setStatusEditing(id)
        setEditingFIO(editingFIO)
        setEditingEmail(editingEmail)
        setEditingLogin(editingLogin)
    }

    const columns: ColumnsType<DataType> = [

        {
            title: 'ФИО',
            dataIndex: 'fio',
            key: 'fio',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing? editingFIO :value}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingFIO(e.target.value)}
                                                     disabled={!statusEditing || statusEditing !== record.id}/>
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing? editingLogin :value}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingLogin(e.target.value)}
                                                     disabled={!statusEditing || statusEditing !== record.id}/>
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing ? editingEmail : value}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingEmail(e.target.value)}
                                                     disabled={!statusEditing || statusEditing !== record.id}/>
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: 'Обновить пароль',
            align: 'center',
            render: (value, record, index) => <Button type={"primary"} ghost icon={<KeyOutlined/>}
                                                      onClick={() => {
                                                          setUserID(record.id)
                                                          setIsModalOpen(true)
                                                      }}/>
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: 'Редактировать',
            align: 'center',
            render: (value) => statusEditing && statusEditing === value
                ?
                <Button type={"primary"} ghost icon={<SaveTwoTone/>} onClick={() => onChangeStatusEditingTrue(value)}/>
                : <Button type={"primary"} ghost icon={<EditOutlined/>}
                          onClick={() => onChangeStatusEditingFalse(value, fio, fio, email)}/>
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: 'Удалить',
            align: 'center',
            render: (value) => <Button danger ghost icon={<DeleteFilled/>}
                                       onClick={() => onDeleteSupervisorHandler(value)}/>
        }
    ];

    return (
        <Space className={s.dictionariesWrapper}>
            <Flex vertical style={{width: '100%'}}>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Управление учётными записями супервизоров
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        <Table style={{marginTop: '15px'}} columns={columns} dataSource={dataSource}/>
                        <Modal
                            title="Смена пароля супервизора"
                            open={isModalOpen}
                            onOk={onSavePasswordModalHandler}
                            onCancel={onCancelModalHandler}
                            okText={"Сохранить"}
                            cancelText={"Отменить"}
                            closeIcon
                        >
                            <Input value={newPassword}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}/>
                        </Modal>
                    </Content>
                </Layout>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Добавить новую учётную запись
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        <Flex gap={30} align={"center"} style={{margin: '15px 10px'}}>
                            <Input placeholder={'Введите ФИО пользователя...'} value={fio}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setFIO(e.target.value)}/>
                            <Input placeholder={'Введите логин пользователя...'} value={login}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}/>
                            <Input placeholder={'Введите почтовый адрес пользователя...'} value={email}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
                            <Input placeholder={'Введите пароль пользователя...'} value={password}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
                            <Button type={"default"} onClick={onClearAddInputs}
                                    style={{color: '#797575', borderColor: '#797575', borderRadius: '3px'}}>
                                Отменить
                            </Button>
                            <Button type={"primary"} ghost style={{borderRadius: '3px'}}
                                    onClick={onAddNewSupervisorHandler}>
                                Добавить
                            </Button>
                        </Flex>
                    </Content>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Supervisors;