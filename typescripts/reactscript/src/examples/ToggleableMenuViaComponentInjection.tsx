import React from 'react';
import MenuItem from '../components/MenuItem';
import { Toggleable } from '../components/Toggleable';

export type Props = {
  title: string
  children: React.ReactNode
}

 const ToggleableMenuViaComponentInjection: React.FunctionComponent<Props> = ({
  title, children
}) => (
  <Toggleable
    component={MenuItem}
    props={{ title }}
  >{children}</Toggleable>
 )

 export default ToggleableMenuViaComponentInjection