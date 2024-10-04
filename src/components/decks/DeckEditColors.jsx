import React from "react";

const DeckEditColors = ({ value, isEditing, valueUpdate }) => {
  let id = 0;
  const cleanUp = (mana) => {
    const cleanMana = mana
      .replace("/", "")
      .replaceAll("{", "")
      .replaceAll("}", " ");
    return cleanMana;
  };
  const cleanMana = cleanUp(value);

  const manaArr = cleanMana.split(" ").filter((cha) => cha !== "");

  const manaList = manaArr.map((mana) => {
    const manaImg = `https://svgs.scryfall.io/card-symbols/${mana}.svg`;
    id++
    return <img key={id} className="size-6" src={manaImg} alt={mana} />;
  });

  return isEditing ? (
    <div className="flex">{manaList}</div>
  ) : (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => valueUpdate(e.target.value)}
      />
    </>
  );
};

export default DeckEditColors;
