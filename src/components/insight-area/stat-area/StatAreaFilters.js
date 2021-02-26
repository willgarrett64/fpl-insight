import React, { useEffect, useState } from 'react';

import Checkbox from './Checkbox';
import CheckboxAll from './CheckboxAll';
import NumberInput from './NumberInput';

const initPos = [1, 2, 3, 4];
const initTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function StatAreaFilters ({data, filters, setFilters}) {  
  const [name, setName] = useState('');
  const [positions, setPositions] = useState(initPos);
  const [teams, setTeams] = useState(initTeams);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(14);
  const [minTsb, setMinTsb] = useState(0);
  const [maxTsb, setMaxTsb] = useState(100);
  const [gamePeriod, setGamePeriod] = useState('all')


  // handleChange function for all form inputs
  const handleChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    const checkBoxFilter = (state, setState) => {
      if (state.includes(parseInt(value))) {
        setState(prev => {
          const newState = prev.filter(el => el != value);
          return newState
        })
      }
      if (!state.includes(parseInt(value))) {
        setState(prev => {
          return [...prev, parseInt(value)]
        })
      }
    }

    if (name === "positions") {
      checkBoxFilter(positions, setPositions)
    } else if (name === "teams") {
      checkBoxFilter(teams, setTeams)
    } else if (name === "nameInput") {
      setName(value)
    } else if (name === "minPrice") {
      setMinPrice(value)
    } else if (name === "maxPrice") {
      setMaxPrice(value)
    } else if (name === "minTsb") {
      setMinTsb(value)
    } else if (name === "maxTsb") {
      setMaxTsb(value)
    } else if (name === "gamePeriod") {
      setGamePeriod(value)
    }
  }

  // handleChange funtion for the select/deselect all tickboxes
  const handleAllChange = e => {
    const target = e.target;
    const name = target.name;

    if (name === "allPos") {
      if (positions.length === 4) {
        target.checked = false;
        setPositions([])
      } else {
        target.checked = true;
        setPositions(initPos)
      }
    } else if (name === "allTeams") {
      if (teams.length === 20) {
        target.checked = false;
        setTeams([])
      } else {
        target.checked = true;
        setTeams(initTeams)
      }
    }    
  }

  useEffect(() => {    
    setFilters({
      name: name,
      positions: positions,
      teams, teams,
      minPrice: minPrice,
      maxPrice: maxPrice,
      minTsb: minTsb,
      maxTsb: maxTsb,
      gamePeriod: gamePeriod
    })
  }, [name, positions, teams, minPrice, maxPrice, minTsb, maxTsb, gamePeriod])

  // Sets the "select/deselect all" checkbox at the indeterminate state if neither all nor none of the relevent boxes are checked
  useEffect(() => {
    const allPos = document.getElementById('allPos-checkbox');
    const allTeams = document.getElementById('allTeams-checkbox');

    if (positions.length > 0 && positions.length < 4) {
      allPos.indeterminate = true;
    } else {
      allPos.indeterminate = false;
    }

    if (teams.length > 0 && teams.length < 20) {
      allTeams.indeterminate = true;
    } else {
      allTeams.indeterminate = false;
    }
  }, [positions, teams])


  return (
    <div className="placeholder-box stat-filters">
      
      <div className="placeholder-box">
        <label>Search Name: </label>
        <input name="nameInput" type="text" placeholder="Search player" value={name} onChange={handleChange}></input>
        <br />
      </div>
      
      <div className="placeholder-box">
        <label>Positions: </label>
        <br />
        <CheckboxAll value="allPos" name="allPos" handleChange={handleAllChange} param={positions} length={4} />
        <div>
          {data.element_types.map(pos => {
            return <Checkbox label={pos.plural_name} value={pos.id} name="positions" handleChange={handleChange} checked={positions.includes(pos.id)} />
          })}
        </div>
      </div>
      
      <div className="placeholder-box">
        <label>Teams: </label>
        <br />
        <CheckboxAll value="allPos" name="allTeams" handleChange={handleAllChange} param={teams} length={20} />
        <div class="checkbox-holder">
          {data.teams.map(team => {
            return <Checkbox label={team.name} value={team.id} name="teams" handleChange={handleChange} checked={teams.includes(team.id)} />
          })}
        </div>
      </div>

      
      <div className="placeholder-box">
        <label>Price:</label>
        <br />
        <NumberInput label="Min" name="minPrice" handleChange={handleChange} min="0" max="14" step="0.1" defaultValue={minPrice} />
        <NumberInput label="Max" name="maxPrice" handleChange={handleChange} min="0" max="14" step="0.1" defaultValue={maxPrice} />
      </div>

      <div className="placeholder-box">
        <label>Owned By:</label>
        <br />
        <NumberInput label="Min" name="minTsb" handleChange={handleChange} min="0" max="100" step="5" defaultValue={minTsb} />
        <NumberInput label="Max" name="maxTsb" handleChange={handleChange} min="0" max="100" step="5" defaultValue={maxTsb} />
      </div>

      <div className="placeholder-box">
        <label>Game Period: </label>
        <br/>
        <select name="gamePeriod" value={gamePeriod} onChange={handleChange}>
          <option value="all">All Games</option>
          <option value="last10">Last 10 Games</option>
          <option value="last5">Last 5 Games</option>
          <option value="last3">Last 3 Games</option>
        </select>
      </div>
    </div>
  )
}

export default StatAreaFilters;