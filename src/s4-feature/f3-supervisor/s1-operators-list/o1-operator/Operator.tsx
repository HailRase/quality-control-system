import React from 'react';
import s from './Operator.module.scss'
import {Button, Flex, Input, Layout, Space, Table} from "antd";
import {FileExcelFilled, PercentageOutlined, PhoneFilled} from "@ant-design/icons";
import {ReactComponent as CrossedPhone} from "../../../../assets/crossed-phone.svg";
import {Content, Footer, Header} from "antd/es/layout/layout";

const Operator = () => {
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
                                    <CrossedPhone className={s.crossedPhone} style={{width: '30px', color: "white", }}/>
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
                                    <CrossedPhone className={s.crossedPhone} style={{width: '30px', color: "white", }}/>
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
                    <Header style={{width: '100%', backgroundColor: '#eaeaea', padding: '0 20px', }}>
                        <Flex justify={'space-between'} align={'center'} style={{fontSize: '16px'}}>
                            <div>Баранчук Светлана Григорьевна</div>
                            <Flex justify={'space-between'} align={'center'}>
                                <span style={{marginRight: '5px'}}>Выявленных звонков: </span>
                                 <Input value={0} min={0} type={'number'} style={{width: '70px'}}/>
                            </Flex>
                            <div>Премия: 0%</div>
                            <Flex>
                                <Button type={'primary'} ghost style={{borderRadius: '3px', marginRight: '15px'}}>Вернуться в отчёт</Button>
                                <Button type={'primary'} ghost icon={<FileExcelFilled/>} style={{borderRadius: '3px'}}/>
                            </Flex>
                        </Flex>
                    </Header>
                    <Content style={{width: '100%', backgroundColor: '#ffffff', padding: '0 20px'}}>
                        <Flex vertical style={{marginTop: '20px'}}>
                            <Flex justify={'space-between'} align={'center'}>
                                <Flex align={'center'}>
                                    <span style={{marginRight:'5px'}}>Показать</span>
                                    <Input value={10} min={1} type={'number'} style={{width: '70px'}}/>
                                    <span style={{marginLeft:'5px'}}>записей</span>
                                </Flex>
                                <Flex align={'center'}><span style={{ marginRight: '5px'}}>Поиск:</span> <Input.Search/></Flex>
                            </Flex>
                            <Table/>
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