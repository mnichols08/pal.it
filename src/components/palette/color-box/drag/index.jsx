import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

import styles from './styles'

function DragBox(props) {
    const { classes, handleClick, name, color } = props
    return (
        <div
            className={classes.root }
            style={{ backgroundColor: color }}
        >
            <div className={classes.boxContent}>
                <span>{ name }</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
            </div>
        </div>
    )
}

export default styles(DragBox)