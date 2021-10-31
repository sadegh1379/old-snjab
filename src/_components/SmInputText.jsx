import React , {defultProps} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box} from '@material-ui/core';
import PropTypes  from 'prop-types'


const useStyles = makeStyles({
    headerTitle:{
        fontSize: '13px',
        color: '#666666',
        fontWeight: 'bold',
        marginRight:'7px'
    },
    textBox:{
        border: '2px solid rgb(240, 230, 230)',
        borderRadius: '10px',
       width: '99%',
       lineHeight: '30px',
       fontSize: '15px',
       textAlign: 'justify',
       outline: 'none',
       height:'100px',
       padding :'10px'
    },
    box:{
        maxWidth:'100%',
        marginRight:'11px',
        marginTop : '20px'
    }
});

function SmInputText({title , setValue , value , placeholder , disabled}) {
  const classes = useStyles();

  const handleChange = (value)=>{
    setValue(value)
  }
  return (
    <Box component='div' className={classes.box}>
        <Box component='div'>
            <Box component='label' className={classes.headerTitle} >{title}</Box>
                <Box onChange={(e)=>handleChange(e.target.value)} value={value} component='textarea' className={classes.textBox}
                    rows="10"
                    cols="10"
                    disabled={disabled ? true : false}
                    placeholder={placeholder}
                ></Box>
            
        </Box>
    </Box>
  );
}



SmInputText.propTypes = {
    title : PropTypes.string,
}





export default SmInputText;
