// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, {
    RefObject, useContext, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Switch, Select, DatePicker } from 'antd';
import { Col, Row } from 'antd/lib/grid';
import Form, { FormInstance } from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import notification from 'antd/lib/notification';
import patterns from 'utils/validation-patterns';
import { CombinedState } from '../../reducers/interfaces';
// import LabelsEditor from 'components/labels-editor/labels-editor';
import { createProjectAsync } from '../../actions/projects-actions';
import CreateProjectContext from './create-project.context';
// new code added

const { TextArea } = Input;

const { Option } = Select;

function NameConfigurationForm({ formRef }: { formRef: RefObject<FormInstance> }): JSX.Element {
    const dateFormat = 'YYYY/MM/DD';
    // new code added by raju
    return (
        <Form layout='vertical' ref={formRef}>
            <Form.Item
                name='name'
                hasFeedback
                label='Project Name'
                rules={[
                    {
                        required: true,
                        message: 'Please, specify a Project Name',
                    },
                ]}
            >
                <Input placeholder='Project Name' />
            </Form.Item>

            <Form.Item
                name='Description'
                hasFeedback
                label='Description'
                rules={[
                    {
                        required: true,
                        message: 'Please, specify a Description',
                    },
                ]}
            >
                <TextArea placeholder='Project Description' allowClear />
            </Form.Item>

            <Form.Item
                name='StartDate'
                hasFeedback
                label='Start Date'
                rules={[
                    {
                        required: true,
                        message: 'Please, specify a Start Date',
                    },
                ]}
            >
                <DatePicker size='large' placeholder='Start Date' format={dateFormat} />
                {/* <Input placeholder="Start Date" /> */}
            </Form.Item>
            <Form.Item
                name='Project_type'
                label='Project Type'
                rules={[{ required: true, message: 'Please select Project type!' }]}
            >
                <Select placeholder='select your Project Type'>
                    <Option value='Image'>Image</Option>
                    <Option value='Video'>Video</Option>
                    <Option value='Lidar'>LIDAR</Option>
                </Select>
            </Form.Item>
        </Form>
    );
}
function AdaptiveAutoAnnotationForm({ formRef }: { formRef: RefObject<FormInstance> }): JSX.Element {
    const { projectClass, trainingEnabled } = useContext(CreateProjectContext);
    const projectClassesForTraining = ['OD'];
    return (
        <Form layout='vertical' ref={formRef}>
            <Form.Item name='project_class' hasFeedback label='Class'>
                <Select value={projectClass.value} onChange={(v) => projectClass.set(v)}>
                    <Option value=''>--Not Selected--</Option>
                    <Option value='OD'>Detection</Option>
                </Select>
            </Form.Item>

            <Form.Item name='enabled' label='Adaptive auto annotation' initialValue={false}>
                <Switch
                    disabled={!projectClassesForTraining.includes(projectClass.value)}
                    checked={trainingEnabled.value}
                    onClick={() => trainingEnabled.set(!trainingEnabled.value)}
                />
            </Form.Item>

            <Form.Item
                name='host'
                label='Host'
                rules={[
                    {
                        validator: (_, value, callback): void => {
                            if (value && !patterns.validateURL.pattern.test(value)) {
                                callback('Training server host must be url.');
                            } else {
                                callback();
                            }
                        },
                    },
                ]}
            >
                <Input placeholder='https://example.host' disabled={!trainingEnabled.value} />
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name='username' label='Username'>
                        <Input placeholder='UserName' disabled={!trainingEnabled.value} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name='password' label='Password'>
                        <Input.Password placeholder='Pa$$w0rd' disabled={!trainingEnabled.value} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

function AdvancedConfigurationForm({ formRef }: { formRef: RefObject<FormInstance> }): JSX.Element {
    return (
        <Form layout='vertical' ref={formRef}>
            <Form.Item
                name='bug_tracker'
                label='Issue tracker'
                extra='Attach issue tracker where the project is described'
                hasFeedback
                rules={[
                    {
                        validator: (_, value, callback): void => {
                            if (value && !patterns.validateURL.pattern.test(value)) {
                                callback('Issue tracker must be URL');
                            } else {
                                callback();
                            }
                        },
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
}

export default function CreateProjectContent(): JSX.Element {
    const [projectLabels, setProjectLabels] = useState<any[]>([]);
    const shouldShowNotification = useRef(false);
    const nameFormRef = useRef<FormInstance>(null);
    const adaptiveAutoAnnotationFormRef = useRef<FormInstance>(null);
    const advancedFormRef = useRef<FormInstance>(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const newProjectId = useSelector((state: CombinedState) => state.projects.activities.creates.id);

    const { isTrainingActive } = useContext(CreateProjectContext);

    useEffect(() => {
        if (Number.isInteger(newProjectId) && shouldShowNotification.current) {
            const btn = <Button onClick={() => history.push(`/projects/${newProjectId}`)}>Open project</Button>;
            // Clear new project forms
            if (nameFormRef.current) nameFormRef.current.resetFields();
            if (advancedFormRef.current) advancedFormRef.current.resetFields();
            setProjectLabels([]);

            notification.info({
                message: 'The project has been created',
                btn,
                className: 'cvat-notification-create-project-success',
                duration: 5,
            });
        }

        shouldShowNotification.current = true;
    }, [newProjectId]);

    const onSumbit = async (): Promise<void> => {
        let projectData: Record<string, any> = {};
        // if (nameFormRef.current && advancedFormRef.current && descriptionFormRef.current)
        if (nameFormRef.current) {
            const basicValues = await nameFormRef.current.validateFields();
            // const advancedValues = await advancedFormRef.current.validateFields();
            // const adaptiveAutoAnnotationValues = await adaptiveAutoAnnotationFormRef.current?.validateFields();
            projectData = {
                ...projectData,
                // ...advancedValues,
                name: basicValues.name,
                project_description: basicValues.Description,
                project_type: basicValues.Project_type,
                start_date: basicValues.StartDate,
            };
            // if (adaptiveAutoAnnotationValues) {
            //     projectData.training_project = { ...adaptiveAutoAnnotationValues };
            // }
        }

        // projectData.labels = projectLabels;

        if (!projectData.name && !projectData.description) return;

        dispatch(createProjectAsync(projectData));
    };

    return (
        <Row justify='start' align='middle' className='cvat-create-project-content'>
            <Col span={24}>
                <NameConfigurationForm formRef={nameFormRef} />
            </Col>
            {/* {isTrainingActive.value && (
                <Col span={24}>
                    <AdaptiveAutoAnnotationForm formRef={adaptiveAutoAnnotationFormRef} />
                </Col>
            )} */}
            {/* <Col span={24}>
                <Text className='cvat-text-color'>Labels:</Text>
                <LabelsEditor
                    labels={projectLabels}
                    onSubmit={(newLabels): void => {
                        setProjectLabels(newLabels);
                    }}
                />
            </Col> */}
            {/* <Col span={24}>
                <AdvancedConfigurationForm formRef={advancedFormRef} />
            </Col> */}
            <Col span={24}>
                <Button type='primary' onClick={onSumbit}>
                    Submit
                </Button>
            </Col>
        </Row>
    );
}
