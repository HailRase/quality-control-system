import React, {useState} from 'react';
import s from './Assessment.module.scss'
import {Button, Checkbox, Flex, Input, Layout, Space, Switch} from "antd";
import {LeftCircleFilled, MinusOutlined, PlusOutlined, RightCircleFilled, StarFilled} from "@ant-design/icons";
import {Content, Footer, Header} from "antd/es/layout/layout";

const Assessment = () => {

    const [commentVisible, setCommentVisible] = useState<boolean>(false)
    const [transCallVisible, setTransCallVisible] = useState<boolean>(false)

    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '93vw', padding: '0 0 70px 20px'}}>
                <Flex align={"center"} justify={"space-between"}
                      style={{width: '100%', height: '10vh', marginBottom: '10px'}}>
                    <Button type={'text'} icon={<StarFilled style={{fontSize: '32px', color: '#6c757e'}}/>}/>
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
                                <Header style={{
                                    backgroundColor: '#e5e5e5',
                                    padding: '0 10px 0 10px',
                                    height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex justify={"space-between"} align={"center"} style={{height: '100%'}}>
                                        <div>Коментарии</div>
                                        <Button type={'text'} icon={commentVisible ? <MinusOutlined/> : <PlusOutlined/>}
                                                onClick={() => setCommentVisible(!commentVisible)}/>
                                    </Flex>
                                </Header>
                                {commentVisible &&
                                    <div>
                                        <Content style={{
                                            backgroundColor: '#ffffff',
                                            padding: '15px',
                                            borderRight: '2px solid #d0d2d4',
                                            borderLeft: '2px solid #d0d2d4',
                                        }}>
                                            <Input.TextArea placeholder={'Введите текст комментария...'}/>
                                        </Content>
                                        <Footer style={{
                                            backgroundColor: '#e5e5e5',
                                            padding: '0 10px 0 10px',
                                            height: '60px',
                                            borderRadius: '0 0 5px 5px',
                                            border: '2px solid #d0d2d4',
                                            borderTop: '1px solid #d0d2d4',
                                            borderBottom: '2px solid #d0d2d4',
                                        }}>
                                            <Flex style={{height: '100%'}} align={'center'} justify={'flex-end'}
                                                  gap={10}>
                                                <Button type={'primary'} ghost
                                                        style={{borderRadius: '3px'}}>Отменить</Button>
                                                <Button type={'primary'} style={{borderRadius: '3px'}}>Добавить</Button>
                                            </Flex>
                                        </Footer>
                                    </div>
                                }
                            </Layout>
                            <Layout>
                                <Header style={{
                                    backgroundColor: '#e5e5e5', padding: '0 10px 0 10px', height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex justify={"space-between"} align={"center"} style={{height: '100%'}}>
                                        <div>Транскрипция звонка</div>
                                        <Button type={'text'}
                                                icon={transCallVisible ? <MinusOutlined/> : <PlusOutlined/>}
                                                onClick={() => setTransCallVisible(!transCallVisible)}/>
                                    </Flex>
                                </Header>
                                {transCallVisible && <Content style={{
                                    backgroundColor: '#ffffff',
                                    padding: '15px',
                                    borderRadius: '0 0 5px 5px',
                                    border: '2px solid #d0d2d4',
                                    borderTop: '0',
                                }}>
                                    <span>Здесь будет транскрипция звонка</span>
                                </Content>}
                            </Layout>
                            <Layout>
                                <Header style={{
                                    backgroundColor: '#e5e5e5',
                                    padding: '0 10px 0 10px',
                                    height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex justify={"flex-start"} align={"center"} style={{height: '100%'}}>
                                        <div>Словари</div>
                                    </Flex>
                                </Header>
                                <Content style={{
                                    backgroundColor: '#ffffff',
                                    padding: '15px',
                                    borderRadius: '0 0 5px 5px',
                                    border: '2px solid #d0d2d4',
                                    borderTop: '0'
                                }}>
                                    <Flex vertical justify={"center"} align={'center'}>
                                        <Switch defaultChecked={true}/>
                                        <span style={{marginTop: '10px'}}>Соблюдение регламента приветствия/завершения разговора</span>
                                    </Flex>
                                </Content>
                            </Layout>
                        </Flex>
                        <Flex vertical style={{width: '50%'}} gap={20}>
                            <Layout>
                                <Header style={{
                                    backgroundColor: '#e5e5e5',
                                    padding: '0 10px 0 10px',
                                    height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex align={"center"} style={{height: '100%'}}>
                                        <div>Общие детали звонка:</div>
                                    </Flex>
                                </Header>
                                <Content style={{
                                    backgroundColor: '#ffffff', padding: '30px',
                                    borderRadius: '0 0 5px 5px',
                                    border: '2px solid #d0d2d4',
                                    borderTop: '0',
                                }}>
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
                                </Content>
                            </Layout>
                            <Layout>
                                <Header style={{
                                    backgroundColor: '#e5e5e5',
                                    padding: '0 10px 0 10px',
                                    height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex align={"center"} style={{height: '100%'}}>
                                        <div>Ручное оценивание:</div>
                                    </Flex>
                                </Header>
                                <Content style={{
                                    backgroundColor: '#ffffff',
                                    padding: '30px',
                                    borderRadius: '0 0 5px 5px',
                                    border: '2px solid #d0d2d4',
                                    borderTop: '0',
                                }}>
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
                                </Content>
                            </Layout>
                            <Layout>
                                <Header style={{
                                    backgroundColor: '#e5e5e5',
                                    padding: '0 10px 0 10px',
                                    height: '40px',
                                    borderRadius: '5px 5px 0 0',
                                    border: '2px solid #d0d2d4',
                                    borderBottom: '1px solid #d0d2d4'
                                }}>
                                    <Flex align={"center"} justify={"space-between"} style={{height: '100%'}}>
                                        <div>Автоматическое оценивание системы:</div>
                                        <div>Изменить:</div>
                                    </Flex>
                                </Header>
                                <Content style={{
                                    backgroundColor: '#ffffff',
                                    padding: '15px  50px 15px 15px',
                                    borderRight: '2px solid #d0d2d4',
                                    borderLeft: '2px solid #d0d2d4',
                                }}>
                                    <Flex gap={70} justify={"space-between"}>
                                        <Flex vertical gap={15} style={{fontSize: '12px'}}>
                                            <div style={{color: '#15cc06'}}>Количество запрещенных слов оператора</div>
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
                                </Content>
                                <Footer style={{
                                    padding: '20px 15px',
                                    backgroundColor: '#e5e5e5',
                                    height: '50px',
                                    borderRadius: '0 0 5px 5px',
                                    border: '2px solid #d0d2d4',
                                    borderTop: '1px solid #d0d2d4',
                                }}>
                                    <Flex justify={"flex-end"} align={'center'} style={{height: '100%'}}>
                                        <Button type={'default'}
                                                style={{borderRadius: '3px', borderColor: 'black', color: 'gray'}}
                                                ghost>Анулировать</Button>
                                    </Flex>
                                </Footer>
                            </Layout>
                        </Flex>
                    </Flex>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Assessment;