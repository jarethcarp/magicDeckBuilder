import React from 'react'
import { NavLink } from "react-router-dom";

const DeckEditName = ({ value, isEditing, valueUpdate, deckId }) => {
  return isEditing ? (
    <div>
        <NavLink className="hover:text-slate-500" to={`/edit/${deckId}`}>{value}</NavLink>
      </div>
  ) : (
    <>
      <input type='text' value={value} onChange={(e) => valueUpdate(e.target.value)} />
    </>
  )
  }

export default DeckEditName