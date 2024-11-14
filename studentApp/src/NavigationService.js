import React, { createRef } from "react";
import { NavigationContainerRef } from '@react-navigation/native'


export const navigationRef = createRef < NavigationContainerRef > ()

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params)
}