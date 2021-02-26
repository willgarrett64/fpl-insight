import React, {useEffect, useState} from 'react';

import '../../../resources/css/checkbox.css'

function Checkbox({ label, value, name, handleChange, checked }) {

  return (
    <div className="checkbox">
      <label>{label}</label>
      <input
        id={`${name}-${value}-checkbox`}
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

export default Checkbox