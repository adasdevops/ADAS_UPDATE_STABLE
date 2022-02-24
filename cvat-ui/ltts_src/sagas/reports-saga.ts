// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { all, put, takeLatest } from 'redux-saga/effects';
import { ReportSagaActionTypes } from '../actions/reports-saga-action';
import getCore from '../../src/cvat-core-wrapper';
import { ActionUnion, createAction } from '../../src/utils/redux';
const cvat = getCore();

export const reportsSagaActions = {
    getReports: () => createAction(ReportSagaActionTypes.GET_PROJECTS_REPORTS),
    reportListSuccess: ( Data_list: any[]) =>createAction(ReportSagaActionTypes.GET_PROJECTS_REPORTS_SUCCESS, { Data_list }),
    reportListFailed: (error: any) => createAction(ReportSagaActionTypes.GET_PROJECTS_REPORTS_FAILED, { error }),
    generateReports: () => createAction(ReportSagaActionTypes.GENERATE_REPORTS),
    generateReportsSuccess: (projectId: any[]) =>createAction(ReportSagaActionTypes.GENERATE_REPORTS_SUCCESS, { projectId }),
    generateReportsFailed: (error: any) => createAction(ReportSagaActionTypes.GENERATE_REPORTS_FAILED, { error }),
};

export type ReportsSagaActions = ActionUnion<typeof reportsSagaActions>;

function* getReportList(): any {
    console.log("report")
    let result = null;
    try {
        result = yield cvat.reports.get();
        yield put(reportsSagaActions.reportListSuccess(result));
    } catch (error) {
        yield put(reportsSagaActions.reportListFailed(error));
    }
}

function* generateReport(action: any): any {
    let result = null;
    try {
        result = yield cvat.reports.generate(action.payload, action.projectType);
        const downloadAnchor = window.document.getElementById('downloadAnchor') as HTMLAnchorElement;
        downloadAnchor.href = result;
        downloadAnchor.click();
        yield put(reportsSagaActions.generateReportsSuccess(result));
    } catch (error) {
        yield put(reportsSagaActions.generateReportsFailed(error));
    }
}

export function* reportWatcher() {
    yield all([
        takeLatest(ReportSagaActionTypes.GET_PROJECTS_REPORTS, getReportList),
        takeLatest(ReportSagaActionTypes.GENERATE_REPORTS, generateReport),
    ]);
}
