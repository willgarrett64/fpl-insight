import React, {useEffect, useState} from 'react';


function PlayerHeadToHeadTable({players, gamePeriod}) {
  let player1 = players[0];
  let player2 = players[1];

  switch (gamePeriod) {
    case "last10":
      player1 = players[0].last_10
      player2 = players[1].last_10

      break;
    case "last5":
      player1 = players[0].last_5
      player2 = players[1].last_5

      break;
    case "last3":
      player1 = players[0].last_3
      player2 = players[1].last_3
      break;
  }

  return (
    <table className="head-to-head-table table table-hover">
      <thead>
        <tr>
          <th>{player1.web_name}</th>
          <th>Stat</th>
          <th>{player2.web_name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{player1.team_short_name}</td>
          <td>TEAM</td>
          <td>{player2.team_short_name}</td>
        </tr>
        <tr>
          <td>{player1.position}</td>
          <td>POS</td>
          <td>{player2.position}</td>
        </tr>
        <tr>
          <td>{player1.now_cost}</td>
          <td>£</td>
          <td>{player2.now_cost}</td>
        </tr>
        <tr>
          <td>{player1.total_points}</td>
          <td>POINTS</td>
          <td>{player2.total_points}</td>
        </tr>
        <tr>
          <td>{player1.form}</td>
          <td>FORM</td>
          <td>{player2.form}</td>
        </tr>
        <tr>
          <td>{player1.selected_by_percent}</td>
          <td>%</td>
          <td>{player2.selected_by_percent}</td>
        </tr>
        <tr>
          <td>{player1.points_per_million}</td>
          <td>PpMIL</td>
          <td>{player2.points_per_million}</td>
        </tr>
        <tr>
          <td>{player1.goals_scored}</td>
          <td>G</td>
          <td>{player2.goals_scored}</td>
        </tr>
        <tr>
          <td>{player1.assists}</td>
          <td>A</td>
          <td>{player2.assists}</td>
        </tr>
        <tr>
          <td>{player1.clean_sheets}</td>
          <td>CS</td>
          <td>{player2.clean_sheets}</td>
        </tr>
        <tr>
          <td>{player1.bonus}</td>
          <td>B</td>
          <td>{player2.bonus}</td>
        </tr>
        <tr>
          <td>{player1.points_per_mins_played}</td>
          <td>PpMIN</td>
          <td>{player2.points_per_mins_played}</td>
        </tr>
        <tr>
          <td>{player1.points_per_game}</td>
          <td>PpGAME</td>
          <td>{player2.points_per_game}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_home}</td>
          <td>PpHOME</td>
          <td>{player2.avg_points_home}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_away}</td>
          <td>PpAWAY</td>
          <td>{player2.avg_points_away}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_fdr_2}</td>
          <td>PpFDR2</td>
          <td>{player2.avg_points_fdr_2}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_fdr_3}</td>
          <td>PpFDR3</td>
          <td>{player2.avg_points_fdr_3}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_fdr_4}</td>
          <td>PpFDR4</td>
          <td>{player2.avg_points_fdr_4}</td>
        </tr>
        <tr>
          <td>{player1.avg_points_fdr_5}</td>
          <td>PpFDR5</td>
          <td>{player2.avg_points_fdr_5}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default PlayerHeadToHeadTable;