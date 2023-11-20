import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Operator.module.scss'
import {Button, Flex, Input, Layout, Space, Spin, Table} from "antd";
import {FileExcelFilled, HistoryOutlined, LoadingOutlined, PercentageOutlined, PhoneFilled} from "@ant-design/icons";
import {ReactComponent as CrossedPhone} from "../../../../assets/crossed-phone.svg";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchOperatorData} from "../../../../s2-bll/b2-supervisor/s3-operator-reducer/operator-reducer";
import {useAppSelector} from "../../../../s2-bll/store";
import moment from "moment";
import {fetchOperatorNameData} from "../../../../s2-bll/b3-operator/o1-operator-name-reducer/operatorName-reducer";
import {fetchBonusData} from "../../../../s2-bll/b2-supervisor/s9-bonus-reducer/bonus-reducer";

interface OperatorDataType {
    key: React.Key
    id: number,
    title: string,
    time_created: string,
    post_marks: string,
    sum_marks: number,
    is_cancelled: boolean,
    is_bad: boolean
}



const Operator= () => {
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

    const {startPeriod, endPeriod} = useAppSelector(state => state.supervisorOperatorsListDateData.data)

    const {name} = useAppSelector( state => state.operatorNameData.data)

    const {bonus} = useAppSelector( state => state.supervisorBonusData.data)
    const bonusStatus = useAppSelector( state => state.supervisorBonusData.status)


    const [identifiedCalls, setIdentifiedCalls] = useState<number>(0)

    const [query, setQuery] = useState<any>('')

    const arrayRecordId = good_recs.map( rec => rec.id).concat(bad_recs.map(rec => rec.id))

    useEffect(() => {
        dispatch(fetchBonusData)
        userID && dispatch(fetchOperatorData(userID, startPeriod, endPeriod))

    }, [])
    useEffect(() => {
        userID && dispatch(fetchOperatorNameData(userID))
    }, [])
    useEffect(() => {
        arrayRecordId.length > 1 && dispatch(fetchBonusData(identifiedCalls, arrayRecordId))
    }, [identifiedCalls])

    const getRowClassName = (record:OperatorDataType) => {
        return record.is_bad ? s.badRow : s.goodRow
    };

    const onLoadOperatorDataHandler = () => {
        userID && dispatch(fetchOperatorData(userID, startPeriod, endPeriod, query))
    }
    const onChangeIdentifiedCallsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setIdentifiedCalls(+e.target.value)
    }
    const onChangeQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value)
    }

    const data: OperatorDataType[] = good_recs.map( (rec, index) => {
        return {
            key: index,
            ...rec,
            time_created: moment(rec.time_created).format('DD.MM.YYYY, HH:mm:ss'),
            is_cancelled: rec.is_cancelled ? rec.is_cancelled : false,
            is_bad: false

        }
    }).concat(bad_recs.map((rec, index) => {
        return {
            key: index,
            ...rec,
            time_created: moment(rec.time_created).format('DD.MM.YYYY, HH:mm:ss'),
            is_cancelled:rec.is_cancelled ? rec.is_cancelled : false,
            is_bad: true
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
                            <div>{name}</div>
                            <Flex justify={'space-between'} align={'center'}>
                                <span style={{marginRight: '5px'}}>Выявленных звонков: </span>
                                <Input value={identifiedCalls} onChange={onChangeIdentifiedCallsHandler} min={0} type={'number'} style={{width: '70px'}} />
                            </Flex>
                            <div><span style={{marginRight: '5px'}}>Премия:</span>{bonusStatus === "loading"
                                ?
                                <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                : <>{`${bonus}%`}</>}</div>
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
                                <Flex align={'center'}>
                                    <span style={{marginRight: '5px'}}>Поиск:</span>
                                    <Input.Search value={query} onSearch={onLoadOperatorDataHandler} onChange={onChangeQueryHandler}/></Flex>
                            </Flex>
                            <Table columns={columns} dataSource={data} pagination={{
                                defaultCurrent: 1,
                                pageSize
                            }} rowClassName={getRowClassName} loading={status==="loading"}/>
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