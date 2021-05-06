import * as React from "react";
import {AuthContext} from "../../auth/AuthContext";
import {CreatePostDTO, Post} from "@yasn/api";
import axios from "axios";
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import PostCard from "./PostCard/PostCard";

export interface UserCardProps {

}

const UserCard: React.FC<UserCardProps> = (props) => {
	const {login} = React.useContext(AuthContext);

	const [newMessage, setNewMessage] = React.useState<string>('');

	const [currentLogin, setCurrentLogin] = React.useState<string>(login!);
	const [loginValue, setLoginValue] = React.useState<string>('');
	const [posts, setPosts] = React.useState<Post[] | undefined>(undefined);

	const getUserPosts = (postLogin: string) => axios.get<Post[]>(`/api/getUserPosts?userForView=${postLogin}`, {
		auth: {
			username: login!,
			password: '12345'
		}
	}).then((response) => setPosts(response.data)).catch(() => alert('failed to load posts'));

	React.useEffect(() => {
		getUserPosts(currentLogin);
	}, [currentLogin]);

	if (posts === undefined) {
		return null;
	}

	const renderPosts = () => posts.map((post) => <Grid key={post.id} xs={4} item><PostCard {...post} /></Grid>);

	const createNewPost = async () => {
		const newPost: CreatePostDTO = {
			message: newMessage
		}
		await axios.post('/api/createPost', newPost, {
			auth: {
				username: login!,
				password: '12345'
			}
		})

		await getUserPosts(login!);
	}

	const goToAnotherUserPage = () => {
		setCurrentLogin(loginValue);
	}

	const returnToMyPage = () => {
		setCurrentLogin(login!);
	}

	return <Grid container spacing={2}>
		<Grid item><Typography variant="h5">Posts of {currentLogin}</Typography></Grid>
		<Grid item container spacing={1}>
			<Grid item>
				<TextField
					label="User login to view"
					onChange={(event) => setLoginValue(event.target.value)} value={loginValue} />
			</Grid>
			<Grid item>
				<Button onClick={goToAnotherUserPage}>Go to another user page</Button>
			</Grid>
			<Grid item><Button onClick={returnToMyPage} >Return to my page</Button></Grid>
		</Grid>
		{login === currentLogin? <Grid item container spacing={1}>
			<Grid item><TextField label="Post text" onChange={(event) => setNewMessage(event.target.value)} /></Grid>
			<Grid item><Button onClick={createNewPost} >Create new post</Button></Grid>
		</Grid> : null}
		<Grid item container spacing={1}>
			{renderPosts()}
		</Grid>
	</Grid>;
};

export default UserCard;
