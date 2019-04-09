/*
 * This file is part of the nivo project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { mapInheritedColor } from '../../lib/settings'
import Control from './Control'
import PropertyHeader from './PropertyHeader'
import { Help } from './styled'
import Select from './Select'

const hasGammaModifier = type => ['inherit:darker', 'inherit:brighter'].includes(type)

const Gamma = styled.div`
    display: grid;
    grid-template-columns: 50px auto 150px;
    grid-column-gap: 9px;
    font-size: 0.8rem;
    margin: 9px 0 5px;
    max-width: 240px;
    align-items: center;
`

const Custom = styled.div`
    display: grid;
    grid-template-columns: 40px auto;
    grid-column-gap: 9px;
    font-size: 0.8rem;
    margin: 9px 0 5px;
    align-items: center;
`

class ColorControl extends Component {
    constructor(props) {
        super(props)

        this.state = {
            color: props.value.color || props.defaultCustomColor,
            gamma: props.value.gamma !== undefined ? props.value.gamma : props.defaultGammaValue,
        }
    }

    handleTypeChange = ({ value: type }) => {
        const { onChange } = this.props
        if (type === 'custom') {
            onChange({ type, color: this.state.color })
        } else if (hasGammaModifier(type)) {
            onChange({ type, gamma: this.state.gamma })
        } else {
            onChange({ type })
        }
    }

    handleCustomColorChange = e => {
        const color = e.target.value

        this.setState({ color })
        this.props.onChange({ type: 'custom', color })
    }

    handleGammaChange = e => {
        const {
            onChange,
            value: { type },
        } = this.props
        const gamma = e.target.value

        this.setState({ gamma })
        onChange({ type, gamma })
    }

    render() {
        const {
            value: { type, ...config },
            property,
            withTheme,
            withCustomColor,
        } = this.props
        const { gamma, color } = this.state

        const options = [
            { value: 'inherit', label: 'inherit' },
            { value: 'inherit:darker', label: 'inherit:darker' },
            { value: 'inherit:brighter', label: 'inherit:brighter' },
        ]

        if (withTheme) options.unshift({ value: 'theme', label: 'theme' })
        if (withCustomColor) options.unshift({ value: 'custom', label: 'custom' })

        const selectedOption = options.find(o => o.value === type)

        return (
            <Control description={property.description}>
                <PropertyHeader {...property} />
                <div>
                    <Select
                        options={options}
                        onChange={this.handleTypeChange}
                        value={selectedOption}
                    />
                    {type === 'custom' && (
                        <Custom>
                            <span>color</span>
                            <input
                                type="color"
                                onChange={this.handleCustomColorChange}
                                value={color}
                            />
                        </Custom>
                    )}
                    {hasGammaModifier(type) && (
                        <Gamma>
                            <span>gamma</span>
                            <input
                                ref="gamma"
                                type="range"
                                min="0"
                                max="4"
                                step="0.1"
                                value={gamma}
                                onChange={this.handleGammaChange}
                            />
                            <code className="code code-string">
                                {mapInheritedColor({ type, ...config })}
                            </code>
                        </Gamma>
                    )}
                </div>
                <Help>{property.help}</Help>
            </Control>
        )
    }
}

ColorControl.propTypes = {
    property: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultGammaValue: PropTypes.number.isRequired,
    withTheme: PropTypes.bool.isRequired,
    withCustomColor: PropTypes.bool.isRequired,
    defaultCustomColor: PropTypes.string.isRequired,
    value: PropTypes.shape({
        type: PropTypes.oneOf(['inherit', 'inherit:darker', 'inherit:brighter', 'theme', 'custom'])
            .isRequired,
    }).isRequired,
}

ColorControl.defaultProps = {
    defaultGammaValue: 1.2,
    withTheme: false,
    withCustomColor: false,
    defaultCustomColor: '#000000',
}

export default ColorControl
