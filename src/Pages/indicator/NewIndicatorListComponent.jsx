import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import Select from 'react-select';
import FilterList from '@material-ui/icons/FilterList'
import MoreVert from '@material-ui/icons/MoreVert'
import { Box, Badge, Grid, Typography } from '@material-ui/core'
import { userActions } from '../../_actions';
import { Pagination, Routes } from '../../_components';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../assets/images/loading_2.gif';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import AcceptButton from '../../_components/AcceptButton';
import edit from '../../assets/images/edit.png'
import trash from '../../assets/images/trash.png'
import concept from '../../assets/images/concept.png'
import document from '../../assets/images/document.png'
import excel from '../../assets/images/excel.png'
import checklist from '../../assets/images/checklist.png'
import loadingGif from '../../assets/images/loading.gif'
import masol from '../../assets/images/masol.png'
import job from '../../assets/images/job.png'
import checkListIcon from '../../assets/images/checklist.png'
import goalIcon from '../../assets/images/goal.png'
import printer from '../../assets/images/printer (1).png'
import ersal from '../../assets/images/ersal.png'
import { userConstants } from '../../_constants';
import PeopleSelect from '../../_components/PeopleSelect';
import RejectButton from '../../_components/RejectButton';




const useStyles = makeStyles(theme => ({
    container: {
        height: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
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
        cursor : 'default',
        '&:hover':{
            color:'#9c9c9c'
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
        marginRight : '30px'
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

function NewIndicatorListComponent(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const globalStorage = useSelector(state => state.globalStorage)
    let { wards, users } = useSelector(state => state.globalStorage)
    const newWard = [{ id: '', name: 'همه بخش ها' }, ...wards]
    const newUsers = [{ id: '', fn: 'همه', ln: '' }, ...users]



    // states
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [indicators, setIndicators] = useState([])
    const [indicator, setIndicator] = useState()
    const [pageInfo, setPageInfo] = useState(null)
    const [per_page, setPer_page] = useState(24)
    const [orderBy, setOrderBy] = useState(globalStorage.lastList ? globalStorage.lastList.orderBy : 'created_at')
    const [query, setQuery] = useState('')
    const [currentIndicator, setCurrentIndicatorId] = useState(null)
    const [indicator_data, setIndicatorData] = useState()

    // modals state
    const [collectors, setCollectors] = useState([])
    const [monitors, setMonitors] = useState([])
    const [selectedIds, setSelectedIds] = useState([])
    const [periodData, setPeriodData] = useState([])

    // add monitor state
    const [monitorUser, setMonitorUser] = useState(null)
    const [monitorWard, setMonitorWard] = useState(null)

    // tabel filters
    const [collectors_f, setCollectors_f] = useState([])
    const [monitors_f, setMonitors_f] = useState([])


    // modals
    const [actionModal, setActionModal] = useState(false)
    const [collectorsModal, setCollectorsModal] = useState(false)
    const [monitorsModal, setMonitorsModal] = useState(false)
    const [addCollectorUserModal, setAddCollectorUserModal] = useState(false)
    const [showMonitorAddBox, setShowMonitorAddBox] = useState(false)
    const [periodicityModal, setPeriodicityModal] = useState(false)
    const [p_page, setP_page] = useState(1)
    const [p_pageInfo, setPPageInfo] = useState(null)
    const [periodMonth, setPeriodMonth] = useState(['سه ماهه اول', 'سه ماهه دوم ', 'سه ماهه سوم', 'سه ماهه چهارم'])
    const [detailModal, setDetailModal] = useState(false)




    // filters
    const [ward, setWard] = useState('')
    const [user, setUser] = useState('')
    const [condition, setCondition] = useState('')
    const [indicatorType, setIndicatorType] = useState('')




    useEffect(() => {
        if (!globalStorage.wards.length) {
            dispatch(userActions.getWards())
        }
        dispatch(userActions.getMe())
        if (!globalStorage.users.length && globalStorage.me) {
            dispatch(userActions.getUsers(globalStorage.me.hospital_id))
        }

        getIndicator(1);
        dispatch(userActions.getHospitals(false));

    }, [])

    useEffect(() => {
        setLoading(true)
        if (query.length) {
            dispatch(userActions.API('get', `/v2/get_indicator_list?year=${globalStorage.year}&query=${query}`, null, false)).then(res => {
                // setPage(page)
                setIndicators(res.data.result)
                setPageInfo(res.data.pagination_info)
                setLoading(false)

            })
        } else {
            dispatch(userActions.API('get', `/v2/get_indicator_list?year=${globalStorage.year}&by_indicator_type=${indicatorType}&by_status=${condition}&by_ward=${ward}&by_collector=${user}&page=${page}&perpage=${per_page}&order=${orderBy}${query}`, null, false)).then(res => {
                // setPage(page)
                setPageInfo(res.data.pagination_info)
                setIndicators(res.data.result)

                setLoading(false)

            })
        }

    }, [ward, user, indicatorType, condition, query, page])

    const getIndicator = (page) => {
        setLoading(true)
        dispatch(userActions.API('get', `/v2/get_indicator_list?year=${globalStorage.year}&page=${page}&perpage=${per_page}&order=${orderBy}`, null, false)).then(res => {
            setPage(page)
            setIndicators(res.data.result)
            setLoading(false)

        })
    }

    const get_indicator = (indicator_id) => {

        dispatch(userActions.API('get', `/v2/get_indicator?indicator_id=${indicator_id}`)).then(
            res => {
                dispatch(userActions.API('get', `/v2/get_indicator_formula?indicator_id=${indicator_id}`)).then(formula_resualt => {

                    const { formula } = formula_resualt.data;
                    delete formula.id;
                    for (let key in res.data) {
                        if (res.data[key] === null) {
                            res.data[key] = '---';
                        }
                    }
                    const indicator_ = res.data;
                    indicator_.logical_reasons_of_collecting = res.data.logical_reasons_of_collecting ? res.data.logical_reasons_of_collecting.split('\n') : '';
                    indicator_.definition = res.data.definition ? res.data.definition.split('\n') : '';
                    const indicator = Object.assign({}, indicator_, formula);
                    indicator.numerator = formula.numerator.map((operand, i) => {
                        let opt = formula.numerator_operators[i] || '';
                        if (opt) {
                            opt = '&nbsp;<span class="iran_sans_Bold text_muted">' + opt + '</span>&nbsp;'
                        }
                        return operand + opt
                    }).join('');
                    indicator.denumerator = formula.denumerator.map((operand, i) => {
                        let opt = formula.denumerator_operators[i] || '';
                        if (opt) {
                            opt = '&nbsp;<span class="iran_sans_Bold text_muted">' + opt + '</span>&nbsp;'
                        }
                        return operand + opt
                    }).join('');
                    indicator.formula = formula;
                    setIndicatorData(indicator)

                });


            }
        )
    }

    const editIndicator = () => {
        cacheIndicatorList();
        props.history.push(`/indicator/list/edit/${indicator.id}`);
    }
    const cacheIndicatorList = () => {
        dispatch(userActions.setTemp({ page, orderBy, query }, 'lastList'))
    }

    const getData = (item) => {
        switch (item.status) {
            case 'temporary':
                return (
                    <span
                        style={{ color: 'red', textDecoration: 'underline' }}
                        className="px-4 py-1 pointer  text-danger iran-sans_Bold">ثبت موقت
                    </span>
                )
                break;
            case 'done':
                return (
                    <span className="px-4 py-1   text-success iran-sans_Bold">ارسال شده</span>
                )
                break;
            default:
                return '-'
                break;
        }

    }

    const hideModal = () => {
        setActionModal(false)
        setCollectorsModal(false)
        setMonitorsModal(false)
        setPeriodicityModal(false)
    }

    const checklistIndicator = () => {
        // this.cacheIndicatorList();
        props.history.push(`/indicator/list/checklist/${indicator.id}`);
    }


    const getExcelWardCompare = () => {
        const id = indicator.id
        dispatch(userActions.API('post', 'v2/indicator/ward_compare_excel ', { id })).then(res => {
            dispatch(userActions.start_request())
            setTimeout(() => {
                window.open(userConstants.SERVER_URL_2 + res.data.url, "_blank");
                dispatch(userActions.finish_request());
            }, 60000)

        })
    }

    const getFormulaExcel = () => {
        const id = indicator.id
        dispatch(userActions.API('get', `v2/indicator/formula_excel?id=${id}`)).then(res => {
            dispatch(userActions.start_request())
            setTimeout(() => {
                window.open(userConstants.SERVER_URL_2 + res.data.url, "_blank");
                dispatch(userActions.finish_request());
            }, 20000)

        })
    }

    const detailIndicator = () => {
        // this.cacheIndicatorList();
        // const {indicator} = this.state;
        props.history.push(`/indicator/list/detail/${indicator.id}`);
    }

    const deleteIndicator = () => {
        dispatch(userActions.question('حذف شاخص', 'آیا از حذف شاخص مطمئن هستید؟')).then(r => {
            if (r.value) {
                dispatch(userActions.API('get', `/v2/delete_indicator?indicator_id=${indicator.id}`)).then(res => {
                    const i = indicators.indexOf(indicator);
                    indicators.splice(i, 1);
                    setIndicators(indicators)
                    hideModal()
                });
            }
        })
    }

    const deleteCollector = (id) => {
        dispatch(userActions.question('حذف', 'آیا از حذف کاربر مطمئن هستید ؟'))
            .then(r => {
                if (r.value) {
                    dispatch(userActions.API('delete', `v2/delete_indicator_collector?collector_id=${id}`, null, true, false))
                        .then(res => {
                            const newState1 = collectors.filter(c => c.id !== id)
                            setCollectors(newState1)
                            const newState = collectors_f.filter(c => c.id !== id)
                            setCollectors_f(newState)
                            userActions.successToast('کاربر با موفقیت حذف شد')
                        })
                }
            })
    }

    const deleteMonitor = (id) => {
        dispatch(userActions.question('حذف', 'آیا از حذف کاربر مطمئن هستید ؟'))
            .then(r => {
                if (r.value) {
                    dispatch(userActions.API('delete', `v2/delete_indicator_monitor?monitor_id=${id}`, null, true, false))
                        .then(res => {
                            const newState2 = monitors.filter(m => m.id !== id)
                            setMonitors(newState2)
                            const newState = monitors_f.filter(m => m.id !== id)
                            setMonitors_f(newState)
                            userActions.successToast('کاربر با موفقیت حذف شد')
                        })
                }
            })
    }

    const sentCollectorsIds = () => {
        const params = {
            indicator_id: currentIndicator.id,
            collector: selectedIds
        }
        if (selectedIds.length <= 0) {
            userActions.failure('مسئول اندازه گیری را وارد کنید')
            return
        }
        dispatch(userActions.API('post', `v2/add_indicator_collector`, params, true, false))
            .then(res => {
                setCollectors([...collectors, ...res.data])
                setCollectors_f([...collectors_f, ...res.data])
                userActions.successToast('کاربر با موفقیت ثبت شد')
            })
        setSelectedIds([])
        setAddCollectorUserModal(false)

    }

    const sentNewMonitor = () => {
        if (monitorUser === null) {
            userActions.failure('مسئول پایش  را انتخاب کنید')
            return
        }
        if (monitorWard === null) {
            userActions.failure('بخش  / واحد متولی را انتخاب کنید')
            return
        }

        const params = {
            indicator_id: currentIndicator.id,
            monitor: [{
                wards: monitorWard.map(w => w.id),
                user_id: monitorUser.id
            }]
        }
        dispatch(userActions.API('post', `v2/add_indicator_monitor`, params, true, false))
            .then(res => {
                userActions.successToast('کاربر با موفقیت ثبت شد')
            })

        setMonitorUser(null)
        setMonitorWard(null)
    }

    const searchCollerctorUsers = (id) => {
        let find = false
        collectors.forEach(e => {
            if (e.user_id === id)
                find = true
        });
        return find
    }


    const addSelectedId_c = (id) => {
        setSelectedIds([...selectedIds, id])
    }

    const delId_c = (id) => {
        let newList = selectedIds.filter((p) => p !== id)
        setSelectedIds(newList)
    }

    const handleSelectAll_c = (ids) => {
        setSelectedIds(ids)
    }

    console.log('indicators :', indicators)
    const collectorTabelSearch = (name = '') => {
        const newState = collectors.filter(user => user.name.includes(name))
        setCollectors_f(newState)
    }

    const monitorsTabelSearch = (name) => {
        const newState = monitors.filter(user => user.name.includes(name))
        setMonitors_f(newState)
    }

    const returnPeriod = (data) => {
        const name = data.measure_interval
        if (name === 'ماهانه' || name === 'سالانه' || name === 'سه ماه یکبار' || name === 'شش ماه یکبار') {
            return (
                <p onClick={() => {
                    setPeriodicityModal(true)
                    getIndicatorPeriodicity(data.id)
                    setCurrentIndicatorId(data)
                }} style={{ textDecoration: 'underline', cursor: 'pointer' }}>{name}</p>
            )
        } else {
            return (
                <p>{name}</p>
            )
        }
    }

    const getIndicatorPeriodicity = (id) => {
        dispatch(userActions.API('get', `v2/get_indicator_interval_averages?indicator_id=${id}&page=${p_page}&perpage=${10}`, null, true, false))
            .then(res => {
                setPeriodData(res.data.intervals)
                setPPageInfo(res.data.pagination_info)
            })
    }

    const sendIndicator = () => {

        dispatch(userActions.question('ارسال شاخص', 'آیا تمایل به ارسال این شاخص برای مسئولین جمع آوری و پایش دارید؟')).then(r => {
            if (r.value) {
                dispatch(userActions.API('put', `/v2/send_indicator_to_responsibles?indicator_id=${indicator.id}`)).then(res => {
                    const i = indicators.indexOf(indicator);
                    indicators[i].send_to_kartabl = true;
                    setIndicators(indicators)
                    hideModal()
                    userActions.successToast(res.data.message);
                });
            }
        })
    }

    const openDetailModal = (id) => {
        get_indicator(id)
        setDetailModal(true)
    };

    const peroidReturn = (status) => {
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
    return (

        <Box component='div' className={classes.container}>
            <Routes page="indicator/list" />
            {/* start Header */}
            <Box component='div' className={classes.Header}>
                <Box component='div' className={classes.RightTitle}><Box component='p' className={classes.ShakhesParaghraph} >فهرست شاخص های بیمارستان</Box></Box>


            </Box>
            {/* end Header */}
            <Box component='div' className={classes.kol} >

                {/* start nav */}
                <Box component='div' className={classes.topnav} >
                    <Box component='a' className={classes.active}> <FilterList className={classes.icon} /></Box>
                    <Box component='a' className={classes.active} href="#home">فیلتـر</Box>
                    <Box component='a' className={classes.active} href="#home">وضعیت</Box>
                    <Box component='select' onChange={(e) => setCondition(e.target.value)} className={classes.drowp} >

                        <Box component='option' value="">همه</Box>
                        <Box component='option' value="done">ارسال شده</Box>
                        <Box component='option' value="temporary">ارسال نشده</Box>

                    </Box>
                    <Box component='div' className={classes.khatRight}></Box>
                    <Box component='a' className={classes.active} href="#home">بخش یا واحد متولی</Box>

                    <Box component='select' onChange={(e) => setWard(e.target.value)} className={classes.drowp}>
                        {

                            newWard.map((w, i) => {
                                return (
                                    <Box key={i} component='option' value={w.id}>{w.name}</Box>
                                )
                            })
                        }

                    </Box>
                    <Box component='div' className={classes.khatRight}></Box>
                    <Box component='a' className={classes.active} href="#home">نحوه گزارش دهی</Box>
                    <Box component='select' onChange={(e) => setIndicatorType(e.target.value)} className={classes.drowp} >
                        <Box component='option' value="">همه</Box>
                        <Box component='option' value="چک لیست" >چک لیست</Box>
                        <Box component='option' value="پرسشنامه">پرسشنامه</Box>
                        <Box component='option' value="HIS">HIS</Box>

                    </Box>
                    <Box component='div' className={classes.khatRight}></Box>
                    <Box component='a' className={classes.active} href="#home">مسئول جمع آوری</Box>
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
                    <Box component='div' className={`${classes.searchContainer}  ${classes.hjhj}`} >
                        <Box component='form' action="/action_page.php">
                            <Box value={query} onChange={(e) => setQuery(e.target.value)} component='input' className={classes.area} type="text" placeholder="جستجو در شاخص" name="search" />
                            <Box component='div' className={classes.search} >  <Search /></Box>
                        </Box>
                    </Box>
                    {/* end Search                  */}
                </Box>
                {/* end nav */}


                {/* start table */}
                <Box component='table' className={classes.tbl}>
                    <thead>
                        <Box component='tr' className={classes.tr} >
                            <Box component='th' className={classes.th} >ردیف</Box>
                            <Box component='th' className={classes.th}>عنـوان</Box>
                            <Box component='th' className={classes.th}>وضعیت</Box>
                            <Box component='th' className={classes.th}>واحـد متولـی</Box>
                            <Box component='th' className={classes.th}>مسئول اندازه گیری</Box>
                            <Box component='th' className={classes.th}>مسئولین  پایش</Box>
                            <Box component='th' className={classes.th}>دوره تنـاوب</Box>
                            <Box component='th' className={classes.th}>تارگـت</Box>
                            <Box component='th' className={classes.th}>عملیـات</Box>
                        </Box>
                    </thead>
                    <tbody>
                        {
                            loading ? (
                                <Box component='tr' >
                                    <td colSpan={9} className={classes.td}>
                                        <img className={classes.loading_gif} src={loadingGif} alt="در حال دریافت اطلاعات..." />
                                    </td>
                                </Box>
                            ) : (
                                indicators.length ? indicators.map((row, i) => {
                                    const class_name = i % 2 === 0 ? classes.td : classes.tdd
                                    return (
                                        <Box className="animated fadeIn" component='tr' key={i} >
                                            <Box component='td' className={class_name}>
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                                    {row.report_type == 'پرسشنامه' || row.report_type == 'چک لیست' ? (
                                                        <img className="mx-1" style={{ width: '15px' }} src={checkListIcon} alt="چک لیست" />
                                                    ) : null}
                                                    {i + 1}
                                                </div>
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                <Badge color="secondary" badgeContent={row.new_values_count} max={99}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right',

                                                    }}
                                                >
                                                    <p style={{margin:'7px'}}>
                                                        {row.title}
                                                    </p>
                                                </Badge>
                                            </Box>
                                            <Box component='td' className={class_name}>{getData(row)}</Box>
                                            <Box component='td' className={class_name}>{row.main_ward ? row.main_ward : 'نامشخص'}</Box>
                                            <Box component='td' className={class_name}>
                                                <img onClick={() => {
                                                    setCollectors(row.collectors)
                                                    setCollectors_f(row.collectors)
                                                    setCurrentIndicatorId(row)
                                                    setCollectorsModal(true)
                                                }} src={masol} className={classes.icons} alt="مسئول" />
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                <img onClick={() => {
                                                    setMonitors(row.monitors)
                                                    setMonitors_f(row.monitors)
                                                    setCurrentIndicatorId(row)
                                                    setMonitorsModal(true)
                                                }} src={job} className={classes.icons} alt="مسئولین" />
                                            </Box>
                                            <Box component='td' className={class_name}>
                                                {
                                                    returnPeriod(row)
                                                }

                                            </Box>
                                            <Box component='td' className={class_name}>{row.target.length ? (<p style={{ textDecoration: 'underline' }}>{row.target}</p>) : '-'}</Box>
                                            <Box component='td' className={class_name}>
                                                <MoreVert
                                                    onClick={() => {
                                                        setIndicator(row)
                                                        setActionModal(true)
                                                    }}
                                                    className={classes.MoreVert} />
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
                {pageInfo ?
                    <Pagination totalPage={pageInfo.total_pages} active={page} callBack={setPage} /> : null
                }
            </Box>

            {/* action modal  */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={actionModal}
                onClose={() => hideModal()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={actionModal}>
                    <div className={classes.paper}>
                        <div className={classes.modalHead}>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={hideModal} />
                            <p style={{ borderRight: '1px solid #fff', margin: 10, fontWeight: 'bold', paddingRight: 10 }}>عملیات</p>
                        </div>
                        <div className={classes.modalBody}>
                            <div>
                                {indicator && <div className="indicator_operation bg-white container">

                                    <div className="content py-5">

                                        <div className="container-fluid">
                                            <div className="operation-items row justify-content-center py-md-5 py-2">
                                                {indicator && (indicator.report_type == 'پرسشنامه' || indicator.report_type == 'چک لیست') == true ? (
                                                    <>
                                                        <div
                                                            className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                            <button className="btn text-white p-3"
                                                                onClick={checklistIndicator}>
                                                                <img style={{ width: 70, }} src={checklist} alt="checklist" />

                                                            </button>
                                                            <span className="iran-sans_Bold my-2">مشاهده {indicator.report_type}</span>
                                                        </div>
                                                        {indicator.send_to_kartabl && indicator.measure_interval == "ماهانه" &&
                                                            <div
                                                                className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                                <button className="btn text-white p-3"
                                                                    onClick={() => this.getExcelWardCompare(indicator.id)}>
                                                                    <img style={{ width: 70, }} src={excel} alt="excel" />
                                                                </button>
                                                                <span className="iran-sans_Bold my-2">خروجی اکسل</span>
                                                            </div>}
                                                    </>) : indicator.send_to_kartabl && (
                                                        <div
                                                            className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                            <button className="btn text-white p-3"
                                                                onClick={() => getFormulaExcel(indicator.id)}>
                                                                <img style={{ width: 70, }} src={excel} alt="excel" />
                                                            </button>
                                                            <span className="iran-sans_Bold my-2">خروجی اکسل</span>
                                                        </div>
                                                    )

                                                }


                                                <div
                                                    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                    <button className="btn text-white p-3"
                                                        onClick={() => openDetailModal(indicator.id)}>
                                                        <img style={{ width: 70, }} src={concept} alt="edit" />
                                                    </button>
                                                    <span className="iran-sans_Bold text-center my-2"> شناسنامه شاخص</span>
                                                </div>
                                                <div
                                                    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                    <button className="btn text-white p-3"
                                                        onClick={editIndicator}>
                                                        <img style={{ width: 70, }} src={edit} alt="edit" />
                                                    </button>
                                                    <span className="iran-sans_Bold text-center my-2">ویرایش شناسنامه </span>
                                                </div>
                                                {!indicator.send_to_kartabl &&
                                                    <div
                                                        className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                        <button className="btn text-white p-3"
                                                            onClick={sendIndicator}>
                                                            <img style={{ width: 70, }} src={ersal} alt="ersal" />

                                                        </button>
                                                        <span className="iran-sans_Bold my-2">ارسال به مسئولین</span>
                                                    </div>}
                                                <div
                                                    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                    <button className="btn text-white p-3"
                                                        onClick={detailIndicator}>
                                                        <img style={{ width: 70, }} src={document} alt="doucment" />
                                                    </button>
                                                    <span className="iran-sans_Bold my-2">مشاهده وضعیت</span>
                                                </div>

                                                {/*<div*/}
                                                {/*    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">*/}
                                                {/* <ReactToPrint
                        trigger={() =>
                            <button className="btn btn-blue text-white p-3"

                                  ><i
                                className="d-block fal fa-print fa-2x"
                                style={{width: 40, height: 40}}></i>

                            </button>

                        }
                        content={() => this.printRef}
                    />*/}
                                                {/*  <ReactToPdf targetRef={this.printRef} filename={indicator.title+'.pdf'}>
                        {
                            ({toPdf,targetRef})=>(
                                <button onClick={toPdf}  className="btn btn-blue text-white p-3" ><i
                                    className="d-block fal fa-print fa-2x"
                                    style={{width: 40, height: 40}}></i></button>
                            )
                        }

                    </ReactToPdf>*/}
                                                {/*    <button onClick={() => this.props.dispatch(userActions.print(this.printRef, indicator.title))}*/}
                                                {/*            className="btn text-white p-3">*/}
                                                {/*        <img style={{width:70,}} src={printer} alt="printer"/>*/}

                                                {/*    </button>*/}
                                                {/*    <span className="iran-sans_Bold my-2">چاپ</span>*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="row d-flex justify-content-center">
                                                <div
                                                    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                    <button 
                                                    // onClick={() => dispatch(userActions.print(this.printRef, indicator.title))}
                                                        className="btn text-white p-3">
                                                        <img style={{ width: 70, }} src={printer} alt="printer" />
                                                    </button>
                                                    <span className="iran-sans_Bold my-2">چاپ</span>
                                                </div>
                                                <div
                                                    className="operation-item d-flex flex-column align-items-center col-xl-2 col-lg-3 col-md-6">
                                                    <button className="btn text-white p-3"
                                                        onClick={deleteIndicator}>
                                                        <img style={{ width: 70, }} src={trash} alt="trash" />
                                                    </button>
                                                    <span className="iran-sans_Bold my-2">حذف شاخص</span>
                                                </div>
                                            </div>

                                        </div>
                                        <br></br>
                                        <div className="container-fluid pb-5">
                                            <div className="row justify-content-center my-4">
                                                <button
                                                    className="btn btn-secondary rounded-pill iran-sans_Bold col-lg-8 col-md-10 col-10 mx-3 mt-4 my-1"
                                                    onClick={hideModal}>بازگشت
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* collectors Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={collectorsModal}
                onClose={() => hideModal()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={collectorsModal}>
                    <div className={classes.paper}>
                        <div className={classes.modalHead}>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={hideModal} />
                            <p style={{ borderRight: '1px solid #fff', marginRight: 10, fontWeight: 'bold', paddingRight: 10 }}>مسئـول اندازه گیری</p>
                        </div>
                        <div className={classes.modalBody}>
                            <div style={{ marginTop: '30px', margin: '20px' }}>
                                <Box component='div' className={classes.container2}>
                                    {/* start Header */}
                                    <Box component='div' className={classes.Header2}>
                                        <Box onClick={() => { setAddCollectorUserModal(true) }} component='div' className={classes.Add} > <a className={classes.AddButon}>افـزودن</a></Box>
                                    </Box>
                                    {/* end Header */}
                                    <Box component='div' className={classes.kol2} >

                                        {/* start search */}
                                        <Box component='div' className={classes.searchContainer2}  >
                                            <Box component='form' action="/action_page.php">
                                                <Box component='input' onKeyUp={(e) => collectorTabelSearch(e.target.value)} className={classes.area2} type="text" placeholder="جستجو  " />
                                                <Box component='div' className={classes.search2} >  <Search /></Box>
                                            </Box>
                                        </Box>
                                        {/* end search */}


                                        {/* start table */}

                                        <Box component='table' className={classes.tbl}>
                                            <thead>
                                                <Box component='tr' className={classes.tr}>
                                                    <Box component='th' className={classes.th}>ردیف</Box>
                                                    <Box component='th' className={classes.th}>تصویـر</Box>
                                                    <Box component='th' className={classes.th}>نام و نام خانوادکی</Box>
                                                    <Box component='th' className={classes.th}>عنوان سازمانی</Box>
                                                    <Box component='th' className={classes.th}>بخش محل خدمت</Box>
                                                    <Box component='th' className={classes.th}>عملیات</Box>
                                                </Box>
                                            </thead>
                                            <tbody>
                                                {
                                                    collectors_f.length > 0 ? collectors_f.map((item, i) => {
                                                        const class_name = i % 2 === 0 ? classes.td : classes.tdd

                                                        return (
                                                            <Box component='tr' key={i} className={`${classes.Tr} animated fadeIn`} >
                                                                <Box className={class_name} component="td">
                                                                    {i + 1}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    <img title=" تصویر" className={classes.avatar} src={userConstants.SERVER_URL_2 + item.avatar.url} />
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.name}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.post}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.job_location}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    <img onClick={() => deleteCollector(item.id)} style={{ width: '40px', cursor: 'pointer' }} src={trash} alt="حذف" />
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

                                    </Box>

                                </Box>
                                <Box component="div" style={{ marginTop: '30px' }}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <AcceptButton onclick={hideModal} title="بازگشت" w="30%" h={40} />
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* monitors Modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={monitorsModal}
                onClose={() => hideModal()}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={monitorsModal}>
                    <div className={classes.paper}>
                        <div className={classes.modalHead}>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={hideModal} />
                            <p style={{ borderRight: '1px solid #fff', marginRight: 10, fontWeight: 'bold', paddingRight: 10 }}>مسئـولین  پایش</p>
                        </div>
                        <div className={classes.modalBody}>
                            <div style={{ marginTop: '30px', margin: '20px' }}>
                                <Box component='div' className={classes.container2}>
                                    {/* start Header */}
                                    <Box component='div' className={classes.Header2}>
                                        <Box onClick={() => { setShowMonitorAddBox(true) }} component='div' className={classes.Add} > <a className={classes.AddButon}>افـزودن</a></Box>
                                    </Box>
                                    {/* end Header */}


                                    <Box component='div' className={classes.kol2} >

                                        {/* start search */}
                                        <Box component='div' className={classes.searchContainer2}  >
                                            <Box component='form' action="/action_page.php">
                                                <Box component='input' onKeyUp={(e) => monitorsTabelSearch(e.target.value)} className={classes.area2} type="text" placeholder="جستجو  " />
                                                <Box component='div' className={classes.search2} >  <Search /></Box>
                                            </Box>
                                        </Box>
                                        {/* end search */}


                                        {/* start table */}

                                        <Box component='table' className={classes.tbl}>
                                            <thead>
                                                <Box component='tr' className={classes.tr}>
                                                    <Box component='th' className={classes.th}>ردیف</Box>
                                                    <Box component='th' className={classes.th}>تصویـر</Box>
                                                    <Box component='th' className={classes.th}>نام و نام خانوادکی</Box>
                                                    <Box component='th' className={classes.th}>عنوان سازمانی</Box>
                                                    <Box component='th' className={classes.th}>بخش محل خدمت</Box>
                                                    <Box component='th' className={classes.th}>عملیات</Box>
                                                </Box>
                                            </thead>
                                            <tbody>
                                                {
                                                    monitors_f.length > 0 ? monitors_f.map((item, i) => {
                                                        const class_name = i % 2 === 0 ? classes.td : classes.tdd

                                                        return (
                                                            <Box component='tr' key={i} className={`${classes.Tr} animated fadeIn`} >
                                                                <Box className={class_name} component="td">
                                                                    {i + 1}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    <img title=" تصویر" className={classes.avatar} src={userConstants.SERVER_URL_2 + item.avatar.url} />
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.name}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.post}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    {item.job_location}
                                                                </Box>
                                                                <Box className={class_name} component="td">
                                                                    <img onClick={() => deleteMonitor(item.id)} style={{ width: '40px', cursor: 'pointer' }} src={trash} alt="حذف" />
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
                                                {
                                                    showMonitorAddBox ? (
                                                        <Box className="animated fadeIn" component='tr'>
                                                            <td colSpan={3} className={classes.td}>
                                                                <Box style={{ width: '100%' }}>
                                                                    <Select className={`text-justify custom-select-2`}
                                                                        value={monitorWard}
                                                                        name="reporter_name"
                                                                        placeholder="بخش یا واحد متولی"
                                                                        onChange={(e) => setMonitorWard(e)}
                                                                        options={wards}
                                                                        getOptionLabel={v => v.name}
                                                                        getOptionValue={v => v.id}
                                                                        isMulti
                                                                    />
                                                                </Box>
                                                            </td>
                                                            <td colSpan={2} className={classes.td}>
                                                                <Box style={{ width: '100%' }}>
                                                                    <Select className={` text-justify custom-select-2`}
                                                                        value={monitorUser}
                                                                        name="reporter_name"
                                                                        placeholder="مسئول پایش"
                                                                        onChange={(e) => setMonitorUser(e)}
                                                                        // menuPlacement="top"
                                                                        options={users}
                                                                        getOptionLabel={u => (u.fn + ' ' + u.ln)}
                                                                        getOptionValue={u => u.id}
                                                                    />
                                                                </Box>
                                                            </td>
                                                            <td className={classes.td}>
                                                                <div className="mx-auto" style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
                                                                    <a onClick={sentNewMonitor} className={classes.AddButon_m}>ثبت</a>
                                                                    <a onClick={() => {
                                                                        setMonitorUser(null)
                                                                        setMonitorWard(null)
                                                                        setShowMonitorAddBox(false)
                                                                    }} className={classes.AddButon_m}>انصراف</a>
                                                                </div>

                                                            </td>
                                                        </Box>
                                                    ) : null
                                                }

                                            </tbody>
                                        </Box>

                                    </Box>

                                </Box>
                                <Box component="div" style={{ marginTop: '300px' }}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <AcceptButton onclick={hideModal} title="بازگشت" w="30%" h={40} />
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* add user to collectors modal*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={addCollectorUserModal}
                onClose={() => setAddCollectorUserModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={addCollectorUserModal}>
                    <div className={classes.paper}>
                        <div className={classes.modalHead}>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={hideModal} />
                            <p style={{ borderRight: '1px solid #fff', marginRight: 10, fontWeight: 'bold', paddingRight: 10 }}>انتخاب اعضا</p>
                        </div>
                        <div className={classes.modalBody}>
                            <div style={{ marginTop: '30px', margin: '40px' }}>
                                <PeopleSelect userHas={searchCollerctorUsers} handleSelectAll={handleSelectAll_c} PartnerSelectedList={selectedIds} delPartnerSelected={delId_c} setPartnerSelected={addSelectedId_c} />
                                <Box component="div" className={classes.AcceptButton}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <AcceptButton
                                            onclick={sentCollectorsIds}
                                            title="ثبت" w="30%" h={40} />
                                        <RejectButton onclick={() => setAddCollectorUserModal(false)} title="انصـراف" w="30%" h={40} />
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
            {/* Periodicity modal */}
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
                            <p style={{ borderRight: '1px solid #fff', margin: '10px', fontWeight: 'bold', paddingRight: '10px' }}>دوره تناوب</p>
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
                                                                {
                                                                    peroidReturn(currentIndicator.measure_interval) === 1 ?
                                                                        periodMonth[i % 4] : '-'
                                                                }
                                                                {/* سه ماهه اول */}
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

                                <Box component="div" className={classes.AcceptButton}>
                                    <Grid container direction='row' justify='space-evenly' >
                                        <AcceptButton
                                            // onclick={}
                                            title="مشاهده مقادیر اندازه گیری شده" w="50%" h={40} />
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>


        </Box>


    )
}
export default NewIndicatorListComponent
