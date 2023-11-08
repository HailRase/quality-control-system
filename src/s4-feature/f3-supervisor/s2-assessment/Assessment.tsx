import React, {useState} from 'react';
import {Button, Flex, Layout, Space, Switch} from "antd";
import {LeftCircleFilled, MinusOutlined, PlusOutlined, RightCircleFilled, StarFilled} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";

const Assessment = () => {

    const [commentVisible, setCommentVisible] = useState<boolean>(false)
    const [transCallVisible, setTransCallVisible] = useState<boolean>(false)
    const [dictionaryVisible, setDictionaryVisible] = useState<boolean>(false)

    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '93vw', padding: '0 20px 50px 20px'}}>
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
                    <Flex justify={'center'} align={'center'}>
                        <h1>Здесь будет аудио</h1>
                    </Flex>
                </Layout>
                <Layout style={{height: '60vh'}}>
                    <Flex justify={"space-between"} align={"flex-start"}>
                        <Flex vertical gap={20}>
                            <Layout>
                                <Header style={{backgroundColor: '#e5e5e5', padding: '0 10px 0 10px', height: '40px'}}>
                                    <Flex justify={"space-between"} align={"center"} style={{height: '100%'}}>
                                        <div>Коментарии</div>
                                        <Button type={'text'} icon={commentVisible?<MinusOutlined />:<PlusOutlined/>}
                                                onClick={() => setCommentVisible(!commentVisible)}/>
                                    </Flex>
                                </Header>
                                {commentVisible && <Content style={{backgroundColor: '#ffffff', padding: '15px'}}>
                                    <span>Здесь будут комментарии</span>
                                </Content>}
                            </Layout>
                            <Layout>
                                <Header style={{backgroundColor: '#e5e5e5', padding: '0 10px 0 10px', height: '40px'}}>
                                    <Flex justify={"space-between"} align={"center"} style={{height: '100%'}}>
                                        <div>Транскрипция звонка</div>
                                        <Button type={'text'} icon={transCallVisible?<MinusOutlined />:<PlusOutlined/>} onClick={() => setTransCallVisible(!transCallVisible)}/>
                                    </Flex>
                                </Header>
                                {transCallVisible && <Content style={{backgroundColor: '#ffffff', padding: '15px'}}>
                                    <span>Здесь будет транскрипция звонка</span>
                                </Content>}
                            </Layout>
                            <Layout>
                                <Header style={{backgroundColor: '#e5e5e5', padding: '0 10px 0 10px', height: '40px'}}>
                                    <Flex justify={"space-between"} align={"center"} style={{height: '100%'}}>
                                        <div>Словари</div>
                                        <Button type={'text'} icon={dictionaryVisible?<MinusOutlined />:<PlusOutlined/>} onClick={() => setDictionaryVisible(!dictionaryVisible)}/>
                                    </Flex>
                                </Header>
                                {dictionaryVisible && <Content style={{backgroundColor: '#ffffff', padding: '15px'}}>
                                    <Flex vertical justify={"center"} align={'center'}>
                                        <Switch defaultChecked={true}/>
                                        <span style={{marginTop: '10px'}}>Соблюдение регламента приветствия/завершения разговора</span>
                                    </Flex>
                                </Content>}
                            </Layout>
                        </Flex>
                        <Flex>

                        </Flex>
                    </Flex>
                </Layout>
            </Flex>
        </Space>
    );
};

export default Assessment;