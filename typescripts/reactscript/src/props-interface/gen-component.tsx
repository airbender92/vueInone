import React from 'react';
import ReactDOM from 'react-dom'

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>(props: Props<T>) {
  const {items, renderItem} = props;
  const [state, setState] = React.useState<T[]>([]);

  return (
    <div>
      {items.map(renderItem)}
    </div>
  )
}

ReactDOM.render(
  <List
    items={[1, 2, 3, 4]}
    renderItem={item => <li key={ item}>{item.toPrecision(3)}</li>}
  />,
  document.body
)