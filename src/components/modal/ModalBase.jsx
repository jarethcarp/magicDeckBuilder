import React from 'react'

const ModalBase = (isOpen) => {

    if(!isOpen){
        return null
    } else {
        return (
            <div>ModalBase</div>
        )
    }
}

export default ModalBase