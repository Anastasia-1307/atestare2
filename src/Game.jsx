import letters from './constants/letters.js'
import mystages from './constants/stages.js'
import words from './constants/words.js'
import {useState, useCallback, useEffect} from 'react'

function Game() {
    const [stages, setStages] = useState(mystages);
    const [selectedLetters, setLetters] = useState(letters);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [shuffledLetters, setShuffledLetters] = useState([]);
    const [showRestart, setShowRestart] = useState(false);
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [tries, setTries] = useState(0);
    const [button, setButton] = useState([]);

  


    const currentWord = words[currentIndex];


    const nextWord = useCallback(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setStages(0);
        setLetters(Array(letters[nextIndex].length).fill("_"));
        setShuffledLetters(shuffle([...words[nextIndex]]));
        setShowRestart(false);
        setMessage('');
   

    }, [currentIndex]);

    const shuffle = (array) => {
        return array.sort(() => Math.random - 0.7);
    }


    useEffect (() => {
        const shuffled = shuffle([...currentWord]);
        setShuffledLetters(shuffled);
        setLetters(Array(currentWord.length).fill("_"));
        setStages(0);
        setShowRestart(false);
        setMessage('');

    }, [currentWord]);



    useEffect (() => {
        const guessedWord = selectedLetters.join("");
        if(selectedLetters.every(letter => letter === "_")) return;

        if(guessedWord === currentWord) {
            setTitle("You win!");
            setMessage({currentWord});
            setStages(7);
            setShowRestart(true);
          
        }
        else {
            const nextTry = tries + 1;
            setTries(nextTry);
            setLetters(Array(currentWord.length).fill("_"));

        }
    }, [currentWord, selectedLetters, tries]);


    const select = (letter, index) => {
        const newLetters = [...selectedLetters];
        const firstIndex = newLetters.indexOf("_");
        if(firstIndex !== -1) {
            newLetters[firstIndex] = letter;
            setLetters(newLetters);
            setButton(index);
         

        }
    }

    const WordButton = ({letter, onClick, disable}) => {
        return <button onClick={onClick} disable={disable}>{letter}</button>
    }


    return (
        <>
        <h2 style={{color: title === 'YOU WIN' ? '' : title === 'YOU LOSE'}}>{title}</h2>
        <img src={stages[stages]}></img>

        <div>
            {selectedLetters.map((letter, index) => (
                <div key={index}>{letter}</div>
            ))}
        </div>
        <div>
            {shuffledLetters.map((letter, index) => (
                <WordButton key={`${letter}-${index}`} letter={letter} onClick={() => select(letter, index)}/>
            ))}
        </div>

        {showRestart && (
            <div>
                <p>{message}</p>
                <div>
                    <button onClick={nextWord}>TRY AGAIN</button>
                </div>
            </div>
        )}
        </>
    )

}

export default Game; 