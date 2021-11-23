/* eslint-disable consistent-return */
import gqlService from '@core_modules/custom-page/service/graphql';
import ProductList from './ProductList';
import Grid from '@material-ui/core/Grid';
import CustomBanner from '@common_custombanner'
import SubscribeNewsletter from './SubscribeNewsletter';

const CustomPage = () => {

    const { loading: loadingGetProduct, data: dataGetProduct, error: errorGetProduct } = gqlService.getProductList({
        url_key: "best-sellers",
    });

    if (loadingGetProduct) return <div>Loading...</div>;

    if (errorGetProduct) {
        return (
            <>
                <div>
                    Error...
                </div>
            </>
        );
    }

    if (!dataGetProduct || dataGetProduct.categoryList.length === 0) {
        return (
            <>
                <div>
                    Data is null...
                </div>
            </>
        );
    }

    if (!loadingGetProduct && dataGetProduct && dataGetProduct.categoryList.length > 0) {
        const products = dataGetProduct.categoryList[0].products;
        return (
            <>
                <CustomBanner image="https://bodypack.co.id/media/weltpixel/owlcarouselslider/images/m/e/membership_banner-05.jpg" />
                <Grid container spacing={2}>
                    {products && products.items.map((product, index) => 
                        <ProductList key={index} product={product} />
                    )}
                </Grid>
                <SubscribeNewsletter />
            </>
        );
    }
}

export default CustomPage;
