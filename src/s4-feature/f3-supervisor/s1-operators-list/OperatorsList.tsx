import React, {ChangeEvent, useEffect, useState} from 'react';
import {saveAs} from 'file-saver';
import s from './OperatorsList.module.scss'
import {Button, ConfigProvider, Flex, Input, Layout, Pagination, Space, Spin, Table} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {EditFilled, FileExcelFilled, LoadingOutlined} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    fetchOperatorsListStatisticsData
} from "../../../s2-bll/b2-supervisor/s1-operators-list-statistics-reducer/operatorsLlistStatistics-reducer";
import {useAppSelector} from "../../../s2-bll/store";
import {fetchOperatorsListData} from "../../../s2-bll/b2-supervisor/s2-operators-list-reducer/operatorsList-reducer";
import {loadExcelFile} from "../../../s2-bll/b2-supervisor/s2-operators-list-reducer/statistic-reducer";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";
import {instance} from "../../../s3-dal/instance";
import axios from "axios";

interface DataType {
    key: React.Key,
    id: string,
    name: string,
    all_records: number | null,
    good_bad_recs: string
    estimate_records: number | null,
    count_marks: number | null
}


const downloadFile = (data: string, filename: string) => {
    const blob = new Blob([data], {type: 'application/octet-stream'});

    saveAs(blob, filename);
};

const OperatorsList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()

    const statisticsStatus = useAppSelector(state => state.supervisorOperatorsListStatisticsData.status)
    const {
        bad_records,
        good_records,
        all_records
    } = useAppSelector(state => state.supervisorOperatorsListStatisticsData.data)
    const statisticsError = useAppSelector(state => state.supervisorOperatorsListStatisticsData.errorMessage)
    const {startPeriod, endPeriod} = useAppSelector(state => state.supervisorOperatorsListDateData.data)

    const {items, size, pages, page, total} = useAppSelector(state => state.supervisorOperatorsListData.data)
    const dataStatus = useAppSelector(state => state.supervisorOperatorsListData.status)

    const {statistic, contentType} = useAppSelector(state => state.supervisorStatisticData.data)
    const statusStatistics = useAppSelector(state => state.supervisorStatisticData.status)

    const [pageSize, setPageSize] = useState<number>(size)
    const [currentPage, setCurrentPage] = useState<number>(page)
    const [query, setQuery] = useState<string>('')

    useEffect(() => {
        dispatch(fetchOperatorsListStatisticsData(startPeriod, endPeriod))
    }, [startPeriod, endPeriod])
    useEffect(() => {
        dispatch(fetchOperatorsListData(startPeriod, endPeriod, currentPage, pageSize, query))
    }, [startPeriod, endPeriod, currentPage, pageSize])

    const onChangeQueryHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const onLoadOperatorsListData = () => {
        dispatch(fetchOperatorsListData(startPeriod, endPeriod, currentPage, pageSize, query))
    }

    const data: DataType[] = items?.map((item, index) => {
        return {
            key: index,
            id: item.id,
            name: item.name,
            all_records: item.all_records ? item.all_records : 0,
            good_bad_recs: `${item.good_records ? item.good_records : 0}/${item.bad_records ? item.bad_records : 0}`,
            estimate_records: item.estimate_records ? item.estimate_records : 0,
            count_marks: item.count_marks ? item.count_marks : 0
        }
    })
    const columns: ColumnsType<DataType> = [
        {
            title: 'Оператор',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            /*sorter: (a: any, b: any) => a.login.length - b.login.length,*/
        },
        {
            title: 'Всех звонков',
            dataIndex: 'all_records',
            key: 'all_records',
            align: 'center',
        },
        {
            title: 'Хороших/Плохих',
            dataIndex: 'good_bad_recs',
            key: 'good_bad_recs',
            align: 'center',
        },
        {
            title: 'Оценено звонков',
            dataIndex: 'estimate_records',
            key: 'estimate_records',
            align: 'center',
        },
        {
            title: 'Оценок заполнено',
            dataIndex: 'count_marks',
            key: 'count_marks',
            align: 'center',
            /*sorter: (a: any, b: any) => a.fio.length - b.fio.length,*/
        },
        {
            title: 'Изменить',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            /*sorter: (a: any, b: any) => a.email.length - b.email.length,*/
            render: (value, record, index) => <Button style={{borderColor: '#757575', color: '#757575'}}
                                                      type={"default"} icon={<EditFilled/>}
                                                      onClick={() => navigate(`/operator/${value}`)}/>
        },
    ];

    const onLoadExcelFileHandler = async () => {
        const response = await supervisorOperatorsListAPI.loadExcelStatistic(startPeriod, endPeriod, {
            good_records,
            bad_records,
            all_records
        })
        const url = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = url
        link.download = 'ОтчётПоОпертаорам.xlsx'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Space style={{width: '100%', padding: '15px 30px'}}>
            <Flex vertical style={{width: '90vw'}}>
                <Layout className={s.reportItemsWrapper}>
                    <Flex gap={20} align={'center'} className={s.reportItemsContainer}>
                        <div className={s.reportItem} style={{backgroundColor: '#395f74'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}} align={"flex-start"}>
                                <span>Всего звонков за период:</span>
                                {statisticsStatus === "loading"
                                    ?
                                    <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                    : <div>{all_records}</div>}
                            </Flex>
                        </div>
                        <div className={s.reportItem} style={{backgroundColor: '#7fc682'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}} align={"flex-start"}>
                                <span>Хороших звонков за период:</span>
                                {statisticsStatus === "loading"
                                    ?
                                    <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                    : <div>{good_records}</div>}
                            </Flex>
                        </div>
                        <div className={s.reportItem} style={{backgroundColor: '#e47373'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}} align={"flex-start"}>
                                <span>Плохих звонков за период:</span>
                                {statisticsStatus === "loading"
                                    ?
                                    <Spin indicator={<LoadingOutlined style={{fontSize: 24, color: '#757575'}} spin/>}/>
                                    : <div>{bad_records}</div>}
                            </Flex>
                        </div>
                    </Flex>
                </Layout>
                <Layout className={s.tableContainer} style={{width: '100%'}}>
                    <Header className={s.tableContainerHeader}>
                        <Flex justify={"space-between"}>
                            <span style={{fontSize: 16}}>Отчет по операторам</span>
                            <Flex justify={"space-between"} align={"center"} className={s.searchContainer}>
                                <Input.Search value={query} size={'small'} style={{width: 400, marginRight: '20px'}}
                                              placeholder={'Поиск'} onChange={onChangeQueryHandler}
                                              onSearch={onLoadOperatorsListData}/>
                                <Button
                                    type={"text"} ghost
                                    icon={<FileExcelFilled style={{color: '#1c64cb'}}
                                                           onClick={onLoadExcelFileHandler}/>}/>
                            </Flex>
                        </Flex>
                    </Header>
                    <Content className={s.tableContainerContent}
                             style={{height: '100%', width: "100%", maxWidth: "100%", backgroundColor: 'white',}}>
                        <ConfigProvider theme={{
                            components: {
                                Table: {
                                    headerBg: 'white',
                                    cellPaddingBlock: 8
                                }
                            }
                        }}>
                            <Table columns={columns} dataSource={data} style={{width: "100%"}} pagination={false}
                                   loading={dataStatus === 'loading'}/>
                        </ConfigProvider>

                    </Content>
                    <Footer className={s.tableContainerFooter} style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "100%",
                        backgroundColor: 'white',
                        marginBottom: '40px'
                    }}>
                        <Flex style={{width: '100%'}} justify={"flex-end"} align={"center"}>
                            <Flex align={'center'}>
                                <span style={{marginRight: '5px'}}>Записей на странице </span>
                                <Input type={'number'} value={pageSize} min={0} max={total} style={{width: '60px'}}
                                       onChange={(e) => setPageSize(+e.currentTarget.value)}/>
                                <span
                                    style={{marginLeft: '5px'}}> {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)} из {total}</span>
                            </Flex>
                            <div>
                                <Pagination
                                    showSizeChanger={false}
                                    current={currentPage}
                                    total={total}
                                    pageSize={pageSize}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </Flex>
                    </Footer>
                </Layout>
            </Flex>

        </Space>
    );
};

export default OperatorsList;