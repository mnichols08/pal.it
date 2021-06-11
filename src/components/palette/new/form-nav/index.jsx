import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import styles from './styles'

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = { newPaletteName: '' }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', val =>
        this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== val.toLowerCase()
        ))
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes, open, handleSubmit } = this.props
        const { newPaletteName } = this.state
        return (
        <div>
        <CssBaseline />
        <AppBar position='fixed' className={classNames(classes.appBar, {
            [classes.appBarShift]: open
        })}>
            <Toolbar disableGutters={!open}>
                <IconButton color='inherit' aria-label='Open drawer' onClick={this.props.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide )}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                    Persistent Drawer
                </Typography>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <TextValidator 
                        label='Palette Name'
                        value={newPaletteName}
                        name='newPaletteName'
                        onChange={this.handleChange}
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['Enter Palette Name', 'Name Already Taken']}
                    />
                    <Button variant='contained' color='primary' type='submit'>
                    Save pal.it
                    </Button>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>
                            Go Back
                        </Button>
                    </Link>
                </ValidatorForm>
            </Toolbar>
        </AppBar>
        </div>
        )
    }
}

export default styles(PaletteFormNav)