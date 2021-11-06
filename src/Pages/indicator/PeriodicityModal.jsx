import React , {useState , useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Grid } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
import { Pagination } from '../../_components';
import AcceptButton from '../../_components/AcceptButton';
import { userActions } from '../../_actions';

const useStyles = makeStyles(theme=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        width: '80%',
        height: 500,
        overflow: 'hidden',
        borderRadius: 10,
        overflowY: 'scroll'
    },
    modalHead: {
        padding: 5,
        backgroundColor: '#104c82',
        color: '#fff',
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
    },
    modalBody: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '20px'
    },
    tbl: {
        direction: 'rtl',
        marginTop: '10px',
        borderCollapse: 'collapse',
        width: '98%',
        margin: 'auto',
        marginBottom: '20px'
    },
    tdd: {
        textAlign: 'center',
        paddingTop: '13px',
        paddingBottom: '13px',
        background: '#f1f1f1',
        borderLeft: 'none',
        borderBottom: '1px solid #d8d8d8',
        borderTop: '1px solid #d8d8d8',
        fontSize: '12px',
        color: '#444444',
        fontWeight: '700'
    },
    tr: {
        textAlign: 'center',
        background: '#dddd',

    },
    th: {
        textAlign: 'center !important',
        paddingTop: '10px',
        paddingBottom: '10px',
        color: '#555555',
        fontSize: '13px',
        fontWeight: 'bolder',
        fontFamily: 'iransansBold'
    },
    td: {
        textAlign: 'center',
        paddingTop: '13px',
        paddingBottom: '13px',
        /* font-weight: bold; */
        fontSize: '12px',
        color: '#444444',
        fontWeight: '700'

    },
    
    td_red: {
        textAlign: 'center',
        paddingTop: '13px',
        paddingBottom: '13px',
        background: 'rgb(255,199,198)',
        borderLeft: 'none',
        borderBottom: '1px solid #d8d8d8',
        borderTop: '1px solid #d8d8d8',
        fontSize: '12px',
        color: '#444444',
        fontWeight: '700'
    },
    td_Green: {
        textAlign: 'center',
        paddingTop: '13px',
        paddingBottom: '13px',
        background: 'rgb(216,249,192)',
        borderLeft: 'none',
        borderBottom: '1px solid #d8d8d8',
        borderTop: '1px solid #d8d8d8',
        fontSize: '12px',
        color: '#444444',
        fontWeight: '700'
    },
    td_yellow: {
        textAlign: 'center',
        paddingTop: '13px',
        paddingBottom: '13px',
        background: 'rgb(250,251,191)',
        borderLeft: 'none',
        borderBottom: '1px solid #d8d8d8',
        borderTop: '1px solid #d8d8d8',
        fontSize: '12px',
        color: '#444444',
        fontWeight: '700'
    }



}))

function PeriodicityModal({setPeriodicityModal , periodicityModal , periodData , currentIndicator ,setP_page, p_pageInfo , p_page}) {
    const classes = useStyles();
    const [periodMonth , setPeriodMonth] = useState(['سه ماهه اول' , 'سه ماهه دوم ' , 'سه ماهه سوم' ,'سه ماهه چهارم'])


    const peroidReturn = (status)=>{
        switch (status) {
            case 'ماهانه' || 'سه ماه یکبار':
                return 1
                break;
            case 'سالانه':
                return 2
                break;
            default:
                return 0
                break;
        }
    }

    const hideModal = ()=>{
        setPeriodicityModal(false)
    }
    if(periodData === undefined){
        return null
    }
    console.log('current' , currentIndicator)
    console.log('pero' , periodData);
    return (
        <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={periodicityModal}
                onClose={() => setPeriodicityModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={periodicityModal}>
                    <div className={classes.paper}>
                        <div className={classes.modalHead}>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={hideModal} />
                            <p style={{ borderRight: '1px solid #fff', margin: 10, fontWeight: 'bold', paddingRight: 10 }}>دوره تناوب</p>
                        </div>
                        <div className={classes.modalBody}>
                            <div style={{ marginTop: '30px', margin: '40px' }}>
                                <Box component='div' className={classes.kol2} >


                                    {/* start table */}

                                    <Box component='table' className={classes.tbl}>
                                        <thead>
                                            <Box component='tr' className={classes.tr}>
                                                <Box component='th' className={classes.th}>دوره تنـاوب</Box>
                                                <Box component='th' className={classes.th}>عنوان صورت فرمول</Box>
                                                <Box component='th' className={classes.th}>عنوان مخرج فرمول</Box>
                                                <Box component='th' className={classes.th}>عدد کل (واحد اندازه گیری)</Box>
                                            </Box>
                                        </thead>
                                        <tbody>
                                            {
                                                periodData.length > 0 ? periodData.map((item, i) => {
                                                    // const class_name = i % 2 === 0 ? classes.td : classes.tdd
                                                    const upLimit = parseInt(item.upper_limit)
                                                    const loLimit = parseInt(item.lower_limit)
                                                    const class_name = item.average > upLimit ? classes.td_Green : item.average < loLimit ? classes.td_red : classes.td_yellow

                                                    return (
                                                        <Box key={i} component='tr' className={` animated fadeIn`} >
                                                            <Box component='td' className={class_name}>
                                                            {userActions.getIntervalTitle(currentIndicator.measure_interval, item.interval_number)}
                                                            </Box>
                                                            <Box component='td' className={class_name}>
                                                                {item.numerator}
                                                            </Box>
                                                            <Box component='td' className={class_name}>
                                                                {item.denumerator}
                                                            </Box>
                                                            <Box component='td' className={class_name}>
                                                                % {item.average}
                                                            </Box>
                                                        </Box>
                                                    )
                                                }) : (
                                                    <Box component='tr'>
                                                        <td colSpan={6} className={classes.td}>
                                                            اطلاعاتی وجود ندارد
                                                        </td>
                                                    </Box>
                                                )
                                            }

                                        </tbody>
                                    </Box>
                                    {
                                        p_pageInfo && (
                                            <Pagination totalPage={p_pageInfo.total_pages} active={p_page} callBack={setP_page} />
                                        )
                                    }
                                </Box>

                                {/* <Box component="div" className={classes.AcceptButton}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <AcceptButton
                                            // onclick={}
                                            title="مشاهده مقادیر اندازه گیری شده" w="50%" h={40} />
                                    </Grid>
                                </Box> */}
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>

    )
}

export default PeriodicityModal
