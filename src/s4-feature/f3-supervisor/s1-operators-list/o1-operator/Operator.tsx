import React from 'react';
import s from './Operator.module.scss'
import {Button, Flex, Input, Layout, Space, Table} from "antd";
import {FileExcelFilled, HistoryOutlined, PercentageOutlined, PhoneFilled} from "@ant-design/icons";
import {ReactComponent as CrossedPhone} from "../../../../assets/crossed-phone.svg";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {PATH} from "../../../../s1-main/routes/routes";
import {useNavigate} from "react-router-dom";

interface OperatorDataType {
    key: React.Key
    id: number,
    title: string,
    time_created: string,
    post_marks: string,
    sum_marks: number,
    is_cancelled: boolean
}

const Operator = () => {
    const navigate = useNavigate()
    const data: OperatorDataType[] = [
        {
            key: '1',
            id: 1,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '2',
            id: 2,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '3',
            id: 3,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '4',
            id: 5,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '6',
            id: 6,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '7',
            id: 7,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '8',
            id: 8,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
        {
            key: '9',
            id: 9,
            title: '1934679384769.234234',
            post_marks: '0/4',
            sum_marks: 4,
            time_created: '2023-11-08T09:44:45.125Z',
            is_cancelled: false
        },
    ]
    const columns: ColumnsType<OperatorDataType> = [
        {
            title: 'Аудио',
            dataIndex: 'title',
            key: 'title',
            align: 'center',
            sorter: (a: any, b: any) => a.title.length - b.title.length,
        },
        {
            title: 'История',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: () => <Button type={"primary"} ghost icon={<HistoryOutlined/>} onClick={() => navigate(PATH.SUPERVISOR.HISTORY)}/>
        },
        {
            title: 'Проставлено оценок',
            dataIndex: 'post_marks',
            key: 'post_marks',
            align: 'center',
            sorter: (a: any, b: any) => a.post_marks.length - b.post_marks.length,
        },
        {
            title: 'Сумарная оценка',
            dataIndex: 'sum_marks',
            key: 'sum_marks',
            align: 'center',
            sorter: (a: any, b: any) => a.sum_marks.length - b.sum_marks.length,
            /*render: (value, record, index) => <Input
                onFocus={() => {
                    setStatusEditing(record.id)
                    setEmail(value)
                }}
                onBlur={() => {
                    onSaveEmailHandler(record.id)
                }}
                value={statusEditing === record.id ? email : value}
                onChange={onChangeEmailHandler}
            />*/
        },
        {
            title: 'Дата звонка',
            dataIndex: 'time_created',
            key: 'time_created',
            align: 'center',
            sorter: (a: any, b: any) => a.time_created.length - b.time_created.length,
        },
        {
            title: 'Анулировано',
            dataIndex: 'is_cancelled',
            key: 'is_cancelled',
            align: 'center',
        },
        {
            title: 'Оценивание',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: () => <Button onClick={() => navigate(PATH.SUPERVISOR.ASSESSMENT)} type={'primary'} ghost>Перейти к
                оцениваню</Button>
        }
    ];

    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '94vw', padding: '30px 20px'}}>
                <Layout style={{width: '100%'}}>
                    <Flex vertical gap={30}>
                        <Flex gap={20} align={"center"}>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#2aa7bd',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px',
                                }}>
                                    <PercentageOutlined style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Отобрано хороших</span>
                                    <span><b>1%</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#2aa7bd',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <PhoneFilled style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Количество отобранных</span>
                                    <span><b>0</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#2aa7bd',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <PercentageOutlined style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Отобрано плохих</span>
                                    <span><b>20%</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#2aa7bd',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <PhoneFilled style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Количество отобранных</span>
                                    <span><b>1</b></span>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap={20}>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#3dae57',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <CrossedPhone className={s.crossedPhone} style={{width: '30px', color: "white",}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Анулировано хороших</span>
                                    <span><b>0</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#df4958',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <CrossedPhone className={s.crossedPhone} style={{width: '30px', color: "white",}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Анулировано плохих</span>
                                    <span><b>0</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#3dae57',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <PhoneFilled style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Всего хороших</span>
                                    <span><b>5</b></span>
                                </Flex>
                            </Flex>
                            <Flex gap={10}
                                  style={{
                                      padding: 10,
                                      backgroundColor: 'white',
                                      borderRadius: '3px',
                                      width: '25vw',
                                      boxShadow: '0px 1px 1px 1px rgba(34, 60, 80, 0.1)'
                                  }}>
                                <Flex justify={'center'} align={'center'} style={{
                                    backgroundColor: '#df4958',
                                    borderRadius: '3px',
                                    width: '100px',
                                    height: '70px'
                                }}>
                                    <PhoneFilled style={{fontSize: 32, color: "white"}}/>
                                </Flex>
                                <Flex vertical align={"flex-start"} justify={"flex-start"} style={{fontSize: '16px'}}>
                                    <span>Всего плохих</span>
                                    <span><b>6</b></span>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </Layout>
                <Layout style={{width: '100%', marginTop: '30px'}}>
                    <Header style={{
                        width: '100%',
                        backgroundColor: '#eaeaea',
                        padding: '0 20px',
                        borderRadius: '5px 5px 0 0',
                        border: '2px solid rgba(34, 60, 80, 0.1)',
                        borderBottom: '1px solid rgba(34, 60, 80, 0.1)'
                    }}>
                        <Flex justify={'space-between'} align={'center'} style={{fontSize: '16px'}}>
                            <div>Баранчук Светлана Григорьевна</div>
                            <Flex justify={'space-between'} align={'center'}>
                                <span style={{marginRight: '5px'}}>Выявленных звонков: </span>
                                <Input value={0} min={0} type={'number'} style={{width: '70px'}}/>
                            </Flex>
                            <div>Премия: 0%</div>
                            <Flex>
                                <Button type={'primary'} ghost style={{borderRadius: '3px', marginRight: '15px'}}>Вернуться
                                    в отчёт</Button>
                                <Button type={'primary'} ghost icon={<FileExcelFilled/>} style={{borderRadius: '3px'}}/>
                            </Flex>
                        </Flex>
                    </Header>
                    <Content style={{
                        width: '100%',
                        backgroundColor: '#ffffff',
                        padding: '0 20px',
                        borderRight: '2px solid rgba(34, 60, 80, 0.1)',
                        borderLeft: '2px solid rgba(34, 60, 80, 0.1)',
                        borderBottom: '2px solid rgba(34, 60, 80, 0.1)',
                        borderRadius: '0 0 5px 5px'
                    }}>
                        <Flex vertical style={{marginTop: '20px'}}>
                            <Flex justify={'space-between'} align={'center'} style={{marginBottom: '30px'}}>
                                <Flex align={'center'}>
                                    <span style={{marginRight: '5px'}}>Показать</span>
                                    <Input value={10} min={1} type={'number'} style={{width: '70px'}}/>
                                    <span style={{marginLeft: '5px'}}>записей</span>
                                </Flex>
                                <Flex align={'center'}><span style={{marginRight: '5px'}}>Поиск:</span> <Input.Search/></Flex>
                            </Flex>
                            <Table columns={columns} dataSource={data}/>
                        </Flex>
                    </Content>
                    <Footer>

                    </Footer>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Operator;