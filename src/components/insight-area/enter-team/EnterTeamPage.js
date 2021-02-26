import React, {useEffect, useState} from 'react';

import TeamIdSearch from '../my-team/TeamIdSearch.js';
import EnterTeamInstructions from './EnterTeamInstructions.js';

function EnterTeamPage (props) {

  return(
    <div>
      <TeamIdSearch setId={props.setManagerId} getTeam={props.getTeam} />
      <EnterTeamInstructions />
    </div>
  )
}

export default EnterTeamPage;