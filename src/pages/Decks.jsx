import React from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import DeckRows from "../components/decks/deckRows";
import DeckHeader from "../components/decks/DeckHeader";
import { FaRegPlusSquare } from "react-icons/fa";

const Decks = () => {
  const nav = useNavigate();
  const { decks } = useLoaderData();
  const [sortedDecks, setSortedDecks] = useState(decks);
  const [update, setUpdate] = useState(false);
  // const [tempid, setTempId] = useState(10)

  const addDeck = () => {
    axios.post("/api/add-deck").then((res) => {
      if (res.data.success) {
        console.log("Added Deck")
        setUpdate(true);
        nav("/decks");
        window.location.reload();
      } else {
        console.log("Failed to make Deck");
      }
    });
  };

  const deleteDeck = (deckId) => {
    axios.post("/api/delete-deck", { deckId: deckId }).then((res) => {
      if (res.data.success) {
        // console.log("deleted bnt");
        // console.log(update)
        nav("/decks");
        setUpdate(true);
        window.location.reload();
        // console.log(update)
      } else {
        // console.log("Failed to delete Deck");
        // console.log(update)
        nav("/decks");
        setUpdate(true);
        window.location.reload();
        // console.log(update)
      }
    });
  };

  const deckListItems = sortedDecks.map((deck) => {
    return <DeckRows key={deck.id} deckData={deck} isNotPublic={true} onDelete={deleteDeck} update={update} />;
  });

  const sortDecks = (sort) => {
    console.log("------------sortCards has been triggered------------");
    if (sort === 0) {
      console.log("Before Default Sort: ", sortedDecks);
      const decksSortedID = sortedDecks.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      setSortedDecks(decksSortedID);
      console.log("decks sorted by id: ", sortedDecks);
      nav(`/decks`);
    } else if (sort === 1) {
      console.log("Before Name Sort: ", sortedDecks);
      const decksSortedName = sortedDecks.sort((a, b) => {
        if (a.deckName < b.deckName) {
          return -1;
        }
        if (a.deckName > b.deckName) {
          return 1;
        }
        return 0;
      });
      console.log("decks sorted by name");
      setSortedDecks(decksSortedName);
      nav(`/decks`);
    } else if (sort === 2) {
      console.log("Type Sort: ", sortedDecks);
      const decksSortedType = sortedDecks.sort((a, b) => {
        if (a.colors < b.colors) {
          return -1;
        }
        if (a.colors > b.colors) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Type");
      setSortedDecks(decksSortedType);
      nav(`/decks`);
    } else if (sort === 3) {
      console.log("Type Sort: ", sortedDecks);
      const decksSortedType = sortedDecks.sort((a, b) => {
        if (a.format < b.format) {
          return -1;
        }
        if (a.format > b.format) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Type");
      setSortedDecks(decksSortedType);
      nav(`/decks`);
    } else {
      console.log("Other");
      const decksSortedID = sortedDecks.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by id");
      setSortedDecks(decksSortedID);
    }

  };

  return (
    <>
      <div className="hidden lg:flex flex-col items-center">
          <div className="flex content-center items-center flex-col">
            <div className="font-bold text-2xl">Sort</div>
            <div className="flex flex-row">
              <button
              className="mainButton"
              onClick={() => {
                sortDecks(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(1);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(2);
              }}
            >
              Colors
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(3);
              }}
            >
              Format
            </button>
          </div>
        </div>
        <table className="w-4/6 bg-primary">
          <DeckHeader isNotPublic={true} />
          <tbody className="whitespace-nowrap">{deckListItems}</tbody>
        </table>
        <FaRegPlusSquare
          className="size-5 hover:text-blue active:bg-black m-5"
          onClick={() => addDeck()}
        />
      </div>

      <div className="lg:hidden flex flex-col items-center">
          <div className="flex content-center items-center flex-col">
            <div className="font-bold text-2xl">Sort</div>
            <div className="flex flex-row">
              <button
              className="mainButton"
              onClick={() => {
                sortDecks(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(1);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(2);
              }}
            >
              Colors
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortDecks(3);
              }}
            >
              Format
            </button>
          </div>
        </div>
        <table className="w-4/6 bg-primary">
          <DeckHeader isNotPublic={true} />
          <tbody className="whitespace-nowrap">{deckListItems}</tbody>
        </table>
        <FaRegPlusSquare
          className="size-5 hover:text-blue active:bg-black m-5"
          onClick={() => addDeck()}
        />
      </div>
    </>
    
    
  );
};

export default Decks;
