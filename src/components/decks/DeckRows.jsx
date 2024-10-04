import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import EditBnt from "../DeckEditBnt";
import DeckEditName from "./DeckEditName";
import DeckEditColors from "./DeckEditColors";
import DeckEditFormat from "./DeckEditFormat";

const DeckRows = ({ deckData, isNotPublic, onDelete, update }) => {
  const [deckName, setDeckName] = useState(deckData.deckName);
  const [deckcolor, setDeckColor] = useState(deckData.colors);
  const [deckFormat, setDeckFormat] = useState(deckData.format);
  const [isEditing, setisEditing] = useState(true);
  const [isUpdate, setIsUpdate] = useState(!update)

  useEffect(() => {
    // console.log("DeckRows update: ", isUpdate)
  }, [])

  

  const changeEditmode = () => {
    if (isEditing) {
      console.log(isEditing);
      setisEditing(!isEditing);
    } else {
      console.log(isEditing);
      setisEditing(!isEditing);
      axios.put("/api/update-deck", {
        id: deckData.id,
        deckName,
        deckcolor,
        deckFormat,
      });
    }
  };

  if(isUpdate) {
    // console.log("Update trigger")
    setIsUpdate(false)
    // setDeckName(deckData.deckName)
  }

  return (
    <>
      <tr className="hidden lg:table-row bg-primary border-b-2">
        <EditBnt
          deckId={deckData.id}
          clickEdit={changeEditmode}
          isPublic={isNotPublic}
          onDelete={onDelete}
          update={isUpdate}
        />
        <td className="p-4 text-[15px] text-primary-dark">
          <DeckEditName
            isEditing={isEditing}
            value={deckName}
            deckId={deckData.id}
            valueUpdate={setDeckName}
          />
        </td>
        <td className="p-4 text-[15px] text-primary-dark">
          <DeckEditColors
            isEditing={isEditing}
            value={deckcolor}
            valueUpdate={setDeckColor}
          />
        </td>
        <td className="p-4 text-[15px] text-primary-dark">
          <DeckEditFormat
            isEditing={isEditing}
            value={deckFormat}
            valueUpdate={setDeckFormat}
          />
        </td>
      </tr>

      <tr className="table-row lg:hidden bg-primary border-b-2">
        <EditBnt
          deckId={deckData.id}
          clickEdit={changeEditmode}
          isPublic={isNotPublic}
          onDelete={onDelete}
          update={isUpdate}
        />
        <td className="p-4 text-[15px] text-primary-dark">
          <DeckEditName
            isEditing={isEditing}
            value={deckName}
            deckId={deckData.id}
            valueUpdate={setDeckName}
          />
        </td>
        <td className="p-4 text-[15px] text-primary-dark">
          <DeckEditFormat
            isEditing={isEditing}
            value={deckFormat}
            valueUpdate={setDeckFormat}
          />
        </td>
      </tr>
    </>
    
  );
};

export default DeckRows;
