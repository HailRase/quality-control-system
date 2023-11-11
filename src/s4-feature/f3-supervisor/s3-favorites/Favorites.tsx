import React from 'react';
import s from './Favorites.module.scss'
import {Button, Flex, Layout, Space, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {HistoryOutlined, InfoCircleFilled} from "@ant-design/icons";
import {PATH} from "../../../s1-main/routes/routes";
import ReactAudioPlayer from "react-audio-player";
import {useNavigate} from "react-router-dom";

interface DataType {
    key: React.Key
    number: number
    id: string
    operator: string
    record: string
    noErrors: number
    correctAnswer: number
    reliableInformation: number
    listeningSkills: number
}

const Favorites = () => {
    const navigate = useNavigate()
    const data: DataType[] = [
        {
            key: '1',
            number: 1,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: 'asdfasdfjlajsdl asdfgsdfg sdfgsdfgds dsfgsdfg',
            noErrors: 0,
            correctAnswer: 0,
            reliableInformation: 0,
            listeningSkills: 0,
        },
        {
            key: '2',
            number: 2,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: 'asdfasdfjlajsdl asdfgsdfg sdfgsdfgds dsfgsdfg',
            noErrors: 1,
            correctAnswer: 0,
            reliableInformation: 1,
            listeningSkills: 0,
        },
        {
            key: '3',
            number: 3,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: 'asdfasdfjlajsdl asdfgsdfg sdfgsdfgds dsfgsdfg',
            noErrors: 1,
            correctAnswer: 0,
            reliableInformation: 1,
            listeningSkills: 0,
        },
        {
            key: '4',
            number: 4,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: 'asdfasdfjlajsdl asdfgsdfg sdfgsdfgds dsfgsdfg',
            noErrors: 1,
            correctAnswer: 0,
            reliableInformation: 1,
            listeningSkills: 0,
        },
        {
            key: '5',
            number: 5,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: 'asdfasdfjlajsdl asdfgsdfg sdfgsdfgds dsfgsdfg',
            noErrors: 2,
            correctAnswer: 1,
            reliableInformation: 0,
            listeningSkills: 1,
        },
        {
            key: '6',
            number: 6,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: '../../../assets/dozhd.mp3',
            noErrors: 1,
            correctAnswer: 0,
            reliableInformation: 1,
            listeningSkills: 0,
        },
        {
            key: '7',
            number: 7,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: '../../../assets/dozhd.mp3',
            noErrors: 0,
            correctAnswer: 1,
            reliableInformation: 1,
            listeningSkills: 1,
        },
        {
            key: '8',
            number: 8,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: '../../../assets/dozhd.mp3',
            noErrors: 1,
            correctAnswer: 1,
            reliableInformation: 1,
            listeningSkills: 0,
        },
        {
            key: '9',
            number: 9,
            id: 'sadfasdfdfgsdfg',
            operator: 'Павлова Аксана Александровна',
            record: '../../../assets/dozhd.mp3',
            noErrors: 0,
            correctAnswer: 0,
            reliableInformation: 1,
            listeningSkills: 0,
        },
    ]
    const columns: ColumnsType<DataType> = [
        {
            title: 'Номер',
            dataIndex: 'number',
            key: 'number',
            align: 'center'
        },
        {
            title: 'Оператор',
            dataIndex: 'operator',
            key: 'operator',
            align: 'center',
        },
        {
            title: 'Аудио запись',
            dataIndex: 'record',
            key: 'record',
            align: 'center',
            render: (value) => <audio controls src={value}/>
        },
        {
            title: 'Отсутсвие ошибок дежурного в процессе разговора',
            dataIndex: 'noErrors',
            key: 'noErrors',
            align: 'center',
        },
        {
            title: 'Логически правильно выстроен ответ',
            dataIndex: 'correctAnswer',
            key: 'correctAnswer',
            align: 'center',
        },
        {
            title: 'Достоверно предоставленная информация',
            dataIndex: 'reliableInformation',
            key: 'reliableInformation',
            align: 'center',
        },
        {
            title: 'Умение слушать',
            dataIndex: 'listeningSkills',
            key: 'listeningSkills',
            align: 'center',
        },
        {
            title: 'Детали',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: () => <Button type={"primary"} ghost icon={<InfoCircleFilled/>} onClick={() => navigate(PATH.SUPERVISOR.ASSESSMENT)}/>
        }
    ];
    return (
        <Space>
            <Layout style={{width: '93vw', padding: '20px 0 60px 20px'}}>
                <Header style={{
                    backgroundColor: '#e5e5e5',
                    padding: '0 0 0 10px',
                    height: '50px',
                    borderRadius: '5px 5px 0 0',
                    border: '2px solid #d0d2d4',
                    borderBottom: '1px solid #d0d2d4'
                }}>
                    <Flex style={{height: '100%'}} align={'center'}>
                        <div>Избранные аудио</div>
                    </Flex>
                </Header>
                <Content style={{
                    borderRadius: '0 0 5px 5px',
                    border: '2px solid #d0d2d4',
                    borderTop: '0'
                }}>
                    <Table columns={columns} dataSource={data} pagination={false}/>
                </Content>
            </Layout>
        </Space>
    );
};

export default Favorites;