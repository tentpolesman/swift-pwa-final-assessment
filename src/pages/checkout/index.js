import Content from "./components";
import Layout from "@components/Layouts";
import { withTranslation } from "@i18n";

const Page = props => {
    const { t } = props;
    const pageConfig = {
        title: t("checkout:pageTitle"),
        header: "relative", // available values: "absolute", "relative", false (default)
        headerTitle: t("checkout:pageTitle")
    };
    return (
        <Layout pageConfig={pageConfig}>
            <Content {...props} />
        </Layout>
    );
};

export default withTranslation()(Page);