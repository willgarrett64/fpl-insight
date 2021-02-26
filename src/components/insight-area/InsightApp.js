import React, {useEffect, useState} from 'react';

import MyTeamHolder from './my-team/MyTeamHolder.js';
import StatAreaHolder from './stat-area/StatAreaHolder.js';
import PlayerHeadToHeadHolder from './player-head-to-head/PlayerHeadToHeadHolder.js';


import calcPlayerStats from '../../resources/js/calcPlayerStats.js';
import get from '../../resources/js/fetch.js';


const blankPlayer = {
  "chance_of_playing_next_round": "",
  "chance_of_playing_this_round": "",
  "code": "",
  "cost_change_event": "",
  "cost_change_event_fall": "",
  "cost_change_start": "",
  "cost_change_start_fall": "",
  "dreamteam_count": "",
  "element_type": "",
  "ep_next": "",
  "ep_this": "",
  "event_points": "",
  "first_name": "",
  "form": "",
  "id": "",
  "in_dreamteam": "",
  "news": "",
  "news_added": "",
  "now_cost": "",
  "photo": "",
  "points_per_game": "",
  "second_name": "",
  "selected_by_percent": "",
  "special": "",
  "squad_number": "",
  "status": "",
  "team": "",
  "team_code": "",
  "total_points": "",
  "transfers_in": "",
  "transfers_in_event": "",
  "transfers_out": "",
  "transfers_out_event": "",
  "value_form": "",
  "value_season": "",
  "web_name": "Select Player",
  "minutes": "",
  "goals_scored": "",
  "assists": "",
  "clean_sheets": "",
  "goals_conceded": "",
  "own_goals": "",
  "penalties_saved": "",
  "penalties_missed": "",
  "yellow_cards": "",
  "red_cards": "",
  "saves": "",
  "bonus": "",
  "bps": "",
  "influence": "955.8",
  "creativity": "1006.5",
  "threat": "850.0",
  "ict_index": "281.4",
  "influence_rank": "",
  "influence_rank_type": "",
  "creativity_rank": "",
  "creativity_rank_type": "",
  "threat_rank": "",
  "threat_rank_type": "",
  "ict_index_rank": "",
  "ict_index_rank_type": "",
  "corners_and_indirect_freekicks_order": "",
  "corners_and_indirect_freekicks_text": "",
  "direct_freekicks_order": "",
  "direct_freekicks_text": "",
  "penalties_order": "",
  "penalties_text": "",
  "position": "",
  "fixtures": "",
  "points_per_million": "",
  "points_per_mins_played": "",
  "team_name": "",
  "team_short_name": "",
  "avg_points_home": "",
  "avg_points_away": "",
  "avg_points_fdr_1": "",
  "avg_points_fdr_2": "",
  "avg_points_fdr_3": "",
  "avg_points_fdr_4": "",
  "avg_points_fdr_5": ""
}


function InsightApp () {
  const [allData, setAllData] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    Promise.all([get('bootstrap-static/'), get('fixtures/')])
    .then(([data, fixtures]) => {
      data.fixtures = fixtures;
      data.currentGw = (data.events.find(gw => gw.is_current)).id;
      
      return Promise.all(data.elements.map(player => {
        return calcPlayerStats(player, data);
      }))
      .then(newElements   => {
        data.elements = newElements;
        return data
      })
    })
    .then(finalData => {
      setAllData(finalData);
      setDataLoaded(true);
    })
  }, []);


  const [myTeamLoaded, setMyTeamLoaded] = useState(true);

  const [headToHeadPlayers, setHeadToHeadPlayers] = useState([blankPlayer, blankPlayer]);

  const findPlayer = (id) => {
    const player = allData.elements.find(player => player.id === parseInt(id));
    return player;
  }

  const addToHeadToHead = (id) => {
    const player = findPlayer(id);
    
    const input = prompt('Select to add to H2H \n Left - 1\n Right - 2\nIgnore - Any other key');

    switch (input) {
      case '1':
        setHeadToHeadPlayers(prev => [player, prev[1]])
        break;
      case '2':
        setHeadToHeadPlayers(prev => [prev[0], player])
        break;
      default:
        break;
    }
  }


  if (!dataLoaded) {
    return (
      <main className="placeholder-box">
        <h2>Loading Data...</h2>
      </main>
    )
  } else if (!myTeamLoaded) {
    return (
      <main className="placeholder-box">
        {/* <EnterTeamId /> */}
      </main>
    )
  } else {
    return (
      <main className="placeholder-box">
        <MyTeamHolder data={allData} addH2H={addToHeadToHead} />
        <PlayerHeadToHeadHolder players={headToHeadPlayers}/>
        <StatAreaHolder data={allData} addH2H={addToHeadToHead} />
      </main>
    );
  }

  
}

export default InsightApp


