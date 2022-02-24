// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
export enum ReportSagaActionTypes {
    GET_PROJECTS_REPORTS = 'GET_PROJECTS_REPORTS',
    GET_PROJECTS_REPORTS_SUCCESS = ' GET_PROJECTS_REPORTS_SUCCESS',
    GET_PROJECTS_REPORTS_FAILED = 'GET_PROJECTS_REPORTS_FAILED',
    GENERATE_REPORTS = 'GENERATE_REPORTS',
    GENERATE_REPORTS_SUCCESS = 'GENERATE_REPORTS_SUCCESS',
    GENERATE_REPORTS_FAILED = 'GENERATE_REPORTS_FAILED',

}
export function getProjectReportList() {
    return {
        type: ReportSagaActionTypes.GET_PROJECTS_REPORTS,
    };
}
export function generateReport(projectId:any,projectType:any) {
    return {
        type: ReportSagaActionTypes.GENERATE_REPORTS,
        payload:projectId,projectType,
    };
}
