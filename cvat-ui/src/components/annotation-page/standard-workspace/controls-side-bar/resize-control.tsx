// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Icon from '@ant-design/icons';

import { ZoomIcon } from 'icons';
//import { ActiveControl } from 'reducers/interfaces';
import { Canvas } from 'cvat-canvas-wrapper';
import CVATTooltip from 'components/common/cvat-tooltip';
// #LTTS changes start
import { ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ActiveControl } from '../../../../../ltts_src/reducers/interfaces';
// #LTTS changes end

export interface Props {
    canvasInstance: Canvas;
    activeControl: ActiveControl;
}

function ResizeControl(props: Props): JSX.Element {
    const { activeControl, canvasInstance } = props;

    return (
        <>
        <CVATTooltip title='Select a region of interest' placement='right'>
            <Icon
                component={ZoomIcon}
                className={
                    activeControl === ActiveControl.ZOOM_CANVAS ?
                        'cvat-resize-control cvat-active-canvas-control' :
                        'cvat-resize-control'
                }
                onClick={(): void => {
                    if (activeControl === ActiveControl.ZOOM_CANVAS) {
                        canvasInstance.zoomCanvas(false);
                    } else {
                        canvasInstance.cancel();
                        canvasInstance.zoomCanvas(true);
                    }
                }}
            />
        </CVATTooltip>
         <CVATTooltip title='Zoom in' placement='right'>

         <Button

             type='link'

             className='cvat-annotation-header-button'

             onClick={(): void => {

                 if (activeControl === ActiveControl.ZOOM_IN_CANVAS) {

                     canvasInstance.zoomInCanvas(false);

                 } else {

                     canvasInstance.cancel();

                     canvasInstance.zoomInCanvas(true);

                 }

             }}

         >

             <ZoomInOutlined style={{ fontSize: '20px' }} />

         </Button>

     </CVATTooltip>
     <CVATTooltip title='Zoom out' placement='right'>

         <Button

             type='link'

             className='cvat-annotation-header-button'

             onClick={(): void => {

                 if (activeControl === ActiveControl.ZOOM_OUT_CANVAS) {

                     canvasInstance.zoomOutCanvas(false);

                 } else {

                     canvasInstance.cancel();

                     canvasInstance.zoomOutCanvas(true);

                 }

             }}

         >

             <ZoomOutOutlined style={{ fontSize: '20px' }} />

         </Button>

     </CVATTooltip>
     </>
    );
}

export default React.memo(ResizeControl);
