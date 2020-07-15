import { GraphCustomer } from '@services/graphql';
import urlParser from '@helpers/urlParser';
import Layout from '@components/Layouts';
import PropTypes from 'prop-types';
import { debuging } from '@config';

const RewardPoint = (props) => {
    const {
        t, Content, ErrorView, Skeleton, pageConfig,
    } = props;

    const config = {
        title: t('rewardpoint:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('rewardpoint:title'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const { data, loading, error } = GraphCustomer.getRewardPoint({
        pageSize: rowsPerPage,
        currentPage: page + 1,
    });

    let customerRewardPoints = {
        balance: 0,
        balanceCurrency: 0,
        formatedBalanceCurrency: '$0.00',
        formatedSpendRate: '$0.00',
        spendRate: 1,
        transaction_history: {
            items: [],
            page_info: {
                current_page: 1,
                page_size: 10,
                total_pages: 0,
            },
            total_count: 0,
        },
    };

    if (error) {
        return (
            <Layout {...props} pageConfig={pageConfig || config}>
                <ErrorView
                    {...props}
                    message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                />
            </Layout>
        );
    }
    if (loading || !data) return <Layout {...props} pageConfig={pageConfig || config}><Skeleton /></Layout>;
    if (data && data.customerRewardPoints) customerRewardPoints = data.customerRewardPoints;
    const getId = (string) => string.split('#')[1].split('</a')[0];
    const getPath = (string) => {
        const path = urlParser(string, 'href').pathArray;
        const id = getId(string);
        let url = '';
        for (let index = 1; index < path.length - 2; index += 1) {
            url += `/${path[index]}`;
        }
        return `${url}/${id}`;
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                data={customerRewardPoints}
                loading={loading}
                getPath={getPath}
                getId={getId}
                rowsPerPage={rowsPerPage}
                page={page}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Layout>
    );
};

RewardPoint.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
    ErrorView: PropTypes.func,
};

RewardPoint.defaultProps = {
    Content: () => {},
    Skeleton: () => {},
    ErrorView: () => {},
};

export default RewardPoint;
