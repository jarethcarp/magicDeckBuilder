import React from "react";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import DeckRows from "../components/decks/deckRows";
import DeckHeader from "../components/decks/DeckHeader";

const PublicDecks = () => {
  const { decks } = useLoaderData()
  const [sortedDecks, setSortedDecks] = useState(decks);
  const nav = useNavigate();
  

  const deckListItems = sortedDecks.map((deck) => {
    return <DeckRows key={deck.id} deckData={deck} isNotPublic={false} />;
  });

  
  const sortDecks = (sort) => {
    console.log("------------sortCards has been triggered------------");
    if (sort === 0) {
      console.log("Before Default Sort: ", sortedDecks);
      const decksSortedID = sortedDecks.sort((a, b) => {
        if (a.userId < b.userId) {
          return -1;
        }
        if (a.userId > b.userId) {
          return 1;
        }
        return 0;
      });
      setSortedDecks(decksSortedID);
      console.log("decks sorted by user id: ", sortedDecks);
      nav(`/public-decks`);
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
      console.log("decks sorted by name: ", sortedDecks);
      setSortedDecks(decksSortedName);
      nav(`/public-decks`);
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
      nav(`/public-decks`);
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
      nav(`/public-decks`);
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
                ID
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
        <table class="w-4/6 bg-primary">
          <DeckHeader isNotPublic={false} />
          <tbody class="whitespace-nowrap">{deckListItems}</tbody>
        </table>
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
        <table class="w-4/6 bg-primary">
          <DeckHeader isNotPublic={false} />
          <tbody class="whitespace-nowrap">{deckListItems}</tbody>
        </table>
      </div>
    </>
    
  );

};

export default PublicDecks;
