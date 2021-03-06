import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ColorBox from '../color-box'
import Navbar from '../navbar'
import PaletteFooter from '../footer'

import styles from '../component/styles'

class MonoPalette extends Component {
    constructor(props) {
      super(props)
      this.changeFormat = this.changeFormat.bind(this)
      this.state = { format: "hex" }
      this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    }
    gatherShades(palette, colorToFilterBy) {
      let shades = []
      let allColors = palette.colors
  
      for (let key in allColors) {
        shades = shades.concat(
          allColors[key].filter(color => color.id === colorToFilterBy)
        )
      }
      //return all shades of given color
      return shades.slice(1)
    }
    changeFormat(val) {
      this.setState({ format: val })
    }
    render() {
      const { format } = this.state
      const { classes } = this.props
      const { paletteName, emoji, id } = this.props.palette
      const colorBoxes = this._shades.map(color => (
        <ColorBox
          key={color.name.replace(/ /g, '')}
          name={color.name}
          background={color[format]}
          showingFullPalette={false}
        />
      ))
      return (
        <div className={classes.Palette}>
          <Navbar handleChange={this.changeFormat} showingAllColors={false} />
            <div className={classes.colors}>
              { colorBoxes }
              <div className={classes.goBack}>
                <Link to={`/palette/${id}`}>GO BACK</Link>
              </div>
            </div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
      )
    }
  }

  export default styles(MonoPalette)