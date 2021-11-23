import { gql } from '@apollo/client';

export const getProductList = gql`
    query($url_key: String!) {
        categoryList(filters: { url_key: { eq: $url_key } }) {
            id
            name
            url_key
            products {
                items {
                    name
                    image {
                        url
                    }
                    url_key
                    description {
                        html
                    }
                }
            }
        }
    }
`;

export const subscribeNewsletter = gql`
    mutation getEmail($email: String!) {
      subscribe(input:{email: $email}) {
            status {
                code
                message
                response
            }
        }
    }
`;

export default {
    getProductList,
    subscribeNewsletter,
};
