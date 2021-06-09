import React, { Component } from 'react'

import './Palette.css'
import ColorBox from './color-box'

class Palette extends Component {
    render() {
        const colorBoxes = this.props.colors.map(color => (<ColorBox background={color.color} name={color.name} />) )
        return (
            <div className='Palette'>
                { /*  NAVBAR  */}
                <div className='Palette-colors'>
                    { colorBoxes }
                </div>
                { /*  FOOTER  */}
            </div>
        )
    }
}

export default Palette