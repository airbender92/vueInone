import React, { Component, MouseEvent, ComponentType } from 'react';
import { isFunction, getHocComponentName } from '../utils'


const initialState = { show: false }

type State = Readonly<typeof initialState>

type Props<P extends object = object> = Partial<{
  children: RenderCallback | React.ReactNode
  render: RenderCallback
  component: ComponentType<ToggleableComponentProps<any>>
} & DefaultProps<P>>

type DefaultProps<P extends object = object> = { props: P };
const defaultProps: DefaultProps = { props: {} }

type RenderCallback = (args: ToggleableComponentProps) => JSX.Element
export type ToggleableComponentProps<P extends object = object> = {
  show: State['show'];
  toggle: Toggleable['toggle']
} & P


export class Toggleable<T extends object = object> extends Component<Props<T>, State> {
  readonly state: State = initialState

  static ofType<T extends object>() {
    // return Toggleable as Constructor<Toggleable<T>>
  }

  static readonly defaultProps: Props = defaultProps

  render() {
    const {
      component: InjectedComponent,
      children,
      render,
      props
    } = this.props;
    const renderProps = { show: this.state.show, toggle: this.toggle }
    
    if (InjectedComponent) {
      return (
        <InjectedComponent {...props} {...renderProps}>
          {children}
        </InjectedComponent>
      )
    }
    if (render) {
      return render(renderProps);
    }
    return isFunction(children) ? (children as any)(renderProps) : null
  }

  private toggle =(event: MouseEvent<HTMLElement>) => this.setState(updateShowState)
}

const updateShowState = (prevState: State) => ({ show: !prevState.show });
