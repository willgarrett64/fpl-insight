import React, {useEffect, useState} from 'react';

function PlayerRow(props) {
  const handleClick = (e) => {
    const id = e.target.parentElement.id;
    console.log(e);
    props.addH2H(id);
  }

  return (
    <tr className="playerRow" id={props.player.id} key={props.player.key} onDoubleClick={handleClick}>
      <td>{props.player.web_name}</td>
      <td>{props.player.team_short_name}</td>
      <td>{props.player.now_cost}</td>
      <td>{props.player.total_points}</td>
      <td>{props.player.points_per_million}</td>
    </tr>
  )
}

export default PlayerRow