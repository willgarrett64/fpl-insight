import React, {useEffect, useState} from 'react';


import MyTeamTable from './MyTeamTable.js';
import TeamIdSearch from './TeamIdSearch.js';

import get from '../../../resources/js/fetch.js'


function MyTeamHolder({data, addH2H}) {
  const [teamName, setTeamName] = useState("Please Load Team");
  const [teamLoaded, setTeamLoaded] = useState(false);
  const [managerId, setManagerId] = useState('');
  const [team, setMyTeam] = useState([[],[],[],[]]);

  const returnPlayer = (id) => {
     // Find the player by searching id number in list of players
    const player = data.elements.find(player => player.id === id);
    return player;
  }
  
  const getTeam = (teamId) => {
    // Set the Team Name
    get(`entry/${teamId}/`).then(res => setTeamName(res.name));
    // Get the most recent squad
    get(`entry/${teamId}/event/${data.currentGw}/picks/`).then(res => {
      const team = [[], [], [], []];
      const picks = res.picks;
      
      picks.forEach(player => {
        const playerStats = returnPlayer(player.element);
        team[playerStats.element_type - 1].push(playerStats);
      });
      setTeamLoaded(true)
      setMyTeam(team)
    });
  }


  return (
    <div className="placeholder-box content-area my-team">
      <h2>{teamName}</h2>
      <TeamIdSearch setId={setManagerId} getTeam={getTeam} />
      <div className="my-team-table">
        <MyTeamTable
          team={team}
          teamLoaded={teamLoaded}
          addH2H={addH2H}
        />
      </div>
    </div>
  )
}

export default MyTeamHolder;