import React from 'react';
import GridList from '@common_gridlist';
import Typography from '@common_typography';
import classNames from 'classnames';
import Filter from './Filter';
import FilterDesktop from './FilterDesktop';
import ProductItem from '../../ProductItem/core';
import useStyles from './style';
import Sort from './FilterDesktop/sort';

const Content = (props) => {
    const {
        query, showTabs, customFilter, elastic, t,
        aggregations, setFiltervalue, category, defaultSort, config, TabView,
        products, categoryPath, renderEmptyMessage, ProductListSkeleton, loading,
        loadmore, handleLoadMore, dataTabs, onChangeTabs, ...other
    } = props;
    const styles = useStyles();
    return (
        <>
            {showTabs ? (
                <div className="hidden-desktop">
                    <TabView
                    // eslint-disable-next-line radix
                        value={query.category_id ? query.category_id : 0}
                        data={category}
                        onChange={(e, value) => setFiltervalue({ ...query, ...{ category_id: value } })}
                        {...other}
                    />
                </div>
            ) : null}
            <div className="hidden-desktop">
                <Filter
                    filter={customFilter || aggregations}
                    defaultSort={JSON.stringify(defaultSort)}
                    filterValue={query}
                    setFiltervalue={setFiltervalue}
                    isSearch={!!config.search}
                    products={products}
                    renderEmptyMessage={renderEmptyMessage}
                    loading={loading}
                    t={t}
                    {...other}
                />
            </div>
            <div className={classNames(styles.filterBtnContainer, 'hidden-mobile')}>
                <Sort
                    filter={customFilter || aggregations}
                    defaultSort={JSON.stringify(defaultSort)}
                    filterValue={query}
                    setFiltervalue={setFiltervalue}
                    isSearch={!!config.search}
                    t={t}
                    {...other}
                />
            </div>
            <div className="row">
                <div className="col-sm-12 col-lg-2 hidden-mobile">
                    <FilterDesktop
                        filter={customFilter || aggregations}
                        defaultSort={JSON.stringify(defaultSort)}
                        filterValue={query}
                        setFiltervalue={setFiltervalue}
                        isSearch={!!config.search}
                        products={products}
                        renderEmptyMessage={renderEmptyMessage}
                        loading={loading}
                        tabs={dataTabs}
                        t={t}
                        onChangeTabs={onChangeTabs}
                    />
                </div>
                <div className="col-sm-12 col-xs-12 col-lg-10">
                    <Typography variant="p" type="regular" className={classNames('hidden-mobile', styles.countProductTextDesktop)}>
                        {products.total_count}
                        {' '}
                        {t('catalog:product:name')}
                    </Typography>
                    <div className={styles.productContainer}>
                        {loading && <ProductListSkeleton />}
                        {!loading && (
                            <GridList
                                data={products.items}
                                ItemComponent={ProductItem}
                                itemProps={{
                                    categorySelect: categoryPath,
                                    ...other,
                                }}
                                gridItemProps={{ xs: 6, sm: 4, md: 3 }}
                            />
                        )}
                        {(products.items.length === products.total_count) || loading
                            ? renderEmptyMessage(products.items.length, loading)
                            : (
                                <button
                                    className={styles.btnLoadmore}
                                    type="button"
                                    onClick={handleLoadMore}
                                >
                                    <Typography variant="span" type="bold" letter="uppercase" color="gray">
                                        {loadmore ? 'Loading' : t('common:button:loadMore')}
                                    </Typography>
                                </button>
                            )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Content;