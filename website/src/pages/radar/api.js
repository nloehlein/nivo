/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React from 'react'
import { generateWinesTastes } from '@x-nivo/generators'
import Layout from '../../components/Layout'
import SEO from '../../components/seo'
import ApiClient from '../../components/components/api-client/ApiClient'
import { groupsByScope } from '../../data/components/radar/props'
import mapper from '../../data/components/radar/mapper'
import meta from '../../data/components/radar/meta.yml'

const { data, keys } = generateWinesTastes()

const RadarApi = () => {
    return (
        <>
            <SEO title="Radar HTTP API" keywords={[...meta.Radar.tags, 'HTTP API']} />
            <ApiClient
                componentName="Radar"
                chartClass="radar"
                apiPath="/charts/radar"
                flavors={meta.flavors}
                dataProperty="data"
                controlGroups={groupsByScope.api}
                propsMapper={mapper}
                defaultProps={{
                    width: 600,
                    height: 600,
                    data: JSON.stringify(data, null, '  '),
                    keys,
                    indexBy: 'taste',

                    margin: {
                        top: 70,
                        right: 80,
                        bottom: 40,
                        left: 80,
                    },

                    curve: 'catmullRomClosed',

                    borderWidth: 2,
                    borderColor: { type: 'inherit' },

                    gridLevels: 5,
                    gridShape: 'circular',
                    gridLabelOffset: 36,

                    enableDots: true,
                    dotSize: 8,
                    dotColor: { type: 'inherit' },
                    dotBorderWidth: 0,
                    dotBorderColor: { type: 'custom', color: '#fff' },
                    enableDotLabel: true,
                    dotLabel: 'value',
                    dotLabelYOffset: -12,

                    colors: 'nivo',
                    colorBy: 'key',
                    fillOpacity: 0.1,
                }}
            />
        </>
    )
}

export default RadarApi
