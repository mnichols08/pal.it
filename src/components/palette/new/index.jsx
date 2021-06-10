import React, { Component } from 'react'
import classNames from 'classnames'
import Drawer from '@material-ui/core/drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from'@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DragBox from '../color-box/drag'
import { ChromePicker } from 'react-color'

import styles from './styles'

class NewPaletteForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            currentColor: '#800000',
            newColorName: '',
            colors: [{ color: `#${Math.floor(Math.random()*16777215).toString(16)}`, name: 'Random Mam' }],
            newPaletteName: ''
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', val =>
        this.state.colors.every(
            ({ name }) => name.toLowerCase() !== val.toLowerCase()
        ))
        ValidatorForm.addValidationRule('isColorUnique', () =>
        this.state.colors.every(
            ({ color }) => color !== this.state.currentColor
        ))
        ValidatorForm.addValidationRule('isPaletteNameUnique', val => 
        this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== val.toLowerCase()
        ))
    }
    handleDrawerOpen = () => {
        this.setState({ open: true })
    }
    handleDrawerClose = () => {
        this.setState({ open: false })
    }
    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex })
    }
    addNewColor() {
        const newColor = {
            name: this.state.newColorName,
            color: this.state.currentColor
        }
        this.setState({ colors: [...this.state.colors, newColor], newColorName: "" })
    }
    handleChange(e) {
        this.setState( { [e.target.name]: e.target.value })
        console.log(this.state)
    }
    handleSubmit() {
        let newName = this.state.newPaletteName
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors,
        }
        this.props.savePalette(newPalette)
        this.props.history.push('/')
    }
    render() {
        const { classes } = this.props
        const { open } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position='fixed' className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}>
                    <Toolbar disableGutters={!open}>
                        <IconButton color='inherit' aria-label='Open drawer' onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide )}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' noWrap>
                            Persistent Drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator 
                                label='Palette Name'
                                value={this.state.newPaletteName}
                                name='newPaletteName'
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter Palette Name', 'Name Already Taken']}
                            />
                            <Button variant='contained' color='primary' type='submit'>
                            Save pal.it
                            </Button>
                        </ValidatorForm>
                    </Toolbar>
                </AppBar>
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
                        <Button variant='contained' color='secondary'>
                            Clear Palette
                        </Button>
                        <Button variant='contained' color='primary'>
                            Random Color
                        </Button>
                    </div>
                    <ChromePicker
                        color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor} ref='form'>
                        <TextValidator
                            name='newColorName'
                            value={this.state.newColorName}
                            onChange={this.handleChange}
                            validators={['required', 'isColorNameUnique', 'isColorUnique']}
                            errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used!']}
                        />
                        <Button variant='contained' type='submit' color='primary' style={{ backgroundColor: this.state.currentColor }}>
                            Add Color
                        </Button>
                    </ValidatorForm>
                </Drawer>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}>
                    <div className={classes.drawerHeader} />
                        {this.state.colors.map(color => (
                            <DragBox color={ color.color } name={ color.name } />
                        ))}
                </main>
            </div>
        )
    }
}

export default styles(NewPaletteForm)