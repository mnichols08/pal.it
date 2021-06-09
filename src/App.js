import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Palette from './components/palette'
import PaletteList from './components/palette-list'
import seedPalette from './components/palette/seedPalette'
import { generatePalette } from './components/palette/paletteHelper'

class App extends Component {
  findPalette(id) {
    return seedPalette.find(function(palette) {
      return palette.id === id
    })
  }
  render() {
    const rP = Math.floor(Math.random() * seedPalette.length) 
    return (
      <Switch>
        <Route exact path='/' render={() => <PaletteList palettes={seedPalette} /> } />
        <Route 
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette palette={generatePalette(
              this.findPalette(routeProps.match.params.id)
            )} />
          )}
        />
      </Switch>
    )
  }
}

export default App