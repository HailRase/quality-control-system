import React, {ChangeEvent, useEffect, useState} from 'react';
import {Flex, Input, InputNumber, Layout, notification, Pagination, Space, Spin, Table} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {
    editAdministratorProfilesData,
    fetchAdministratorProfilesData,
    setAdministratorProfilesDataStatusError,
    StatusType
} from "../../../s2-bll/b1-administrator/a1-administrator-profiles-reducer/administratorProfiles-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {useDispatch} from "react-redux";
import Search from "antd/es/input/Search";
import {useNavigate} from "react-router-dom";
import {useAuthCheck} from "../../../common/hooks/useAuthChek";

interface DataType {
    key: React.Key
    id: string
    login: string
    number: string
    fio: string
    email: string
    role: string
}


const Profiles = () => {

    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()

    const [statusEditing, setStatusEditing] = useState<null | string>(null)

    const {items, total, size, page, pages} = useAppSelector(state => state.administratorProfilesData.data)
    const status = useAppSelector<StatusType>(state => state.administratorProfilesData.status)
    const errorMessage = useAppSelector(state => state.administratorProfilesData.errorMessage)

    const [pageSize, setPageSize] = useState(size)
    const [currentPage, setCurrentPage] = useState(page)
    const [searchParam, setSearchParam] = useState<string>()
    const [email, setEmail] = useState<string>('')

    const dataSource = items.map((item, index) => {
        return {
            key: `${index}`,
            id: item.id,
            login: `${item.name}`,
            number: `${item.name}`,
            fio: `${item.name}`,
            email: `${item.email}`,
            role: item.role
        }
    })

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
            render: (value, record, index) => <Input
                onFocus={() => {
                    setStatusEditing(record.id)
                    setEmail(value)
                }}
                onBlur={() => {
                    onSaveEmailHandler(record.id)
                }}
                value={statusEditing === record.id ? email : value}
                onChange={onChangeEmailHandler}
            />
        },
    ];
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchAdministratorProfilesData(currentPage, pageSize, searchParam))
    }, [currentPage, pageSize])

    useEffect(() => {
        if (errorMessage && status === "loaded") {
            openNotification("success")
            dispatch(setAdministratorProfilesDataStatusError(''))
        } else if (errorMessage && status === "error"){
            openNotification("error")
            dispatch(setAdministratorProfilesDataStatusError(''))
        }

    }, [errorMessage])

    useEffect(() => {
        dispatch(fetchAdministratorProfilesData(1, 10))
    }, [])

    const onChangePageSize = (value: number | null) => {
        value && setPageSize(value)
    }
    const onSaveEmailHandler = (id: string) => {
        email && dispatch(editAdministratorProfilesData(id, email))
    }
    const onChangeSearchParam = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchParam(event.target.value)
    }
    const onChangeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onSearchHandler = () => {
        dispatch(fetchAdministratorProfilesData(currentPage, pageSize, searchParam))
    }

    const openNotification = (type: 'success' | 'info' | 'warning' | 'error', title?: string) => {
        api[type]({
            message: `${title ? title : errorMessage}`,
            duration: 1.5,
            placement: "bottomRight",
            style: type === "success" ? {backgroundColor: 'rgba(142,248,108,0.62)'} : {backgroundColor: 'rgba(250,117,117,0.38)'}
        });
    };

    return (
        <Space style={{width: '100%'}}>
            {contextHolder}
            {status === "loading"
                ? <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: 'center',
                    height: '90vh',
                    width: '90vw'
                }}>
                    <Spin size="large"/>
                </div>
                : <Layout style={{width: '100%'}}>
                    <Header style={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: '50px',
                        backgroundColor: '#6a757b',
                        color: "white",
                        fontSize: "16px",
                        padding: '20px 30px 0px 10px'
                    }}>
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
                            <div>Показать <InputNumber value={pageSize} min={1} max={15} defaultValue={10}
                                                       onChange={onChangePageSize}
                                                       style={{width: "55px", display: "inline-block"}}/> записей
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: '10px'
                            }}>Поиск: <Search onSearch={onSearchHandler} value={searchParam}
                                              onChange={onChangeSearchParam}
                                              style={{width: '200px'}}/></div>
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
                        <Flex style={{width: '100%'}} justify={"space-between"} align={"center"}>
                            <div>Показано
                                от {(currentPage - 1) * pageSize + 1} до {Math.min(currentPage * pageSize, total)} из {total} записей
                            </div>
                            <div>
                                <Pagination
                                    showSizeChanger={false}
                                    current={currentPage}
                                    total={total}
                                    pageSize={pageSize}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </Flex>
                    </Footer>
                </Layout>}

        </Space>
    );
};

export default Profiles;