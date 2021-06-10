import React, { Component } from 'react'
import ColorBox from '../color-box'
import Navbar from '../navbar'
import PaletteFooter from '../footer'

import styles from './styles'

class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = { level: 500, format: 'hex' }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }
    changeLevel(level) {
        this.setState({ level })
    }
    changeFormat(val) {
        this.setState({ format: val })
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette
        const { classes } = this.props
        const { level, format } = this.state
        const colorBoxes = colors[level].map(color => 
            (<ColorBox background={color[format]} name={color.name} key={color.id} moreUrl={`/palette/${id}/${color.id}`} showFullPalette />) )
        return (
            <div className={classes.Palette}>
                <Navbar 
                    level={ level }
                    changeLevel={ this.changeLevel }
                    handleChange={this.changeFormat}
                    showingAllColors
                />
                <div className={classes.colors}>
                    { colorBoxes } 
                </div>
                <PaletteFooter
                 paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default styles(Palette)