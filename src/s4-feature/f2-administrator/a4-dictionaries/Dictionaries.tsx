import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, ColorPicker, Flex, Input, Layout, notification, Popconfirm, Space} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import s from './Dictionaries.module.scss'
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    addNewAdministratorDictionariesData,
    deleteNewAdministratorDictionariesData,
    editNewAdministratorDictionariesData,
    fetchAdministratorDictionariesData,
    setAdministratorDictionariesDataStatusError
} from "../../../s2-bll/b1-administrator/a3-administrator-dictionaries-reducer/administratorDictionaries-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {Color} from "antd/es/color-picker";

interface DictionariesType {
    title: string,
    phrases: string
    rgbColor: string
}

const dictionaries: DictionariesType[] = [
    {
        title: 'Запрещённые фразы',
        phrases: 'яблоко, солнце, дом, кошка, стол, книга, море, смех, музыка, дерево, цветок, воздух, дождь,\n' +
            '                            снег, радость, игра, школа, город, друзья, здоровье, путешествие, работа, деньги, улыбка,\n' +
            '                            звезда, ребенок, любовь, весна, лето, осень, зима, комната, окно, чашка, сон, здание, парк,\n' +
            '                            птица, песня, театр, фильм, спорт, животное, улица, картина, небо, портфель, часы, семья,\n' +
            '                            театр, фильм, спорт, животное, улица, картина, небо, портфель, часы, семья',
        rgbColor: "red"
    },
    {
        title: 'В разговоре звучат слова/фразы',
        phrases: 'яблоко, солнце, дом, кошка, стол, книга, море, смех, музыка, дерево, цветок, воздух, дождь,\n' +
            '                            снег, радость, игра, школа, город, друзья, здоровье, путешествие, работа, деньги, улыбка',
        rgbColor: "blue"
    },
    {
        title: 'Соблюдение регламента приветствия/завершения разговора',
        phrases: 'яблоко, солнце, дом, кошка, стол, книга, море, смех, музыка, дерево, цветок, воздух, дождь,\n' +
            '                            снег, радость, игра, школа, город, друзья, здоровье, путешествие, работа, деньги, улыбка,\n' +
            '                            звезда, ребенок, любовь, весна, лето, осень, зима, комната, окно, чашка, сон, здание, парк,\n' +
            '                            птица, песня, театр, фильм, спорт, животное, улица, картина, небо, портфель, часы, семья,\n' +
            '                            театр, фильм, спорт, животное, улица, картина, небо, портфель, часы, семья',
        rgbColor: "green"
    },
]

const Dictionaries = () => {

    const [api, contextHolder] = notification.useNotification();

    const {items, size, pages, page, total} = useAppSelector(state => state.administratorDictionariesData.data)
    const status = useAppSelector(state => state.administratorDictionariesData.status)
    const errorMessage = useAppSelector(state => state.administratorDictionariesData.errorMessage)


    const [title, setTitle] = useState<string>('')
    const [modelTitle, setModelTitle] = useState<string>('')
    const [color, setColor] = useState<string>('#1E08EE')

    const [statusEditing, setStatusEditing] = useState<null | number>(null)
    const [editingTitle, setEditingTitle] = useState<string>()
    const [editingModelTitle, setEditingModelTitle] = useState<string>()
    const [editingColor, setEditingColor] = useState<string>()

    const [collapsed, setCollapsed] = useState(false)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchAdministratorDictionariesData(1, 10))
    }, [])

    useEffect(() => {
        if (errorMessage && status === "loaded") {
            openNotification("success")
            dispatch(setAdministratorDictionariesDataStatusError(''))
        } else if (errorMessage && status === "error") {
            openNotification("error")
            dispatch(setAdministratorDictionariesDataStatusError(''))
        }

    }, [errorMessage])

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onChangeModelTitleHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setModelTitle(e.currentTarget.value)
    const onChangeColorHandler = (value: Color, hex: string) => setColor(hex)
    const onChangeCollapsedVisible = () => setCollapsed(!collapsed)

    const onChangeStatusEditingTrue = (id: number | null) => {
        setStatusEditing(null)
        if (id && editingTitle && editingModelTitle && editingColor)
            dispatch(editNewAdministratorDictionariesData(id, editingTitle, editingModelTitle, editingColor))

    }
    const onChangeStatusEditingFalse = (id: number | null, editingTitle: string, editingModelTitle: string, editingColor: string) => {
        setStatusEditing(id)
        setEditingTitle(editingTitle)
        setEditingModelTitle(editingModelTitle)
        setEditingColor(editingColor)
    }

    const onAddDictionaryHandler = () => {
        if (title && modelTitle && color){
            dispatch(addNewAdministratorDictionariesData(title, modelTitle, color))
            setTitle('')
            setModelTitle('')
            setColor('')
        } else {
            openNotification("error", "Недостаточно данных для добавления словаря")
        }
    }
    const onDeleteDictionaryHandler = (id: number) => {
        dispatch(deleteNewAdministratorDictionariesData(id))
    }
    const openNotification = (type: 'success' | 'info' | 'warning' | 'error', title?: string) => {
        api[type]({
            message: `${title ? title : errorMessage}`,
            duration: 1.5,
            placement: "bottomRight",
            style: type === "success" ? {backgroundColor: 'rgba(142,248,108,0.62)'} : {backgroundColor: 'rgba(250,117,117,0.38)'}
        });
    };

    return (
        <Space className={s.dictionariesWrapper}>
            {contextHolder}
            <Flex vertical justify={"flex-start"}>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Словари
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        {items.map(item => <div style={{marginTop: '15px'}}>
                            {statusEditing && statusEditing === item.id
                                ? <Header style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}
                                          className={`${s.dictionariesLayoutItemHeader} ${s.dictionariesLayoutItemContentHeader}`}>
                                    <Input value={editingTitle} size={"middle"} style={{width: '300px'}}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingTitle(e.target.value)}/>
                                    <div style={{display: "flex", alignItems: "center", gap: '10px'}}>
                                        Выберите цвет
                                        <ColorPicker value={editingColor}
                                                     onChange={(value: Color, hex: string) => setEditingColor(hex)}/>
                                    </div>
                                </Header>
                                : <Header
                                    className={`${s.dictionariesLayoutItemHeader} ${s.dictionariesLayoutItemContentHeader}`}>
                                    <div style={{height: '50px'}}>{item.title}</div>
                                    <div style={{
                                        width: "100%",
                                        border: `2px solid ${item.color}`,
                                        marginBottom: "10px"
                                    }}></div>
                                </Header>}
                            <Content className={s.dictionariesLayoutItemContentContent}>
                                {statusEditing && statusEditing === item.id
                                    ? <Input.TextArea
                                        value={editingModelTitle}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditingModelTitle(e.target.value)}/>
                                    : item.model_title}
                            </Content>
                            <Footer className={s.dictionariesLayoutItemContentFooter}>
                                <Flex style={{width: '100%'}} justify={"flex-end"} align={"center"}>
                                    <Popconfirm title="Удаление словаря"
                                                description="Вы уверены, что хотите удалить?"
                                                onConfirm={() => onDeleteDictionaryHandler(item.id)}
                                                okText="Удалить"
                                                cancelText="Отменить">
                                        <Button danger ghost style={{borderRadius: '3px'}}>
                                            Удалить
                                        </Button>
                                    </Popconfirm>
                                    {statusEditing && statusEditing === item.id
                                        ? <Button type={"primary"} ghost
                                                  onClick={() => onChangeStatusEditingTrue(item.id)}
                                                  style={{marginLeft: '5px', borderRadius: '3px'}}>Сохранить</Button>
                                        : <Button type={"primary"} ghost
                                                  onClick={() => onChangeStatusEditingFalse(item.id, item.title, item.model_title, item.color)}
                                                  style={{
                                                      marginLeft: '5px',
                                                      borderRadius: '3px'
                                                  }}>Редактировать</Button>}
                                </Flex>
                            </Footer>
                        </div>)}
                    </Content>


                </Layout>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        <Flex justify={"space-between"} align={"center"} style={{width: '100%'}}>
                            <span style={{fontSize: '16px'}}>Добавить словарь</span>
                            <Button ghost type={"text"} onClick={onChangeCollapsedVisible} style={{marginTop: '10px'}}
                                    icon={
                                        collapsed
                                            ? <MinusSquareOutlined style={{color: "white"}}/>
                                            : <PlusSquareOutlined style={{color: "white"}}/>
                                    }
                            />
                        </Flex>
                    </Header>
                    {collapsed && <Content className={s.dictionariesLayoutItemContent}>
                        <Input value={title} onChange={onChangeTitleHandler}
                               placeholder={'Введите название словаря ...'}
                               style={{marginTop: '15px', width: '250px'}}/>
                        <Input.TextArea value={modelTitle} onChange={onChangeModelTitleHandler} size={"large"} rows={4}
                                        style={{marginTop: '30px'}}
                                        placeholder={'Введите слова через запятую без пробелов ...'}>
                        </Input.TextArea>
                        <Flex align={"center"} justify={"space-between"}>
                            <div>
                                <ColorPicker value={color} onChange={onChangeColorHandler} style={{marginTop: '15px'}}
                                             presets={[
                                                 {
                                                     label: 'Recommended',
                                                     colors: [
                                                         '#000000',
                                                         '#000000E0',
                                                         '#000000A6',
                                                         '#00000073',
                                                         '#00000040',
                                                         '#00000026',
                                                         '#0000001A',
                                                         '#00000012',
                                                         '#0000000A',
                                                         '#00000005',
                                                         '#F5222D',
                                                         '#FA8C16',
                                                         '#FADB14',
                                                         '#8BBB11',
                                                         '#52C41A',
                                                         '#13A8A8',
                                                         '#1677FF',
                                                         '#2F54EB',
                                                         '#722ED1',
                                                         '#EB2F96',
                                                         '#F5222D4D',
                                                         '#FA8C164D',
                                                         '#FADB144D',
                                                         '#8BBB114D',
                                                         '#52C41A4D',
                                                         '#13A8A84D',
                                                         '#1677FF4D',
                                                         '#2F54EB4D',
                                                         '#722ED14D',
                                                         '#EB2F964D',
                                                     ],
                                                 },
                                                 {
                                                     label: 'Recent',
                                                     colors: [],
                                                 },
                                             ]}
                                /> Выберите цвет
                            </div>
                            <Button onClick={onAddDictionaryHandler} type={"default"} style={{
                                color: '#2ccb28',
                                borderColor: '#2ccb28',
                                marginTop: '15px'
                            }}>Добавить</Button>
                        </Flex>
                    </Content>}
                </Layout>
            </Flex>
        </Space>
    );
};

export default Dictionaries;