import * as React from 'react';
import { Card, Typography, makeStyles, Grid } from '@material-ui/core';

import { Post } from '@yasn/api';

import LikeButton from './LikeButton/LikeButton';

export interface PostCardProps extends Post {
  afterLike: () => void;
}

const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
});

const PostCard: React.FC<PostCardProps> = ({
  message,
  likes,
  id,
  afterLike,
}) => {
  const styles = useStyles();
  return (
    <Card className={styles.root}>
      <Grid container direction="column">
        <Grid item>
          <Typography variant="body1">{message}</Typography>
        </Grid>
        <Grid>
          <LikeButton likes={likes} id={id} afterLike={afterLike} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostCard;
