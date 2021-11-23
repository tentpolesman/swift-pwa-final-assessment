import Layout from '@layout';

const Core = (props) => {
    const {
        Content, t, pageConfig = false,
    } = props;

    const Config = {
        title: "Custom Page",
        headerTitle: "Custom Page",
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };

    return (
        <Layout pageConfig={pageConfig || Config} {...props}>
            <Content
                t={t}
                Content={Content}
            />
        </Layout>
    );
};

export default Core;
