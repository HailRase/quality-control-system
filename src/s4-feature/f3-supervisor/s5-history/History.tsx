import React, {useEffect} from 'react';
import s from './Histrory.module.scss'
import {Collapse, Flex, Layout, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {fetchHistoryData} from "../../../s2-bll/b2-supervisor/s8-history-reducer/history-reducer";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../../s2-bll/store";
import Spin from '../../../common/Spin/CSpin'
import moment from "moment/moment";

const History = () => {

    const data = useAppSelector(state => state.supervisorHistoryData.data)
    const status = useAppSelector(state => state.supervisorHistoryData.status)
    const errorMessage = useAppSelector(state => state.supervisorHistoryData.errorMessage)

    const {recordID} = useParams()
    const dispatch = useDispatch<any>()
    
    useEffect(() => {
        recordID && dispatch(fetchHistoryData(+recordID))
    }, [recordID])

    return (
        <Space>
            <Layout style={{width: '93vw', padding: '30px 0 60px 20px'}}>
                <Header style={{
                    backgroundColor: '#e5e5e5',
                    padding: '0 10px 0 10px',
                    height: '60px',
                    borderRadius: '5px 5px 0 0',
                    border: '2px solid #d0d2d4',
                    borderBottom: '1px solid #d0d2d4'
                }}>
                    <Flex align={"center"} style={{height: '100%'}}>
                        <div>История изменения оценивания аудио записи №{recordID}</div>
                    </Flex>

                </Header>
                <Content style={{
                    backgroundColor: 'white',
                    padding: '15px 15px 0 15px',
                    border: '2px solid #d0d2d4',
                    borderRadius: '0 0 5px 5px',
                    borderTop: '0',
                    borderBottom: '2px solid #d0d2d4',
                }}>
                    {status === "loading"
                        ? <Spin/>
                        : Object.entries(data).map(([date, items]) => (
                            <Collapse style={{width: '100%', marginBottom: '15px'}} expandIconPosition={"right"}
                                      expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                                <Collapse.Panel key={'1'} header={date} style={{width: '100%'}}>
                                    {items.map((item, index) => (
                                        <Flex vertical gap={30} style={{padding: '10px 40px'}} key={index}>
                                            <Flex align={"center"} justify={'flex-start'} gap={100}>
                                                <div>{moment(item.date).format('DD.MM.YYYY, HH:mm:ss') }</div>
                                                <div>{item.user}</div>
                                                <div>{item.action}</div>
                                            </Flex>
                                        </Flex>
                                    ))}
                                </Collapse.Panel>
                            </Collapse>
                        ))
                    }
                </Content>
            </Layout>
        </Space>
    );
};

export default History;