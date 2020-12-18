import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostType from 'src/types/Post';
import PostListItem from 'src/components/posts/PostListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export type Props = {
  posts: PostType[];
  baseUrl: '/csr' | '/ssr' | '/isg' | '/isr';
};

const PostList: React.FC<Props> = ({ posts, baseUrl }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {posts.map((post) => {
          const href = `${baseUrl}/posts/${post.id}`;

          return (
            <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
              {/* <Paper className={classes.paper}>xs</Paper> */}
              <PostListItem
                {...post}
                href={href}
                // unsplash api to get random image: https://source.unsplash.com/
                imageUrl={'https://source.unsplash.com/random/800x600'}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PostList;
