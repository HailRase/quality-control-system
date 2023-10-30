import React, {useEffect, useState} from 'react';
import {ConfigProvider, Flex, Form, Layout, Slider, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import s from '../a4-dictionaries/Dictionaries.module.scss'
import {useAppSelector} from "../../../s2-bll/store";
import {useDispatch} from "react-redux";
import {
    editAdministratorCallSettingsData,
    fetchAdministratorCallSettingsData
} from "../../../s2-bll/b1-administrator/a4-administaror-call-settings-reducer/administratorCallSettings-reducer";

const CallSettings = () => {
    const {good_calls, bad_calls} = useAppSelector(state => state.administratorCallSettingsData.data)
    const [goodCalls, setGoodCalls] = useState(0)
    const [badCalls, setBadCalls] = useState(0)
    const [sliderGoodCallsValueChanged, setSliderGoodCallsValueChanged] = useState(false)
    const [sliderBadCallsValueChanged, setSliderBadCallsValueChanged] = useState(false)
    const dispatch = useDispatch<any>()
    const formatter = (value: number | undefined) => `${value}%`;
    useEffect(() => {
        setGoodCalls(good_calls)
        setBadCalls(bad_calls)
    }, [good_calls, bad_calls])
   /* useEffect(() => {
        setGoodCalls(good_calls)
    },[goodCalls])
    useEffect(() => {
        setBadCalls(bad_calls)
    },[badCalls])*/

    useEffect(() => {
        dispatch(editAdministratorCallSettingsData(goodCalls, badCalls))
    }, [goodCalls, badCalls])

    useEffect(() => {
        dispatch(fetchAdministratorCallSettingsData())
    }, [])

    const onChangeGoodCallsHandler = (value: number) => {
        setGoodCalls(value)
    }
    const onChangeBadCallsHandler = (value: number) => {
        setBadCalls(value)
    }

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
                                Slider: {
                                    dotActiveBorderColor: "#000000",
                                    dotBorderColor: "#000000",
                                    handleActiveColor: "#000000",
                                    handleColor: "#4d4a4a",
                                    trackBg: "#000000",
                                    trackHoverBg: "#000000",
                                }
                            }
                        }}>
                            <Form>
                                <div>
                                <span
                                    style={{color: 'black', fontWeight: 500}}>Процент хороших звонков при отборе</span>
                                    <Slider value={goodCalls} onAfterChange={onChangeGoodCallsHandler} marks={{
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
                                    <span style={{
                                        color: 'black',
                                        fontWeight: 500
                                    }}>Процент плохих звонков при отборе</span>
                                    <Slider value={badCalls} onAfterChange={onChangeBadCallsHandler} marks={{
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
                            </Form>
                        </ConfigProvider>
                    </Flex>
                </Content>
            </Layout>
        </Space>
    );
};

export default CallSettings;