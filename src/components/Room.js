import React from 'react';
import { generateTiles } from '../lib/tileGenerator'
import Hero from './characters/Hero'

const Room = ({ level }) => {

  const {playerPos, tiles} = generateTiles(level)

  const grid = tiles.map(row => console.log(row) ||
    <div className="room-tile-row">
    { row
      .map(Tile => <Tile />)
    }
    </div>
  )

  return (
    // @TODO RESTRUCTURE THIS POC
    <div className="game">
      <h2>Level: { level }</h2>
      <div className="room">
        { grid }
        <Hero />
      </div>

    </div>
  );
}

export default Room;
