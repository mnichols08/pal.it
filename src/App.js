import React, { Component } from 'react'
import Palette from './Palette'
import seedPalette from './seedPalette'
import { generatePalette } from "./paletteHelper"

class App extends Component {
  render() {
    const rP = Math.floor(Math.random() * seedPalette.length) 
    return (
      <div>
        <Palette palette={generatePalette(seedPalette[rP])} />
      </div>
    )
  }
}

export default App