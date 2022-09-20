import { Component, ReactNode } from 'react';
import ToggleableMenu from './ToggleableMenu';
import ToggleableMenuViaComponentInjection from './ToggleableMenuViaComponentInjection';

export class Menu extends Component {
  render(): ReactNode {
    return (
      <>
        <ToggleableMenu title="First Menu">Some Content</ToggleableMenu>
        <ToggleableMenu title="Second Menu">Another Content</ToggleableMenu>
        <ToggleableMenu title="Third Menu">More Content</ToggleableMenu>
        <ToggleableMenuViaComponentInjection title='first menu'>some content</ToggleableMenuViaComponentInjection>
      </>
    )
  }
}