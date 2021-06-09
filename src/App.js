import React, { Component } from 'react'
import Palette from './palette'
import seedPalette from './seedPalette'

class App extends Component {
  render() {
    return (
      <div>
        <Palette {...seedPalette[4] }/>
      </div>
    )
  }
}

export default App