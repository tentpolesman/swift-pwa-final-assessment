import PriceFormat from '@components/PriceFormat';
import Typography from '@components/Typography';
import Link from 'next/link';
import useStyles from './style';
import setDefaultWhenEmpty from '../../../helpers/checkImageSrc';

const Item = ({
    storeConfig,
    price_range,
    price_tiers,
    __typename,
    url,
    imageSrc,
    name,
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Link href="[...slug]" as={url}>
                <div className={styles.imgItem}>
                    <img src={setDefaultWhenEmpty(imageSrc)} alt={name} className={styles.imgItem} />
                </div>
            </Link>
            <div className={styles.detailItem}>
                <Link href="[...slug]" as={url}>
                    <a>
                        <Typography variant="span">{name}</Typography>
                    </a>
                </Link>
                <PriceFormat priceRange={price_range} priceTiers={price_tiers} productType={__typename} storeConfig={storeConfig} />
            </div>
        </div>
    );
};

export default Item;
