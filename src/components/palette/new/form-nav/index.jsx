import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import PaletteMetaForm from './meta-form'
import styles from './styles'

class PaletteFormNav extends Component {
    constructor(props) {
        super(props)
        this.state = { newPaletteName: "" }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
        this.props.palettes.every(
            ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
        ))
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { classes, open, handleSubmit, palettes } = this.props
        const { newPaletteName } = this.state
        return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' color='default' className={classNames(classes.appBar, {
            [classes.appBarShift]: open
        })}>
            <Toolbar disableGutters={!open}>
                <IconButton color='inherit' aria-label='Open drawer' onClick={this.props.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide )}>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' color='inherit' noWrap>
                    create a pal.it
                </Typography>
            </Toolbar>
            <div className={classes.navBtns}>
                <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} />
                <Link to='/'>
                    <Button variant='contained' color='secondary'>
                        Go Back
                    </Button>
                </Link>
            </div>
        </AppBar>
        </div>
        )
    }
}

export default styles(PaletteFormNav)