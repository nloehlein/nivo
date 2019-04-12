/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { Axes } from '@x-nivo/core'
import { linearXScale, linearYScale } from './scales'
import { FullWidthBanner, DescriptionBlock } from '../../styled'
import { useAxisTheme } from './theme'

const AxesPosition = () => {
    const theme = useAxisTheme()

    return (
        <>
            <DescriptionBlock>
                <h2 id="position">Axis position</h2>
                <p>
                    Axis position is determined by the property you use{' '}
                    <strong>(top|right|bottom|left)Axis</strong>.
                </p>
            </DescriptionBlock>
            <FullWidthBanner>
                <div className="guide__illustrations">
                    <svg role="img" width={380} height={260}>
                        <g transform="translate(50,50)">
                            <Axes
                                xScale={linearXScale}
                                yScale={linearYScale}
                                width={280}
                                height={160}
                                theme={theme}
                                animate={false}
                                motionStiffness={0}
                                motionDamping={0}
                                top={{
                                    legend: 'axisTop',
                                    legendPosition: 'center',
                                    legendOffset: -32,
                                }}
                                right={{
                                    legend: 'axisRight',
                                    legendPosition: 'center',
                                    legendOffset: 42,
                                }}
                                bottom={{
                                    legend: 'axisBottom',
                                    legendPosition: 'center',
                                    legendOffset: 38,
                                }}
                                left={{
                                    legend: 'axisLeft',
                                    legendPosition: 'center',
                                    legendOffset: -36,
                                }}
                            />
                        </g>
                    </svg>
                </div>
            </FullWidthBanner>
        </>
    )
}

export default AxesPosition
