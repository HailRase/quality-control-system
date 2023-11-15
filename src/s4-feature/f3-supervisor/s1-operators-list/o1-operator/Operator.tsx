import React, {useEffect, useState} from 'react';
import s from './Operator.module.scss'
import {Button, Flex, Input, Layout, Space, Spin, Table} from "antd";
import {FileExcelFilled, HistoryOutlined, LoadingOutlined, PercentageOutlined, PhoneFilled} from "@ant-design/icons";
import {ReactComponent as CrossedPhone} from "../../../../assets/crossed-phone.svg";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {PATH} from "../../../../s1-main/routes/routes";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchOperatorData} from "../../../../s2-bll/b2-supervisor/s3-operator-reducer/operator-reducer";
import {useAppSelector} from "../../../../s2-bll/store";
import moment from "moment";

interface OperatorDataType {
    key: React.Key
    id: number,
    title: string,
    time_created: string,
    post_marks: string,
    sum_marks: number,
    is_cancelled: boolean,
}

interface OperatorPropsType {
    startDate: string
    endDate: string
}

const Operator: React.FC<OperatorPropsType> = ({startDate, endDate}) => {
    const navigate = useNavigate()
    const {userID} = useParams()
    const dispatch = useDispatch<any>()
    const [pageSize, setPageSize] = useState<number>(10)

    const {
        good_per_settings,
        amount_good,
        bad_per_settings,
        amount_bad,
        canceled_good,
        canceled_bad,
        all_good_recs,
        all_bad_recs,
        good_recs,
        bad_recs
    } = useAppSelector(state => state.supervisorOperatorData.data)
    const status = useAppSelector(state => state.supervisorOperatorData.status)
    const error = useAppSelector(state => state.supervisorOperatorData.errorMessage)


    useEffect(() => {
        userID && dispatch(fetchOperatorData(userID, startDate, endDate))
    }, [])


    const data: OperatorDataType[] = good_recs.map( (rec, index) => {
        return {
            key: index,
            ...rec,
            time_created: moment(rec.time_created).format('DD.MM.YYYY, HH:mm:ss'),
            is_cancelled: rec.is_cancelled ? rec.is_cancelled : false,
            is_good: true
        }
    }).concat(bad_recs.map((rec, index) => {
        return {
            key: index,
            ...rec,
            time_created: moment(rec.time_created).format('DD.MM.YYYY, HH:mm:ss'),
            is_cancelled:rec.is_cancelled ? rec.is_cancelled : false,
            is_good: false
        }
    }))
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
            render: (value) => <Button type={"primary"} ghost icon={<HistoryOutlined/>} style={{borderRadius: '3px'}}
                                  onClick={() => navigate(`/history/${value}`)}/>
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
            render: (value) => <span>{value ? "Да" : "Нет"}</span>
        },
        {
            title: 'Оценивание',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (value) => <Button style={{borderRadius: '3px'}} onClick={() => navigate(`/evaluate/${value}`)} type={'primary'} ghost>
                Перейти к оцениваню
            </Button>
        }
    ];


    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '93vw', padding: '30px 5px 30px 20px'}}>
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{good_per_settings}%</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{amount_good}</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{bad_per_settings}%</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{amount_bad}</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{canceled_good}</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{canceled_bad}</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{all_good_recs}</b></span>}
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
                                    {status === "loading"
                                        ? <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                        : <span><b>{all_bad_recs}</b></span>}
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
                                <Input value={0} min={0} type={'number'} style={{width: '70px'}} />
                            </Flex>
                            <div>Премия: 0%</div>
                            <Flex>
                                <Button type={'primary'} ghost style={{borderRadius: '3px', marginRight: '15px'}}
                                        onClick={() => navigate(-1)}>
                                    Вернуться в отчёт
                                </Button>
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
                                    <Input value={pageSize} min={1} type={'number'} style={{width: '70px'}} onChange={(event) => setPageSize(+event.currentTarget.value)}/>
                                    <span style={{marginLeft: '5px'}}>записей</span>
                                </Flex>
                                <Flex align={'center'}><span style={{marginRight: '5px'}}>Поиск:</span> <Input.Search/></Flex>
                            </Flex>
                            <Table columns={columns} dataSource={data} pagination={{
                                defaultCurrent: 1,
                                pageSize
                            }}/>
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