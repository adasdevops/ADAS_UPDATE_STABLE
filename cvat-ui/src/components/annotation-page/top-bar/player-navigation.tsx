// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

import React, { useState, useEffect } from 'react';

import { Row, Col } from 'antd/lib/grid';
import { LinkOutlined } from '@ant-design/icons';
import Slider from 'antd/lib/slider';
import InputNumber from 'antd/lib/input-number';
import Input from 'antd/lib/input';
import Text from 'antd/lib/typography/Text';

import CVATTooltip from 'components/common/cvat-tooltip';
import { clamp } from 'utils/math';

interface Props {
    startFrame: number;
    stopFrame: number;
    frameNumber: number;
    frameFilename: string;
    focusFrameInputShortcut: string;
    inputFrameRef: React.RefObject<Input>;
    onSliderChange(value: number): void;
    onInputChange(value: number): void;
    onURLIconClick(): void;
}

function PlayerNavigation(props: Props): JSX.Element {
    const {
        startFrame,
        stopFrame,
        frameNumber,
        //LTTS changes
        //frameFilename,
        focusFrameInputShortcut,
        inputFrameRef,
        onSliderChange,
        onInputChange,
        onURLIconClick,
    } = props;

    const [frameInputValue, setFrameInputValue] = useState<number>(frameNumber);

    useEffect(() => {
        if (frameNumber !== frameInputValue) {
            setFrameInputValue(frameNumber);
        }
    }, [frameNumber]);

    return (
        <>
            <Col className='cvat-player-controls'>
                <Row align='bottom'>
                    <Col>
                        <Slider
                            className='cvat-player-slider'
                            min={startFrame}
                            max={stopFrame}
                            value={frameNumber || 0}
                            onChange={onSliderChange}
                        />
                    </Col>
                </Row>
                {/* LTTS changes */}
                {/* <Row justify='center'>
                    <Col className='cvat-player-filename-wrapper'>
                        <CVATTooltip title={frameFilename}>
                            <Text type='secondary'>{frameFilename}</Text>
                        </CVATTooltip>
                    </Col>
                    <Col offset={1}>
                        <CVATTooltip title='Create frame URL'>
                            <LinkOutlined className='cvat-player-frame-url-icon' onClick={onURLIconClick} />
                        </CVATTooltip>
                    </Col>
                </Row> */}
            </Col>
            <Col>
            {/* LTTS changes */}
                {/* <CVATTooltip title={`Press ${focusFrameInputShortcut} to focus here`}> */}
                <CVATTooltip title={`Press ${focusFrameInputShortcut} to enter manually`}>
                    <InputNumber
                        ref={inputFrameRef}
                        className='cvat-player-frame-selector'
                        type='number'
                        value={frameInputValue === 0 ? 1 : frameInputValue + 1}
                        onChange={(value: number | undefined | string | null) => {
                            if (typeof value !== 'undefined' && value !== null) {
                                const val = value - 1;
                                setFrameInputValue(Math.floor(clamp(+val, startFrame, stopFrame)));
                            }
                        }}
                        onBlur={() => {
                            onInputChange(frameInputValue);
                        }}
                        onPressEnter={() => {
                            onInputChange(frameInputValue);
                        }}
                    />
                </CVATTooltip>
            </Col>
        </>
    );
}

export default React.memo(PlayerNavigation);
