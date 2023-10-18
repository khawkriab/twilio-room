import React, { createContext, useContext, useReducer, useState } from 'react'
import { RoomType } from '../../types'
import { settingsReducer, initialSettings, Settings, SettingsAction } from './settings/settingsReducer'

export interface StateContextType {
    activeSinkId: string
    setActiveSinkId(sinkId: string): void
    settings: Settings
    dispatchSetting: React.Dispatch<SettingsAction>
    roomType?: RoomType
}

export const StateContext = createContext<StateContextType>(null!)

export default function AppStateProvider(props: React.PropsWithChildren<{}>) {
    const [activeSinkId, setActiveSinkId] = useState('default')
    const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings)

    const contextValue = {
        activeSinkId,
        setActiveSinkId,
        settings,
        dispatchSetting
    } as StateContextType

    return <StateContext.Provider value={contextValue}>{props.children}</StateContext.Provider>
}

export function useAppState() {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error('useAppState must be used within the AppStateProvider')
    }
    return context
}
