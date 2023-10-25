import React, {useState} from 'react';
import {Button, ColorPicker, Flex, Input, Layout, Space} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import s from './Dictionaries.module.scss'
import {MinusSquareOutlined, PlusSquareOutlined} from "@ant-design/icons";

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

    const [collapsed, setCollapsed] = useState(false)
    const onChangeCollapsedVisible = () => setCollapsed(!collapsed)
    return (
        <Space className={s.dictionariesWrapper}>
            <Flex vertical justify={"flex-start"}>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        Словари
                    </Header>
                    <Content className={s.dictionariesLayoutItemContent}>
                        {dictionaries.map(dictionary => <div style={{marginTop: '15px'}}>
                            <Header
                                className={`${s.dictionariesLayoutItemHeader} ${s.dictionariesLayoutItemContentHeader}`}>
                                <div style={{height: '50px'}}>{dictionary.title}</div>
                                <div style={{
                                    width: "100%",
                                    border: `2px solid ${dictionary.rgbColor}`,
                                    marginBottom: "10px"
                                }}></div>
                            </Header>
                            <Content className={s.dictionariesLayoutItemContentContent}>
                                {dictionary.phrases}
                            </Content>
                            <Footer className={s.dictionariesLayoutItemContentFooter}>
                                <Flex style={{width: '100%'}} justify={"flex-end"} align={"center"}>
                                    <Button danger ghost style={{borderRadius: '3px'}}>Удалить</Button>
                                    <Button type={"primary"} ghost
                                            style={{marginLeft: '5px', borderRadius: '3px'}}>Редактировать</Button>
                                </Flex>
                            </Footer>
                        </div>)}
                    </Content>


                </Layout>
                <Layout className={s.dictionariesLayoutItem}>
                    <Header className={s.dictionariesLayoutItemHeader}>
                        <Flex justify={"space-between"} align={"center"} style={{width: '100%'}}>
                            Добавить словарь
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
                        <Input placeholder={'Введите название словаря ...'} style={{marginTop: '15px', width: '250px'}}/>
                        <Input.TextArea size={"large"} rows={4} style={{ marginTop: '30px'}}
                                        placeholder={'Введите слова через запятую без пробелов ...'}>

                        </Input.TextArea>
                        <ColorPicker style={{marginTop: '15px'}}
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
                    </Content>}
                </Layout>
            </Flex>
        </Space>
    );
};

export default Dictionaries;