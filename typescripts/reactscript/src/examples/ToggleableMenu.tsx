import React from 'react';
import { Toggleable } from '../components/Toggleable';
import MenuItem from '../components/MenuItem'

export type Props = {
  title: string
  children: React.ReactNode
}

const ToggleableMenu: React.FunctionComponent<Props> = ({ title, children }) => (
  <Toggleable
    render={({ show, toggle }) => (
      <>
        <div onClick={toggle}>
          <h1>{ title }</h1>
        </div>
        { show ? children : null}
    </>)}
  />
)

const ToggleableMenu2: React.FunctionComponent<Props> = ({ title, children }) => (
  <Toggleable
    render={({ show, toggle }) => (
      <MenuItem show={show} toggle={toggle} title={title}>{ children}</MenuItem>
    )}
  />
)

export default ToggleableMenu