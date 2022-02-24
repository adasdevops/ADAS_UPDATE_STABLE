// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { all, fork } from 'redux-saga/effects';
import { reportWatcher } from './reports-saga';

export default function* rootSaga() {
    yield all([
        fork(reportWatcher),
    ]);
}
