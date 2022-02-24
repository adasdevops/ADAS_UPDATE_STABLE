// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { ReportSagaActionTypes } from '../actions/reports-saga-action';
import { BoundariesActionTypes } from '../../src/actions/boundaries-actions';
import { Reports } from './interfaces';

const defaultState: Reports = {
    Data_list: [],
    initialized: false,
    fetching: false,
    project: [],

};

export default function (state = defaultState, action: any): Reports {
    switch (action.type) {
        case ReportSagaActionTypes.GET_PROJECTS_REPORTS:
            return {
                ...state,
                fetching: true,

            };
        case ReportSagaActionTypes.GET_PROJECTS_REPORTS_SUCCESS:
            console.log(action.payload.Data_list);
            return {
                ...state,
                Data_list: action.payload.Data_list,
                fetching: false,
            };
        case ReportSagaActionTypes.GET_PROJECTS_REPORTS_FAILED: {
            return {
            ...state,
            fetching: true,
                };
            }
            case ReportSagaActionTypes.GENERATE_REPORTS:
            return {
                ...state,
                fetching: true,

            };
        case ReportSagaActionTypes.GENERATE_REPORTS_SUCCESS:
            // const projectReport  = action.payload;
            return {
                ...state,
                project: action.payload,
                fetching: false,
            };
        case ReportSagaActionTypes.GENERATE_REPORTS_FAILED: {
            return {
                ...state,
                fetching: true,
            };
        }

        case BoundariesActionTypes.RESET_AFTER_ERROR: {
            return { ...defaultState };
        }
        default:
            return state;
    }
}