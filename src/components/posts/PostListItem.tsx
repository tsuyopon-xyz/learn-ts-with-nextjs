import React from 'react';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Post from 'src/types/Post';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

type Props = Post & {
  imageUrl: string;
  href: string;
};

const PostListItem: React.FC<Props> = ({ id, title, body, imageUrl, href }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link href={href}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title} (post id: {id})
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default PostListItem;
