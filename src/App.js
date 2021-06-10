import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Palette from './components/palette/component'
import MonoPalette from './components/palette/mono'
import PaletteIndex from './components/palette'
import seedPalette from './components/palette/seed-palette'
import NewPaletteForm from './components/palette/new'
import { generatePalette } from './components/palette/palette-helper'

class App extends Component {
  findPalette(id) {
    return seedPalette.find(function(palette) {
      return palette.id === id
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />} />
        <Route
        exact 
        path='/palette/:paletteId/:colorId'
        render={routeProps => (
          <MonoPalette
            colorId={routeProps.match.params.colorId}
            palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )}
            {...routeProps}
          />
        )}
        />

        <Route exact path='/' render={routeProps => <PaletteIndex palettes={seedPalette} {...routeProps } /> } />
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