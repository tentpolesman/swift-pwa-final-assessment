import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/custom-page/pages/default/components';
import Core from '@core_modules/custom-page//pages/default/core';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({ namespacesRequired: ['common', 'custom-page', 'validate'] });

export default withApollo({ ssr: true })(withTranslation()(Page));
