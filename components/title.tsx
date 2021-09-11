import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => 
  createStyles({
    title:{
      marginTop: 30,
      marginBottom: 30,
      textDecorationLine:'underline',
      cursor: 'pointer'    
    },
  }),
);


const title : React.FC<{title:string}>= (prop) => {
    const classes = useStyles();

    return(
        <div className={classes.title}>
            <Grid 
              container
              justifyContent='center'
            >

                <Grid item xs={12} sm={8}>
                    <Typography variant="h4">
                        {prop.title}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}
export default title