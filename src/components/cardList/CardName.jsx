import React from 'react'
import TooltipIMG from '../modal/tooltipIMG'

const CardName = ({ value, isEditing, valueUpdate, cardIMG }) => {
    return isEditing ? (
        <div>
          <div>
           {value}
           <TooltipIMG cardIMG={cardIMG} />
          </div>
          
        </div>
      ) : (
        <>
          <input type='text' value={value} onChange={(e) => valueUpdate(e.target.value)} />
        </>
    )
}

export default CardName