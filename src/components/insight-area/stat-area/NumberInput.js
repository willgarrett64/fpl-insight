import React, {useEffect, useState} from 'react';

function NumberInput({ label, name, handleChange, min, max, step, defaultValue }) {

  return (
    <div>
      <label>{label}: </label>
      <input
        type="number"
        onChange={handleChange}
        name={name}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
      >
      </input>
    </div>
  )
}

export default NumberInput