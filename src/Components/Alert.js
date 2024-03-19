import React from 'react'

export default function Alert(props) {
    return (
        <div className="alert alert-primary" role="alert">
            {props.alert}
        </div>
    )
}
