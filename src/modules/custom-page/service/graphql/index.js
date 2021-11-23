import { useQuery, useMutation } from '@apollo/client';
import * as Schema from '@core_modules/custom-page/service/graphql/schema';

let fetchPolicy = '';
fetchPolicy = 'cache-first';
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getProductList = (variables) => useQuery(Schema.getProductList, {
    variables,
    fetchPolicy,
});

export const subscribeNewsletter = (variables) => useMutation(Schema.subscribeNewsletter, {
    variables,
    fetchPolicy,
});


export default {
    getProductList,
    subscribeNewsletter
};
