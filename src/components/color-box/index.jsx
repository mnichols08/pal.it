import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

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
        const { name, background } = this.props
        const { copied } = this.state
        return (
            <div style={{ background }} className='ColorBox'>
                <div style={{ background }} className={`copy-overlay ${copied && 'show'}`} />
                <div style={{ background }} className={`copy-msg ${copied && 'show'}`} >
                    <h1>copied!</h1>
                    <p>{this.props.background}</p>
                    <p>{ name }</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>{ name }</span>
                    </div>
                </div>
                <CopyToClipboard text={background} onCopy={ this.changeCopyState }>
                    <button className='copy-button'>Copy</button>
                </CopyToClipboard>
                <Link to='/' >
                    <span className='see-more'>More</span>
                </Link>
            </div>
            
        )
    }
}

export default ColorBox