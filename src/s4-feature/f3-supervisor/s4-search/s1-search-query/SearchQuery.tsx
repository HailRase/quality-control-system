import React, {ChangeEvent, useEffect, useState} from 'react';
import './SearchQuery.css'
import {Button, Flex, Input, Layout, Modal, Pagination, Space, Spin, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {useNavigate, useParams} from "react-router-dom";
import {ColumnsType} from "antd/es/table";
import {AlignLeftOutlined, LoadingOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../../s2-bll/store";
import {fetchSearchUserData} from "../../../../s2-bll/b2-supervisor/s4-search-reducer/searchQuery-reducer";
import {fetchOperatorNameData} from "../../../../s2-bll/b3-operator/o1-operator-name-reducer/operatorName-reducer";

type DataType = {
    id: string
    title: string
    text: string
    post_marks: string
    common_mark: number
    sum_marks: number
    is_cancelled: boolean
    is_bad: boolean
}

const SearchQuery = () => {

    const {userID} = useParams()


    const {startPeriod, endPeriod, phrase} = useAppSelector(state => state.supervisorSearchQueryParamsData.data)
    const {name} = useAppSelector( state => state.operatorNameData.data)
    const operatorNameStatus = useAppSelector( state =>  state.operatorNameData.status)


    const {data, errorMessage, status} = useAppSelector(state => state.supervisorSearchQueryData)
    const {page, size, pages, total, items} = data
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const [currentPage, setCurrentPage] = useState(page);
    const [pageSize, setPageSize] = useState(size);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState<string>('')

    useEffect(() => {
        userID && dispatch(fetchSearchUserData(userID, phrase, startPeriod, endPeriod, currentPage, pageSize))
    }, [startPeriod, endPeriod, phrase, pageSize, currentPage])

    useEffect(() => {
        userID && dispatch(fetchOperatorNameData(userID))
    }, [])

    const onLoadSearchQueryHandler = () => {
        userID && dispatch(fetchSearchUserData(userID, phrase, startPeriod, endPeriod, currentPage, pageSize, query))
    }
    const onChangeQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const onBackToSearchResultHandler = () => {
        navigate(-1)
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const getRowClassName = (record:DataType) => {
        return record.is_bad ? 'bad-row' : 'good-row'
    };
    const columns: ColumnsType<DataType> = [
        {
            title: 'Аудио',
            dataIndex: 'title',
            key: 'title',
            align: 'center'
        },
        {
            title: 'Текст',
            dataIndex: 'text',
            key: 'text',
            align: 'center',
            render: (value) => <div>
                <Button style={{borderRadius: '3px'}} type={'primary'} ghost onClick={showModal}
                        icon={<AlignLeftOutlined/>}/>
                <Modal
                    open={isModalOpen}
                    footer={null}
                    closable={false}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <div dangerouslySetInnerHTML={{__html: value}}></div>
                </Modal>
            </div>
        },
        {
            title: 'Проставлено оценок',
            dataIndex: 'post_marks',
            key: 'post_marks',
            align: 'center',
        },
        {
            title: 'Общая оценка',
            dataIndex: 'common_mark',
            key: 'common_mark',
            align: 'center',
        },
        {
            title: 'Суммарная оценка',
            dataIndex: 'sum_marks',
            key: 'sum_marks',
            align: 'center',
        },
        {
            title: 'Анулировано',
            dataIndex: 'is_cancelled',
            key: 'is_cancelled',
            align: 'center',
            render: (value) => value ? <span>Да</span> : <span>Нет</span>
        },
        {
            title: 'Оценивание',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (value) => <Button style={{borderRadius: '3px'}} type={'primary'} ghost
                                       onClick={() => navigate(`/evaluate/${value}`)}>Перейти к оценке</Button>
        },

    ]
    return (
        <Space>
            <Layout style={{width: '93vw', padding: '20px 0 50px 20px'}}>
                <Header style={{backgroundColor: '#e5e5e5', padding: '0px 20px'}}>
                    <Flex align={"center"} justify={'space-between'}>
                        <div style={{fontWeight: 500}}>
                            {operatorNameStatus === "loading"
                                ?
                                <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                : <span>{name}</span>}
                        </div>
                        <Button type={'primary'} ghost style={{borderRadius: '3px'}}
                                onClick={onBackToSearchResultHandler}>Результаты поиска</Button>
                    </Flex>
                </Header>
                <Content style={{backgroundColor: '#ffffff', padding: '10px'}}>
                    <Flex vertical gap={20}>
                        <Flex align={"center"} justify={"space-between"} style={{padding: '20px 10px'}}>
                            <Flex gap={5}>Показать <Input onChange={(e) => setPageSize(+e.currentTarget.value)}
                                                          defaultValue={10} min={0} size={"small"}
                                                          style={{width: '50px'}}
                                                          type="number"/> записей</Flex>
                            <Flex gap={5}>Поиск: <Input.Search onSearch={onLoadSearchQueryHandler} value={query}
                                                               size={"small"} onChange={onChangeQueryHandler}/></Flex>
                        </Flex>
                        <Table columns={columns} dataSource={items} loading={status === 'loading'} pagination={false} rowClassName={getRowClassName}/>
                        <Flex justify={"flex-end"} style={{marginBottom: '10px'}}>
                            <Pagination total={total} current={currentPage} pageSize={pageSize}
                                        onChange={(page) => setCurrentPage(page)}/>
                        </Flex>
                    </Flex>
                </Content>
            </Layout>
        </Space>
    );
};

export default SearchQuery;