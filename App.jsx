import { useState } from 'react';
import './App.css';

function App() {
  const gridSize = 10;
  const totalTreasures = 5;
  const maxAttempts = 15;

  const [treasures, setTreasures] = useState(generateTreasures());
  const [attempts, setAttempts] = useState(maxAttempts);
  const [found, setFound] = useState([]);
  const [lastGuess, setLastGuess] = useState(null);

  function generateTreasures() {
    const treasureSet = new Set();
    while (treasureSet.size < totalTreasures) {
      const randomIndex = Math.floor(Math.random() * gridSize * gridSize);
      treasureSet.add(randomIndex);
    }
    return Array.from(treasureSet);
  }

  const handleGuess = (index) => {
    if (attempts <= 0 || found.length === totalTreasures || found.includes(index)) return;

    setLastGuess(index);

    if (treasures.includes(index)) {
      setFound([...found, index]);
    }

    setAttempts(attempts - 1);
  };

  const resetGame = () => {
    setTreasures(generateTreasures());
    setAttempts(maxAttempts);
    setFound([]);
    setLastGuess(null);
  };

  return (
    <div className="app">
      <h1>Cazador de Tesoros</h1>
      <div className="status">
        {found.length === totalTreasures
          ? '¡Ganaste! Encontraste todos los tesoros 🎉'
          : attempts <= 0
          ? '¡Perdiste! No te quedan intentos 😢'
          : `Intentos restantes: ${attempts}`}
      </div>
      <div className="board">
        {Array(gridSize * gridSize)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`cell ${
                found.includes(index) ? 'treasure' : lastGuess === index ? 'miss' : ''
              }`}
              onClick={() => handleGuess(index)}
            />
          ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Reiniciar Juego
      </button>
    </div>
  );
}

export default App;
