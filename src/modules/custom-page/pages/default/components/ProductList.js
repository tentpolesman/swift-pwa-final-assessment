import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100%",
        '&:hover': {
            opacity: "0.75",
            cursor: "pointer",
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const ProductList = (props) => {
    const classes = useStyles();
    const product = props.product;
    return (
        <>
            <Grid item xs={12} sm={6} md={3}>
                
                <Link href="/[...slug]" as={`/${product.url_key}`}>
                <Card className={classes.root}>
                    <h4 style={{ padding: "0 16px", fontSize: "18px" }} dangerouslySetInnerHTML={{__html: product.name.length > 24 ? (product.name.substring(0, 24) + "...") : product.name}}></h4>
                    <CardMedia
                        className={classes.media}
                        image={product.image.url}
                        title="image"
                    />
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </CardActions>
                </Card>
                </Link>
            </Grid>
        </>
    )
}

export default ProductList;
