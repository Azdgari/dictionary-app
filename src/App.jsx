import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ReactComponent as Logo } from "./assets/logo.svg";
import { ReactComponent as DarkThemeIcon } from "./assets/icon-moon.svg";
import { ReactComponent as FontSelector } from "./assets/icon-arrow-down.svg";
import { ReactComponent as PlayButtonHover } from "./assets/icon-play-hover.svg";
import { ReactComponent as PlayButtonDefault } from "./assets/icon-play-default.svg";
import { ReactComponent as MagnifyingGlass } from "./assets/iconoir_search.svg";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

function App() {

  const [word, setWord] = useState("");
  const [data, setData] = useState({
    meanings: [],
    phonetics: [],
    synonyms: [],
    source: "",
    error: false
  });
  const [font, setFont] = useState("sans-serif");
  const [audioBtnHovering, setAudioBtnHovering] = useState(false);
  const [inputIsEmpty, setInputIsEmpty] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkTheme]);

  useEffect(() => {
    setIsLoading(true)
    if (word === "") 
    {setIsLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
          throw new Error('Word not found')
          
        }

        const newData = await response.json();
      setData({
        meanings: newData[0].meanings,
        phonetics: newData[0].phonetics,
        synonyms: newData[0].meanings[0].synonyms,
        source: newData[0].sourceUrls[0],
        error: null
      });

        setShowWelcomeScreen(false);

      } catch (error) {
        setData(prevData => ({ ...prevData, error: error.message }));
        setShowWelcomeScreen(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [word])

  function changeWord(event) {
    event.preventDefault();
    const newWord = inputRef.current.value;
    if (newWord === "") {
      setInputIsEmpty(true);
      return;
    }
    setInputIsEmpty(false);
    setIsLoading(true);
    setWord(newWord);
  }

  function playSound() {
    const audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }

  function changeTheme() {
    setIsDarkTheme(!isDarkTheme);
  }

  function changeFont(event) {
    const selectedValue = event.target.value;
    setFont(selectedValue);
    console.log(font)
  }

  function reset() {
    setWord("");
    setInputIsEmpty(false);
    setShowWelcomeScreen(true);
    setIsLoading(false);
    inputRef.current.value = "";

   
  }

  return (
    <div className={`relative container mx-auto p-6 font-${font}`}>
      {/* Nav Bar/Header */}
      <section className="header">
        <div className="nav flex items-center justify-between space-x-6">
          < Logo className="logo mr-auto" onClick={reset} />

          {/* Font Selector */}
          <div className="relative inline-flex">
            <FontSelector />

            <select id="font" className=" hover:text-purple border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-purple focus:outline-none appearance-none"
              onChange={changeFont}>
              <option value="inter">Sans Serif</option>
              <option value="lora">Serif</option>
              <option value="inconsolata">Mono</option>
            </select>
          </div>

          {/* Theme Switch */}
          <button className="theme-switch-group" onClick={changeTheme}>
            < DarkThemeIcon className="dark-theme-icon moon-icon" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={changeWord} className="search p-3 px-6 rounded-full flex items-center justify-between bg-pale mt-6 mb-2 gap-8 light-text border hover:border-purple">
          <input id="search" ref={inputRef} type="text" placeholder="search" className="search-input bg-pale grow" />
          <button className="search-button" type="submit">
            <MagnifyingGlass className="search-icon" />
          </button>
        </form>
        {inputIsEmpty && <div className="error-message text-left text-1xl text-red  absolute">{"Oops, can't be empty..."}</div>}
      </section >

      {/* Main Content */}
      < section className="contents" >
        {showWelcomeScreen ? (
          <div className="welcome-screen">
            <div className="welcome-text text-center text-3xl font-bold text-lightGrey mt-10" > Welcome to the Dictionary</div>
            <div className="welcome-text text-center text-3xl font-bold text-lightGrey mt-10" > Search for a word to get started</div>
          </div>
         
        ) :  isLoading ? (
          <Box sx={{ width: '75%', marginTop: '15rem', marginRight: 'auto', marginLeft: 'auto' }}>
          <LinearProgress />
        </Box>
        ) : (
        
          data.error ? (
            <div className="error-message text-center text-3xl font-bold text-lightGrey mt-10" > {data.error}</div>
          ) : (
            <>
              <div className="result-word-container flex items-center justify-between my-7">
                <div className="result-word flex-col space-y-2">
                  <div className={`word font-bold text-4xl font-${font}`}>{word}</div>
                  <div className="pronunciation text-purple text-2xl">{data.phonetics.length > 0 ? data.phonetics[0].text : ''}</div>
                </div>

                {/* Audio Button */}
                <button className="play-sound"
                  onMouseEnter={() => setAudioBtnHovering(true)}
                  onMouseLeave={() => setAudioBtnHovering(false)}
                  onClick={playSound}>
                  {audioBtnHovering ? <PlayButtonHover className="play-icon cursor-pointer rounded-full" /> : <PlayButtonDefault className="play-icon cursor-pointer rounded-full" />}
                </button>
              </div>
              <div className="meaning-container">

                {/* Part of Speech */}
                {data.meanings.map((meaningGroup, index) => (<div className="holder" key={index}>
                  <div className="part-of-speech-container flex mb-5" >
                    <div className="part-of-speech text-black text-lg mb-2 italic font-bold dark-text">{meaningGroup.partOfSpeech}
                    </div>
                    <div className="line border-t-2 w-full mt-3 ml-3"></div>
                  </div>

                  {/* Meaning */}
                  <div className="meaning-content">
                    <div className="meaning-header font-regular text-lightGrey mb-3">Meaning</div>
                    <ul className="meanings list-disc font-regular text-lg leading-7 mb-5 ml-5 text-darkGrey" id="definitions">
                      {meaningGroup.definitions.slice(0, 5).map((definition, index) => (
                        <li className="def mb-3 dark-text" key={index}>{definition.definition}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                ))}

                {/* Synonyms */}
                <div className="synonyms-container flex items-left gap-7 py-3">
                  <div className="synonyms-header font-regular text-lightGrey mb-3">Synonyms</div>
                  <div className="synonyms text-purple font-bold">
                    {data.synonyms.length > 0 ? data.synonyms.slice(0, 5).join(', ') : ''}

                  </div>
                </div>
              </div>

              {/* Footer */}
              <section className="footer" >
                < div className="sources-title font-regular text-lightGrey mb-1 underline decoration-solid decoration-lightGrey decoration-2">Source</div>
                <a href={data.source} className="sources font-regular text-navyBlack underline decoration-solid decoration-darkGrey dark-text hover:decoration-purple hover:text-purple">{data.source}
                </a>
              </section >

            </>
          )
        )}
      </ section>

    </div >
  )
}

export default App