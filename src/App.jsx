import { useState, useEffect } from 'react'
import { useInterpret } from '@xstate/react'
import stateMachine from './stateMachine.js'
import Tile from './components/Tile.jsx'
import './App.css'

function Message({ service }) {
  let [win, setWin] = useState(false)

  useEffect(() => {
    const { unsubscribe } = service.subscribe((state) => {
      if (state.matches('win')) setWin(true)
    })

    return unsubscribe
  })

  return <div>{!win ? 'Game in progress' : 'Game finished!'}</div>
}

function App() {
  // Start the state machine interpreter and generate the game board
  const service = useInterpret(stateMachine)
  const tiles = service.initialState.context.tiles

  return (
    <>
      <div id="tiles">
        {tiles.map((tile, index) => {
          return <Tile key={index} id={index} value={tile} service={service} />
        })}
      </div>
      <Message service={service} />
    </>
  )
}

export default App
