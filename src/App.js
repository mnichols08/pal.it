import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Palette from './components/palette/component'
import MonoPalette from './components/palette/mono'
import PaletteIndex from './components/palette'
import seed from './components/palette/seed'
import NewPaletteForm from './components/palette/new'
import { generatePalette } from './components/palette/helper'

class App extends Component {
  constructor(props) {
    super(props)
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = { palettes: savedPalettes || seed }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }
  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id
    })
  }
  deletePalette(id) {
    console.log(id)
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage
    )
    console.log(this.state)
  }
  savePalette(newPalette) {
    this.setState({ palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage )
  }
  syncLocalStorage() {
    window.localStorage.setItem(
      'palettes', JSON.stringify(this.state.palettes)
    )
  }
  render() {
    return (
      <Switch>
        <Route exact path='/palette/new' render={routeProps => <NewPaletteForm savePalette={this.savePalette } palettes={this.state.palettes} {...routeProps } />} />
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
        <Route
          exact
          path='/'
          render={routeProps => (
          <PaletteIndex palettes={this.state.palettes} {...routeProps } deletePalette={this.deletePalette} />
        )} />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    )
  }
}

export default App