import React, {Component, MouseEvent, ReactNode } from 'react'
import { withDefaultProps } from '../withComponents/withDefaultProps';

const defaultProps = {
  color: 'red'
}

type DefaultProps = typeof defaultProps;

type Props = {
  onClick(e: MouseEvent<HTMLElement>): void
  children?: ReactNode
} & DefaultProps

const ButtonViaClass = withDefaultProps(
  defaultProps,
  class Button extends Component<Props> {
    render() {
      const { onClick: handleClick, children, color } = this.props;
      return (
        <button style={{ color }} onClick={handleClick}>{ children } </button>
      )
    }
  }
)