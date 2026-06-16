import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Tab = 'home' | 'reserve' | 'delivery' | 'care' | 'mypage';

interface ActiveTabContextProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const ActiveTabContext = createContext<ActiveTabContextProps | undefined>(undefined);

export const ActiveTabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};

export const useActiveTab = () => {
  const ctx = useContext(ActiveTabContext);
  if (!ctx) {
    throw new Error('useActiveTab must be used within ActiveTabProvider');
  }
  return ctx;
};
