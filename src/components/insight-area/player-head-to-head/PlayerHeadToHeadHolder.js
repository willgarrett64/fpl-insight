import React, {useEffect, useState} from 'react';

import PlayerHeadToHeadTable from './PlayerHeadToHeadTable.js';


function PlayerHeadToHeadHolder({ players }) {
  const [gamePeriod, setGamePeriod] = useState('all')

  const handleChange = e => {
    const target = e.target;
    const value = target.value;
    setGamePeriod(value)
  }

  

  return (
    <div className="placeholder-box content-area player-head-to-head">
      <h2>Head To Head</h2>

      <div className="placeholder-box">
        <label>Game Period: </label>
          <br/>
          <select name="gamePeriod" value={gamePeriod} onChange={handleChange}>
            <option value="all">All Games</option>
            <option value="last10">Last 10 Games</option>
            <option value="last5">Last 5 Games</option>
            <option value="last3">Last 3 Games</option>
          </select>
      </div>
      
      <div className="head-to-head-table">
        <PlayerHeadToHeadTable players={players} gamePeriod={gamePeriod} />
      </div>
    </div>
  )
}

export default PlayerHeadToHeadHolder;