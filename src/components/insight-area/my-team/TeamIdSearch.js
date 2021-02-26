import React, {useEffect, useState} from 'react';


function TeamIdSearch (props) {
  const [teamId, setTeamId] = useState('');
  
  const handleChange = (e) => {
    setTeamId(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setId(teamId);
    props.getTeam(teamId);
  }

  return(
    <form onSubmit={handleSubmit}>
      <input id="managerInput" type="text" placeholder="Enter manager ID" onChange={handleChange}/>
      <button type="submit" id="managerSubmit">Get Team</button>
    </form>
  )
}

export default TeamIdSearch;