import React, {useEffect, useState} from 'react';


import StatAreaPlayerRow from './StatAreaPlayerRow.js'

function StatAreaTable ({data, addH2H, setSortedField}) {  
  return (
    <table className="table table-hover" id="stat-table">
      <thead>
        <tr>
          <th scope="row" className="top-right">PLAYER</th>
          <th>TEAM</th>
          <th>POS</th>
          <th onClick={() => setSortedField('now_cost')}>£</th>
          <th onClick={() => setSortedField('total_points')}>POINTS</th>
          <th onClick={() => setSortedField('form')}>FORM</th>
          <th onClick={() => setSortedField('selected_by_percent')}>%</th>
          <th onClick={() => setSortedField('points_per_million')}>PpMIL</th>
          <th onClick={() => setSortedField('goals_scored')}>G</th>
          <th onClick={() => setSortedField('assists')}>A</th>
          <th onClick={() => setSortedField('clean_sheets')}>CS</th>
          <th onClick={() => setSortedField('bonus')}>B</th>
          <th onClick={() => setSortedField('points_per_mins_played')}>PpMIN</th>
          <th onClick={() => setSortedField('points_per_game')}>PpGAME</th>
          <th onClick={() => setSortedField('avg_points_home')}>PpHOME</th>
          <th onClick={() => setSortedField('avg_points_away')}>PpAWAY</th>
          <th onClick={() => setSortedField('avg_points_fdr_2')}>PpFDR2</th>
          <th onClick={() => setSortedField('avg_points_fdr_3')}>PpFDR3</th>
          <th onClick={() => setSortedField('avg_points_fdr_4')}>PpFDR4</th>
          <th onClick={() => setSortedField('avg_points_fdr_5')}>PpFDR5</th>
        </tr>        
      </thead>
      <tbody>
        {data.map(player => {
          return (<StatAreaPlayerRow player={player} addH2H={addH2H} key={player.id} />)
        })}
      </tbody>

      
    </table>
  )
}

export default StatAreaTable;