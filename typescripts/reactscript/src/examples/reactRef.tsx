import React from 'react';

class MyComponent extends React.Component {

  private myref = React.createRef<HTMLDivElement>()

  componentDidMount(): void {
    // using ! to remove undefined|null from type definition
    const node = this.myref.current!
    node.focus();
  }

  focus() {
    const node = this.myref.current;
    node?.focus()
  }
  render(): React.ReactNode {
    return <div ref={this.myref}></div>
  }
}

class AutoFoucusTextInput extends React.Component {
  // create ref with explicit generic parameter, this time instance of MyComponent
  private textInput = React.createRef<MyComponent>()

  componentDidMount(): void {
    // @FIXME
    // non null assertion used, extract this logic to method!
    this.textInput.current!.focus()
  }

  render(): React.ReactNode {
    return <MyComponent ref={this.textInput} />
  }
}

type Props = {}

const CustomTextInput = (props: Props) => {
  // textInput must be declared here so the ref can ref to it
  const textInput = React.createRef<HTMLInputElement>()

  function handleClick() {
    if (textInput.current) {
      textInput.current.focus()
    }
  }

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  )
}


// =========Forwarding Refs==============
/**
 * Ref forwarding is a technique for automatically passing a ref through a component to one of its children
 */
type FancyProps = {
  children: React.ReactNode,
  type: 'submit' | 'button',
}

export type FancyRef = HTMLButtonElement;

export const FancyButton = React.forwardRef<FancyRef, FancyProps>((props, ref) => (
  <button ref={ref} type={props.type} className='FancyButton'>
    {props.children}
  </button>
))

const App = () => {
  // you can now get a ref directly to the DOM btn
  const ref = React.createRef<FancyRef>()
  return (
    <>
      <FancyButton type="button" ref={ref}>Click me</FancyButton>
    </>
  )
}