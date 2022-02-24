// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT
import { BoundariesActions, BoundariesActionTypes } from '../../src/actions/boundaries-actions';
import { GoogleAction, GoogleActionTypes } from '../actions/google-actions';
// import { BoundariesSagaActions } from 'sagas/boundaries-saga';
// import { BoundariesSagaActionTypes } from 'actions/boundaries-saga-actions';
// import { GoogleSagaAction } from 'sagas/google-saga';
// import { GoogleSagaActionTypes } from 'actions/google-saga-actions';
import { GoogleAuth } from './interfaces';

const defaultState: GoogleAuth = {
    initialized: false,
    fetching: false,
    user: null,
    Data_list:null

};

export default function (state = defaultState, action: GoogleAction | BoundariesActions): GoogleAuth {
    switch (action.type) {

        case GoogleActionTypes.GOOGLE_OAUTH2:
            return {
                ...state,
                fetching: true,
            };
            case BoundariesActionTypes.RESET_AFTER_ERROR: {
                return { ...defaultState };
            }
        default:
            return state;
    }
}
