import React from 'react'
import { useState } from 'react'
import { FaRegPlusSquare, FaCopy } from "react-icons/fa"
import { Modal } from 'flowbite'
import WhiteMana from '../assets/WhiteMana'

const Home = () => {
  const [update, setUpdate] = useState(true)
  const $target = document.getElementById('default-modal')
  const cardSym = "W"
  const cardIMG = `https://svgs.scryfall.io/card-symbols/${cardSym}.svg`

  const options = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses:
        'bg-gray-900/50 fixed inset-0 z-40',
    closable: true,
    onHide: () => {
        console.log('modal is hidden');
    },
    onShow: () => {
        console.log('modal is shown');
    },
    onToggle: () => {
        console.log('modal has been toggled');
        setUpdate(!update)
    },
  }

  const instanceOptions = {
    id: 'default-modal',
    override: true
  }

  const modal = new Modal($target, options, instanceOptions)

  return (
    <div className='flex flex-col items-center'>
        <div className='m-5 font-bold text-2xl'>
            Welcome to Jareth's Magic the gathering Deckbuilder
        </div>
        <div className='m-5'>
            You can log in to see and make your own decks or go see what other people have made
        </div>
        
    </div>
  )
}



export default Home