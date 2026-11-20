'use client';

import React, { createContext, useContext } from 'react';

interface SiteReadyContextType {
  isReady: boolean;
}

const SiteReadyContext = createContext<SiteReadyContextType>({ isReady: true });

export const SiteReadyProvider: React.FC<{ isReady: boolean; children: React.ReactNode }> = ({
  isReady,
  children,
}) => {
  return <SiteReadyContext.Provider value={{ isReady }}>{children}</SiteReadyContext.Provider>;
};

export const useSiteReady = () => useContext(SiteReadyContext);
