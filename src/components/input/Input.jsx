import React from 'react';

const Input = (props) => {
  return (
    <div>
        <input type="text" onChange={ props.onValueChange } value={props.value}></input>
    </div>
  );
}

export default Input;