import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Palette from './components/palette'
import seedPalette from './components/palette/seedPalette'
import { generatePalette } from './components/palette/paletteHelper'

class App extends Component {
  render() {
    const rP = Math.floor(Math.random() * seedPalette.length) 
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>Palette list goes here</h1>} />
        <Route 
          exact
          path='/palette/:id'
          render={() => <h1>Individual Palette</h1>}
        />
        {/* <Palette palette={generatePalette(seedPalette[rP])} /> */}
      </Switch>
    )
  }
}

export default App