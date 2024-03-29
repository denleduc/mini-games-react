import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import {createHashRouter, RouterProvider, Navigate} from 'react-router-dom';
import './main.css';

import WelcomePage from './WelcomePage';
import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';
import EtchASketch from './games/EtchASketch';
import Game2048 from './games/2048';

const router = createHashRouter([
  {
    path: '/',
    element: <WelcomePage />
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        element: <Navigate to='/' />
      },
      {
        path: 'tic-tac-toe',
        element: <TicTacToe />
      },
      {
        path: 'rock-paper-scissors',
        element: <RockPaperScissors />
      },
      {
        path: 'etch-a-sketch',
        element: <EtchASketch />
      },
      {
        path: '2048',
        element: <Game2048 />
      }
    ]
  }
])

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
)
