import React from 'react';
import { Toggleable } from '../components/Toggleable';

const ToggleableButton = () => {
  return (
    <>
      <Toggleable>
        {
          ({ show, toggle }) => (
            <>
              <div onClick={toggle}>
                <h1>Some Title</h1>
              </div>
              {  show ? <p>some Content</p> : null }
            </>
          )
        }
      </Toggleable>
    </>
  )
}

const ToggleableRender = () => {
  return (
    <>
      <Toggleable
        render={
          ({ show, toggle}) => (
            <>
              <div onClick={toggle}>
                <h1>Some title</h1>
              </div>
              { show ? <p>Some Content</p> : null }
            </>
          )
        }
      />
    </>
  )
}

export default ToggleableButton