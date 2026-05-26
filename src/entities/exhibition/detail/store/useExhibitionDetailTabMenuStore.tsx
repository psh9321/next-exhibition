import { create } from 'zustand'

interface USE_TAB_MENU_STORE {
    currentTab : TAB_MENU_STATUS;
    SetCurrentTab : (currentTab : TAB_MENU_STATUS) => void;
}

export const useExhibitionDetailTabMenuStore = create<USE_TAB_MENU_STORE>((set) => ({
    currentTab : 'info',
    SetCurrentTab(currentTab) { set({ currentTab }) }
}))