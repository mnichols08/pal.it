import React, { Component } from 'react'

import './ColorBox.css'

class ColorBox extends Component {
    render() {
        const { name, background } = this.props
        return (
            <div style={{ background }} className='ColorBox'>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{ name }</span>
                    </div>
                </div>
                <button className='copy-button'>Copy</button>
                <span>More</span>
            </div>
        )
    }
}

export default ColorBox