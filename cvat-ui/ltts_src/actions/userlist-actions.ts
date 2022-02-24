// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { Dispatch, ActionCreator } from 'redux';
import { ActionUnion, createAction, ThunkAction } from '../../src/utils/redux';
import getCore from '../../src/cvat-core-wrapper';
const cvat = getCore();

export enum UserActionTypes {
    GET_UERS = 'GET_UERS',
    LIST_FETCH_SUCCESS = 'USER_LIST_SUCCESS',
    LIST_FETCH_FAILED = 'USER_LIST_FAILED',
}

export const userActions = {
    getUser: () => createAction(UserActionTypes.GET_UERS),
    userListSuccess: (users: any[], count: number) =>
        createAction(UserActionTypes.LIST_FETCH_SUCCESS, { users, count }),
    userListFailed: (error: any) => createAction(UserActionTypes.LIST_FETCH_FAILED, { error }),
};

export type UserActions = ActionUnion<typeof userActions>;
export function getUserList(): ThunkAction {
    return async (dispatch: ActionCreator<Dispatch>): Promise<void> => {
        dispatch(userActions.getUser());
        let result = null;
        try {
            result = await cvat.users.get();
            dispatch(userActions.userListSuccess(result, result.length));
        } catch (error) {
            dispatch(userActions.userListFailed(error));
        }
    };
}
