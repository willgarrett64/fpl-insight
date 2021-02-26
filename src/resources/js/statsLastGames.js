const statsLastGames = (noGames, player) => { 
  const allGames = player.fixtures.history
  const lastGames = allGames.slice(allGames.length - noGames);

  const newPlayer = {
    web_name: player.web_name,
    now_cost: player.now_cost,
    position: player.position,
    full_position: player.full_position,

    team_short_name: player.team_short_name,
    form: player.form,
    selected_by_percent: player.selected_by_percent
  }

  let totalPoints = 0;
  lastGames.forEach(game => totalPoints += game.total_points);
  newPlayer.total_points = totalPoints;

  let minutes = 0;
  lastGames.forEach(game => minutes += game.minutes)
  const pointsPerMillion = (totalPoints / player.now_cost).toFixed(2)
  newPlayer.minutes = minutes;

  let goals = 0;
  lastGames.forEach(game => goals += game.goals_scored);
  newPlayer.goals_scored = goals;

  let assists = 0;
  lastGames.forEach(game => assists += game.assists);
  newPlayer.assists = assists;

  let cleanSheets = 0;
  lastGames.forEach(game => cleanSheets += game.clean_sheets);
  newPlayer.clean_sheets = cleanSheets;

  let bonus = 0;
  lastGames.forEach(game => bonus += game.bonus);
  newPlayer.bonus = bonus;

  newPlayer.points_per_million = (totalPoints / newPlayer.now_cost).toFixed(2);

  if (minutes) {
    newPlayer.points_per_mins_played = (100 * totalPoints / minutes).toFixed(2);
  } else {
     newPlayer.points_per_mins_played = 'n/a'
  }

  newPlayer.points_per_game = (totalPoints / noGames).toFixed(2);




  // Calculate average points scored per home and away game (played).
  const avgPoints = arr => {
    const res = arr.reduce((a, b) => a + b, 0) / arr.length.toFixed(2);
    if (res) {
      return res.toFixed(2);
    } else {
      return 'n/a';
    }
  }



  const home = [];
  const away = [];
  lastGames.forEach(game => {
    if (game.minutes) {
      if (game.was_home) {home.push(game.total_points);} 
      else {away.push(game.total_points);}
    };
  });
  
  newPlayer.avg_points_home = avgPoints(home);
  newPlayer.avg_points_away = avgPoints(away);


  // Calculate average points for each fixture difficult rating (FDR)
  const fdr = [[], [], [], [], []];
  lastGames.forEach(game => {
    if (game.minutes) {
      fdr[game.difficulty - 1].push(game.total_points)
    };
  });
  newPlayer.avg_points_fdr_1 = avgPoints(fdr[0]);
  newPlayer.avg_points_fdr_2 = avgPoints(fdr[1]);
  newPlayer.avg_points_fdr_3 = avgPoints(fdr[2]);
  newPlayer.avg_points_fdr_4 = avgPoints(fdr[3]);
  newPlayer.avg_points_fdr_5 = avgPoints(fdr[4]);
 

  console.log(newPlayer);
  return newPlayer
}


export default statsLastGames;