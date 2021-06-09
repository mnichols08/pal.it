import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import chroma from 'chroma-js'

import './styles.css'

class ColorBox extends Component {
    constructor(props) {
        super(props)
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this)
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500)
        })
    }
    render() {
        const { name, background, moreUrl, showLink } = this.props
        const { copied } = this.state
        const isDarkColor = chroma(background).luminance() <= 0.1
        const isLightColor = chroma(background).luminance() >= 0.7
        return (
            <div style={{ background }} className='ColorBox'>
                <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                <div style={{ background }} className={`copy-msg ${copied && 'show'}`} >
                    <h1>copied!</h1>
                    <p className={isLightColor ? 'dark-text' : undefined}>{this.props.background}</p>
                    <p>{ name }</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={isDarkColor ? 'light-text' : undefined}>{ name }</span>
                    </div>
                </div>
                <CopyToClipboard text={background} onCopy={ this.changeCopyState }>
                    <button className={`copy-button ${isLightColor ? 'dark-text' : undefined }`}>Copy</button>
                </CopyToClipboard>
                {showLink && (
                <Link to={moreUrl} onClick={e => e.stopPropagation()}>
                    <span className={`see-more ${isLightColor ? 'dark-text' : undefined}`}>More</span>
                </Link>
                )}
            </div>
            
        )
    }
}

export default ColorBox