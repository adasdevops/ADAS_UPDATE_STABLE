// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Select, Button, Table, Row, Col } from 'antd';
import { getProjectReportList, generateReport } from '../../actions/reports-saga-action';
import { CombinedState } from '../../reducers/interfaces';
const { Option } = Select;

export default function ReportsPage(): JSX.Element {
    const dispatch = useDispatch();
    let projectAll: any = [];
    useEffect(() => {
        dispatch(getProjectReportList());
    }, [dispatch]);
    projectAll = useSelector((state: CombinedState) => state.reports?.Data_list?.results);
    console.log(projectAll);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [selectedType, setSelectedType] = React.useState(null);
    const [filterdValue, setFilteredValue] = React.useState([]);
    const handleChange = (value: any) => {
        setSelectedValue(value);
    };
    const submitHandler = (event: any) => {
        event.preventDefault();
        dispatch(generateReport(selectedValue, selectedType));
    };

    const handleType = (type: any) => {
        setSelectedType(type);
    };
    useEffect(() => {
        setFilteredValue(projectAll);
    }, [projectAll]);

    const columns = [
        {
            title: 'SL NO',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // defaultSortOrder: 'ascend',
            // sorter: (a:any, b:any) => a.name - b.name,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'annotation', value: 'annotation' },
                { text: 'validation', value: 'validation' },
                { text: 'completed', value: 'completed' },
            ],
            onFilter: (value: any, record: any) => {
                return record.status.includes(value);
            },
        },
    ];

    // const PAGE_SIZE = 5;
    // if (userFetching) {
    //     return <Spin size='large' className='cvat-spinner' tip='Loading...' />;
    // }

    return (
        <>
            <Row justify='center' align='middle'>
                <Col className='Report-title'>
                    <h2>Reports</h2>
                </Col>
            </Row>
            <Row justify='center' align='middle'>
                <Col className='Report-page'>
                    <Form className='cvat-reset-password-form'>
                        <label>Project Report : </label>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='Search to Select'
                            optionFilterProp='children'
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={handleChange}
                        >
                            <Option id='all' value='all'>
                                All
                            </Option>
                            {projectAll?.map((val: any) => {
                                return (
                                    <Option key={val.id} value={val.id}>
                                        {val.name}
                                    </Option>
                                );
                            })}
                        </Select>{' '}
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='Search to Select'
                            optionFilterProp='children'
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                            onChange={handleType}
                        >
                            <Option value='excel'>Excel</Option>
                            <Option value='csv'>CSV</Option>
                            <Option value='pdf'>Pdf</Option>
                        </Select>{' '}
                        <Button
                            type='primary'
                            htmlType='submit'
                            disabled={selectedType === null || selectedValue === null ? true : false}
                            onClick={submitHandler}
                        >
                            Generate
                        </Button>
                        <Table
                            rowKey='id'
                            dataSource={filterdValue}
                            columns={columns}
                            size='middle'
                            // onChange={handleTableChange}
                            // pagination={{ pageSize: PAGE_SIZE }}
                        />
                    </Form>
                </Col>
            </Row>
        </>
    );
}
