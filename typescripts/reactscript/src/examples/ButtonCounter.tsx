import { Component } from 'react'
import ButtonWithDefaultProps from '../components/Button';
const initialState = { clicksCount: 0 };

type State = Readonly<typeof initialState>

class ButtonCounter extends Component<State> {
  readonly state: State = initialState

  // doBadThings = () => {
  //   this.state = { clicksCount: 12 };
  //   this.state.clicksCount = 1232
  // }

  render() {
    const { clicksCount } = this.state;
    return (
      <>
        <ButtonWithDefaultProps onClick={this.handleIncrement}>Increment</ButtonWithDefaultProps>
        <ButtonWithDefaultProps onClick={this.handleDecrement}>Decrement</ButtonWithDefaultProps>
        You've clicked me { clicksCount} times!
      </>
    )
  }

  private handleIncrement = () => this.setState(incrementClicksCount)
  private handleDecrement = () => this.setState(decrementClicksCount)
}

const incrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount + 1 })
const decrementClicksCount = (prevState: State) => ({ clicksCount: prevState.clicksCount - 1 })

export default ButtonCounter