import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class AoDiscardZone extends React.PureComponent {
	constructor(props) {
		super(props)
    this.state = {}
  }

  render() {
		return (
      <div></div>
    );
  }
}
