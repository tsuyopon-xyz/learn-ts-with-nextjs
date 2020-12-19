import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Post from 'src/types/Post';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export type Props = {
  posts: Post[];
  baseUrl: '/csr' | '/ssr' | '/ssg' | '/isg' | '/isr';
};

const PostList: React.FC<Props> = ({ baseUrl, posts }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {posts.map((post) => {
          const href = `${baseUrl}/posts/${post.id}`;

          return (
            <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}>
              <Paper className={classes.paper}>{post.title}</Paper>
              {/* <PostListItem
                {...post}
                href={href}
                // unsplash api to get random image: https://source.unsplash.com/
                imageUrl={'https://source.unsplash.com/random/800x600'}
              /> */}
            </Grid>
          );
        })}

        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PostList;
