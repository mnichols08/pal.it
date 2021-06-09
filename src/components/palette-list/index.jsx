import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import MiniPalette from '../mini-palette/'

class PaletteList extends Component {
    render() {
        const { palettes } = this.props
        return (
            <div>
                <MiniPalette />
                <h1>pal.it</h1>
                {palettes.map(palette => (
                    <p>
                        <Link to={`/palette/${palette.id}`}>
                            { palette.paletteName }
                        </Link>
                    </p>
                ))}
            </div>
        )
    }
}

export default PaletteList