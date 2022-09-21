import { Component, createRef, ReactNode, forwardRef, ComponentClass, RefObject} from 'react';

type Props = {
  label: string
  type: 'submit' | 'button'
  onClick: () => any
}

class FancyButton extends Component<Props> {
  private myRef = createRef<HTMLButtonElement>()

  focus() {
    if (this.myRef.current) {
      this.myRef.current.focus()
    }
  }

  render(): ReactNode {
    const { label, type, onClick } = this.props;
    return (
      <button
      className='FancyButton'
      type={type}
      onClick={onClick}
      ref={this.myRef}
      >
      {label}
      </button>
    )
  }
}

// ===========================
// (1)
// our hoc will consist of 2 Generic arguments that's gonna be need to set imperatively as ts cannot infer those unfortunately:
// 'T' - our component instance type that's gonna be set via ref forwarding
// 'OriginalProps' - Wrapped component props
const withPropsLogger = <T extends Component, OriginalProps extends object>(
  WrappedComponent: ComponentClass<OriginalProps>
) => {
  // (2)
  // we create PrivateProps type
  type PrivateProps = { forwardedRef: RefObject<T> }

  // (3)
  // Now our HOC component props will consist of both Original and Private
  type Props = OriginalProps & PrivateProps

  // (4)
  // our hoc wrapper class component implementation
  class WithPropsLogger extends Component<Props> {
    componentDidUpdate(prevProps: Props) {
      console.log('old Props：', prevProps)
      console.log('new Props: ', this.props)
    }

    render() {
      // we need to cast props to PrivateProps so we get 'forwardedRef' with proper type
      const {
        forwardedRef,
        ...restPropsTmp
      } = this.props
      // now we cast our rest props to proper type
      // all of this is unfortunately needed because ts issue with soreading Genertics
      const rest = restPropsTmp as OriginalProps;

      // set the custom prop 'forwardedRef' as a ref on Wrapped Component with all other props (OriginalProps)
      return <WrappedComponent ref={ forwardedRef} {...rest} />
    }
  }

  // (5)
  // we create RefForwardingFactory which will be passed to forwardRef
  // we need to do this because in the end we will need to turn of type checking for the implementation and make soource of truth 'forwardRef' generic arguments
  const RefForwardingFactory = (props: Props, ref: RefObject<T>) => (
    <WithPropsLogger {...props} forwardedRef={ ref } />
  )
  // (6)
  // finally we return our hoc with forwarding refs capabilities
  // type checking needs to e turned on for RefForwardingFactory as our type output is hadnled by forwardRef<T, OriginalProps>
  return forwardRef<T, OriginalProps>(RefForwardingFactory as any)
}

// ============================

const EnhancedFancyButton = withPropsLogger(FancyButton)

const App = () => {
  // ref is gonna be instance of FancyButton not withPropsLogger
  const ref = createRef<FancyButton>()

  const handleClick = () => {
    if (ref.current) {
      ref.current.focus()
    }
  }

  // the enhancedFancyButton component we is the withPropsLogger HOC.
  // Even though the rendered output will be the same
  // Our ref will now correctly point to FancyButton instead of the inner WithPropsLogger component !
  // this means we can call e.g. ref.current.foucs()

  return (
    <EnhancedFancyButton
      label='Click me'
      type="button"
      onClick={ handleClick}
      ref={ref}
    />
  )
}
