import React from 'react'

import styles from './styles'

function DragBox(props) {
    return (
        <div
            className={props.classes.root }
            style={{ backgroundColor: props.color }}
        >
            { props.color }
        </div>
    )
}

export default styles(DragBox)