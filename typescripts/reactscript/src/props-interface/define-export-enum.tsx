
import React, { useState } from 'react';

/**A set of groupped constants */
enum SelectableButtonTypes {
  Important = 'important',
  Optional = 'optional',
  Irrelevant = 'irrelevant'
}

interface IButtonProps {
  text: string;
  /**the type of button, pulled from the Enum SelectableButtonType */
  type: SelectableButtonTypes,
  action: (selected: boolean) => void
}

const ExtendedSelectableButton = ({ text, type, action }: IButtonProps) => {
  let [selected, setSelected] = useState(false)

  return (
    <button className= { "extendedSelectableButton " + type + (selected ? ' selected' : '') }
      onClick={_ => {
        setSelected(!selected)
        action(selected)
      }}  
  >
  {text}
    </button>
  )
}

export {
  ExtendedSelectableButton,
  SelectableButtonTypes
}