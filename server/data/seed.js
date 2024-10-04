import axios from "axios";
import { User, Decks, CardList, CardStore, db } from "../model.js";
import deckData from "./deckData.json" assert { type: "json" };
import cardListData from "./cardList.json" assert { type: "json" };
import CardStoreData from "./cardStore.json" assert { type: "json" };

import bcryptjs from "bcryptjs";

console.log("Creating database");

const hashedPassword = bcryptjs.hashSync("password", bcryptjs.genSaltSync(10));

await db.sync({ force: true });

const usersToCreate = [];
for (let i = 0; i < 10; i++) {
  const email = `user${i}@test.com`;
  usersToCreate.push(
    User.create({
      email: email,
      password: hashedPassword,
      logged_in: false,
      user_token: i,
      token_experation: "Temp",
    })
  );
}

const usersInDB = await Promise.all(usersToCreate);
// console.log(usersInDB);

const decksInDB = await Promise.all(
  deckData.map((deck) => {
    const { userId, deckName, colors, format } = deck;

    const newDeck = Decks.create({
      userId: userId,
      deckName: deckName,
      colors: colors,
      format: format,
    });

    return newDeck;
  })
);

// console.log(decksInDB);
console.log("Start of Card Store")

const cardStoreDB = await Promise.all(
  CardStoreData.map((cardInfo) => {
    const {
      name,
      cmc,
    } = cardInfo;

    const imageUris = cardInfo.image_uris.normal
    const manaCost = cardInfo.mana_cost
    const typeLine = cardInfo.type_line
    const colors = cardInfo.colors
    const colorIdentity = cardInfo.color_identity
    let prices = cardInfo.prices.usd

    if (!prices) {
      prices = cardInfo.prices.usd_foil
    }
    if (!prices) {
      prices = "0.00"
    }

    const newCard = CardStore.create({
      name,
      imageUris,
      manaCost,
      cmc,
      typeLine,
      colors,
      colorIdentity,
      prices,
    });

    return newCard
  })
);

console.log("Start of Card list");
const cardListInDB = await Promise.all(
  cardListData.map((cardList) => {
    const { deckId, cardId, cardName, cardCount } = cardList;
    const newCardList = CardList.create({
      deckId: deckId,
      cardId: cardId,
      cardName: cardName,
      cardCount: cardCount,
    });

    return newCardList;
  })
);


await db.close();
console.log("finished");
