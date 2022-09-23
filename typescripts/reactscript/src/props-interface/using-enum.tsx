import React from 'react';
import { ExtendedSelectableButton, SelectableButtonTypes } from './define-export-enum'

const App = () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <ExtendedSelectableButton
          text="Select me"
          type={SelectableButtonTypes.Important}
          action={
            (selected) => {
              console.log(selected)
            }
          }
        />
      </header>
    </div>
  )
}
export default App;