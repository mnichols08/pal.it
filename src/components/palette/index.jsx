import React, { Component } from "react"
import { Link } from 'react-router-dom'
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import CheckIcon from "@material-ui/icons/Check"
import CloseIcon from "@material-ui/icons/Close"
import DialogTitle from "@material-ui/core/DialogTitle"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import blue from "@material-ui/core/colors/blue"
import red from "@material-ui/core/colors/red"

import MiniPalette from "./mini"
import styles from './styles'

class PaletteIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openDeleteDialog: false,
      deleteId: ''
    }
    this.openDialog = this.openDialog.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.handleDelete =this.handleDelete.bind(this)
    this.goToPalette = this.goToPalette.bind(this)
  }
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }
  openDialog(id) {
    this.setState({ openDeleteDialog: true, deleteId: id })
  }
  closeDialog() {
    this.setState({ openDeleteDialog: false, deleteId: '' })
  }
  handleDelete() {
    this.props.deletePalette(this.state.deleteId)
    this.closeDialog()
  }
  render() {
    const { openDeleteDialog } = this.state
    const { palettes, classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}> 
            <h1>pal.it</h1>
            <Link to='/palette/new'>create a pal.it</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette
                  key={palette.id}
                  id={palette.id}
                  openDialog={this.openDialog}
                  {...palette}
                  goToPalette={this.goToPalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}
        >
          <DialogTitle id='delete-dialog-title'>
            delete pal.it?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default styles(PaletteIndex)
