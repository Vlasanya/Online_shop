import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

export type MenuState = {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;
  isDashboardDrawerOpened: boolean;
  isComponentDrawerOpened: boolean;
};

const initialState: MenuState = {
  openedItem: "dashboard",
  openedComponent: "buttons",
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true,
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard'
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isOpen: boolean) {
  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuState | undefined) => {
      if (!currentMenuMaster) return;
      return { ...currentMenuMaster, isDashboardDrawerOpened: isOpen };
    },
    false
  );
}

export function handlerActiveItem(openedItem: string) {

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuState | undefined) => {
      if (!currentMenuMaster) return;
      return { ...currentMenuMaster, openedItem };
    },
    false
  );
}
