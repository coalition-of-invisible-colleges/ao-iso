import React from 'react';
import store from './store';
import { Redirect } from 'react-router-dom';

const AoMember: React.FunctionComponent<{}> = () => {
  const aoStore = store.store;
	return <Redirect to={'/task/' + aoStore.member.memberId} />;
}

export default AoMember;
