import Button from '@components/Button';
import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import { ConfirmationDelete } from '@components/ConfirmDialog';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import useStyles from './style';

export default ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistId, t, sku, url_key,
    handleRemove, handleToCart,
}) => {
    const styles = useStyles();
    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistId });
        setOpenDelete(!openDelete);
    };
    const handleAddToCart = () => {
        handleToCart({ sku, url_key, wishlistId });
    };
    return (
        <>
            <ConfirmationDelete
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleDelete={handleDelete}
                message={t('customer:wishlist:warningDelete')}
            />
            <div className={styles.card}>
                <div className={styles.imgItem}>
                    <img
                        src={imageSrc}
                        className={styles.imgProduct}
                        alt={name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/assets/img/placeholder.png';
                        }}
                    />
                </div>
                <div className={styles.content}>
                    <Typography variant="p">{name}</Typography>
                    <PriceFormat variant="p" priceRange={price_range} priceTiers={price_tiers} productType={__typename} />
                    <Button className={styles.btnAdd} onClick={handleAddToCart}>
                        <Typography variant="p" type="bold" letter="uppercase" color="white">
                            {t('customer:wishlist:addToBag')}
                        </Typography>
                    </Button>
                </div>
                <IconButton onClick={() => setOpenDelete(!openDelete)}>
                    <Delete />
                </IconButton>
            </div>
        </>
    );
};