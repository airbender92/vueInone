import React from 'react';
import { ToggleableComponentProps } from './Toggleable'

type MenuItemProps = { title: string, children: React.ReactNode }

const MenuItem: React.FunctionComponent<MenuItemProps & ToggleableComponentProps> = ({
  title,
  toggle,
  show,
  children,
}) => (
  <>
    <div onClick={toggle}>
      <h1>{ title }</h1>
    </div>
    { show ? children : null }
  </>
)

export default MenuItem