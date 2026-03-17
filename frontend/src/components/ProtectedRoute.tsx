import { Navigate } from 'react-router-dom';
import React from 'react';

interface Props {
    children: React.ReactNode;
    allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {

    const getUser = () => {
        try {
            return JSON.parse(localStorage.getItem('user') || '{}');
        }
        catch {
            return {};
        }
    };

    const user = getUser();
    const token = localStorage.getItem('token');

    if(!token) return <Navigate to = "/login" replace/>;
    if(!allowedRoles.includes(user.role)) return <Navigate to= "/unauthorized" replace/>;

    return <>{children}</>;
};