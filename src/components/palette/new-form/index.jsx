import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
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
import { ChromePicker } from 'react-color'

import styles from './styles'

class NewPaletteForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
            currentColor: 'teal',
            colors: ['purple', '#e15764']
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this)
        this.addNewColor = this.addNewColor.bind(this)
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
        this.setState({ colors: [...this.state.colors, this.state.currentColor] })
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
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPAper
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
                    <Button variant='contained' color='primary' onClick={this.addNewColor} style={{ backgroundColor: this.state.currentColor }}>
                        Add Color
                    </Button>
                </Drawer>
                <main className={classNames(classes.content, {
                    [classes.contentShift]: open
                })}>
                    <div className={classes.drawerHeader} />
                    <ul>
                        {this.state.colors.map(color => (
                            <li style={{ backgroundColor: color }}>{ color }</li>
                        ))}
                    </ul>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(NewPaletteForm)