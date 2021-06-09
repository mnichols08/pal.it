import React, { Component } from 'react'
import Palette from './Palette'
import seedPalette from './seedPalette'

class App extends Component {
  render() {
    return (
      <div>
        <Palette {...seedPalette[5] }/>
      </div>
    )
  }
}

export default App