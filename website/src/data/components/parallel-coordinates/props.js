/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { lineCurvePropKeys } from '@x-nivo/core'
import { commonDefaultProps as defaults } from '@x-nivo/parallel-coordinates'
import { motionProperties, getPropertiesGroupsControls } from '../../../lib/componentProperties'

const props = [
    {
        key: 'data',
        scopes: '*',
        group: 'Base',
        help: 'Chart data.',
        type: 'Array<object | Array>',
        required: true,
    },
    {
        key: 'variables',
        scopes: '*',
        type: 'object[]',
        help: 'Variables configuration.',
        description: `
            Variables configuration, define accessor (\`key\`)
            and variable type. Type must be one of
            \`linear\` or \`point\`, \`linear\`
            variables are suitable for continuous numerical
            data such as age or cost while
            \`point\` variables are suitable for
            discrete values such as gender.
        `,
        group: 'Variables',
        controlType: 'array',
        controlOptions: {
            shouldCreate: false,
            shouldRemove: false,
            getItemTitle: (index, values) => `${values.key} (${values.type})`,
            props: [
                {
                    key: 'key',
                    help: 'Variable key, used to access to corresponding datum value.',
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'type',
                    help: `Variable type, must be one of: 'linear', 'point'.`,
                    controlType: 'text',
                    controlOptions: {
                        disabled: true,
                    },
                },
                {
                    key: 'min',
                    help: 'Min value of linear scale.',
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 0,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'max',
                    help: 'Max value of linear scale.',
                    type: `number | 'auto'`,
                    controlType: 'switchableRange',
                    controlOptions: {
                        when: ({ type }) => type === 'linear',
                        disabledValue: 'auto',
                        defaultValue: 1000,
                        min: -100,
                        max: 100,
                    },
                },
                {
                    key: 'padding',
                    help: 'Outer padding (0~1).',
                    type: `number`,
                    controlType: 'range',
                    controlOptions: {
                        when: ({ type }) => type === 'point',
                        min: 0,
                        max: 1,
                        step: 0.01,
                    },
                },
            ],
        },
    },
    {
        key: 'width',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart width.',
        description: `
            not required if using
            \`ResponsiveParallelCoords\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'height',
        scopes: ['api'],
        docScopes: '*',
        help: 'Chart height.',
        description: `
            not required if using
            \`ResponsiveParallelCoords\`.
        `,
        type: 'number',
        required: true,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            unit: 'px',
            min: 100,
            max: 1000,
            step: 5,
        },
    },
    {
        key: 'pixelRatio',
        scopes: ['ParallelCoordinatesCanvas'],
        help: `Adjust pixel ratio, useful for HiDPI screens.`,
        required: false,
        defaultValue: 'Depends on device',
        type: `number`,
        controlType: 'range',
        group: 'Base',
        controlOptions: {
            min: 1,
            max: 2,
        },
    },
    {
        key: 'margin',
        scopes: '*',
        help: 'Chart margin.',
        type: 'object',
        required: false,
        controlType: 'margin',
        group: 'Base',
    },
    {
        key: 'layout',
        scopes: '*',
        help: `Chart layout.`,
        type: 'string',
        required: false,
        defaultValue: defaults.layout,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'horizontal', value: 'horizontal' },
                { label: 'vertical', value: 'vertical' },
            ],
        },
    },
    {
        key: 'curve',
        scopes: '*',
        help: 'Curve interpolation.',
        description: `
            Defines the curve factory to use for the line generator.
        `,
        type: 'string',
        required: false,
        defaultValue: defaults.curve,
        controlType: 'choices',
        group: 'Base',
        controlOptions: {
            choices: lineCurvePropKeys.map(key => ({
                label: key,
                value: key,
            })),
        },
    },
    {
        key: 'axesPlan',
        scopes: '*',
        help: `Axes plan.`,
        type: `string`,
        required: false,
        defaultValue: defaults.axesPlan,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [
                { label: 'foreground', value: 'foreground' },
                { label: 'background', value: 'background' },
            ],
        },
    },
    {
        key: 'axesTicksPosition',
        scopes: '*',
        help: `Axes ticks position.`,
        type: `string`,
        required: false,
        defaultValue: defaults.axesTicksPosition,
        controlType: 'radio',
        group: 'Base',
        controlOptions: {
            choices: [{ label: 'before', value: 'before' }, { label: 'after', value: 'after' }],
        },
    },
    {
        key: 'colors',
        scopes: '*',
        help: 'Defines color range.',
        type: 'string | Function | string[]',
        required: false,
        defaultValue: defaults.colors,
        controlType: 'colors',
        group: 'Style',
    },
    {
        key: 'colorBy',
        scopes: '*',
        help:
            'Property used to determine line color. If a function is provided, it will receive current line data and must return a valid color.',
        required: false,
        defaultValue: defaults.colorBy,
        controlType: 'choices',
        group: 'Style',
        controlOptions: {
            choices: [
                {
                    label: 'index',
                    value: 'index',
                },
                {
                    label: 'target',
                    value: 'target',
                },
                {
                    label: `custom using 'color' variable`,
                    value: `custom using 'color' variable`,
                },
            ],
        },
    },
    {
        key: 'strokeWidth',
        scopes: '*',
        help: 'Lines stroke width.',
        type: 'number',
        required: false,
        defaultValue: defaults.strokeWidth,
        controlType: 'lineWidth',
        group: 'Style',
    },
    {
        key: 'lineOpacity',
        scopes: '*',
        help: 'Lines opacity.',
        type: 'number',
        required: false,
        defaultValue: defaults.lineOpacity,
        controlType: 'opacity',
        group: 'Style',
    },
    ...motionProperties(['ParallelCoordinates'], defaults),
]

export const groupsByScope = {
    ParallelCoordinates: getPropertiesGroupsControls(props, 'ParallelCoordinates'),
    ParallelCoordinatesCanvas: getPropertiesGroupsControls(props, 'ParallelCoordinatesCanvas'),
    api: getPropertiesGroupsControls(props, 'api'),
}
