import React from 'react'

const DeckEditFormat= ({ value, isEditing, valueUpdate }) => {
  return isEditing ? (
    <div>{value}</div>
  ) : (
    <input type='text' value={value} onChange={(e) => valueUpdate(e.target.value)} />
  )
}

export default DeckEditFormat