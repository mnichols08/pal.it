import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/drawer'
import Typography from '@material-ui/core/Typography'
import Divider from'@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { ValidatorForm } from 'react-material-ui-form-validator'
import DragList from '../color-box/drag-list'
import { arrayMove } from 'react-sortable-hoc'

import ColorPickerForm from './color-picker'
import PaletteFormNav from './form-nav'
import styles from './styles'

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props){
        super(props)
        this.state = {
            open: true,
            currentColor: '#800000',
            newColorName: '',
            colors: this.props.palettes[Math.floor(Math.random()*this.props.palettes.length)].colors,
            newPaletteName: ''
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.addRandomColor = this.addRandomColor.bind(this)
    }
    handleDrawerOpen = () => {
        this.setState({ open: true })
    }
    handleDrawerClose = () => {
        this.setState({ open: false })
    }
    clearColors() {
        this.setState({ colors: [] })
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    addRandomColor() {
        const allColors = this.props.palettes.map(p => p.colors).flat()
        var rand = Math.floor(Math.random() * allColors.length)
        const randomColor = allColors[rand]
        this.setState({ colors: [...this.state.colors, randomColor ]})
    }
    addNewColor() {
        const newColor = {
            name: this.state.newColorName,
            color: this.state.currentColor
        }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }
    removeColor(name) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== name)
        })
    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    handleSubmit(newPaletteName) {
        const newPalette = {
            paletteName: newPaletteName,
            id: newPaletteName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors,
        }
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex)
        }))
    }
    render() {
        const { classes, maxColors, palettes } = this.props
        const { open, colors } = this.state
        const paletteIsFull = colors.length >= maxColors
        return (
            <div className={classes.root}>
                <PaletteFormNav open={open} classes={classes} palettes={palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen} />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <Typography variant='h4'>Design Your pal.it</Typography>
                    <div>
                        <Button variant='contained' color='secondary' onClick={this.clearColors}>
                            Clear Palette
                        </Button>
                        <Button variant='contained' color='primary' onClick={this.addRandomColor} disabled={paletteIsFull}>
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm 
                        paletteIsFull={paletteIsFull}
                        addNewColor={this.addNewColor}
                        color={colors}
                    />
                </Drawer>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}>
                    <div className={classes.drawerHeader} />
                            <DragList
                                colors={this.state.colors}
                                removeColor={this.removeColor}
                                axis='xy'
                                onSortEnd={this.onSortEnd}
                            />
                </main>
            </div>
        )
    }
}

export default styles(NewPaletteForm)