import React, {useEffect, useState} from 'react';

import PlayerRow from './PlayerRow.js';

function MyTeamPosition (props) {
  return (
    <tbody className="teamPosition">
      <tr>
        <th className={props.className} colSpan="5">{props.position}</th>
      </tr>
      {props.players.map(player => {
        return (<PlayerRow 
          player={player}
          key={player.id}
          addH2H={props.addH2H}
        />)
      })}
    </tbody>
  )
}

export default MyTeamPosition
