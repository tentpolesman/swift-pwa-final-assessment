import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
// import gqlService from '@core_modules/custom-page/service/graphql';
import { subscribeNewsletter } from '@core_modules/custom-page/service/graphql/schema'
import { useMutation } from '@apollo/client';
import { useState } from 'react';

const SubsButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: "#B92590",
      '&:hover': {
        backgroundColor: purple[700],
      },
      borderRadius: "4px",
      padding: "15px 16px",
    },
}))(Button);

const SubscribeNewsletter = () => {

    const [inputEmail, setInputEmail] = useState("");
    const [emailSubscribe, { data: newsletterData, loading: newsletterLoading, error: newsLetterError }] = useMutation(subscribeNewsletter);
    
    const handleInput = (event) => {
        setInputEmail(event.target.value);
    }

    const handleClick = () => {
        emailSubscribe({ variables: { email: inputEmail }})
        .then((newsletterData) => {
            console.log(newsletterData.data.subscribe.status);
            window.toastMessage({
                open: true,
                text: newsletterData.data.subscribe.status.message,
                variant: newsletterData.data.subscribe.status.response == "Success" ? 'success' : "error",
            });
            setInputEmail("");
        })
        .catch((newsLetterError) => console.log(newsLetterError));
    }

    return (
        <>
            <Card style={{ padding: "16px", marginTop: "48px" }}>
                <Grid container spacing={2} style={{ alignItems: "center" }}>
                    <Grid item md={8}>
                        <TextField fullWidth id="outlined-basic" label="Enter your email address" onChange={handleInput} value={inputEmail} variant="outlined" />
                    </Grid>
                    <Grid item md={4}>
                        <SubsButton onClick={handleClick} fullWidth variant="contained" color="primary" disableRipple>
                            SUBSCRIBE
                        </SubsButton>
                    </Grid>
                </Grid>
            </Card>
        </>
    )
}

export default SubscribeNewsletter;
