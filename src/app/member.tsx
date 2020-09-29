import React from 'react';
import { useStore } from './store';
import { Redirect } from 'react-router-dom';

const AoMember: React.FunctionComponent<{}> = () => {
  const aoStore = useStore();
	return <Redirect to={'/task/' + aoStore.member.memberId} />;
}

export default AoMember;
