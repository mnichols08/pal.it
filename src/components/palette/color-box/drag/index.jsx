import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './styles'

function DragBox(props) {
    const { classes } = props
    return (
        <div
            className={classes.root }
            style={{ backgroundColor: props.color }}
        >
            <div className={classes.boxContent}>
                <span>{ props.name }</span>
                <DeleteIcon className={classes.deleteIcon} />
            </div>
        </div>
    )
}

export default styles(DragBox)