/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import setDisplayName from 'recompose/setDisplayName'
import {BasicTooltip, Container, SvgWrapper} from '@nivo/core'
import { BulletPropTypes } from './props'
import enhance from './enhance'
import BulletItem from './BulletItem'
import partial from 'lodash/partial'

export class Bullet extends Component {
    static propTypes = BulletPropTypes

    handleBulletTooltip = (showTooltip, bullet, event) => {
        const { bulletTooltip, theme } = this.props
        showTooltip(
            <BasicTooltip
                id={bullet.id}
                enableChip={true}
                color={bullet.color}
                theme={theme}
                //format={format}
                renderContent={typeof bulletTooltip === 'function' ? bulletTooltip.bind(null, { ...bullet }) : null}
            />,
            event
        )
    }

    render() {
        const {
            data,

            layout,
            spacing,
            measureSize,
            markerSize,
            reverse,
            axisPosition,
            axisValueFormat,

            margin,
            width,
            height,
            outerWidth,
            outerHeight,

            titlePosition,
            titleAlign,
            titleOffsetX,
            titleOffsetY,
            titleRotation,

            rangeComponent,
            rangeColors,

            measureComponent,
            measureColors,

            markerComponent,
            markerColors,

            theme,

            measureTooltip,
            rangeTooltip,
            markerTooltip,
            bulletTooltip,

            animate,
            motionStiffness,
            motionDamping,

            isInteractive,
            onRangeClick,
            onMeasureClick,
            onMarkerClick,
        } = this.props

        let itemHeight
        if (layout === 'horizontal') {
            itemHeight = (height - spacing * (data.length - 1)) / data.length
        } else {
            itemHeight = (width - spacing * (data.length - 1)) / data.length
        }
        const measureHeight = itemHeight * measureSize
        const markerHeight = itemHeight * markerSize

        const enhancedData = data.map(d => {
            const all = [...d.ranges, ...d.measures, ...d.markers]

            const max = Math.max(...all)

            const scale = scaleLinear().domain([0, max])

            if (layout === 'horizontal') {
                scale.range(reverse === true ? [width, 0] : [0, width])
            } else {
                scale.range(reverse === true ? [0, height] : [height, 0])
            }

            return {
                ...d,
                scale,
            }
        })

        const motionProps = {
            animate,
            motionDamping,
            motionStiffness,
        }

        return (
            <Container isInteractive={isInteractive} theme={theme}>
                {({ showTooltip, hideTooltip }) => (
                    <SvgWrapper
                        width={outerWidth}
                        height={outerHeight}
                        margin={margin}
                        theme={theme}
                    >
                        {enhancedData.map((d, i) => (
                            <BulletItem
                                key={d.id}
                                data={d}
                                {...d}
                                layout={layout}
                                reverse={reverse}
                                x={layout === 'vertical' ? itemHeight * i + spacing * i : 0}
                                y={layout === 'horizontal' ? itemHeight * i + spacing * i : 0}
                                width={width}
                                height={itemHeight}
                                titlePosition={titlePosition}
                                titleAlign={titleAlign}
                                titleOffsetX={titleOffsetX}
                                titleOffsetY={titleOffsetY}
                                titleRotation={titleRotation}
                                measureHeight={measureHeight}
                                markerHeight={markerHeight}
                                rangeComponent={rangeComponent}
                                rangeColors={rangeColors}
                                measureComponent={measureComponent}
                                measureColors={measureColors}
                                markerComponent={markerComponent}
                                markerColors={markerColors}
                                theme={theme}
                                axisPosition={axisPosition}
                                axisValueFormat={axisValueFormat}
                                {...motionProps}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                onRangeClick={onRangeClick}
                                onMeasureClick={onMeasureClick}
                                onMarkerClick={onMarkerClick}

                                onMouseEnter={partial(this.handleBulletTooltip, showTooltip)}
                                onMouseLeave={hideTooltip}

                                measureTooltip={measureTooltip}
                                rangeTooltip={rangeTooltip}
                                markerTooltip={markerTooltip}
                            />
                        ))}
                    </SvgWrapper>
                )}
            </Container>
        )
    }
}

Bullet.displayName = 'Bullet'

export default setDisplayName(Bullet.displayName)(enhance(Bullet))
