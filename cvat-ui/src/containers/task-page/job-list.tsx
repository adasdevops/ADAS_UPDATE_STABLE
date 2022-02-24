// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT




import React from 'react';
import { connect } from 'react-redux';

//import JobListComponent from 'components/task-page/job-list';
// #LTTS changes start
import { updateJobAsync } from 'actions/tasks-actions';
import { Task } from 'reducers/interfaces';
import JobListComponent from '../../../ltts_src/components/task-page/job-list';

interface OwnProps {
    task: Task;
    // #LTTS changes start
    user: any;
}

interface DispatchToProps {
    onJobUpdate(jobInstance: any): void;
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onJobUpdate: (jobInstance: any): void => dispatch(updateJobAsync(jobInstance)),
    };
}

function TaskPageContainer(props: DispatchToProps & OwnProps): JSX.Element {
    // const { task, onJobUpdate } = props;
    const { task, onJobUpdate, user } = props;
    // return <JobListComponent taskInstance={task.instance} onJobUpdate={onJobUpdate} />;
    

    return <JobListComponent taskInstance={task.instance} onJobUpdate={onJobUpdate} user={user} />;
}

export default connect(null, mapDispatchToProps)(TaskPageContainer);
