import React from 'react';

import { UserContextApi } from './context';
import { ToastContext } from './toastContext';

export const RootContext = ({ children }) => {

    return (
        <UserContextApi>
            <ToastContext>
                {children}
            </ToastContext>
        </UserContextApi>
    )
}
