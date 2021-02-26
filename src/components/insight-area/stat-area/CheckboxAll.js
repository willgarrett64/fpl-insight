import React, {useEffect, useState} from 'react';

import '../../../resources/css/checkbox.css'

function CheckboxAll({ value, name, handleChange, param, length }) {
  const checked = param.length === length;

  return (
    <div className="checkbox check-all">
      <label>Select/Deselect All </label>
      <input
        id={`${name}-checkbox`}
        type='checkbox'
        onChange={handleChange}
        value={value}
        name={name}
        checked={checked}
      >
      </input>
    </div>
  )
}

export default CheckboxAll