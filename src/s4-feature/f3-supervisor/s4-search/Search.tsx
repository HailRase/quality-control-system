import React, {ChangeEvent, useState} from 'react';
import {Button, Flex, Input, Layout, Space, Table} from "antd";
import {Content} from "antd/es/layout/layout";
import {useDispatch} from "react-redux";
import {ColumnsType} from "antd/es/table";
import {fetchSearchData} from "../../../s2-bll/b2-supervisor/s4-search-reducer/search-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {useNavigate} from "react-router-dom";
import {setSearchQueryParamsData} from "../../../s2-bll/b2-supervisor/s4-search-reducer/search-query-params-reducer";


type DataType = {
    id: string
    name: string
    period_records: number
}

const Search = () => {



    const {data, status, errorMessage} = useAppSelector(state => state.supervisorSearchData)

    const startPeriodFR = useAppSelector( state =>  state.supervisorSearchQueryParamsData.data.startPeriod)
    const endPeriodFR = useAppSelector( state =>  state.supervisorSearchQueryParamsData.data.endPeriod)
    const phraseFR = useAppSelector( state =>  state.supervisorSearchQueryParamsData.data.phrase)

    const [startPeriod, setStartPeriod] = useState<string>(startPeriodFR)
    const [endPeriod, setEndPeriod] = useState<string>(endPeriodFR)
    const [phrase, setPhrase] = useState<string>(phraseFR)


    const dispatch = useDispatch<any>()
    const navigate = useNavigate()


    const onChangeStartPeriodHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartPeriod(e.target.value)
    }
    const onChangeEndPeriodHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEndPeriod(e.target.value)
    }
    const onPhraseHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPhrase(e.target.value)
    }
    const onLoadSearchData = () => {
        dispatch(fetchSearchData(startPeriod, endPeriod, phrase.toLowerCase()))
    }
    const onSearchQueryItemHandler = (id: string) => {
        dispatch(setSearchQueryParamsData({startPeriod, endPeriod ,phrase}))
        navigate(`${id}`)
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Номер оператора',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'ФИО',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },
        {
            title: 'Найдено записей',
            dataIndex: 'period_records',
            key: 'period_records',
            align: 'center',

        },
    ]

    return (
        <Space>
            <Layout style={{width: '93vw', padding: '40px 0 50px 20px'}}>
                <Flex gap={40} vertical style={{
                    backgroundColor: '#e5e5e5',
                    padding: '0 0 0 10px',
                    height: '140px',
                    borderRadius: '5px 5px 0 0',
                    border: '2px solid #d0d2d4',
                    borderBottom: '1px solid #d0d2d4'
                }}>
                    <Flex style={{marginTop: '15px'}}>
                        <Flex align={"center"} justify={"flex-start"} gap={70}>
                            <Flex style={{height: '30px'}} gap={30}>
                                <div><b>Начало периода:</b></div>
                                <Input value={startPeriod} type={'date'} style={{textAlign: "center"}}
                                       onChange={onChangeStartPeriodHandler}/>
                            </Flex>
                            <Flex style={{height: '30px'}} gap={30}>
                                <div><b>Конец периода: </b></div>
                                <Input value={endPeriod} type={'date'} style={{textAlign: "center"}}
                                       onChange={onChangeEndPeriodHandler}/>
                            </Flex>
                            <Flex style={{height: '30px'}} gap={30}>
                                <div><b>Слово или фраза для поиска: </b></div>
                                <Input value={phrase} style={{textAlign: "center"}} onChange={onPhraseHandler}/>
                            </Flex>
                            <Button style={{borderRadius: '3px'}} type={'primary'} ghost
                                    onClick={onLoadSearchData}>Поиск</Button>
                        </Flex>
                    </Flex>
                    <Flex justify={'flex-start'} align={'center'}>
                        <Flex align={'center'} gap={5}><span>Найдено звонков за период: </span> {data.period_records}
                        </Flex>
                    </Flex>
                </Flex>
                <Content style={{
                    minHeight: '50px',
                    backgroundColor: '#ffffff',
                    borderRadius: '0 0 5px 5px',
                    border: '2px solid #d0d2d4',
                    borderTop: '0'
                }}>
                    <Table columns={columns} dataSource={data.users} loading={status === "loading"} pagination={false}
                           onRow={(record) => ({
                               onClick: () => onSearchQueryItemHandler(record.id)
                           })}/>
                </Content>
            </Layout>
        </Space>
    );
};

export default Search;