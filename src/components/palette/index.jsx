import React, { Component } from "react"
import { Link } from 'react-router-dom'
import MiniPalette from "./mini"

import styles from './styles'

class PaletteIndex extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    console.log(this.props)
    const { palettes, classes, deletePalette } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>pal.it</h1>
            <Link to='/palette/new'>create a pal.it</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                id={palette.id}
                handleDelete={deletePalette}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default styles(PaletteIndex)
