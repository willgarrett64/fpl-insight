import React, {useEffect, useState} from 'react';

import MyTeamPosition from './MyTeamPosition.js'

function MyTeamTable (props) {
  if (props.teamLoaded) {
    return (
      <table className="teamTable" id="my-team">
        <thead>
          <tr>
            <th>PLAYER</th>
            <th>TEAM</th>
            <th>£</th>
            <th>POINTS</th>
            <th>PpMIL</th>
          </tr>
        </thead>

        <MyTeamPosition 
          players={props.team[0]}
          position="Goalkeepers"
          className="goalkeepers"
          addH2H={props.addH2H}
        />
        <MyTeamPosition 
          players={props.team[1]}
          position="Defenders"
          className="defenders"
          addH2H={props.addH2H}
        />
        <MyTeamPosition 
          players={props.team[2]}
          position="Midfielders"
          className="midfielders"
          addH2H={props.addH2H}
        />
        <MyTeamPosition 
          players={props.team[3]}
          position="Forwards"
          className="forwards"
          addH2H={props.addH2H}
        />
      </table>
    )
  } else {
    return (
      <table className="teamTable" id="my-team">
      <thead>
        <tr>
          <th>Player</th>
          <th>Team</th>
          <th>Price</th>
          <th>Points</th>
          <th>PPM</th>
        </tr>
      </thead>
      <tbody className="teamPosition">
        <tr>
          <th className="goalkeepers" colSpan="5">Goalkeepers</th>
        </tr>
        <tr><td colSpan="5"><em>Goalkeeper 1</em></td></tr>
        <tr><td colSpan="5"><em>Goalkeeper 2</em></td></tr>
      </tbody>
      <tbody className="teamPosition">
        <tr>
          <th className="defenders" colSpan="5">Defenders</th>
        </tr>
        <tr><td colSpan="5"><em>Defender 1</em></td></tr>
        <tr><td colSpan="5"><em>Defender 2</em></td></tr>
        <tr><td colSpan="5"><em>Defender 3</em></td></tr>
        <tr><td colSpan="5"><em>Defender 4</em></td></tr>
        <tr><td colSpan="5"><em>Defender 5</em></td></tr>
      </tbody>
      <tbody className="teamPosition">
        <tr>
          <th className="midfielders" colSpan="5">Midfielders</th>
        </tr>
        <tr><td colSpan="5"><em>Midfielder 1</em></td></tr>
        <tr><td colSpan="5"><em>Midfielder 2</em></td></tr>
        <tr><td colSpan="5"><em>Midfielder 3</em></td></tr>
        <tr><td colSpan="5"><em>Midfielder 4</em></td></tr>
        <tr><td colSpan="5"><em>Midfielder 5</em></td></tr>
      </tbody>
      <tbody className="teamPosition">
        <tr>
          <th className="forwards" colSpan="5">Forwards</th>
        </tr>
        <tr><td colSpan="5"><em>Forward 1</em></td></tr>
        <tr><td colSpan="5"><em>Forward 2</em></td></tr>
        <tr><td colSpan="5"><em>Forward 3</em></td></tr>
      </tbody>
        
      </table>
    )
  }
}

export default MyTeamTable;