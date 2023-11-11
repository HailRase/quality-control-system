import React from 'react';
import s from './Search.module.scss'
import {Button, Flex, Input, Layout, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";

const Search = () => {
    return (
        <Space>
            <Layout style={{width: '93vw', padding: '40px 0 50px 20px'}}>
                <Flex style={{
                    backgroundColor: '#e5e5e5',
                    padding: '0 0 0 10px',
                    height: '60px',
                    borderRadius: '5px 5px 0 0',
                    border: '2px solid #d0d2d4',
                    borderBottom: '1px solid #d0d2d4'
                }}>
                    <Flex align={"center"}  justify={"flex-start"} gap={70}>
                        <Flex style={{height: '30px'}} gap={15}>
                            <div><b>Начало периода:</b> </div>
                            <Input type={'date'}/>
                        </Flex>
                        <Flex style={{height: '30px'}} gap={15}>
                            <div><b>Конец периода: </b></div>
                            <Input type={'date'}/>
                        </Flex>
                        <Flex style={{height: '30px'}} gap={15}>
                            <div><b>Слово или фраза для поиска: </b></div>
                            <Input/>
                        </Flex>
                        <Button type={'primary'} ghost>Поиск</Button>
                    </Flex>
                </Flex>
                <Content style={{
                    minHeight: '50px',
                    backgroundColor: '#ffffff',
                    borderRadius: '0 0 5px 5px',
                    border: '2px solid #d0d2d4',
                    borderTop: '0'
                }}>

                </Content>
            </Layout>
        </Space>
    );
};

export default Search;