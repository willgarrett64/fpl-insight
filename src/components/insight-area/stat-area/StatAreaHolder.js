import React, {useEffect, useState} from 'react';

import StatAreaTable from './StatAreaTable.js';
import StatAreaFilters from './StatAreaFilters.js';


import removeAccents from '../../../resources/js/removeAccents'


const initPos = [1, 2, 3, 4];
const initTeams = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const initPrice = [0, 14];
const initTsb = [0, 100];

function StatAreaHolder({ data, addH2H }) { 
  const [filters, setFilters] = useState({
    name: '',
    positions: initPos,
    teams: initTeams,
    gamePeriod: 'all',
    minPrice: initPrice[0],
    maxPrice: initPrice[1],
    minTsb: initTsb[0],
    maxTsb: initTsb[1]
  });
  const [sortedFilteredData, setSortedFilteredData] = useState(data.elements);
  const [sortedField, setSortedField] = useState('points_per_million');
  

  // filter players displayed every time the filters change
  useEffect(() => {
    const copiedData = [...data.elements]
      //filter by positions
      .filter(player => filters.positions.includes(player.element_type))
      //filter by teams
      .filter(player => filters.teams.includes(player.team))
      //filter by max/min costs
      .filter(player => parseFloat(player.now_cost) >= filters.minPrice && parseFloat(player.now_cost) <= filters.maxPrice)
      //filter by max/min selected by %
      .filter(player => parseFloat(player.selected_by_percent) >= filters.minTsb && parseFloat(player.selected_by_percent) <= filters.maxTsb)
      //filter by name
      .filter(player => removeAccents(player.web_name.toLowerCase()).includes(filters.name.toLowerCase()))

    // Map the data to the right game period (all/last 10/last 5/etc)
    let displayData;
    switch (filters.gamePeriod) {
      case "all":
        displayData = copiedData
        break;
      case "last10":
        displayData = copiedData.map(player => {
          return player.last_10
        })
        break;
      case "last5":
        displayData = copiedData.map(player => {
          return player.last_5
        })
        break;
      case "last3":
        displayData = copiedData.map(player => {
          return player.last_3
        })
        break;
    }
    
    // Finally, sort the data
    displayData.sort((a, b) => {
      const aNum = parseFloat(a[sortedField]);
      const bNum = parseFloat(b[sortedField]);

      if (a[sortedField] === 'n/a') {
        return 1;
      }
      if (b[sortedField] === 'n/a') {
        return -1;
      }
      if (aNum > bNum) {
        return -1;
      }
      if (aNum < bNum) {
        return 1;
      }
      return 0;
    })

    setSortedFilteredData(displayData)
  }, [filters, sortedField])



  return (
    <div className="placeholder-box content-area stat-area">
      <h2>Stat Area</h2>
      <div className="table-area">
        <div className="stat-table placeholder-box">
          <StatAreaTable data={sortedFilteredData} addH2H={addH2H} setSortedField={setSortedField} />
        </div>
        <StatAreaFilters data={data} filters={filters} setFilters={setFilters} />
      </div>
    </div>
  )
}

export default StatAreaHolder;