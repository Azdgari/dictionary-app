import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as DarkThemeIcon } from "./assets/icon-moon.svg";
import { ReactComponent as FontSelector } from "./assets/icon-arrow-down.svg";
import { ReactComponent as PlayButton } from "./assets/icon-play.svg"
import { ReactComponent as MagnifyingGlass } from "./assets/iconoir_search.svg";


function App() {

  const [word, setWord] = useState("cat");
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [source, setSource] = useState("");
  const inputRef = useRef(null)
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
          setError('Word not found');
          return;
        }

        const data = await response.json();
        const searchedWord = data[0].word;
        const meanings = data[0].meanings;
        const phonetics = data[0].phonetics;
        const synonyms = data[0].meanings[0].synonyms;
        const source = data[0].sourceUrls[0];

        setError(null);
        setWord(searchedWord);
        setMeanings(meanings);
        setPhonetics(phonetics);
        setSynonyms(synonyms);
        setSource(source);
      } catch (error) {
        setError('An error occured while fetching data');
      }
    };
    fetchData();
  }, [word])

  function changeWord(event) {
    event.preventDefault();
    setWord(inputRef.current.value);
  }

  // function changeWordHandler(newWord) {
  //   setWord(newWord);
  // }

  function playSound() {
    const audio = new Audio(phonetics[0].audio);
    audio.play();
  }

  function changeTheme() {
    const definitionsList = document.querySelectorAll(".definition");
    const root = document.documentElement;
    root.classList.toggle("dark");
    definitionsList.forEach(definition => {
      definition.classList.toggle("dark-text");
    });

  }


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
          <button className="theme-switch-group" onClick={changeTheme}>
            < DarkThemeIcon className="dark-theme-icon" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={changeWord} className="search p-3 px-6 rounded-full flex items-center justify-between bg-pale my-6 gap-8 light-text">
          <input ref={inputRef} type="text" placeholder="search" className="search-input bg-pale grow" />
          <button className="search-button" type="submit">
            <MagnifyingGlass className="search-icon" />
          </button>
        </form>
      </section>

      {/* Main Content */}
      <section className="contents">
        {error ? (
          <div className="error-message text-center font-inter text-3xl font-bold text-lightGrey">{error}</div>
        ) : (
          <>
            <div className="result-word-container flex items-center justify-between my-7">
              <div className="result-word flex-col space-y-2">
                <div className="word font-bold text-4xl font-lora">{word}</div>
                <div className="pronunciation font-inter text-purple text-2xl">{phonetics.length > 0 ? phonetics[0].text : ''}</div>
              </div>

              {/* Audio Button */}
              <button className="play-sound" onClick={playSound}>
                < PlayButton className="play-icon cursor-pointer rounded-full" />
              </button>
            </div>
            <div className="meaning-container">

              {/* Part of Speech */}
              {meanings.map((meaningGroup, index) => (<div className="holder" key={index}>
                <div className="part-of-speech-container flex mb-5" >
                  <div className="part-of-speech font-inter text-black text-lg mb-2 italic font-bold">{meaningGroup.partOfSpeech}
                  </div>
                  <div className="line border-t-2 w-full mt-3 ml-3"></div>
                </div>

                {/* Meaning */}
                <div className="meaning-content">
                  <div className="meaning-header font-inter font-regular text-lightGrey mb-3">Meaning</div>
                  <ul className="meanings list-disc font-inter font-regular text-lg leading-7 mb-5 ml-5 text-darkGrey" id="definitions">
                    {meaningGroup.definitions.slice(0, 5).map((definition, index) => (
                      <li className="def mb-3 dark-text" key={index}>{definition.definition}</li>
                    ))}
                  </ul>
                </div>
              </div>
              ))}

              {/* Synonyms */}
              <div className="synonyms-container flex items-left gap-7 py-3">
                <div className="synonyms-header font-inter font-regular text-lightGrey mb-3">Synonyms</div>
                <div className="synonyms font-inter text-purple font-bold">
                  {synonyms.length > 0 ? synonyms.slice(0, 5).join(', ') : ''}

                </div>
              </div>
            </div>

            {/* Footer */}
            <section className="footer" >
              < div className="sources-title font-inter font-regular text-lightGrey mb-1 underline decoration-solid decoration-lightGrey decoration-2">Source</div>
              <div className="sources font-inter font-regular text-navyBlack underline decoration-solid decoration-darkGrey dark-text">{source}
              </div>
            </section >

          </>
        )}
      </section >
      {/* {meanings[0]?.synonyms?.map((synonym, index) => (
                    <span
                      key={index}
                      className="synonyms font-inter text-purple font-bold"
                      onClick={() => changeWordHandler(synonym)}
                    >
                      {synonym}
                    </span>
                  ))} */}
    </div >
  )
}

export default App
