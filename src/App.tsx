import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import supabase from './config/supabase';
import { useKeyPress } from './hooks/useKeyPress';
import { useAutoFocus } from './hooks/useAutoFocus';
import './App.css';
import './loader.css';

enum WordState {
  Void,
  Valid,
  Invalid,
}

async function apiRequest(word: string) {
  const { data } = await supabase
    .from('words')
    .select('id, word')
    .eq('word', word);

  return data?.length === 1 && data[0].word === word;
}

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [word, setWord] = useState<string>('');
  const [wordState, setWordState] = useState<WordState>(WordState.Void);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useAutoFocus(inputRef.current);
  useKeyPress('Enter', async () => {
    if (!word) return;
    setIsLoading(true);

    const wordExists = await apiRequest(word);

    if (wordExists) {
      setWordState(WordState.Valid);
    } else {
      setWordState(WordState.Invalid);
    }

    setIsLoading(false);
  });

  const classNames = classnames({
    void: wordState === WordState.Void,
    valid: wordState === WordState.Valid,
    invalid: wordState === WordState.Invalid,
  });

  const stateIf = (condition: WordState, renderText: string | JSX.Element) => {
    return wordState === condition ? renderText : null;
  };

  useEffect(() => {
    setWordState(WordState.Void);
  }, [word]);

  return (
    <div id="root" className={classNames}>
      <div id="search-result">
        {stateIf(WordState.Void, 'натисни enter, за да провериш дума')}
        {stateIf(
          WordState.Valid,
          <span>
            <b>{word}</b> е валидна дума
          </span>
        )}
        {stateIf(
          WordState.Invalid,
          <span>
            <b>{word}</b> е невалидна дума
          </span>
        )}
      </div>
      <div className="flex-container">
        {isLoading && (
          <div className="loading-overlay">
            <span className="loader"></span>
          </div>
        )}
        <input
          ref={inputRef}
          id="search-input"
          onChange={(e) => setWord(e.target.value.toLowerCase())}
        />
      </div>
    </div>
  );
}

export default App;
