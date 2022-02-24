// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { RefObject } from 'react';
import Input from 'antd/lib/input';
import Form, { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';

export interface BaseConfiguration {
    name: string;
}
// #LTTS added readonly props
interface Props {
    onSubmit(values: BaseConfiguration): void;
    readonly: boolean;
}

export default class BasicConfigurationForm extends React.PureComponent<Props> {
    private formRef: RefObject<FormInstance>;

    public constructor(props: Props) {
        super(props);
        this.formRef = React.createRef<FormInstance>();
    }

    public submit(): Promise<void> {
        const { onSubmit } = this.props;
        if (this.formRef.current) {
            return this.formRef.current.validateFields().then((values: Store): Promise<void> => {
                onSubmit({ name: values.name });
                return Promise.resolve();
            });
        }

        return Promise.reject(new Error('Form ref is empty'));
    }

    public resetFields(): void {
        if (this.formRef.current) {
            this.formRef.current.resetFields();
        }
    }

    public render(): JSX.Element {
        const { readonly } = this.props;
        return (
            <Form ref={this.formRef} layout='vertical'>
                <Form.Item
                    hasFeedback
                    name='name'
                    label={<span>Task Name</span>}
                    rules={[
                        {
                            required: true,
                            message: 'Task name cannot be empty',
                        },
                    ]}
                >
                    {/* #LTTS changes */}
                    <Input placeholder='Enter task name' disabled={readonly} />
                </Form.Item>
            </Form>
        );
    }
}
