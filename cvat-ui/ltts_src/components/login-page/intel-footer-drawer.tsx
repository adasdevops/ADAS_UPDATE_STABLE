// Copyright (C) 2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import { Layout } from 'antd';

// import { isPublic } from 'utils/enviroment';
// import consts from 'consts';

function FooterDrawer(): JSX.Element | null {
    const { Footer } = Layout;
    // const { INTEL_TERMS_OF_USE_URL, INTEL_COOKIES_URL, INTEL_PRIVACY_URL } = consts;

    // return isPublic() ? (
    //     <Footer style={{ textAlign: 'center', borderTop: '1px solid #e8e8e8' }}>
    //         © LTTS|
    //         <a target='_blank' rel='noopener noreferrer' href={INTEL_TERMS_OF_USE_URL}> Terms of Use </a>
    //         |
    //         <a target='_blank' rel='noopener noreferrer'
    //          data-cookie-notice='true' href={INTEL_COOKIES_URL}> Cookies </a>
    //         |
    //         <a target='_blank' rel='noopener noreferrer' href={INTEL_PRIVACY_URL}> Privacy </a>
    //     </Footer>
    // ) : null;
    return (
        <Footer style={{ textAlign: 'center', borderTop: '1px solid #e8e8e8' }}>
            © LTTS|
            <a target='_blank' rel='noopener noreferrer' href='https://www.ltts.com/'>
                {' '}
                Terms of Use
                {' '}
            </a>
            |
            {/* <a target='_blank' rel='noopener noreferrer'
             data-cookie-notice='true' href="https://www.ltts.com/"> Cookies </a>
            | */}
            <a target='_blank' rel='noopener noreferrer' href='https://www.ltts.com/'>
                {' '}
                Privacy
                {' '}
            </a>
        </Footer>
    );
}

export default React.memo(FooterDrawer);
