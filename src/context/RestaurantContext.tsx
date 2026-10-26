import React, { createContext, useContext, useState, useEffect } from 'react';
import type { RestaurantSettings } from '../types/api';
import { settingsService } from '../services/settings.service';

interface RestaurantContextType {
  settings: RestaurantSettings | null;
  isLoading: boolean;
  isStoreOpen: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    settingsService
      .getSettings()
      .then((data) => {
        if (mounted) {
          setSettings(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isStoreOpen = settings?.orderAcceptanceEnabled !== false;

  return (
    <RestaurantContext.Provider value={{ settings, isLoading, isStoreOpen }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within a RestaurantProvider');
  }
  return context;
};
