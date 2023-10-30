import React, {ChangeEvent, useEffect, useState} from 'react';
import s from '../a4-dictionaries/Dictionaries.module.scss'
import {Button, Flex, Input, Layout, Modal, notification, Popconfirm, Space, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {DeleteFilled, EditOutlined, KeyOutlined, SaveTwoTone} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    addNewAdministratorSupervisorData,
    deleteNewAdministratorSupervisorData,
    editNewAdministratorSupervisorData,
    editNewAdministratorSupervisorPasswordData,
    fetchAdministratorSupervisorData,
    setAdministratorSupervisorDataStatusError
} from "../../../s2-bll/b1-administrator/a5-administrator-supervisor-reducer/administratorSupervisor-reducer";
import {useAppSelector} from "../../../s2-bll/store";

interface DataType {
    key: React.Key
    id: string
    name: string
    login: string
    email: string
}


const Supervisors = () => {

    const [api, contextHolder] = notification.useNotification();

    const {items, page, pages, total, size} = useAppSelector(state => state.administratorSupervisorData.data)
    const status = useAppSelector(state => state.administratorSupervisorData.status)
    const errorMessage = useAppSelector(state => state.administratorSupervisorData.errorMessage)

    const dataSource = items.map((item, index) => {
        return {
            key: index,
            ...item
        }
    })

    const [userID, setUserID] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [statusEditing, setStatusEditing] = useState<null | string>(null)
    const [editingName, setEditingName] = useState<string>()
    const [editingLogin, setEditingLogin] = useState<string>()
    const [editingEmail, setEditingEmail] = useState<string>()

    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchAdministratorSupervisorData(1, 10))
    }, [])
    useEffect(() => {
        if (errorMessage && status === "loaded") {
            openNotification("success")
            dispatch(setAdministratorSupervisorDataStatusError(''))
        } else if (errorMessage && status === "error") {
            openNotification("error")
            dispatch(setAdministratorSupervisorDataStatusError(''))
        }

    }, [errorMessage])

    const onAddNewSupervisorHandler = () => {
        if (name && password && email && login){
            dispatch(addNewAdministratorSupervisorData(name, password, email, login))
            setName('')
            setLogin('')
            setEmail('')
            setPassword('')
        } else {
            openNotification("error", "Недостаточно данных для добавления учётной записи")
        }
    }
    const onClearAddInputs = () => {
        setName('')
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
    const onChangeStatusEditingTrue = (id: string | null) => {
        setStatusEditing(null)
        if (id && editingName && editingEmail && editingLogin)
            dispatch(editNewAdministratorSupervisorData(id, editingEmail, editingName, editingLogin))

    }
    const onChangeStatusEditingFalse = (id: string | null, editingFIO: string, editingEmail: string, editingLogin: string) => {
        setStatusEditing(id)
        setEditingName(editingFIO)
        setEditingEmail(editingEmail)
        setEditingLogin(editingLogin)
    }

    const columns: ColumnsType<DataType> = [

        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing === record.id ? editingName : value}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingName(e.target.value)}
                                                     disabled={!statusEditing || statusEditing !== record.id}/>
        },
        {
            title: 'Логин',
            dataIndex: 'login',
            key: 'login',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing === record.id ? editingLogin : value}
                                                     onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingLogin(e.target.value)}
                                                     disabled={!statusEditing || statusEditing !== record.id}/>
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            render: (value, record, index) => <Input value={statusEditing === record.id ? editingEmail : value}
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
            render: (value, record) => statusEditing && statusEditing === value
                ?
                <Button type={"primary"} ghost icon={<SaveTwoTone/>} onClick={() => onChangeStatusEditingTrue(value)}/>
                : <Button type={"primary"} ghost icon={<EditOutlined/>}
                          onClick={() => onChangeStatusEditingFalse(record.id, record.name, record.email, record.login)}/>
        },
        {
            dataIndex: 'id',
            key: 'id',
            title: 'Удалить',
            align: 'center',
            render: (value) => <Popconfirm title="Удаление супервизора"
                                           description="Вы уверены, что хотите удалить?"
                                           onConfirm={() => onDeleteSupervisorHandler(value)}
                                           okText="Удалить"
                                           placement={'left'}
                                           cancelText="Отменить">
                <Button danger ghost icon={<DeleteFilled/>}/>
            </Popconfirm>
        }
    ];

    const openNotification = (type: 'success' | 'info' | 'warning' | 'error', title?: string) => {
        api[type]({
            message: `${title ? title : errorMessage}`,
            duration: 1.5,
            placement: "bottomRight",
            style: type === "success" ? {backgroundColor: 'rgba(142,248,108,0.62)'} : {backgroundColor: 'rgba(250,117,117,0.38)'}
        });
    };

    return (
        <Space className={s.dictionariesWrapper}>
            {contextHolder}
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
                            <Input value={newPassword} placeholder={'Введите новый пароль...'}
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
                            <Input placeholder={'Введите ФИО пользователя...'} value={name}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
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