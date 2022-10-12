import * as React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';
import axios from 'axios';

import { LikePostDTO } from '@yasn/api';

import { AuthContext } from '../../../../auth/AuthContext';

export interface LikeButtonProps {
  likes: string[];
  id: string;
  afterLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ likes, id, afterLike }) => {
  const { login } = React.useContext(AuthContext);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const renderButton = () =>
    isHovered || likes.indexOf(login) > -1 ? <Favorite /> : <FavoriteBorder />;

  const likePost = async () => {
    const likePostData: LikePostDTO = {
      messageId: id,
    };
    try {
      await axios.post('/api/likePost', likePostData, {
        auth: {
          username: login,
          password: '12345',
        },
      });
      afterLike();
    } catch (e) {
      alert('failed to like post');
    }
  };

  return (
    <Grid
      container
      spacing={1}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      alignItems="center"
      onClick={likePost}
    >
      <Grid item>{renderButton()}</Grid>
      <Grid>
        <Typography>{likes.length}</Typography>
      </Grid>
    </Grid>
  );
};

export default LikeButton;
