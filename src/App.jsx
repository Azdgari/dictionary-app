import { useState } from 'react'
import './App.css'
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as DarkThemeIcon } from "./assets/icon-moon.svg";
import { ReactComponent as FontSelector } from "./assets/icon-arrow-down.svg";
import { ReactComponent as PlayButton } from "./assets/icon-play.svg"

function App() {

  return (
    <div>
      <section className="header">
        <div className="nav">
          < Logo />
          <div className="font-selector">
            Sans Serif
            < FontSelector />
          </div>
          <div className="theme-switch-group">
            <button className="theme-switch"></button>
            < DarkThemeIcon className="dark-theme-icon" />
          </div>
        </div>
        <div className="search">
          <input type="text" placeholder="search" />
          <button className="search-button"></button>
        </div>
      </section>
      <section className="contents">
        <div className="word-container">
          <div className="word">keyboard</div>
          <div className="pronunciation">/kibɔd/</div>
          <div className="play-sound">
            < PlayButton />
          </div>
        </div>
        <div className="meaning-container">
          <div className="part-of-speech">noun</div>
          <div className="meaning-content">
            <div className="meaning-header">Meaning</div>
            {/* bullet points */}
          </div>
          <div className="synonyms-container">
            <div className="synonyms-header">Synonyms</div>
            <div className="synonyms">electronic keyboard</div>
          </div>
        </div>
      </section>
      <section className="footer">
        <div className="sources-title">Source</div>
        <div className="sources">https://en.wiktionary.org/wiki/keyboard
        </div>
      </section>
    </div>
  )
}

export default App
