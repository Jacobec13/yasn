import * as React from "react";
import {Post} from "@yasn/api";
import {Card, Typography, makeStyles} from '@material-ui/core';

export interface PostCardProps extends Post {

}

const useStyles = makeStyles({
	root: {
		padding: '20px'
	}
})

const PostCard: React.FC<PostCardProps> = ({message}) => {
	const styles = useStyles();
	return <Card className={styles.root}><Typography variant="body1">{message}</Typography></Card>;
};

export default PostCard;
