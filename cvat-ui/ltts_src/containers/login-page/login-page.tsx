/* eslint-disable header/header */
// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

import { connect } from 'react-redux';
import { CombinedState } from '../../reducers/interfaces';
import LoginPageComponent from '../../components/login-page/login-page';
import { loginAsync } from '../../actions/auth-actions';
import { googleOAuth2 } from '../../actions/google-actions';
interface StateToProps {
    fetching: boolean;
    renderResetPassword: boolean;
    access_token: string | null;
}

interface DispatchToProps {
    onLogin: typeof loginAsync;
    onGooglelogin: typeof googleOAuth2
}

function mapStateToProps(state: CombinedState): StateToProps {
    return {
        fetching: state.auth.fetching,
        renderResetPassword: state.auth.allowResetPassword,
        access_token: state.googleAuth.Data_list,
    };
}

const mapDispatchToProps: DispatchToProps = {
    onLogin: loginAsync,
    onGooglelogin: googleOAuth2,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);
