import React, { Component } from 'react'
import Palette from './Palette'
import seedPalette from './seedPalette'
import { generatePalette } from "./paletteHelper"

class App extends Component {
  render() {
    return (
      <div>
        <Palette palette={generatePalette(seedPalette[1])} />
      </div>
    )
  }
}

export default App