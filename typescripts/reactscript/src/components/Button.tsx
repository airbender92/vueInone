// https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935
import React, { MouseEvent, ReactNode } from 'react'
import { withDefaultProps } from '../withComponents/withDefaultProps';

const defaultProps = {
  color: 'red'
}

type DefaultProps = typeof defaultProps;

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  children?: ReactNode
} & DefaultProps

const Button = ({ onClick: handleClick, color, children}: Props) => (
  <button style={{ color }} onClick={handleClick}>{ children}</button>
)

const ButtonWithDefaultProps = withDefaultProps(defaultProps, Button);
export default ButtonWithDefaultProps