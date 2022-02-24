// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { connect } from 'react-redux';

import { TreeNodeNormal } from 'antd/lib/tree/Tree';

import { loadShareDataAsync } from 'actions/share-actions';
import { ShareItem, CombinedState } from 'reducers/interfaces';
import FileManagerComponent, { Files } from '../../../ltts_src/components/file-manager/file-manager';
// #LTTS added  readonly and projectType
interface OwnProps {
    ref: any;
    onChangeActiveKey(key: string): void;
    onFileSelect(value: Files): void;
    readonly: boolean;
    projectType: string;
}

interface StateToProps {
    treeData: TreeNodeNormal[];
}

interface DispatchToProps {
    getTreeData(key: string, success: () => void, failure: () => void): void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    function convert(items: ShareItem[], path?: string): TreeNodeNormal[] {
        return items.map((item): TreeNodeNormal => {
            const isLeaf = item.type !== 'DIR';
            const key = `${path}${item.name}${isLeaf ? '' : '/'}`;
            return {
                key,
                isLeaf,
                title: item.name || 'root',
                children: convert(item.children, key),
            };
        });
    }

    const { root } = state.share;
    return {
        treeData: convert([root], ''),
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        getTreeData: (key: string, success: () => void, failure: () => void): void => {
            dispatch(loadShareDataAsync(key, success, failure));
        },
    };
}

type Props = StateToProps & DispatchToProps & OwnProps;

export class FileManagerContainer extends React.PureComponent<Props> {
    private managerComponentRef: any;

    public constructor(props: Props) {
        super(props);

        this.managerComponentRef = React.createRef();
    }

    public getFiles(): Files {
        return this.managerComponentRef.getFiles();
    }

    public getCloudStorageId(): number | null {
        return this.managerComponentRef.getCloudStorageId();
    }

    public reset(): Files {
        return this.managerComponentRef.reset();
    }

    public render(): JSX.Element {
        const { treeData, getTreeData, onChangeActiveKey, readonly, projectType, onFileSelect } = this.props;
        // #LTTS added readonly and projectType
        return (
            <FileManagerComponent
                treeData={treeData}
                projectType={projectType}
                readonly={readonly}
                onLoadData={getTreeData}
                onFileSelect={onFileSelect}
                onChangeActiveKey={onChangeActiveKey}
                ref={(component): void => {
                    this.managerComponentRef = component;
                }}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(FileManagerContainer);
