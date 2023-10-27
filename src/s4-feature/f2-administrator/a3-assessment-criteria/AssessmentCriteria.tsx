import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './AssessmentCriteria.module.scss'
import {Button, Flex, Input, InputNumber, Layout, Space} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {DeleteTwoTone, EditTwoTone, SaveTwoTone} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {
    addNewAdministratorAssessmentCriteriaData,
    deleteNewAdministratorAssessmentCriteriaData,
    editNewAdministratorAssessmentCriteriaData,
    fetchAdministratorAssessmentCriteriaData
} from "../../../s2-bll/b1-administrator/a2-administrator-assessment-criteria-reducer/administratorAssessmentCriteria-reducer";
import {useAppSelector} from "../../../s2-bll/store";

interface ParametersType {
    name: string,
    minValue: number,
    maxValue: number
}

const parameters: ParametersType[] = [
    {name: 'Отсутсвие ошибок дежурного при разговоре', minValue: 0, maxValue: 1},
    {name: 'Логически правильно выстроен ответ', minValue: 0, maxValue: 1},
    {name: 'Достоверно предоставленная информация', minValue: 0, maxValue: 5},
    {name: 'Умение слушать', maxValue: 0, minValue: 1},
]
const AssessmentCriteria = () => {
    const [statusEditing, setStatusEditing] = useState<null | number>(null)
    const [newParamName, setNewParamName] = useState<string>()
    const [newMinValue, setNewMinValue] = useState<number>()
    const [newMaxValue, setNewMaxValue] = useState<number>()

    const [editingParamName, setEditingParamName] = useState<string>()
    const [editingMinValue, setEditingMinValue] = useState<number>()
    const [editingMaxValue, setEditingMaxValue] = useState<number>()

    const {items, page, pages, total, size} = useAppSelector(state => state.administratorAssessmentCriteria.data)

    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(fetchAdministratorAssessmentCriteriaData(1, 10))
    }, [])

    const addNewParam = () => {
        if (newParamName && newMinValue !== undefined && newMaxValue !== undefined)
            dispatch(addNewAdministratorAssessmentCriteriaData(newParamName, newMaxValue, newMinValue))
        setNewParamName('')
        setNewMinValue(0)
        setNewMaxValue(0)
    }
    const onDeleteDataHandler = (id: number) => {
        dispatch(deleteNewAdministratorAssessmentCriteriaData(id))
    }
    const onChangeNewParamName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewParamName(event.target.value)
    }
    const onChangeNewMinValue = (value: number | null) => {
        if (value !== null)
            setNewMinValue(value)
    }
    const onChangeNewMaxValue = (value: number | null) => {
        if (value !== null)
            setNewMaxValue(value)
    }
    const onClearInputsDataHandler = () => {
        setNewParamName('')
        setNewMinValue(0)
        setNewMaxValue(0)
    }

    const onChangeStatusEditingInputTrue = (id: number | null) => {
        setStatusEditing(null)
        if (id&&editingParamName&&editingMaxValue&&editingMinValue) dispatch(editNewAdministratorAssessmentCriteriaData(id, editingParamName, editingMaxValue, editingMinValue))

    }
    const onChangeStatusEditingInputFalse = (id: number | null, editingParamName: string, editingMinValue: number, editingMaxValue: number) => {
        setStatusEditing(id)
        setEditingParamName(editingParamName)
        setEditingMinValue(editingMinValue)
        setEditingMaxValue(editingMaxValue)
    }
    return (
        <Space style={{width: '100%'}}>
            <Flex vertical justify={"flex-start"} style={{width: '100%'}}>
                <Layout style={{width: '93vw'}}>
                    <Header style={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: '50px',
                        backgroundColor: '#6a757b',
                        color: "white",
                        fontSize: "16px",
                        padding: '20px 30px 0px 10px'
                    }}>
                        Параметры оценки оператора
                    </Header>
                    <Content style={{padding: '30px 30px 40px 20px', backgroundColor: 'white'}}>
                        <Flex justify={"flex-start"} align={"center"}>
                            <Flex justify={"center"} align={"center"} style={{width: "55vw"}}>Название параметра</Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>Минимальное
                                значение</Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>Максимальное
                                значение</Flex>
                        </Flex>
                        {items.map(item => <Flex justify={"flex-start"} align={"center"} style={{marginTop: '30px'}}>
                            <Flex align={"center"} style={{width: "55vw"}}>
                                <Input
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditingParamName(e.target.value)}
                                    key={item.id}
                                    value={statusEditing === item.id ? editingParamName : item.title}
                                    style={{width: '100%'}}
                                    disabled={!statusEditing || statusEditing !== item.id}
                                />
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <InputNumber
                                    min={0}
                                    onChange={(value) => value && setEditingMinValue(value)}
                                    key={item.id}
                                    value={statusEditing === item.id ? editingMinValue : item.min_value}
                                    disabled={!statusEditing || statusEditing !== item.id}
                                    style={{width: '70%', textAlign: 'center'}}
                                />
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <InputNumber
                                    min={0}
                                    onChange={(value) => value && setEditingMaxValue(value)}
                                    key={item.id}
                                    value={statusEditing === item.id ? editingMaxValue : item.max_value}
                                    disabled={!statusEditing || statusEditing !== item.id}
                                    style={{width: '70%', textAlign: 'center'}}
                                />
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                {statusEditing && statusEditing === item.id
                                    ? <Button
                                        type={"primary"}
                                        ghost
                                        icon={<SaveTwoTone twoToneColor={'#2c6fb1'}/>}
                                        onClick={() => onChangeStatusEditingInputTrue(item.id)}
                                    />
                                    : <Button
                                        type={"primary"}
                                        ghost
                                        icon={<EditTwoTone twoToneColor={'#2c6fb1'}/>}
                                        onClick={() => onChangeStatusEditingInputFalse(item.id, item.title, item.min_value, item.max_value)}
                                    />}
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button onClick={() => onDeleteDataHandler(item.id)} danger
                                        icon={<DeleteTwoTone twoToneColor={'red'}/>}/>
                            </Flex>
                        </Flex>)}
                    </Content>
                </Layout>
                <Layout>
                    <Header style={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: '50px',
                        backgroundColor: '#6a757b',
                        color: "white",
                        fontSize: "16px",
                        marginTop: '20px',
                        padding: '20px 30px 0px 10px'
                    }}>
                        Добавить параметр оценки
                    </Header>
                    <Content style={{padding: '0px 30px 40px 20px', backgroundColor: 'white'}}>
                        <Flex justify={"flex-start"} align={"center"} style={{marginTop: '30px'}}>
                            <Flex align={"center"} style={{width: "55vw"}}>
                                <Input
                                    placeholder={'Введите название параметра'}
                                    style={{width: '100%'}}
                                    onChange={onChangeNewParamName}
                                    value={newParamName}
                                />
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <InputNumber
                                    min={0}
                                    value={newMinValue}
                                    placeholder={'0'}
                                    style={{width: '70%'}}
                                    onChange={onChangeNewMinValue}
                                />
                            </Flex>
                            <Flex justify={"center"} align={"center"} style={{width: "10vw", textAlign: 'center'}}>
                                <InputNumber
                                    min={0}
                                    value={newMaxValue}
                                    placeholder={'0'}
                                    style={{width: '70%'}}
                                    onChange={onChangeNewMaxValue}
                                />
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button style={{borderRadius: '3px'}} type={"default"}
                                        onClick={onClearInputsDataHandler}>Отменить</Button>
                            </Flex>
                            <Flex justify={"flex-end"} align={"center"} style={{width: "15vh"}}>
                                <Button style={{borderRadius: '3px'}} type={"primary"}
                                        onClick={addNewParam}>Добавить</Button>
                            </Flex>
                        </Flex>
                    </Content>
                </Layout>
            </Flex>
        </Space>
    );
};

export default AssessmentCriteria;