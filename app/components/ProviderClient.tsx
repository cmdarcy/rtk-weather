'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../Store/store';

type ProviderClientProps = {
  children: ReactNode[] | ReactNode;
};

/**
 * A provider component that wraps children in a Redux Provider.
 * @param {ProviderClientProps} props - The props for the provider component.
 * @returns {JSX.Element} The rendered provider component.
 */
function ProviderClient({ children }: ProviderClientProps) {
  return <Provider store={store}> {children} </Provider>;
}

export default ProviderClient;
