/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import omit from 'lodash/omit'
import { ResponsiveLine, LineDefaultProps } from '@x-nivo/line'
import ComponentTemplate from '../../components/components/ComponentTemplate'
import meta from '../../data/components/line/meta.yml'
import mapper from '../../data/components/line/mapper'
import { groupsByScope } from '../../data/components/line/props'
import defaultSettings from '../../data/components/line/defaults'
import { generateData } from '../../data/components/line/generator'

const initialProperties = {
    ...omit(defaultSettings, ['width', 'height']),
    legends: [
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: data => {
                alert(JSON.stringify(data, null, '    '))
            },
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                    },
                },
            ],
        },
    ],
}

const Line = () => {
    return (
        <ComponentTemplate
            name="Line"
            meta={meta.Line}
            icon="line"
            flavors={meta.flavors}
            currentFlavor="svg"
            properties={groupsByScope.Line}
            initialProperties={initialProperties}
            defaultProperties={LineDefaultProps}
            propertiesMapper={mapper}
            generateData={generateData}
        >
            {(properties, data, theme) => {
                return <ResponsiveLine data={data} {...properties} theme={theme} />
            }}
        </ComponentTemplate>
    )
}

export default Line
