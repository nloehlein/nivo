/*
 * This file is part of the nivo project.
 *
 * (c) 2016-present Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export default {
    light: {
        background: '#ffffff',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#889eae',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#889eae',
                },
                text: {
                    fill: '#6a7c89',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#889eae',
                    fontSize: 12,
                    fontWeight: 500,
                },
            },
        },
        legends: {
            text: {
                fontSize: 12,
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
            },
        },
        labels: {
            text: {
                fill: '#555',
            },
        },
    },
    dark: {
        background: '#0e1317',
        axis: {
            domain: {
                line: {
                    strokeWidth: 0,
                    stroke: '#526271',
                },
            },
            ticks: {
                line: {
                    strokeWidth: 1,
                    stroke: '#526271',
                },
                text: {
                    fill: '#526271',
                    fontSize: 11,
                },
            },
            legend: {
                text: {
                    fill: '#bcc5ce',
                    fontSize: 12,
                    fontWeight: 500,
                },
            },
        },
        grid: {
            line: {
                stroke: '#444',
            },
        },
        legends: {
            text: {
                fontSize: 12,
                fill: '#bcc5ce',
            },
        },
        tooltip: {
            container: {
                fontSize: '13px',
                background: '#000',
                color: '#ddd',
            },
        },
        labels: {
            text: {
                fill: '#ddd',
                fontSize: 12,
                fontWeight: 500,
            },
        },
        dots: {
            text: {
                fill: '#bbb',
                fontSize: 12,
            },
        },
    },
}
