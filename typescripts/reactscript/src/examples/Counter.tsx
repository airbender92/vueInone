import React from 'react';
import makeCounter, { InjectedCounterProps } from '../withComponents/injector-hoc'

interface CounterProps extends InjectedCounterProps {
  style?: React.CSSProperties;
}

const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);
const EnhancedMakeCounter = makeCounter(Counter)
export default EnhancedMakeCounter;


const CounterUsage = () => (
  <EnhancedMakeCounter maxValue={100} minValue={20} />
)

