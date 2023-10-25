import React from 'react';
import {ConfigProvider, Flex, Layout, Slider, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import s from '../a4-dictionaries/Dictionaries.module.scss'

const CallSettings = () => {
    const formatter = (value: number | undefined) => `${value}%`;

    return (
        <Space className={s.dictionariesWrapper}>
            <Layout className={s.dictionariesLayoutItem}>
                <Header className={s.dictionariesLayoutItemHeader}>
                    Параметры отбора звонков
                </Header>
                <Content className={s.dictionariesLayoutItemContent}>
                    <Flex style={{width: '100%', marginTop: '15px'}} vertical>
                        <ConfigProvider theme={{
                            components: {
                                Slider:{
                                    dotActiveBorderColor: "#000000",
                                    dotBorderColor: "#000000",
                                    handleActiveColor: "#000000",
                                    handleColor: "#4d4a4a",
                                    trackBg: "#000000",
                                    trackHoverBg: "#000000",
                                }
                            }
                        }}>
                            <div>
                                <span
                                    style={{color: 'black', fontWeight: 500}}>Процент хороших звонков при отборе</span>
                                <Slider marks={{
                                    0: {
                                        label: <span style={{
                                            backgroundColor: '#e4e4e4',
                                            padding: '1px 3px',
                                            fontSize: '12px'
                                        }}>0%</span>
                                    },
                                    100: {
                                        label: <span style={{
                                            backgroundColor: '#e4e4e4',
                                            padding: '1px 3px',
                                            fontSize: '12px'
                                        }}>100%</span>
                                    }
                                }}
                                        tooltip={{formatter, open: true}}/>
                            </div>
                            <div>
                                <span style={{color: 'black', fontWeight: 500}}>Процент плохих звонков при отборе</span>
                                <Slider marks={{
                                    0: {
                                        label: <span style={{
                                            backgroundColor: '#e4e4e4',
                                            padding: '1px 3px',
                                            fontSize: '12px'
                                        }}>0%</span>
                                    },
                                    100: {
                                        label: <span style={{
                                            backgroundColor: '#e4e4e4',
                                            padding: '1px 3px',
                                            fontSize: '12px'
                                        }}>100%</span>
                                    }
                                }}
                                        tooltip={{formatter, open: true}}/>
                            </div>
                        </ConfigProvider>
                    </Flex>
                </Content>
            </Layout>
        </Space>
    );
};

export default CallSettings;