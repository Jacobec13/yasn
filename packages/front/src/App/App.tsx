import * as React from "react";
import AuthProvider from "./auth/AuthProvider/AuthProvider";
import MainLayout from "./MainLayout/MainLayout";

export interface AppProps {

}

const App: React.FC<AppProps> = (props) => {
	return <AuthProvider><MainLayout /></AuthProvider>;
};

export default App;
