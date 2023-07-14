import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function PreStartGame(props) {
  const {startGame, setTargetScore, targetScore} = props;
  const {t} = useTranslation();

  return(
    <div>
      <p>Choose the number of points needed to win! / {t('rps_choose_score')}</p>
      <button 
        onClick={startGame} 
        disabled={
          isNaN(targetScore) === true 
          ? true 
          : targetScore < 1 
          ? true 
          : false
        }
      >
        Start Game / {t('rps_start_game_btn')}
      </button>
      <input type="number" min={1} onChange={(e) => {setTargetScore(e.target.value)}}/>
    </div>
  )
}

function GameScreen(props) {
  const {scoreGoal, endGame} = props;
  const {t} = useTranslation();

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState(undefined);
  const [computerMove, setComputerMove] = useState(undefined);
  const [moveWinner, setMoveWinner] = useState(undefined);

  const moves = {
    rock: ["scissors"],
    paper: ["rock"],
    scissors: ["paper"]
  };

  function checkWinner(move1, move2) {
    if (move1 === move2) {
      return 0; //Tie
    } else if (moves[move1].includes(move2)) {
      return 1; //Player wins
    } else if (moves[move2].includes(move1)) {
      return 2; //Computer wins
    }

    return undefined;
  }

  function makeRandomMove() {
    const choices = Object.keys(moves);
    const chosenIndex = Math.floor(Math.random() * 3);

    return choices[chosenIndex];
  }

  function handleMove(playerChosenMove) {
    let newComputerMove = makeRandomMove();
    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    setPlayerMove(playerChosenMove);
    setComputerMove(newComputerMove);
    
    const won = checkWinner(playerChosenMove, newComputerMove)
    setMoveWinner(won);

    switch (won) {
      case 1:
        setPlayerScore(playerScore + 1);
        newPlayerScore += 1;
        break;
      case 2:
        setComputerScore(computerScore + 1);
        newComputerScore += 1;
        break;
      default:
        break;
    }

    if (newPlayerScore >= scoreGoal || newComputerScore >= scoreGoal) {
      endGame(newPlayerScore >= scoreGoal ? 1 : 2);
    }
  }

  function Player(props) {
    const {name, score, lastAction} = props;
    return(
      <div>
        <p>{name}</p>
        <p>Score: / {t('rps_gameScreen_playerObj_score')} {score}</p>
        <p>Last action: / {t('rps_gameScreen_playerObj_lastAction')} {lastAction}</p>
      </div>
    )
  }

  return(
    <div>
      <h1>The first to reach {scoreGoal} points wins! / {t('rps_gameScreen_scoreGoal', {scoreGoal})}</h1>
      <Player name="Player 1" score={playerScore} lastAction={playerMove} />
      <Player name="Player 2" score={computerScore} lastAction={computerMove} />
      <p>
        The last move winner is: 
        {moveWinner === undefined 
        ? "No one yet" 
        : moveWinner === 1 
        ? "Player 1" 
        : moveWinner === 2 
        ? "Computer" 
        : moveWinner === 0 
        ? "It's a tie!" 
        : "Something wrong happened"}
      </p>
      <div className="buttons">
        <button className="rock" onClick={() => {handleMove("rock")}}>Pierre</button>
        <button className="paper" onClick={() => {handleMove("paper")}}>Feuille</button>
        <button className="scissors" onClick={() => {handleMove("scissors")}}>Ciseaux</button>
      </div>
    </div>
  )
}

function GameEnded(props) {
  const {resetGame, finalWinner} = props;
  const { t } = useTranslation();
  return(
    <div>
      <h1>Game finished</h1>
      <h2>The final winner is {finalWinner === 1 ? t("rps_winner_player") : finalWinner === 2 ? t("rps_winner_computer") : "undefined"}</h2>
      <button onClick={resetGame}>Reset</button>
    </div>
  )
}

function RockPaperScissors(props) {
  useEffect(() => {
    document.title = "Rock Paper Scissors | Bussun";
  }, []);
  
  const [gameState, setGameState] = useState(0); // 0 Not started; 1 Started; 2 Finished
  const [wantedScore, setWantedScore] = useState(undefined);
  const [finalWinner, setFinalWinner] = useState(undefined); // 1 for player one, 2 for computer/player 2

  const setTargetScore = (score) => {
    setWantedScore(Number.parseInt(score));
  }

  const startGame = () => {
    setGameState(1);
  }
  const endGame = (winner) => {
    setFinalWinner(winner);
    setGameState(2);
  }
  const resetGame = () => {
    setGameState(0);
    setWantedScore(undefined);
    setFinalWinner(undefined);
  }

  return (
    <div id="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      {gameState === 0 ? <PreStartGame startGame={startGame} setTargetScore={setTargetScore} targetScore={wantedScore} /> : <></>}
      {gameState === 1 ? <GameScreen scoreGoal={wantedScore} endGame={endGame} /> : <></> }
      {gameState === 2 ? <GameEnded resetGame={resetGame} finalWinner={finalWinner} /> : <></> }
    </div>
  );
}

export default RockPaperScissors;
