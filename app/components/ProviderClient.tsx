'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../Store/store';

type ProviderClientProps = {
  children: ReactNode[] | ReactNode;
};

function ProviderClient({ children }: ProviderClientProps) {
  return <Provider store={store}> {children} </Provider>;
}

export default ProviderClient;
