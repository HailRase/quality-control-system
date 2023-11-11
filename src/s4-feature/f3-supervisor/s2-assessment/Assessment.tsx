import React, {useState} from 'react';
import s from './Assessment.module.scss'
import {Button, Checkbox, Collapse, Flex, Input, Layout, Space, Switch} from "antd";
import {LeftCircleFilled, MinusOutlined, PlusOutlined, RightCircleFilled, StarFilled} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/es/layout/layout";

const Assessment = () => {

    const [commentVisible, setCommentVisible] = useState<boolean>(false)
    const [transCallVisible, setTransCallVisible] = useState<boolean>(false)
    const [added, setAdded] = useState<boolean>(false)

    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '93vw', padding: '0 0 70px 20px'}}>
                <Flex align={"center"} justify={"space-between"}
                      style={{width: '100%', height: '10vh', marginBottom: '10px'}}>
                    {added
                        ? <StarFilled style={{fontSize: '32px', color: '#ffc600', cursor: 'pointer'}}
                                      onClick={() => setAdded(false)}/>
                        : <StarFilled style={{fontSize: '32px', color: '#6c757e', cursor: 'pointer'}}
                                      onClick={() => setAdded(true)}/>}
                    <Flex align={'center'} gap={10}>
                        <Button type={'text'} icon={<LeftCircleFilled/>}/>
                        <span style={{fontSize: '16px', marginBottom: '5px'}}>Аудио №5357747</span>
                        <Button type={'text'} icon={<RightCircleFilled/>}/>
                    </Flex>
                    <Button type={'primary'} ghost>Вернуться</Button>
                </Flex>
                <Layout style={{
                    height: '20vh',
                    backgroundColor: 'white',
                    marginBottom: '30px',
                    borderRadius: '5px',
                    border: '2px solid #d0d2d4'
                }}>
                    <Flex justify={'center'} align={'center'} style={{padding: '20px'}}>
                        <audio controls src="/" style={{width: '100%'}}/>
                    </Flex>
                </Layout>
                <Layout>
                    <Flex align={"flex-start"} style={{width: '100%'}} gap={30}>
                        <Flex vertical gap={20} style={{width: '50%'}}>
                            <Layout>
                                <Collapse style={{width: '100%'}} expandIconPosition={"right"}
                                          expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                                    <Collapse.Panel key={'1'} header={'Комментарии'} style={{width: '100%'}}>
                                        <Flex vertical gap={20}><Input.TextArea
                                            placeholder={'Введите текст комментария...'}/>
                                            <Flex justify={"flex-end"} gap={20}>
                                                <Button type={'primary'} ghost
                                                        style={{borderRadius: '3px'}}>Отменить</Button>
                                                <Button type={'primary'}
                                                        style={{borderRadius: '3px'}}>Добавить</Button>
                                            </Flex></Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} expandIconPosition={"right"}
                                          expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                                    <Collapse.Panel key={'1'} header={'Транскрипция звонка'} style={{width: '100%'}}>
                                        <Flex vertical gap={20}>
                                            Здесь будет транскрипция звонка
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'} header={'Словари'}
                                                    style={{width: '100%'}}>
                                        <Flex vertical justify={"center"} align={'center'}>
                                            <Switch defaultChecked={true}/>
                                            <span style={{marginTop: '10px'}}>Соблюдение регламента приветствия/завершения разговора</span>
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                        </Flex>
                        <Flex vertical style={{width: '50%'}} gap={20}>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'} header={'Общие детали звонка:'}
                                                    style={{width: '100%'}}>
                                        <Flex gap={100}>
                                            <Flex vertical gap={40} style={{fontSize: '12px'}}>
                                                <div>Время звонка: 2023-05-02 09:12:15</div>
                                                <div>Абонент А: 80291518519</div>
                                            </Flex>
                                            <Flex vertical gap={40} style={{fontSize: '12px'}}>
                                                <div>Направление звонка: Входящий</div>
                                                <div>Абонент Б: 105</div>
                                            </Flex>
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'} header={'Ручное оценивание:'}
                                                    style={{width: '100%'}}>
                                        <Flex gap={70}>
                                            <Flex vertical gap={40} style={{fontSize: '12px'}}>
                                                <div>Отсутствие ошибок дежурного в процессе разговора</div>
                                                <div>Логически правильно выстроен ответ</div>
                                                <div>Достоверно предоставленная информация</div>
                                                <div>Умение слушать</div>
                                            </Flex>
                                            <Flex vertical gap={30}>
                                                <Input type={'number'} size={"small"} style={{width: '50px'}} min={0}/>
                                                <Input type={'number'} size={"small"} style={{width: '50px'}} min={0}/>
                                                <Input type={'number'} size={"small"} style={{width: '50px'}} min={0}/>
                                                <Input type={'number'} size={"small"} style={{width: '50px'}} min={0}/>
                                            </Flex>
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'}
                                                    header={'Автоматическое оценивание системы:'}
                                                    style={{width: '100%'}}>
                                        <Flex vertical gap={20}>
                                            <Flex gap={70} justify={"space-between"} style={{paddingRight:'10px'}}>
                                                <Flex vertical gap={15} style={{fontSize: '12px'}}>
                                                    <div style={{color: '#15cc06'}}>Количество запрещенных слов
                                                        оператора
                                                    </div>
                                                    <div style={{color: '#15cc06'}}>Перебивания</div>
                                                    <div style={{color: '#15cc06'}}>Паузы</div>
                                                    <div style={{color: '#15cc06'}}>Длительность</div>
                                                    <div style={{color: '#15cc06'}}>Уровень шума</div>
                                                    <div style={{color: '#d30000'}}>Повышения тона</div>
                                                </Flex>
                                                <Flex gap={40} justify={"space-between"}>
                                                    <Flex vertical align={"center"} gap={17}
                                                          style={{fontSize: '12px', color: '#15cc06'}}>
                                                        <div>0/0</div>
                                                        <div>0</div>
                                                        <div>0</div>
                                                        <div>03:00:54:88</div>
                                                    </Flex>
                                                    <Flex vertical align={"center"} gap={10} style={{fontSize: '10px'}}>
                                                        <Checkbox style={{padding: '0', margin: '0'}}/>
                                                        <Checkbox/>
                                                        <Checkbox/>
                                                        <Checkbox/>
                                                        <Checkbox/>
                                                        <Checkbox/>
                                                    </Flex>
                                                    <Flex vertical align={"center"} gap={17} style={{fontSize: '12px'}}>
                                                        <div>1</div>
                                                        <div>1</div>
                                                        <div>1</div>
                                                        <div>1</div>
                                                        <div>1</div>
                                                        <div>0</div>
                                                    </Flex>
                                                </Flex>
                                            </Flex>
                                            <Flex justify={"flex-end"} align={'center'} style={{height: '100%', width: '100%'}}>
                                                <Button type={'default'}
                                                        style={{
                                                            borderRadius: '3px',
                                                            borderColor: 'black',
                                                            color: 'gray'
                                                        }}
                                                        ghost>Анулировать</Button>
                                            </Flex>
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                        </Flex>
                    </Flex>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Assessment;