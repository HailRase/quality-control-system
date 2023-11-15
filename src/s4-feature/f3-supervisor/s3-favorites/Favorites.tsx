import React, {useEffect} from 'react';
import {Button, Flex, Layout, Space, Table} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {ColumnsType} from "antd/es/table";
import {InfoCircleFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    fetchFavoritesData,
    ManualEvaluationsType
} from "../../../s2-bll/b2-supervisor/s7-favorites-reducer/favorites-reducer";
import {useAppSelector} from "../../../s2-bll/store";

interface DataType {
    key: React.Key
    manual_evaluations: ManualEvaluationsType[],
    id: number,
    user_name: string,
    url_rec: string
}

const Favorites = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const data = useAppSelector(state => state.supervisorFavoritesData.data)
    const status = useAppSelector(state => state.supervisorFavoritesData.status)
    const errorMessage = useAppSelector(state => state.supervisorFavoritesData.errorMessage)

    useEffect(() => {
        dispatch(fetchFavoritesData())
    }, [])

    const tableData: DataType[] = data.map( (item, index) =>  {
        return {
            key: index+1,
            ...item
        }
    })
    const columns: ColumnsType<DataType> =  [
        {
            title: 'Номер',
            dataIndex: 'key',
            key: 'key',
            align: 'center'
        },
        {
            title: 'Оператор',
            dataIndex: 'user_name',
            key: 'user_name',
            align: 'center',
        },
        {
            title: 'Аудио запись',
            dataIndex: 'url_rec',
            key: 'url_rec',
            align: 'center',
            render: (value) => <audio controls src={value}/>
        },
        ...tableData.reduce((acc: any, item) => {
            item.manual_evaluations.forEach(evaluation => {
                const columnIndex = acc.findIndex((column: any) => column.title === evaluation.title);
                if (columnIndex === -1) {
                    acc.push({
                        title: evaluation.title,
                        align: 'center',
                        dataIndex: `manual_evaluation_${evaluation.title}`,
                        key: `manual_evaluation_${evaluation.title}`,
                        render: (_: any, record: any) => {
                            const matchingEvaluation = record.manual_evaluations.find((e: any) => e.title === evaluation.title);
                            return matchingEvaluation ? matchingEvaluation.mark : null;
                        },
                    });
                }
            });
            return acc;
        }, []),
        {
            title: 'Детали',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (value) => <Button type={"primary"} ghost icon={<InfoCircleFilled/>} onClick={() => navigate(`/evaluate/${value}`)}/>
        }
    ];


    const newData = tableData.map(item => {
        const evaluations = item.manual_evaluations.reduce((acc: any, evaluation) => {
            acc[`manual_evaluation_${evaluation.title}`] = null;
            return acc;
        }, {});

        return {
            key: item.key,
            id: item.id,
            user_name: item.user_name,
            url_rec: item.url_rec,
            manual_evaluations: item.manual_evaluations,
            ...evaluations,
        };
    });


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
                    <Table columns={columns} dataSource={newData} pagination={{
                        pageSize: 10,
                        defaultCurrent: 1
                    }} loading={status === "loading"}/>
                </Content>
            </Layout>
        </Space>
    );
};

export default Favorites;