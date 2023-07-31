import { useState } from 'react'
import './App.css'
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as DarkThemeIcon } from "./assets/icon-moon.svg";
import { ReactComponent as FontSelector } from "./assets/icon-arrow-down.svg";
import { ReactComponent as PlayButton } from "./assets/icon-play.svg"
import { ReactComponent as MagnifyingGlass } from "./assets/iconoir_search.svg"


function App() {

  return (
    <div className="relative container mx-auto p-6">

      {/* Nav Bar/Header */}
      <section className="header">
        <div className="nav flex items-center justify-between space-x-6">
          < Logo className="logo mr-auto" />
          <div className="font-selector flex items-center">
            <div className="font-name hover:text-purple cursor-pointer">Sans Serif</div>
            < FontSelector className="ml-3" />
          </div>
          <div className="theme-switch-group">
            < DarkThemeIcon className="dark-theme-icon" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="search p-3 px-6 rounded-full flex items-center justify-between bg-pale my-6">
          <input type="text" placeholder="search" className="search-input bg-pale" />
          <button className="search-button">
            <MagnifyingGlass className="search-icon" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="contents">
        <div className="result-word-container flex items-center justify-between my-7">
          <div className="result-word flex-col space-y-2">
            <div className="word font-bold text-4xl font-lora">keyboard</div>
            <div className="pronunciation font-inter text-purple text-2xl">/kibɔd/</div>
          </div>
          <div className="play-sound">
            < PlayButton className="play-icon cursor-pointer rounded-full" />
          </div>
        </div>
        <div className="meaning-container">
          {/* Part of Speech */}
          <div className="part-of-speech-container flex mb-5">
            <div className="part-of-speech font-inter text-black text-lg mb-2 italic font-bold">noun</div>
            <div className="line border-t-2 w-full mt-3 ml-3"></div>
          </div>
          {/* Meaning */}
          <div className="meaning-content">
            <div className="meaning-header font-inter font-regular text-lightGrey mb-3">Meaning</div>
            <ul className="meanings list-disc font-inter font-regular text-lg leading-7 mb-5 ml-5 text-darkGrey">
              <li className="mb-3">(etc.) A set of keys used to operate a typewriter, computer etc.</li>
              <li className="mb-3">A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.</li>
              <li className="mb-3">A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.</li>
            </ul>
          </div>
          {/* Synonyms */}
          <div className="synonyms-container flex items-left gap-7">
            <div className="synonyms-header font-inter font-regular text-lightGrey mb-3">Synonyms</div>
            <div className="synonyms font-inter text-purple font-bold">electronic keyboard</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="footer">
        <div className="sources-title">Source</div>
        <div className="sources">https://en.wiktionary.org/wiki/keyboard
        </div>
      </section>
    </div>
  )
}

export default App
