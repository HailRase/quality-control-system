import React from 'react';
import s from './OperatorsList.module.scss'
import {Button, ConfigProvider, Flex, Input, InputNumber, Layout, Pagination, Space, Spin, Table} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import Search from "antd/es/input/Search";
import {EditFilled, FileExcelFilled} from "@ant-design/icons";
import {ColumnsType} from "antd/es/table";
import {useNavigate} from "react-router-dom";

interface DataType {
    key: React.Key,
    id: string,
    name: string,
    all_records: number,
    good_bad_recs: string
    /*bad_recs: number,
    good_recs: number,*/
    estimate_records: number,
    count_marks: number
}

const OperatorsList = () => {
    const navigate = useNavigate()
    const data: DataType[] = [
        {
            key: '1',
            id: '101bfee4-f7ba-4674-8bd9-97694e8167ac',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: '33650b7c-ae59-431e-ac80-77f3af26ffa5',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: '3f07faed-d685-48f9-83ff-cc7ee908f5a9',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: 'e113e3ce-e55f-4a43-8da1-833528e6b997',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: 'a0a4e4cb-3b5b-4cef-8887-3b55d366f412',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: '3f9acecf-ac51-4a66-abc5-9f03f348b267',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        },
        {
            key: '1',
            id: '1ced3a1d2-59f1-42dc-aaf8-dc2782cf8c07',
            name: 'Баранчук Светлана Григорьевна',
            all_records: 11,
            good_bad_recs: '5/6',
            estimate_records: 2,
            count_marks: 1
        }
    ]
    const currentPage = 1
    const pageSize = 5
    const total = 43

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
                                                      type={"default"} icon={<EditFilled/>} onClick={() => navigate(`/operator/${value}`)}/>
        },
    ];
    return (
        <Space style={{width: '100%', padding: '15px 30px'}}>
            <Flex vertical style={{width: '90vw'}}>
                <Layout className={s.reportItemsWrapper}>
                    <Flex gap={20} align={'center'} className={s.reportItemsContainer}>
                        <div className={s.reportItem} style={{backgroundColor: '#395f74'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}}>
                                <span>Всего звонков за период:</span>
                                <div>0</div>
                            </Flex>
                        </div>
                        <div className={s.reportItem} style={{backgroundColor: '#7fc682'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}}>
                                <span>Хороших звонков за период:</span>
                                <div>0</div>
                            </Flex>
                        </div>
                        <div className={s.reportItem} style={{backgroundColor: '#e47373'}}>
                            <Flex vertical gap={15} style={{fontSize: '18px'}}>
                                <span>Плохих звонков за период:</span>
                                <div>0</div>
                            </Flex>
                        </div>
                    </Flex>
                </Layout>
                <Layout className={s.tableContainer} style={{width: '100%'}}>
                    <Header className={s.tableContainerHeader}>
                        <Flex justify={"space-between"}>
                            <span style={{fontSize: 16}}>Отчет по операторам</span>
                            <Flex justify={"space-between"} align={"center"} className={s.searchContainer}>
                                <Input.Search size={'small'} style={{width: 400, marginRight: '20px'}}
                                              placeholder={'Поиск'}/>
                                <Button type={"text"} ghost icon={<FileExcelFilled style={{color: '#1c64cb'}}/>}/>
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
                            <Table columns={columns} dataSource={data} style={{width: "100%"}} pagination={false}/>
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
                                <Input type={'number'} min={0} max={total} style={{width: '60px'}}/>
                                <span
                                    style={{marginLeft: '5px'}}> {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)} из {total}</span>
                            </Flex>
                            <div>
                                <Pagination
                                    showSizeChanger={false}
                                    current={1}
                                    total={1}
                                    pageSize={1}
                                    onChange={() => {
                                    }}
                                />
                            </div>
                        </Flex>
                    </Footer>
                </Layout></Flex>

        </Space>
    );
};

export default OperatorsList;