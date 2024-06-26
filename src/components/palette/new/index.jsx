import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from'@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import DragList from '../color-box/drag-list'
import { arrayMove } from 'react-sortable-hoc'

import seed from '../seed'
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
            colors: seed[0].colors,
            newPaletteName: ''
        }
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.removeColor = this.removeColor.bind(this)
        this.clearColors = this.clearColors.bind(this)
        this.addRandomColor = this.addRandomColor.bind(this)
        this.generateRandomColor = this.generateRandomColor.bind(this)
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
    generateRandomColor(){
        const randomHexColor = '#' + [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
        this.setState({ currentColor: randomHexColor })
        // console.log(this.state)
    }
    addNewColor(newColor) {
        this.setState({
            colors: [...this.state.colors, newColor],
            newColorName: ''
        })
    }
    removeColor(name) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== name)
        })
    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
    }
    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
        newPalette.colors = this.state.colors
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
        const { open, currentColor, colors } = this.state
        const paletteIsFull = colors.length >= maxColors
        return (
            <div className={classes.root}>
                <PaletteFormNav open={open} palettes={palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen} />
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
                    <div className={classes.container} >
                        <Typography variant='h4' gutterBottom>design Your pal.it</Typography>
                        <div className={classes.buttons}>
                            <Button variant='contained' color='secondary' onClick={this.clearColors} className={classes.button}>
                                Clear Palette
                            </Button>
                            <Button variant='contained' color='secondary' onClick={this.generateRandomColor} className={classes.button}>
                                Generate Random Color
                            </Button>
                            <Button variant='contained' color='primary' onClick={this.addRandomColor} disabled={paletteIsFull} className={classes.button}>
                                Add Random Color
                            </Button>
                        </div>
                        <ColorPickerForm 
                            currentColor={currentColor}
                            paletteIsFull={paletteIsFull}
                            addNewColor={this.addNewColor}
                            colors={colors}
                        />
                    </div>
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