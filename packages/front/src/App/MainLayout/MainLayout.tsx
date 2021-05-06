import * as React from "react";
import {AuthContext, AuthStatus} from "../auth/AuthContext";
import LogInForm from "../auth/LogInForm/LogInForm";

import {CssBaseline, AppBar, Toolbar, Typography, Container} from '@material-ui/core';

export interface MainLayoutProps {

}

const MainLayout: React.FC<MainLayoutProps> = (props) => {
	const {status} = React.useContext(AuthContext);

	const renderMainForm = () => {
		if (status === AuthStatus.UNAUTHORIZED) {
			return <LogInForm/>;
		}
		return null;
	};

	return <React.Fragment>
		<CssBaseline/>
		<AppBar position="relative">
			<Toolbar><Typography variant="h6">YASN</Typography></Toolbar>
		</AppBar>
		<main>
			<Container>
				<div>
					{renderMainForm()}
				</div>
			</Container>
		</main>
	</React.Fragment>;
};

export default MainLayout;
