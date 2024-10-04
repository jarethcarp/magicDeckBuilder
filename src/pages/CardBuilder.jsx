import React from "react";
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  FaRegPlusSquare,
  FaCopy,
  FaShareAlt,
  FaBiohazard,
} from "react-icons/fa";
import CardRows from "../components/cardList/CardRows";
import CardHeader from "../components/cardList/cardHeader";
import { Modal } from "flowbite";

const CardBuilder = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [target, setTarget] = useState(false);
  const [url, setURL] = useState(window.location.href);
  let { cards } = useLoaderData();
  const [sortedCards, setSortedCards] = useState(cards);
  const [update, setUpdate] = useState(false);
  const nav = useNavigate();

  // --------------------------------------------------------------------------------I need to clean up the page --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------I need to clean up the page --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------I need to clean up the page --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------I need to clean up the page --------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------I need to clean up the page --------------------------------------------------------------------------------

  useEffect(() => {
    setTarget(document.getElementById("copy-modal")); // Make my modal's into a componet

    axios.get("/api/deck-check").then((res) => {
      if (res.data.success) {
        setIsPublic(true);
      } else {
        setIsPublic(false);
      }
    });
    if (cards[0]) {
      axios.get(`/api/cardList/${cards[0].cardLists[0].deckId}`).then((res) => {
        const cardsSortedID = res.data.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
        setSortedCards(cardsSortedID);
        console.log("cards sorted by id:", sortedCards);
        // setSortedCards(res.data)
        console.log("Updated database", res.data);
      });
    } else {
      console.log("cards[0]: ", cards[0])
      console.log("cards: ", cards)
    }
  }, []);

  const options = {
    placement: "bottom-right",
    backdrop: "dynamic",
    backdropClasses: "bg-gray-900/50 fixed inset-0 z-40",
    closable: true,
    onHide: () => {
      console.log("modal is hidden");
    },
    onShow: () => {
      console.log("modal is shown");
    },
    onToggle: () => {
      console.log("modal has been toggled");
    },
  };

  const instanceOptions = {
    id: "copy-modal",
    override: true,
  };

  let modal;
  if (target) {
    modal = new Modal(target, options, instanceOptions);
  }

  console.log("Start of CardBuilder");

  const deleteCard = (cardId) => {
    axios.post("/api/delete-card", { id: cardId }).then((res) => {
      if (res.data.success) {
        console.log("Deleted the card");
        nav(`/edit/${cards[0].cardLists[0].deckId}`);
        setUpdate(true);
      } else {
        console.log("Failed to delete Deck");
        //  nav(`/edit/${cards[0].cardLists[0].deckId}`)
      }
    });
  };

  const cardListItems = sortedCards.map((card) => {
    return (
      <CardRows
        key={card.id}
        cardData={card}
        isNotPublic={isPublic}
        update={update}
        onDelete={deleteCard}
      />
    );
  });

  const copyListItems = sortedCards.map((card) => {
    return (
      <>
        {card.cardLists[0].cardCount} {card.name} <br />
      </>
    );
  });

  const addCard = () => {
    console.log("add Card trigger");
    axios.post("/api/add-card").then((res) => {
      if (res.data && cards[0] !== undefined) {
        console.log("Trying to refresh - Start of if");
        // setUpdate(!update)
        console.log("Here is sortedCards: ", sortedCards);
        console.log("Here is the res from addCard: ", res.data);
        axios
          .get(`/api/cardList/${cards[0].cardLists[0].deckId}`)
          .then((res) => {
            setSortedCards(res.data);
            console.log("Updated database", res.data);
            nav(`/edit/${cards[0].cardLists[0].deckId}`);
          });
        console.log("Trying to refresh - End of if");
        // Set card Name to New Card and everything to null
      } else {
        console.log("Failed to make Card");
        console.log("Trying to refresh - else");
        // axios.get(`/api/cardList/${location.pathname}`).then((res) => {
        //   const cardsSortedID = res.data.sort((a, b) => {
        //     if (a.id < b.id) {
        //       return -1;
        //     }
        //     if (a.id > b.id) {
        //       return 1;
        //     }
        //     return 0;
        //   });
        //   setSortedCards(cardsSortedID);
        //   console.log("cards sorted by id:", sortedCards);
        //   // setSortedCards(res.data)
        //   console.log("Updated database", res.data);
        // })
        console.log(".", location.pathname)
        window.location.reload();
        nav(location.pathname);
      }
    });
    console.log("Here is sortedCards: ", sortedCards);
    console.log("Trying to refresh - End");
    setUpdate(true);
    // nav(`/edit/${cards[0].cardLists[0].deckId}`);
  };

  const sortCards = (sort) => {
    console.log("------------sortCards has been triggered------------");
    if (sort === 0) {
      console.log("Default Sort: ", sortedCards);
      const cardsSortedID = sortedCards.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      setSortedCards(cardsSortedID);
      console.log("cards sorted by id:", sortedCards);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else if (sort === 1) {
      console.log("cardCount Sort: ", sortedCards);
      const cardsSortedName = sortedCards.sort((a, b) => {
        if (a.cardLists[0].cardCount < b.cardLists[0].cardCount) {
          return -1;
        }
        if (a.cardLists[0].cardCount > b.cardLists[0].cardCount) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by the number of cards");
      setSortedCards(cardsSortedName);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else if (sort === 2) {
      console.log("Name Sort: ", sortedCards);
      const cardsSortedType = sortedCards.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Name");
      setSortedCards(cardsSortedType);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else if (sort === 3) {
      console.log("Type Sort: ", sortedCards);
      const cardsSortedType = sortedCards.sort((a, b) => {
        if (a.typeLine < b.typeLine) {
          return -1;
        }
        if (a.typeLine > b.typeLine) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Type");
      setSortedCards(cardsSortedType);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else if (sort === 4) {
      console.log("Mana cost Sort: ", sortedCards);
      const cardsSortedType = sortedCards.sort((a, b) => {
        if (a.cmc < b.cmc) {
          return -1;
        }
        if (a.cmc > b.cmc) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Mana Cost");
      setSortedCards(cardsSortedType);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else if (sort === 5) {
      console.log("Price Sort: ", sortedCards);
      const cardsSortedType = sortedCards.sort((a, b) => {
        if (
          +a.prices * a.cardLists[0].cardCount <
          +b.prices * b.cardLists[0].cardCount
        ) {
          return -1;
        }
        if (
          +a.prices * a.cardLists[0].cardCount >
          +b.prices * b.cardLists[0].cardCount
        ) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by Price");
      setSortedCards(cardsSortedType);
      nav(`/edit/${cards[0].cardLists[0].deckId}`);
    } else {
      console.log("Other");
      const cardsSortedID = sortedCards.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
      console.log("cards sorted by id");
      setSortedCards(cardsSortedID);
    }
  };

  console.log("End of Cardbuilder");

  return isPublic ? (
    <>
      <div className="hidden lg:flex flex-col items-center">
        <div className="flex content-center items-center flex-col">
          <div className="font-bold text-2xl">Sort</div>
          <div className="flex flex-row">
              <button
              className="mainButton"
              onClick={() => {
                sortCards(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(1);
              }}
            >
              Card Count
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(2);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(3);
              }}
            >
              Type
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(4);
              }}
            >
              Mana Cost
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(5);
              }}
            >
              Price
            </button>
          </div>
          
        </div>
        <table className="w-4/6 bg-primary">
          <CardHeader
            filter={sortCards}
            isNotPublic={isPublic}
            update={update}
          />
          <tbody className="whitespace-nowrap">{cardListItems}</tbody>
        </table>
        <div className="flex items-center justify-evenly content-center m-5">
          <FaRegPlusSquare
            className="size-5 hover:text-blue active:bg-black mx-3"
            onClick={() => {
              addCard();
            }}
          />
          <FaCopy
            data-modal-target="copy-modal"
            data-modal-toggle="copy-modal"
            className="size-5 text-primary-dark hover:text-blue active:bg-black mx-3"
            type="button"
            onClick={() => {
              modal.toggle();
            }}
          />

          <div className="popup">
            <FaShareAlt
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              className="text-primary-dark hover:text-blue active:bg-black mx-3"
            />
            <div className="popupText">copied</div>
          </div>
        </div>

        <div
          id="copy-modal"
          tabIndex={"-1"}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full h-auto">
            <div className="relative bg-blue dark:bg-gray-700 h-auto">
              <div className="p-4 md:p-5 space-y-4 h-auto">
                <div
                  id="multiliner"
                  className="text-base w-full h-full bg-primary"
                  contentEditable="true"
                >
                  {copyListItems}
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                  data-modal-hide="copy-modal"
                  type="button"
                  className="hover:text-primary active:text-gold navButton"
                  onClick={() => {
                    modal.hide();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden flex flex-col items-center">
        <div className="flex content-center items-center flex-col">
          <div className="font-bold text-2xl">Sort</div>
          <div className="flex flex-row">
            <button
              className="mainButton"
              onClick={() => {
                sortCards(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(1);
              }}
            >
              Card Count
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(2);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(5);
              }}
            >
              Price
            </button>
          </div>
        </div>
        <table className="w-4/6 bg-primary">
          <CardHeader
            filter={sortCards}
            isNotPublic={isPublic}
            update={update}
          />
          <tbody className="whitespace-nowrap">{cardListItems}</tbody>
        </table>
        <div className="flex items-center justify-evenly content-center m-5">
          <FaRegPlusSquare
            className="size-5 hover:text-blue active:bg-black mx-3"
            onClick={() => {
              addCard();
            }}
          />
          <FaCopy
            data-modal-target="copy-modal"
            data-modal-toggle="copy-modal"
            className="size-5 text-primary-dark hover:text-blue active:bg-gold mx-3"
            type="button"
            onClick={() => {
              modal.toggle();
            }}
          />
          <div className="popup">
            <FaShareAlt
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              className="text-primary-dark hover:text-blue active:bg-gold mx-3"
            />
            <div className="popupText">copied</div>
          </div>
        </div>

        <div
          id="copy-modal"
          tabIndex={"-1"}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full h-full "
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full h-auto">
            <div className="relative bg-blue rounded-lg dark:bg-gray-700 h-auto">
              <div className="p-4 md:p-5 space-y-4 h-auto">
                <div
                  id="multiliner"
                  className="text-base w-full h-full bg-primary"
                  contentEditable="true"
                >
                  {copyListItems}
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="copy-modal"
                  type="button"
                  className="hover:bg-primary active:bg-gold navButton"
                  onClick={() => {
                    modal.hide();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="hidden lg:flex flex-col items-center">
        <div className="flex content-center items-center flex-col">
          <div className="font-bold text-2xl">Sort</div>
          <div className="flex flex-row">
              <button
              className="mainButton"
              onClick={() => {
                sortCards(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(1);
              }}
            >
              Card Count
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(2);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(3);
              }}
            >
              Type
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(4);
              }}
            >
              Mana Cost
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(5);
              }}
            >
              Price
            </button>
          </div>
          
        </div>
        <table className="w-4/6 bg-primary">
          <CardHeader
            filter={sortCards}
            isNotPublic={isPublic}
            update={update}
          />
          <tbody className="whitespace-nowrap">{cardListItems}</tbody>
        </table>
        <div className="flex items-center justify-evenly content-center m-5">
          <FaCopy
            data-modal-target="copy-modal"
            data-modal-toggle="copy-modal"
            className="size-5 text-primary-dark hover:text-blue active:bg-gold mx-3"
            type="button"
            onClick={() => {
              modal.toggle();
            }}
          />

          <div className="popup">
            <FaShareAlt
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              className="text-primary-darkd hover:text-blue active:bg-gold mx-3"
            />
            <div className="popupText">copied</div>
          </div>
        </div>

        <div
          id="copy-modal"
          tabIndex={"-1"}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full h-auto">
            <div className="relative bg-blue rounded-lg dark:bg-gray-700 h-auto">
              <div className="p-4 md:p-5 space-y-4 h-auto">
                <div
                  id="multiliner"
                  className="text-base w-full h-full bg-primary"
                  contentEditable="true"
                >
                  {copyListItems}
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="copy-modal"
                  type="button"
                  className="hover:bg-primary active:bg-gold navButton"
                  onClick={() => {
                    modal.hide();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}

      <div className="lg:hidden flex flex-col items-center">
        <div className="flex content-center items-center flex-col">
          <div className="font-bold text-2xl">Sort</div>
          <div className="flex flex-row">
            <button
              className="mainButton"
              onClick={() => {
                sortCards(0);
              }}
            >
              Default
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(1);
              }}
            >
              Card Count
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(2);
              }}
            >
              Name
            </button>
            <button
              className="mainButton"
              onClick={() => {
                sortCards(5);
              }}
            >
              Price
            </button>
          </div>
        </div>
        <table className="w-4/6 bg-primary">
          <CardHeader
            filter={sortCards}
            isNotPublic={isPublic}
            update={update}
          />
          <tbody className="whitespace-nowrap">{cardListItems}</tbody>
        </table>
        <div className="flex items-center justify-evenly content-center m-5">
          <FaCopy
            data-modal-target="copy-modal"
            data-modal-toggle="copy-modal"
            className="size-5 text-primary-dark hover:text-blue active:bg-gold mx-3"
            type="button"
            onClick={() => {
              modal.toggle();
            }}
          />

          <div className="popup">
            <FaShareAlt
              onClick={() => {
                navigator.clipboard.writeText(url);
              }}
              className="text-primary-dark hover:text-blue active:bg-gold mx-3"
            />
            <div className="popupText">copied</div>
          </div>
        </div>

        <div
          id="copy-modal"
          tabIndex={"-1"}
          aria-hidden="true"
          className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full h-auto">
            <div className="relative bg-blue rounded-lg dark:bg-gray-700 h-auto">
              <div className="p-4 md:p-5 space-y-4 h-auto">
                <div
                  id="multiliner"
                  className="text-base w-full h-full bg-primary"
                  contentEditable="true"
                >
                  {copyListItems}
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="copy-modal"
                  type="button"
                  className="hover:bg-primary active:bg-gold navButton"
                  onClick={() => {
                    modal.hide();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardBuilder;
