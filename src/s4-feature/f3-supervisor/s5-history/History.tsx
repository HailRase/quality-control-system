import React from 'react';
import s from './Histrory.module.scss'
import {Collapse, Flex, Layout, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const History = () => {
    return (
        <Space>
            <Layout style={{width: '93vw', padding: '30px 0 50px 20px'}}>
                <Header style={{
                    backgroundColor: '#e5e5e5',
                    padding: '0 10px 0 10px',
                    height: '60px',
                    borderRadius: '5px 5px 0 0',
                    border: '2px solid #d0d2d4',
                    borderBottom: '1px solid #d0d2d4'
                }}>
                    <Flex align={"center"} style={{height: '100%'}}>
                        <div>История изменения оценинаия аудио записи №5232366</div>
                    </Flex>

                </Header>
                <Content style={{
                    backgroundColor: 'white',
                    padding: '15px',
                    border: '2px solid #d0d2d4',
                    borderRadius: '0 0 5px 5px',
                    borderTop: '0',
                    borderBottom: '2px solid #d0d2d4',
                }}>
                    <Collapse style={{width: '100%'}} expandIconPosition={"right"}
                              expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                        <Collapse.Panel key={'1'} header={'2023-04-20'} style={{width: '100%'}}>
                            <Flex vertical gap={30} style={{padding: '10px 40px'}}>
                                <Flex align={"center"} justify={'flex-start'} gap={100}>
                                    <div>2023-04-20 09:40:43</div>
                                    <div>Баранчук С.Г.</div>
                                    <div>Анулировал звонок с изменением парметра "Количество запрещённых слов" с 1 на 0
                                    </div>
                                </Flex>
                                <Flex align={"center"} justify={'flex-start'} gap={100}>
                                    <div>2023-04-20 09:40:43</div>
                                    <div>Баранчук С.Г.</div>
                                    <div>Анулировал звонок с изменением парметра "Пазуы" с 1 на 0</div>
                                </Flex>
                                <Flex align={"center"} justify={'flex-start'} gap={100}>
                                    <div>2023-04-20 09:40:43</div>
                                    <div>Баранчук С.Г.</div>
                                    <div>Анулировал звонок с изменением парметра "Длительность" с 1 на 0</div>
                                </Flex>
                                <Flex align={"center"} justify={'flex-start'} gap={100}>
                                    <div>2023-04-20 09:40:43</div>
                                    <div>Баранчук С.Г.</div>
                                    <div>Анулировал звонок с изменением парметра "Уровень шума" с 1 на 0</div>
                                </Flex>
                                <Flex align={"center"} justify={'flex-start'} gap={100}>
                                    <div>2023-04-20 09:40:43</div>
                                    <div>Баранчук С.Г.</div>
                                    <div>Анулировал звонок с изменением парметра "Повышение тона" с 1 на 0</div>
                                </Flex>
                            </Flex>
                        </Collapse.Panel>
                    </Collapse>
                </Content>
            </Layout>
        </Space>
    );
};

export default History;