import * as React from "react";
import {AuthContext, AuthState, AuthStatus} from "../AuthContext";

export interface AuthProviderProps {

}

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [authState, setAuthState] = React.useState<AuthState>({status: AuthStatus.UNAUTHORIZED});

	const logIn = (login: string) => setAuthState({
		login, status: AuthStatus.LOGGED_IN
	});

	const logOff = () => setAuthState({status: AuthStatus.UNAUTHORIZED});

	return <AuthContext.Provider value={{...authState, logInCb: logIn, logOffCb: logOff}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
