import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import { User, Decks, CardList, CardStore } from "./server/model.js";
import bcryptjs from "bcryptjs";

const app = express();
const port = "5173";
ViteExpress.config({ printViteDevServerHost: true });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({ secret: "StormCrow", saveUninitialized: true, resave: false })
);

const loginRequired = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
};

ViteExpress.listen(app, port, () =>
  console.log(
    `Watch out! The server is listening to you. It's in your walls on http://localhost:${port}`
  )
);

// Requests related to managing decks

app.get("/api/decks", loginRequired, async (req, res) => {
  if (req.session.userId) {
    const decks = await Decks.findAll({
      where: { userId: req.session.userId },
    });
    res.send(decks);
  }
  console.log("Finished /api/decks");
});

app.get("/api/all-decks", async (req, res) => {
  const decks = await Decks.findAll();
  res.send(decks);
});

app.post("/api/add-deck", async (req, res) => {
  if (req.session.userId) {
    const newDeck = await Decks.create({
      userId: req.session.userId,
      deckName: "New Deck",
      colors: "{C}",
      format: "Any",
    });

    console.log("Finished /api/add-deck");

    return res.send({
      success: true,
    });
  } else {
    return res.send({
      success: false,
    });
  }
});

app.post("/api/delete-deck", async (req, res) => {
  const { deckId } = req.body;
  console.log(deckId)
    const deck = await Decks.findOne({ where: { id: deckId } });
  if (deck !== null) {
    console.log(deck)
    console.log(deck.userId)
    if (deck.userId === req.session.userId) {
      console.log("Finished /api/delete-deck");
      Decks.destroy({ where: { id: deckId } });
      return res.send({
        success: true,
      });
    } else {
      console.log("Finished /api/delete-deck");
      return res.send({
        message: "Failed to delete",
        success: false,
      });
    }
  } else {
    return res.send({
      message: "Failed to delete",
      success: false,
    });
  }
  
});

app.put("/api/update-deck", async (req, res) => {
  console.log("Start of update");
  const { id, deckName, deckcolor, deckFormat } = req.body;
  const updateDeck = await Decks.findOne({ where: { id: id } });

  if (updateDeck.userId === req.session.userId) {
    console.log("Updating");
    Decks.update(
      {
        deckName: deckName,
        colors: deckcolor,
        format: deckFormat,
      },
      { where: { id: id } }
    );

    res.send(updateDeck);
  } else {
    console.log("Did not Finished /api/update-deck");
    d;
    return res.send({
      message: "Failed to update",
      success: false,
    });
  }

  // Decks.update(updateDeck, { id, deckName, deckcolor, deckFormat });
});

// Requests related to managing Cards

app.get("/api/cardList/:id", async (req, res) => {
  const { id } = req.params;
  req.session.deckId = +id;
  const deckList = await CardList.findAll({ where: { deckId: id } });
  const allCards = await CardStore.findAll({
    include: {
      model: CardList,
      select: ["cardCount"],
      where: { deckId: id },
      order: [["id", "DESC"]],
    },
  });
  // console.log(allCards);
  console.log(
    "#######################################   /api/cardList/:id was triggered   ########################################################"
  );
  allCards.map((card) => {
    //This will clean up CardList everytime someone gets a card list
    if (card.cardLists.length > 1) {
      for (let i = 0; i < card.cardLists.length - 1; i++) {
        CardList.destroy({ where: { id: card.cardLists[i].id } });
      }
    }
  });

  // Gets the list of names
  const newCard = deckList.map((id) => {
    return id.cardId;
  });

  // creates a new arry with all the cards in decklist with all of the information needed
  let newCardList = allCards.filter((newName) => newCard.includes(newName.id));

  res.send(newCardList);
});

app.get("/api/card-name/:name", async (req, res) => {
  const { name } = req.params;
  const card = await CardStore.findOne({ where: { name: name } });
  if (!card) {
    console.error(`There is no card in my database with the name ${name}`);
    return res.send({ success: false });
  } else {
    return res.send({ card, success: true });
  }
});

app.get("/api/cardList-name/:name", async (req, res) => {
  const { name } = req.params;
  const card = await CardList.findOne({ where: { cardName: name } });
  if (!card) {
    console.error(`There is no card in my database with the name ${name}`);
    return res.send({ success: false });
  } else {
    return res.send({ card, success: true });
  }
});

app.post("/api/add-card", async (req, res) => {
  console.log("Start of /api/add-card");
  const deckId = req.session.deckId;
  const decks = await Decks.findOne({where: {id: deckId}})
  if (req.session.userId === decks.userId) {
    const newCard = await CardList.create({
      deckId: deckId,
      cardId: 9999,
      cardName: `New Card`,
      cardCount: 1,
    });
    req.session.cardCount += 1;
    console.log("Finished /api/add-card");
    return res.send({
      card: newCard,
      success: true,
    });
  } else {
    console.log("Finished /api/add-card");
    return res.send({
      success: false,
    });
  }
});

app.post("/api/delete-card", async (req, res) => {
  const { id } = req.body;
  if (id !== null && id !== undefined) {
    const deck = await CardList.findOne({ where: { id: id } });
    if (deck.deckId === req.session.deckId) {
      console.log("Finished /api/delete-card");
      CardList.destroy({ where: { id: id } });
      return res.send({
        success: true,
      });
    } else {
      console.log("Finished /api/delete-card");
      return res.send({
        message: "Failed to delete",
        success: false,
      });
    }
  }
  return res.send({
    message: "Failed to delete",
    success: false,
  });
  
});

app.put("/api/update-cardStore", async (req, res) => { // Figure out how to add two faced cards
  const { scryfallData } = req.body;
  const name = scryfallData.name;
  const cmc = scryfallData.cmc;
  const imageUris = scryfallData.image_uris.normal;
  const manaCost = scryfallData.mana_cost;
  const typeLine = scryfallData.type_line;
  const colors = scryfallData.colors;
  const colorIdentity = scryfallData.color_identity;
  let prices = scryfallData.prices.usd;

  if (!prices) {
    prices = scryfallData.prices.usd_foil;
  }
  if (!prices) {
    prices = "0.00";
  }

  const newCard = await CardStore.create({
    name: name,
    imageUris,
    manaCost,
    cmc,
    typeLine,
    colors,
    colorIdentity,
    prices,
  });

  const fullCard = await CardStore.findOne({
    include: {
      model: CardList,
      select: ["cardCount"],
    },
    where: { name: name },
  });
  console.log(fullCard);

  return res.send({
    success: true,
    newCard: newCard,
    fullCard,
  });
});

app.put("/api/update-card", async (req, res) => {
  const { id, cardName, cardCount, cardId, deckId } = req.body.cardData;
  console.log(cardName, cardCount, cardId)
  CardList.update(
    {
      cardName,
      cardCount,
      cardId,
      deckId,
    },
    { where: { id: id } }
  );
  res.send({ success: true });
});

// Requests related to managing Users

app.get("/api/getUsers", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/api/session-check", async (req, res) => {
  if (req.session.userId) {
    console.log("Finished /api/session-check");
    return res.send({
      success: true,
      logged_in: true,
      userId: req.session.userId,
      deckId: +req.session.deckId,
    });
  } else {
    console.log("Finished /api/session-check");
    return res.send({
      message: "no user logged in",
      success: false,
    });
  }
});

app.get("/api/deck-check", async (req, res) => {
  if (req.session.userId && req.session.deckId) {
    const decks = await Decks.findOne({ where: { id: +req.session.deckId } });
    // console.log(decks)
    console.log("Finished /api/session-check");
    if (decks.userId === req.session.userId) {
      return res.send({
        success: true,
      });
    } else {
      return res.send({
        success: false,
      });
    }
  } else {
    console.log("Finished /api/deck-check");
    return res.send({
      success: false,
    });
  }
});

app.post("/api/auth", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user && bcryptjs.compareSync(password, user.password)) {
    req.session.userId = user.id;
    req.session.cardCount = 0;
    // user.logged_in = true
    res.json({ success: true, logged_in: true });
  } else {
    res.json({ success: false, logged_in: false });
  }

  console.log("Finished /api/auth");
});

app.post("/api/logout", (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" });
    console.log("Logout didn't work");
    console.log("req.session.userId: ", req.session.userId);
  } else {
    req.session.destroy();
    res.json({ success: true, logged_in: false });
  }
  console.log("Finished /api/logout");
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (await User.findOne({ where: { email: email } })) {
    console.log("Finished /api/register");
    return res.send({
      message: "email already exists",
      success: false,
    });
  }

  const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

  const newUser = await User.create({
    email: email,
    password: hashedPassword,
    logged_in: false,
    user_token: 99,
    token_experation: "Temp",
  });

  req.session.userId = newUser.id;

  console.log("Finished /api/register");

  return res.send({
    success: true,
    userId: req.session.userId,
  });
});

app.get("/api/user-info/:id", async (req, res) => {
    const { id } = req.params;
  console.log("Start of /api/user-info/:id");
  console.log("First: ", +id)
  if (req.session.userId) {
    console.log("Second", id)
      const findUser = await User.findOne({ where: { id: id } });

      console.log("Finished /api/user-info/:id");
      return res.send({
        success: true,
        email: findUser.email,
        id: findUser.id,
      });
      
  }

  console.log("End of /api/user-info/:id");

  return res.send({success: false})
  
});

app.put("/api/update-user", async (req, res) => {
  const { id, email, password } = req.body;
  console.log(password);
  console.log(email);
  if (password !== "") {
    const hashedPassword = bcryptjs.hashSync(
      password,
      bcryptjs.genSaltSync(10)
    );
    User.update(
      {
        email,
        password: hashedPassword,
      },
      { where: { id: id } }
    );
    return res.send({ success: true });
  } else {
    User.update(
      {
        email,
      },
      { where: { id: id } }
    );
    return res.send({ success: true });
  }
  
  return res.send({ success: false})

});
