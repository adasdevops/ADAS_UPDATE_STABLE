// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { connect } from 'react-redux';
import { CombinedState, UserAgreement } from '../../reducers/interfaces';
import { registerAsync } from '../../actions/auth-actions';
// import { UserConfirmation } from 'components/register-page/register-form';
import RegisterPageComponent from '../../components/register-page/register-page';

interface StateToProps {
    fetching: boolean;
    userAgreements: UserAgreement[];
}

interface DispatchToProps {
    onRegister: (
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password1: string,
        password2: string,
        userAgreement: UserConfirmation[],
    ) => void;
}

function mapStateToProps(state: CombinedState): StateToProps {
    return {
        fetching: state.auth.fetching || state.userAgreements.fetching,
        userAgreements: state.userAgreements.list,
    };
}

function mapDispatchToProps(dispatch: any): DispatchToProps {
    return {
        onRegister: (...args): void => dispatch(registerAsync(...args)),
    };
}

function RegisterPageContainer(props: StateToProps & DispatchToProps): JSX.Element {
    return <RegisterPageComponent {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPageContainer);
