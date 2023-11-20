import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Assessment.module.scss'
import {Button, Checkbox, Collapse, Flex, Input, Layout, Space, Switch} from "antd";
import {LeftCircleFilled, MinusOutlined, PlusOutlined, RightCircleFilled, StarFilled} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {
    addRecordToFavorites,
    deleteRecordFromFavorites
} from "../../../s2-bll/b2-supervisor/s7-favorites-reducer/favorites-reducer";
import {
    fetchOperatorRecordDetailsData
} from "../../../s2-bll/b2-supervisor/s5-operator-record-details-reducer/operatorRecordDetails-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {addCommentsData, fetchCommentsData} from "../../../s2-bll/b2-supervisor/s10-comments-reducer/comments-reducer";
import {Content, Footer} from "antd/es/layout/layout";
import {
    fetchAdministratorDictionariesData
} from "../../../s2-bll/b1-administrator/a3-administrator-dictionaries-reducer/administratorDictionaries-reducer";
import moment from "moment/moment";

const Assessment = () => {


    const {
        is_fav,
        transcription,
        agent_phone,
        client_phone,
        time_created,
        type_call,
        url_rec
    } = useAppSelector(state => state.supervisorOperatorRecordDetailsData.data)
    const dataStatus = useAppSelector(state => state.supervisorOperatorRecordDetailsData.status)
    const commentsData = useAppSelector(state => state.supervisorCommentsData.data)
    const dictionariesData = useAppSelector(state => state.administratorDictionariesData.data.items)

    const manualAssessmentInputData = dictionariesData.map(i => {
        return {
            id: i.id,
            title: i.title,
            value: 0
        }
    })
    const manualAssessmentSwitcherData = dictionariesData.map(i => {
        return {
            id: i.id,
            label: i.title,
            checked: false
        }
    })

    const [added, setAdded] = useState<boolean>(is_fav)
    const [comment, setComment] = useState<string>('')
    const [inputData, setInputData] = useState(manualAssessmentInputData)
    const [switchData, setSwitchData] = useState(manualAssessmentSwitcherData);

    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const {recordID} = useParams()

    useEffect(() => {
            const style = document.createElement("style")
            style.id = 'custom-style'
            document.head.append(style)
    }, [])

    useEffect(() => {
        if(dictionariesData.length > 0){
            const st = document.querySelector('#custom-style')
            const styleContent = dictionariesData.map(item => `
            .${item.model_title} {
            background-color: ${item.color};
            border: 1px solid black;
            padding: 2px;
            }`);

            if (st) {
                st.textContent = styleContent.join("")
            }

        }
    }, [dictionariesData])
    useEffect(() => {
        recordID && dispatch(fetchOperatorRecordDetailsData(+recordID))
    }, [recordID])
    useEffect(() => {
        recordID && dispatch(fetchCommentsData(+recordID))
    }, [recordID])
    useEffect(() => {
        dispatch(fetchAdministratorDictionariesData(1, 20))
    }, [recordID])

    const onDeleteRecordFromFavoritesHandler = () => {
        recordID && dispatch(deleteRecordFromFavorites(+recordID))
        setAdded(false)
    }
    const onAddRecordToFavoritesHandler = () => {
        recordID && dispatch(addRecordToFavorites(+recordID))
        setAdded(true)
    }
    const onAddCommentHandler = () => {
        recordID && comment && dispatch(addCommentsData(+recordID, comment))
        setComment('')
    }


    const handleSwitchChange = (checked: boolean, id: number) => {
        setSwitchData((prevData) =>
            prevData.map((item) =>
                item.id === id ? {...item, checked} : item
            )
        );
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        const {value} = event.target;

        setInputData((prevData) =>
            prevData.map((item) =>
                item.id === id ? {...item, value: Number(value)} : item
            )
        );
    };
    const onChangeCommentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
    }
    const onGoBackHandler = () => {
        navigate(-1)
    }
    const isAgent = (speaker: string) => {
        return speaker === 'agent'
    }

    return (
        <Space style={{width: '100%'}}>
            <Flex vertical style={{width: '93vw', padding: '0 0 70px 20px'}}>
                <Flex align={"center"} justify={"space-between"}
                      style={{width: '100%', height: '10vh', marginBottom: '10px'}}>
                    {added
                        ? <StarFilled style={{fontSize: '32px', color: '#ffc600', cursor: 'pointer'}}
                                      onClick={onDeleteRecordFromFavoritesHandler}/>
                        : <StarFilled style={{fontSize: '32px', color: '#6c757e', cursor: 'pointer'}}
                                      onClick={onAddRecordToFavoritesHandler}/>}
                    <Flex align={'center'} gap={10}>
                        <span style={{fontSize: '16px', marginBottom: '5px'}}>Аудио №{recordID}</span>
                    </Flex>
                    <Button type={'primary'} ghost onClick={onGoBackHandler}>Вернуться</Button>
                </Flex>
                <Layout style={{
                    height: '15vh',
                    backgroundColor: 'white',
                    marginBottom: '30px',
                    borderRadius: '5px',
                    border: '2px solid #d0d2d4'
                }}>
                    <Flex justify={'center'} align={'center'} style={{padding: '20px'}}>
                        <audio controls src={url_rec} style={{width: '100%'}}/>
                    </Flex>
                </Layout>
                <Layout>
                    <Flex align={"flex-start"} style={{width: '100%'}} gap={30}>
                        <Flex vertical gap={20} style={{width: '50%'}}>
                            <Layout>
                                <Collapse style={{width: '100%'}} expandIconPosition={"right"}
                                          expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                                    <Collapse.Panel key={'1'} header={'Комментарии'} style={{width: '100%'}}
                                                    id={"comment-assessment"} className={s.collapseContainer}>
                                        <Content style={{padding: '20px', maxHeight: '40vh', overflowY: "scroll"}}
                                                 className={s.transContainer}>
                                            {commentsData.length > 0 ? commentsData.map(comment =>
                                                    <Flex key={comment.id} vertical
                                                          style={{width: '100%', marginBottom: '20px'}} gap={10}>
                                                        <Flex align={'center'}
                                                              justify={'flex-start'}>
                                                            <b>{comment.user_name} {moment(comment.created_at).format('DD.MM.YYYY, HH:mm:ss')}</b>
                                                        </Flex>
                                                        <Flex align={"flex-start"}
                                                              justify={'flex-end'}>
                                                            <div style={{
                                                                width: '93%',
                                                                padding: '10px',
                                                                backgroundColor: '#d1d5dd',
                                                                borderRadius: '5px'
                                                            }}>
                                                                {comment.text}
                                                            </div>
                                                        </Flex>
                                                    </Flex>)
                                                : <div>Без комментариев</div>
                                            }
                                        </Content>
                                        <Footer style={{padding: '10px'}}>
                                            <Flex vertical gap={20}>
                                                <Input.TextArea value={comment} onChange={onChangeCommentHandler}
                                                                required
                                                                placeholder={'Введите текст комментария...'}/>
                                                <Flex justify={"flex-end"} gap={20}>
                                                    <Button type={'primary'} ghost
                                                            style={{borderRadius: '3px'}}
                                                            onClick={() => setComment('')}>Отменить</Button>
                                                    <Button type={'primary'} onClick={onAddCommentHandler}
                                                            style={{borderRadius: '3px'}}>Добавить</Button>
                                                </Flex>
                                            </Flex>
                                        </Footer>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} expandIconPosition={"right"}
                                          expandIcon={(value) => value.isActive ? <MinusOutlined/> : <PlusOutlined/>}>
                                    <Collapse.Panel key={'1'} header={'Транскрипция звонка'} id={"call-transcription"}
                                                    className={s.collapseContainer}>
                                        <Flex className={s.transContainer} vertical gap={20}
                                              style={{maxHeight: '40vh', overflowY: "scroll",}}>
                                            {transcription.map(i => i.text !== ''
                                                ? <Flex key={i.id} vertical style={{width: '100%'}}
                                                        gap={5}>
                                                    <Flex align={'center'}
                                                          justify={isAgent(i.speaker) ? 'flex-start' : 'flex-end'}>
                                                        {isAgent(i.speaker) ? <b>Оператор</b> : <b>Клиент</b>}
                                                    </Flex>
                                                    <Flex align={"flex-start"}
                                                          justify={isAgent(i.speaker) ? 'flex-end' : 'flex-start'}>
                                                        <div style={{
                                                            width: '93%',
                                                            padding: '5px 10px 20px 10px',
                                                            backgroundColor: '#d1d5dd',
                                                            borderRadius: '5px'
                                                        }} dangerouslySetInnerHTML={{__html: i.text}}>
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                                : <></>
                                            )}
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'} header={'Словари'}
                                                    style={{width: '100%'}}>
                                        <Flex justify={"center"} align={'center'} gap={20}>
                                            {switchData.length > 0 && switchData.map(item =>
                                                <Flex vertical align={"center"} key={item.id}>
                                                    <Switch checked={item.checked} style={{width: '30px'}}
                                                            onChange={(checked) => handleSwitchChange(checked, item.id)}/>
                                                    <span style={{marginTop: '10px'}}>{item.label}</span>
                                                </Flex>
                                            )}
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
                                                <div>Время
                                                    звонка: {moment(time_created).format('DD.MM.YYYY, HH:mm:ss')}</div>
                                                <div>Абонент А: {client_phone}</div>
                                            </Flex>
                                            <Flex vertical gap={40} style={{fontSize: '12px'}}>
                                                <div>Направление звонка: {type_call}</div>
                                                <div>Абонент Б: {agent_phone}</div>
                                            </Flex>
                                        </Flex>
                                    </Collapse.Panel>
                                </Collapse>
                            </Layout>
                            <Layout>
                                <Collapse style={{width: '100%'}} activeKey={'1'}>
                                    <Collapse.Panel showArrow={false} key={'1'} header={'Ручное оценивание:'}
                                                    style={{width: '100%'}}>
                                        <Flex gap={20} vertical>
                                            {inputData.map((item) => (
                                                <Flex align={"center"} gap={50}>
                                                    <div>{item.title}</div>
                                                    <Input
                                                        size={"small"}
                                                        style={{width: '60px'}}
                                                        key={item.id}
                                                        type="number"
                                                        name={item.id.toString()}
                                                        value={item.value}
                                                        onChange={(event) => handleInputChange(event, item.id)}
                                                        title={item.title}
                                                    />
                                                </Flex>
                                            ))}
                                            {/*<Flex vertical gap={40} style={{fontSize: '12px'}}>
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
                                            </Flex>*/}
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
                                            <Flex gap={70} justify={"space-between"} style={{paddingRight: '10px'}}>
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
                                                        2
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
                                            <Flex justify={"flex-end"} align={'center'}
                                                  style={{height: '100%', width: '100%'}}>
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