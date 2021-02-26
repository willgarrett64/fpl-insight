import React, {useEffect, useState} from 'react';

function EnterTeamInstructions () {
  return(
    <div>
      <ol>
        <li>Log into <a href='fantasy.premierleague.com/' target=''>fantasy.premierleague.com/</a></li>
        <li>Navigate to the "Points" tab</li>
        <li>From the URL at the top, copy the numbers after 'entry/'</li>
      </ol>
      <p>Note: This can only be done from the website and NOT the app</p>
      <img src="./step-2-manager-id.png" />
    </div>
  )
}

export default EnterTeamInstructions;