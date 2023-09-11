import { useState, useEffect } from 'react'

export default function Tile({ id, value, service }) {
  let [visible, setVisible] = useState(false)
  let [matched, setMatched] = useState(false)

  useEffect(() => {
    // Send a guess event to the state machine after a tile is clicked on
    if (visible && !matched) {
      service.send({
        type: 'guess',
        id,
      })

      // Subscribe to the state machine for further state changes
      // Only tiles that are part of a turn will listen for changes
      const { unsubscribe } = service.subscribe((state) => {
        // If the turn is over i.e. game is in 'idle' state, check if the tile has been matched
        // If not a match then hide the tile after a short delay
        if (state.matches('idle')) {
          state.context.match[id] === 0
            ? setTimeout(() => setVisible(false), 1000)
            : setMatched(true)
        }
      })

      // Clean up the subscription once the turn is over
      return unsubscribe
    }
  })

  return (
    <div
      className="tile"
      onClick={
        !visible
          ? (e) => {
              setVisible(true)
            }
          : null
      }
    >
      {visible && value}
    </div>
  )
}
