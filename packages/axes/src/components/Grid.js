/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import { motionPropTypes } from '@nivo/core'
import GridLines from './GridLines'
import { computeGridLines } from '../compute'

const Grid = ({
    width,
    height,
    xScale,
    yScale,
    xValues,
    yValues,
    theme,
    animate,
    motionStiffness,
    motionDamping,
}) => {
    const xLines = xScale
        ? computeGridLines({
              width,
              height,
              scale: xScale,
              axis: 'x',
              values: xValues,
          })
        : false

    const yLines = yScale
        ? computeGridLines({
              width,
              height,
              scale: yScale,
              axis: 'y',
              values: yValues,
          })
        : false

    return (
        <g>
            {xLines && (
                <GridLines
                    type="x"
                    lines={xLines}
                    theme={theme}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            )}
            {yLines && (
                <GridLines
                    type="y"
                    lines={yLines}
                    theme={theme}
                    animate={animate}
                    motionStiffness={motionStiffness}
                    motionDamping={motionDamping}
                />
            )}
        </g>
    )
}

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,

    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),
    yValues: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.instanceOf(Date)])
        ),
    ]),

    theme: PropTypes.object.isRequired,

    ...motionPropTypes,
}

Grid.defaultProps = {}

export default pure(Grid)
