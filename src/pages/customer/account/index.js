import { withTranslation } from '@i18n'
import Layout from "@components/Layouts";
import Content from "./component"

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("customer:dashboard:pageTitle"),
        header: false // available values: "absolute", "relative", false (default)
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);