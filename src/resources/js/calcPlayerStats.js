import get from './fetch';
import statsLastGames from './statsLastGames'

// Take existing player stats from 'element-summary/id/' endpoint and add to it. 
async function calcPlayerStats(player, data) {
  const teams = data.teams;
  const allFixtures = data.fixtures;

  const playerFixtures = await get(`element-summary/${player.id}/`);
  
  const newPlayer = {...player};
  

  switch (player.element_type) {
    case 1:
      newPlayer.position = 'GKP';
      newPlayer.full_position = 'goalkeepers'
      break;
    case 2:
      newPlayer.position = 'DEF';
      newPlayer.full_position = 'defenders'
      break;
    case 3:
      newPlayer.position = 'MID';
      newPlayer.full_position = 'midfielders'
      break;
    case 4:
      newPlayer.position = 'FWD';
      newPlayer.full_position = 'forwards'
      break;
  }


  newPlayer.fixtures = playerFixtures; // All of players fixtures and results.
  newPlayer.now_cost = (player.now_cost / 10).toFixed(1); // .now_cost is 10* what is displayed in the game

  // Add points per million and points per (100) mins played. 
  newPlayer.points_per_million = (10* player.total_points / player.now_cost).toFixed(2);

  if (player.minutes) {
    newPlayer.points_per_mins_played = (100 * player.total_points / player.minutes).toFixed(2);
  } else {
    newPlayer.points_per_mins_played = 'n/a'
  }

  // Find the player's team based on team ID. Add both full team name (i.e. Arsenal) and short name (i.e. ARS) to the playerStats object.
  const playerTeam = teams.find(team => player.team === team.id);
  newPlayer.team_name = playerTeam.name;
  newPlayer.team_short_name = playerTeam.short_name;


  // Access past fixtures
  const history = newPlayer.fixtures.history;
  
  // Fixture difficulty rating (fdr) isn't available in the player's fixture stats, so we have the full fixtures array (of every fixture in the game) to find the fdr. 
  history.forEach(game => {
    const fixtureDetails = allFixtures.find(fixture => game.fixture === fixture.id);
    if (game.was_home) {
      game.difficulty = fixtureDetails.team_h_difficulty;
    } else {
      game.difficulty = fixtureDetails.team_a_difficulty;
    }
  })

  // Calculate average points for home/away games
  // Sort games by home and away, but only when player made appearance (mins > 0)
  const home = [];
  const away = [];
  history.forEach(game => {
    if (game.minutes) {
      if (game.was_home) {home.push(game.total_points);} 
      else {away.push(game.total_points);}
    };
  });
  
  // Calculate average points scored per home and away game (played).
  const avgPoints = arr => {
    const res = arr.reduce((a, b) => a + b, 0) / arr.length.toFixed(2);
    if (res) {
      return res.toFixed(2);
    } else {
      return 'n/a';
    }
  }


  newPlayer.avg_points_home = avgPoints(home);
  newPlayer.avg_points_away = avgPoints(away);


  // Calculate average points for each fixture difficult rating (FDR)
  const fdr = [[], [], [], [], []];
  history.forEach(game => {
    if (game.minutes) {
      fdr[game.difficulty - 1].push(game.total_points)
    };
  });
  newPlayer.avg_points_fdr_1 = avgPoints(fdr[0]);
  newPlayer.avg_points_fdr_2 = avgPoints(fdr[1]);
  newPlayer.avg_points_fdr_3 = avgPoints(fdr[2]);
  newPlayer.avg_points_fdr_4 = avgPoints(fdr[3]);
  newPlayer.avg_points_fdr_5 = avgPoints(fdr[4]);
  


  //Add objects for stats over last 3, 5 and 10 games
  newPlayer.last_3 = statsLastGames(3, newPlayer);
  newPlayer.last_5 = statsLastGames(5, newPlayer);
  newPlayer.last_10 = statsLastGames(10, newPlayer);


  return newPlayer;
};

export default calcPlayerStats;