import React from "react"

import { makeStyles } from "@material-ui/core/styles"

import { Box , Button } from "@material-ui/core"


const useStyles = makeStyles((theme)=>({
  Box: {
    width: props=>  props.width ,
    // height: props => props.height,
    // marginTop: 30,
    textAlign: "center",
    transition:0.8,

  },
  Button: {
    width: "90%",
    color: "#FFF",
    backgroundColor: "#104c82",
    textAlign: "center",
    border: "1px solid #104c82",
    borderRadius: 50,
    height:props => props.height,
    transition:"0.5s",
    '&:hover':{
      color: "#104c82",
      backgroundColor: "#FFF",
    }
  }
}))
function AcceptButton({ title , w ,h , onclick , d  }) {
  const props = {
    width : w ? w : "100%",
    height : h ? h : 50,
    disabled : d ? true : false  
  } 
  const classes = useStyles(props);
  return (
    // This is The Accept Button Component And started To Design
    <Box component="div" className={classes.Box}>
      <Button disabled={props.disabled} onClick={onclick} className={classes.Button}>{title}</Button>
    </Box>
    // This is The Accept Button Component And Ended To Desig
  );
}
export default  AcceptButton;
