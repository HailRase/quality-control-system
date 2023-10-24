import React from 'react';
import  s from './AssessmentCriteria.module.scss'
import {Button, Flex, Input, Layout, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {DeleteTwoTone, EditTwoTone} from "@ant-design/icons";
interface ParametersType {
    name: string,
    minValue: number,
    maxValue: number
}
const parameters: ParametersType[] = [
    {name: 'Отсутсвие ошибок дежурного при разговоре', minValue: 0, maxValue: 1},
    {name: 'Логически правильно выстроен ответ', minValue: 0, maxValue: 1},
    {name: 'Достоверно предоставленная информация', minValue: 0, maxValue: 5},
    {name: 'Умение слушать', maxValue: 0, minValue: 1},
]
const AssessmentCriteria = () => {


    return (
        <Space style={{width:'100%'}}>
            <Flex vertical justify={"flex-start"} style={{width:'100%'}}>
                <Layout style={{width: '93vw'}}>
                    <Header style={{display: "flex", alignItems:"flex-end",height: '50px',backgroundColor: '#6a757b', color: "white", fontSize: "16px", padding: '20px 30px 0px 10px'}}>
                        Параметры оценки оператора
                    </Header>
                    <Content style={{padding: '30px 30px 40px 20px', backgroundColor: 'white'}}>
                        <Flex justify={"flex-start"} align={"center"}>
                            <Flex justify={"center"} align={"center"} style={{width: "55vw"}}>Название параметра</Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>Минимальное значение</Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>Максимальное значение</Flex>
                        </Flex>
                        {parameters.map(param => <Flex justify={"flex-start"} align={"center"} style={{marginTop: '30px'}}>
                            <Flex align={"center"} style={{width: "55vw"}}>
                                <Input value={param.name} style={{width: '100%'}} disabled/>
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <Input value={param.minValue} disabled style={{width: '70%', textAlign: 'center'}}/>
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <Input value={param.maxValue} disabled style={{width: '70%', textAlign: 'center'}}/>
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button type={"primary"} ghost icon={<EditTwoTone twoToneColor={'#2c6fb1'}/>}/>
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button danger icon={<DeleteTwoTone twoToneColor={'red'}/>}/>
                            </Flex>
                        </Flex>)}
                    </Content>
                </Layout>
                <Layout>
                    <Header style={{display: "flex", alignItems:"flex-end",height: '50px',backgroundColor: '#6a757b', color: "white", fontSize: "16px", marginTop: '20px', padding: '20px 30px 0px 10px'}}>
                        Добавить параметр оценки
                    </Header>
                    <Content style={{padding: '0px 30px 40px 20px', backgroundColor: 'white'}}>
                        <Flex justify={"flex-start"} align={"center"} style={{marginTop: '30px'}}>
                            <Flex align={"center"} style={{width: "55vw"}}>
                                <Input placeholder={'Введите название параметра'} style={{width: '100%'}} disabled/>
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <Input placeholder={'0'} style={{width: '70%'}}/>
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <Input placeholder={'0'} disabled style={{width: '70%'}}/>
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button style={{borderRadius: '3px'}} type={"default"} >Отменить</Button>
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button style={{borderRadius: '3px'}} type={"primary"}>Добавить</Button>
                            </Flex>
                        </Flex>
                    </Content>
                </Layout>
            </Flex>
        </Space>
    );
};

export default AssessmentCriteria;