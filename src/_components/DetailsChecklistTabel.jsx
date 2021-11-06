import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import Select from 'react-select';
import FilterList from '@material-ui/icons/FilterList'
import MoreVert from '@material-ui/icons/MoreVert'
import { Box, Badge, Grid, Typography } from '@material-ui/core'
import { userActions } from '../_actions';
import { Pagination, Routes } from '../_components';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../assets/images/loading_2.gif';
import loadingGif from '../assets/images/loading.gif'
import Popover, { ArrowContainer } from 'react-tiny-popover'
import WardIcon from '../assets/images/WardIcon.png';
import ReactTooltip from 'react-tooltip';
import TakmilIcon from '../assets/images/takmilchecklist.svg';





const useStyles = makeStyles(theme => ({
    container: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        minHeight : '400px'
    },
    container2: {
        height: 'auto',
        backgroundColor: '#ffffff',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    kol: {
        width: '95%',
        height: 'auto',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        border: '2px solid #dcdcdc',
        borderRadius: '20px',
        marginBottom: '46px',
    }
    ,

    searchContainer: {
        float: 'left',
        marginBottom: '-16px',
    },


    search: {
        color: '#969696',
        marginTop: '-32px',
        position: 'absolute',
        marginRight: '250px',
    },
    area: {
        border: '1px solid #cac8c8',
        borderRadius: '20px',
        textAlign: 'right',
        fontSize: '11px',
        marginLeft: '36px',
        paddingLeft: '107px',
        paddingRight: '11px',
        marginTop: '9px',
        paddingTop: '10px',
        paddingBottom: '10px',
        direction: 'rtl',
        width: '98%',
        outline: 'none'
    },


    pagination: {
        display: 'inline-flex!important',
        marginTop: '25px',
        marginLeft: '22px',
        marginBottom: '20px',
        direction: 'rtl',
        float: 'left',
    },
    btnNext: {
        color: '#104c82!important',
        float: 'left',
        padding: '5px 16px !important',
        border: '1px solid #104c82',
        borderRadius: '18px',
        fontSize: '10px',
    },
    paging: {
        float: 'left',
        display: 'block',
        color: 'black',
        textAlign: 'center',
        padding: '2px 9px',
        textDecoration: 'none',
        fontSize: '17px',
    },
    pag: {
        background: '#104c82',
        borderRadius: '41px',
        marginRight: '6px',

        padding: '0px 6px 0 7px!important;',
    },


    first: {
        color: 'white!important',
        backgroundColor: '#104c82',
        padding: '2px 13px 2px 13px',
        borderRadius: '48px',
        marginRight: '5px',
    },


    topnav: {
        marginRight: '10px',
    },
    active: {
        float: 'right',
        display: 'block',
        color: '#9c9c9c',
        textAlign: 'center',
        padding: '14px 10px',
        textDecoration: 'none !important',
        fontSize: '11px',
        fontWeight: 'bold',
        cursor: 'default',
        '&:hover': {
            color: '#9c9c9c'
        }
    },
    hjhj: {
        marginBottom: '15px',

    },
    drowp: {
        float: 'right',
        marginTop: '12px',
        border: 'none',
        background: 'white',
        textAlign: 'right',
        direction: 'rtl',
        color: 'grey',
        fontFamily: 'iransansBold',
        fontWeight: 'bold',
        fontSize: '12px!important',
        cursor: 'pointer',

    },
    icon: {
        fontSize: '13px',
        position: 'absolute',
        marginLeft: '-14px',
        color: '#a29e9e',
    },
    khatRight: {
        width: '2px',
        height: '20px',
        background: '#e2e2e2',
        float: 'right',
        display: 'inline-block',
        marginTop: '11px',
        marginRight: '10px',
    },
    image: {
        width: '35px',
        height: '35px',
        marginLeft: '3px',
    },
    title: {
        width: '100%',
        float: 'right',
        textAlign: 'right',
        color: ' #555555',
        fontSize: '25px',
        fontWeight: 'bold',
    },
    part: {
        paddingRight: '71px',
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


    RightTitle: {
        display: 'inline-block',
        fontSize: '18px',
        color: '#555555',
        fontWeight: 'bold',
        textAlign: 'right',

    },
    LeftTitle: {

        display: 'inline-block',
        float: 'left',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#555555',
    },
    ArrowBackIos: {
        direction: 'rtl',
        paddingLeft: '10px',
        fontSize: '16px',
    },
    MoreVert: {
        color: '#969595',
        cursor: 'pointer'
    },
    Header: {
        width: '85%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: '20px',
        marginBottom: '20px',
        marginRight: '30px'
    },
    ShakhesParaghraph: {
        fontSize: 24
    },
    ShakhesSpan: {
        fontSize: 24
    },
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
    gifContainer: {
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'red',
        width: '100%'
    },
    loading_gif: {
        width: '50px',
        margin: 'auto',
        marginTop: '50px',
        marginBottom: '50px'
    },
    icons: {
        width: '45px',
        height: '45px',
        borderRadius: '45px',
        cursor: 'pointer'
    },
    // collector modal 
    matn: {
        float: 'right',
        display: 'inline-block',
        fontSize: '13px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#555555',
        width: '80%',
    },
    Header2: {
        width: '98%',
        margin: '0 auto',
        marginBottom: '9px',
    },
    Add: {
        textAlign: 'left',
        marginTop: '0px',
        float: 'left',

    },
    AddButon: {
        padding: '2px',
        paddingLeft: '35px',
        backgroundColor: '#104c82',
        borderRadius: '39px',
        paddingRight: '39px',
        color: 'aliceblue',
        fontSize: '14px',
        marginLeft: '-4px',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: ".5s",
        border: '1px solid #fff',
        '&:hover': {
            color: '#104c82',
            backgroundColor: 'white',
            border: '1px solid #104c82',

        }
    },
    kol2: {
        width: '98%',
        height: 'auto',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        border: '2px solid #dcdcdc',
        borderRadius: '20px',
        marginBottom: '46px',
    }
    ,
    searchContainer2: {
        float: 'left',
        marginBottom: '-16px',
        height: '80px'
    },
    search2: {
        color: '#969696',
        marginTop: '-30px',
        marginRight: '298px',
    },
    area2: {
        border: '1px solid #cac8c8',
        borderRadius: '20px',
        textAlign: 'right',
        fontSize: '11px',
        marginLeft: '57px',
        paddingLeft: '130px',
        paddingRight: '11px',
        marginTop: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        direction: 'rtl',
        width: '96%',
        '&:focus': {
            outline: 'none'
        }
    },
    avatar: {
        borderRadius: '50px',
        width: '50px',
        height: '50px',
        cursor: 'pointer'
    },

    // monitor
    AddButon_m: {
        padding: '2px',
        paddingLeft: '35px',
        backgroundColor: '#104c82',
        borderRadius: '39px',
        paddingRight: '39px',
        color: 'aliceblue',
        fontSize: '14px',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: ".5s",
        border: '1px solid #fff',
        '&:hover': {
            color: '#104c82',
            backgroundColor: 'white',
            border: '1px solid #104c82',

        }
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




}));

function DetailsChecklistTabel({ data, indicator , openDetailRecords , filterward ,getByChecklist}) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const globalStorage = useSelector(state => state.globalStorage)
    let { wards, users } = useSelector(state => state.globalStorage)
    const newWard = [{ _id: '', name: 'همه بخش ها' }, ...wards]
    const newUsers = [{ id: '', fn: 'همه', ln: '' }, ...users]



    // states
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [currentIndicator, setCurrentIndicatorId] = useState(null)
    const [showWards, setShowWards] = useState(false)

    // filters
    const [ward, setWard] = useState('')
    const [user, setUser] = useState('')
    const [period, setPeriod] = useState('')




    useEffect(() => {
        if (!globalStorage.wards.length) {
            dispatch(userActions.getWards())
        }
        if (!globalStorage.users.length && globalStorage.me) {
            dispatch(userActions.getUsers(globalStorage.me.hospital_id))
        }

    }, [])

    useEffect(() => {
        setLoading(true)
        if (query.length) {
            setLoading(false)
            
        } else {
            getByChecklist(1,ward , user)
            setLoading(false)
        }
    }, [ward , user ])


    return (

        <Box component='div' className={classes.container}>
            <Routes page="indicator/list" />

            {/* end Header */}
            <Box component='div' className={classes.kol} >

                {/* start nav */}
                <Box component='div' className={classes.topnav} >
                    <Box component='a' className={classes.active}> <FilterList className={classes.icon} /></Box>
                    <Box component='a' className={classes.active} href="#home">فیلتـر</Box>
                    <Box component='a' className={classes.active} href="#home">دوره تناوب</Box>
                    <Box component='select' onChange={(e) => setPeriod(e.target.value)} className={classes.drowp} >

                        <Box component='option' value="">همه</Box>
                        <Box component='option' value="done">ارسال شده</Box>
                        <Box component='option' value="temporary">ارسال نشده</Box>

                    </Box>
                    <Box component='div' className={classes.khatRight}></Box>
                    <Box component='a' className={classes.active} href="#home">بخش  </Box>

                    <Box component='select' 
                    onChange={(e) => setWard(e.target.value)}
                 
                     className={classes.drowp}>
                        {

                            newWard.map((w, i) => {
                                return (
                                    <Box key={i} component='option' value={w._id}>{w.name}</Box>
                                )
                            })
                        }

                    </Box>

                    <Box component='div' className={classes.khatRight}></Box>
                    <Box component='a' className={classes.active} href="#home">مسئول اندازه گیری</Box>
                    <Box component='select' onChange={(e) => setUser(e.target.value)} className={classes.drowp} >
                        {

                            newUsers.map((u, i) => {
                                return (
                                    <Box key={i} component='option' value={u.id}>{u.fn + ' ' + u.ln}</Box>
                                )
                            })
                        }
                    </Box>
                    {/* start Search */}
                    {/* <Box component='div' className={`${classes.searchContainer}  ${classes.hjhj}`} >
                        <Box component='form' action="/action_page.php">
                            <Box value={query} onChange={(e) => setQuery(e.target.value)} component='input' className={classes.area} type="text" placeholder="جستجو در شاخص" name="search" />
                            <Box component='div' className={classes.search} >  <Search /></Box>
                        </Box>
                    </Box> */}
                    {/* end Search */}
                </Box>
                {/* end nav */}


                {/* start table */}
                <Box component='table' className={classes.tbl}>
                    <thead>
                        <Box component='tr' className={classes.tr} >
                            <Box component='th' className={classes.th} >ردیف</Box>
                            <Box component='th' className={classes.th}>دوره ارزیابی</Box>
                            <Box component='th' className={classes.th}>تعداد کل ارزیابی ها</Box>
                            <Box component='th' className={classes.th}>امتیاز ارزیابی</Box>
                            <Box component='th' className={classes.th}>بخش ارزیابی شونده</Box>
                            <Box component='th' className={classes.th}>عملیـات</Box>
                        </Box>
                    </thead>
                    <tbody>
                        {
                            loading ? (
                                <Box component='tr' >
                                    <td colSpan={6} className={classes.td}>
                                        <img className={classes.loading_gif} src={loadingGif} alt="در حال دریافت اطلاعات..." />
                                    </td>
                                </Box>
                            ) : (
                                data.length ? data.map((row, i) => {
                                    const class_name = i % 2 === 0 ? classes.td : classes.tdd
                                    return (
                                        <Box className="animated fadeIn" component='tr' key={i} >
                                            <Box component='td' className={class_name}>
                                                {i+1}
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                <Badge color="secondary" badgeContent={row.new_values_count} max={99}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',

                                                    }}
                                                >
                                                    <p style={{ margin: '7px' }}>
                                                        {userActions.getIntervalTitle(indicator.measure_interval, row.interval_number)}
                                                    </p>
                                                </Badge>
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                {row.answers_count}
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                {row.average !== null ? row.average.toFixed(2) + '%' : '-'}
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                {row.wards.length > 1 ? <Popover
                                                    isOpen={showWards}
                                                    position={['top', 'right', 'left', 'bottom']} // preferred position
                                                    padding={10}
                                                    containerStyle={{ zIndex: 9999 }}
                                                    onClickOutside={() => setShowWards(false)}
                                                    content={({ position, targetRect, popoverRect }) => (
                                                        <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                                                            position={position}
                                                            targetRect={targetRect}
                                                            popoverRect={popoverRect}
                                                            arrowColor={'#1c94e0'}
                                                            arrowSize={10}

                                                        >
                                                            <div className="bg-blue rounded p-4">
                                                                <ul className="list-unstyled">
                                                                    {row.wards.map((w, i) => <li key={i}
                                                                        className="text-light w-100 text-center">{w}</li>)}
                                                                </ul>
                                                            </div>
                                                        </ArrowContainer>
                                                    )}
                                                >
                                                    <button
                                                        onClick={() => setShowWards(!showWards)}
                                                        className="btn btn-link"><img src={WardIcon} alt="بخش" width={30} /></button>
                                                </Popover>
                                                    :
                                                    row.wards[0]}
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                <button className="btn btn-link" onClick={() => openDetailRecords(row)} data-tip="جزئیات">
                                                    <img src={TakmilIcon} alt="جزئیات" width={30} /><ReactTooltip type="dark" html={true} />
                                                </button>
                                            </Box>

                                        </Box>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={9} style={{ textAlign: 'center' }} >
                                            <p style={{ fontSize: '10px', fontFamily: 'iransansBold', marginTop: '10px' }}>
                                                اطلاعاتی جهت نمایش موجود نیست
                                            </p>
                                        </td>
                                    </tr>
                                )
                            )
                        }

                    </tbody>
                </Box>

            </Box>
        </Box>


    )
}
export default DetailsChecklistTabel

