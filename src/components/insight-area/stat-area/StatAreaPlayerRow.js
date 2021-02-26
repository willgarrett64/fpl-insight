import React, {useEffect, useState} from 'react';


function StatAreaPlayerRow ({player, addH2H}) {    
  const handleClick = (e) => {
    const id = e.target.parentElement.id;
    addH2H(id);
  }
  
  return (
    <tr id={player.id} onDoubleClick={handleClick}>
      <th scope="row">{player.web_name}</th>
      <td>{player.team_short_name}</td>
      <td className={player.full_position}>{player.position}</td>
      <td>{player.now_cost}</td>
      <td>{player.total_points}</td>
      <td>{player.form}</td>
      <td>{player.selected_by_percent}</td>
      <td>{player.points_per_million}</td>
      <td>{player.goals_scored}</td>
      <td>{player.assists}</td>
      <td>{player.clean_sheets}</td>
      <td>{player.bonus}</td>
      <td>{player.points_per_mins_played}</td>
      <td>{player.points_per_game}</td>
      <td>{player.avg_points_home}</td>
      <td>{player.avg_points_away}</td>
      <td>{player.avg_points_fdr_2}</td>
      <td>{player.avg_points_fdr_3}</td>
      <td>{player.avg_points_fdr_4}</td>
      <td>{player.avg_points_fdr_5}</td>
    </tr>
  )
}

export default StatAreaPlayerRow;