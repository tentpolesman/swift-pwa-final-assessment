import { makeStyles } from "@material-ui/core/styles";
import { CreateMargin } from '@theme/mixins'
const useStyles = makeStyles(theme => ({
  container : {
    width : "100%",
    height : '100%',
    maxHeight : 100,
    ...CreateMargin(10,0,20,0)
  },
  label : {
    textTransform : 'capitalize'
  }
}));

export default useStyles;
