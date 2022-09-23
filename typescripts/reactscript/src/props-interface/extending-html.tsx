import React from 'react';
export interface IBorderedBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
}

class BorderedBox extends React.Component<IBorderedBoxProps, void>{
  public render() {
    const { children, title, ...divAttributes } = this.props;
    return (
      <div {...divAttributes} style={{ border: '1px solid red' }}>
        <h1>{ title }</h1>
        { children }
      </div>
    )
  }
}
const myBorderedBox = <BorderedBox title='hello' onClick={() => alert('hello')} />
export default BorderedBox;