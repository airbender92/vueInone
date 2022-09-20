// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
import React from 'react';

interface WithLoadingProps {
  loading: boolean;
}

const withLaoding = <P extends object>(Component: React.ComponentType<P>) => 
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render(): React.ReactNode {
      const { loading, ...props } = this.props;
      return loading ? <LoadingSpinner /> : <Component {...props as P} />
    }
  }

  const LoadingSpinner = () => (<span>loading</span>)