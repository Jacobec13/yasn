import * as React from 'react';

export enum AuthStatus {
	LOGGED_IN = 'LOGGED_IN',
	UNAUTHORIZED = 'UNAUTHORIZED'
}

export interface AuthState {
	status: AuthStatus;
	login?: string;
}

export interface AuthContextType extends AuthState {
	logInCb: (login: string) => void;
	logOffCb: () => void;
}

export const AuthContext = React.createContext<AuthContextType>({
	status: AuthStatus.UNAUTHORIZED,
	logInCb: () => null,
	logOffCb: () => null,
});
