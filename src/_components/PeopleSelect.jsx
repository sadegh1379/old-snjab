import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import FilterList from '@material-ui/icons/FilterList'
import { Box, Grid, Checkbox } from '@material-ui/core'
import AcceptButton from './AcceptButton';
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../_actions';
import Select from 'react-select';
import { Pagination } from './Pagination';
import loadingGif from '../assets/images/loading.gif'
import PropTypes from 'prop-types'


const useStyles = makeStyles({
    container: {
        height: 'auto',
        backgroundColor: '#ffffff',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    },

    kol: {
        width: '98%',
        height: 'auto',
        backgroundColor: '#ffffff',
        margin: '0 auto',
        border: '2px solid #dcdcdc',
        borderRadius: '20px',
        marginBottom: '46px',
        marginTop: '-12px',
    }
    ,

    searchContainer: {
        float: 'left',
        marginBottom: '-16px',
        width: '100%',
        marginRight: '5px'
    },


    search: {
        color: '#969696',
        marginTop: '-32px',
        position: 'relative',
        marginRight: '280px',
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
        width: '97%',
        '&:focus': {
            outline: 'none'
        }
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    active: {
        float: 'right',
        display: 'block',
        color: '#9c9c9c',
        textAlign: 'center',
        padding: '14px 10px',
        textDecoration: 'none',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    hjhj: {
        marginBottom: '15px',

    },
    drowp: {
        float: 'right',
        marginTop: '12px',
        border: 'none',
        // background: 'white',
        textAlign: 'right',
        direction: 'rtl',
        // color: 'grey',
        fontFamily: 'IRANsansWeb',
        fontWeight: 'bold',
        fontSize: '14px!important',
        backgroundColor: '#104c82',
        color: 'white',
        padding: '7px',
        borderRadius: '10px'
    },
    icon: {
        fontSize: '13px',
        position: 'relative',
        marginLeft: '-14px',
        color: '#a29e9e',
        marginTop: '3px'
    },
    khatRight: {
        width: '2px',
        height: '25px',
        background: '#9c9c9c',
        float: 'right',
        display: 'inline-block',
        marginTop: '11px',
        marginRight: '10px',
        marginLeft: '10px',
    },
    image: {
        width: '40px',
        height: '40px',
        marginLeft: '3px',
        cursor: 'pointer'
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
        marginBottom :'10px'
    },
    tdd: {
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        background: '#f1f1f1',
        borderLeft: 'none',
        borderBottom: '1px solid #d8d8d8',
        borderTop: '1px solid #d8d8d8',
        fontSize: '12px',
        color: '#444444',
        fontWeight: 'bold'
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
        fontSize: '12px',
    },
    td: {
        textAlign: 'center',
        paddingTop: '5px',
        paddingBottom: '5px',
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#444444',

    },


    RightTitle: {
        display: 'inline-block',
        fontSize: '18px',
        color: '#555555',
        fontWeight: 'bold',
    },

    ArrowBackIos: {
        direction: 'rtl',
        paddingLeft: '10px',
        fontSize: '16px',
    },
    MoreVert: {
        color: '#969595'
    },
    Header: {
        width: '98%',
        marginRight: '25px',
        marginBottom: '23px',
        lineHeight: '35px'
    },
    text: {
        fontSize: '15px',
        fontWeight: 'bold',
        color: '#9c9c9c'
    },
    headerTxt: {
        fontSize: '18px'
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
        marginTop:'50px',
        marginBottom:'50px'
    }

});

function PeopleSelect({ delPartnerSelected, userHas , hideUser, PartnerSelectedList, setPartnerSelected, handleSelectAll }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { year, partnersListLoading } = useSelector(state => state.globalStorage)
    const user_Has = userHas ? userHas : ()=> false ;

    const [allToggle, setAllToggle] = useState(true);
    const [commiteId, setCommiteId] = useState('')
    const [ward_id, setWard_id] = useState('')
    const [post , setPost] = useState('')
    const [partnersPage, setPartnersPage] = useState(1);

    const list = useSelector(state => state.globalStorage.partnersList);

    const oldCommites = useSelector(state => state.globalStorage.listOfCommittees)
    const commites = [{ name: 'همه کمیته ها', id: '' }, ...oldCommites]

    const oldWardes = useSelector(state => state.globalStorage.wards)
    const wardes = [{ name: 'همه بخش ها', id: '' }, ...oldWardes]

    const oldPosts = useSelector(state => state.globalStorage.hospitalPosts)
    const posts = [{ name: 'همه سمت ها'}, ...oldPosts]


    useEffect(() => {
        dispatch(userActions.getPartnersList(partnersPage, commiteId, ward_id, post ,'', year));
    }, [partnersPage, commiteId, ward_id , post])

    useEffect(() => {
        dispatch(userActions.getCommitteesList(year))
        dispatch(userActions.getWards());
        dispatch(userActions.getHospitalPosts())
    }, [])

    const handleChangeCommiteId = (id) => {
        if (id === 'all') {
            dispatch(userActions.getPartnersList(partnersPage));
            setCommiteId('')
        } else {
            setCommiteId(id)
        }
    }
    const handleChangeWard_id = (id) => {
        if (id === 'all') {
            dispatch(userActions.getPartnersList(partnersPage));
            setWard_id('')
        } else {
            setWard_id(id)
        }
    }
    const handleChangePost = (name) => {
        if (name === 'همه سمت ها') {
            dispatch(userActions.getPartnersList(partnersPage));
            setPost('')
        } else {
            setPost(name)
        }
    }
    


    const handleCheck = (e, id) => {
        if (e.target.checked) {
            setPartnerSelected(id)
        } else {
            delPartnerSelected(id)
        }
    }

    const handleSearch = (text) => {
        dispatch(userActions.getPartnersList('', '', ''  , '', text, year))
    }

    const handleSelectAlls = () => {
        let ids = []
        if (allToggle) {
            list.users.map(user => {
                if(!user_Has(user.id)){
                    ids.push(user.id)
                }
            });
        }
        handleSelectAll(ids)
    }

    // const handleUnCheckAll = ()=>{
    //     handleSelectAll([])
    // }



    if (list.length <= 0) {
        return null
    }


    return (

        <Box component='div' className={classes.container}>

            <Box component='div' className={classes.kol} >

                {/* start nav */}
                <Box component='div' className={classes.topnav} >
                    <Box component='a' className={classes.active}> <FilterList className={classes.icon} /></Box>
                    <Box component='a' className={classes.active} href="#">فیلتـر</Box>
                    {/* <Box placeholder="نام کمیته" onChange={(e)=>handleChangeCommiteId(e.target.value)} component='select' name="cars" id="cars" className={classes.drowp} >
                            <Box  component='option' value='all'>همه کمیته ها</Box>
                        {
                            commites.map((item , i)=>{
                                if(item.name === null){
                                    return
                                }else{
                                    return(
                                        <Box key={i} component='option' value={item.id}>{item.name}</Box>
                                    )
                                }
                            })
                        }
                    </Box> */}
                    <Box style={{ width: '50%' }}>
                        <Select className={`${classes.mySelect} text-justify`}
                            // value={reporter_name}
                            name="reporter_name"
                            placeholder="همه کمیته ها"
                            onChange={(e) => handleChangeCommiteId(e.id)}
                            options={commites}
                            getOptionLabel={u => (u.name ? u.name : '-')}
                            getOptionValue={u => u.id}
                        />
                    </Box>

                    <Box style={{ width: '50%', marginRight: '5px' }}>
                        <Select className={`${classes.mySelect} text-justify`}
                            // value={reporter_name}
                            name="reporter_name"
                            placeholder="همه بخش ها"
                            onChange={(e) => handleChangeWard_id(e.id)}
                            options={wardes}
                            getOptionLabel={u => (u.name ? u.name : '-')}
                            getOptionValue={u => u.id}
                        />
                    </Box>
                    <Box style={{ width: '50%', marginRight: '5px' }}>
                        <Select className={`${classes.mySelect} text-justify`}
                            // value={reporter_name}
                            name="reporter_name"
                            placeholder="همه سمت ها"
                            onChange={(e) => handleChangePost(e.name)}
                            options={posts}
                            getOptionLabel={p => p.name}
                            getOptionValue={p => p.name}
                        />
                    </Box>


                    {/* start Search */}
                    <Box component='div' className={`${classes.searchContainer}  ${classes.hjhj}`} >
                        <Box component='form'>
                            <input autoComplete="off" onKeyUp={(e) => handleSearch(e.target.value)} component='input' className={classes.area} type="text" placeholder="جستجو " name="search" />
                            <Box component='div' className={classes.search} >  <Search /></Box>
                        </Box>
                    </Box>
                    {/* end Search                  */}
                </Box>
                {/* end nav */}


                {/* start table */}
                <Box  component='table' className={classes.tbl}>
                    <thead>
                        <Box component='tr' className={classes.tr} >
                            <Box component='th' className={classes.th} >
                                <AcceptButton onclick={() => {
                                    setAllToggle(!allToggle)
                                    handleSelectAlls()
                                }}
                                    title="انتخاب همه" w="100%" h={30} />
                            </Box>
                            <Box component='th' className={classes.th} >نام</Box>
                            <Box component='th' className={classes.th}>نام خانوادگی</Box>
                            <Box component='th' className={classes.th}>سمت</Box>
                            <Box component='th' className={classes.th}>بخش</Box>
                        </Box>
                    </thead>
                    <tbody>
                        {
                            partnersListLoading ? (
                                <Box  component='tr' >
                                    <td colSpan={5} className={classes.td}>
                                        <img className={classes.loading_gif} src={loadingGif} alt="در حال دریافت اطلاعات..." />
                                    </td>
                                </Box>
                            ) : (
                                list.users.length > 0 ? list.users.map((user, i) => {
                                  
                                    const class_name = i % 2 === 0 ? classes.td : classes.tdd
                                    return (
                                        <Box key={i} component='tr' className="animated fadeIn" >
                                            <Box component='td' className={class_name}>
                                                <Checkbox onChange={(e) => handleCheck(e, user.id)} color="primary"
                                                    checked={userHas ? PartnerSelectedList.includes(user.id) || userHas(user.id) : PartnerSelectedList.includes(user.id)}
                                                    disabled={hideUser && user.id == hideUser ? true : false}
                                                />
                                            </Box>
                                            <Box component='td' className={class_name}>{user.firstname}</Box>
                                            <Box component='td' className={class_name}> {user.lastname}</Box>
                                            <Box component='td' className={class_name}>{user.post ? user.post.name : ' - '}</Box>
                                            <Box component='td' className={class_name}>{user.post ? user.post.job_location : ' - '}</Box>
                                        </Box>
                                    )
                                }) : (
                                    <Box component='tr' >
                                        <td colSpan={5} className={classes.td}>
                                            اطلاعاتی وجود ندارد
                                        </td>
                                    </Box>
                                )
                            )
                        }

                    </tbody>
                </Box>
                {/* end start */}

                <Pagination totalPage={list.pagination_info.total_pages} active={partnersPage} callBack={setPartnersPage} />

            </Box>
        </Box>


    )
}

PeopleSelect.propTypes = {
    delPartnerSelected: PropTypes.func.isRequired,
    PartnerSelectedList : PropTypes.array.isRequired,
    setPartnerSelected : PropTypes.func.isRequired,
    handleSelectAll : PropTypes.func.isRequired,
    userHas : PropTypes.func,
    // hideUser : PropTypes.number || PropTypes.string ,
  }

export default PeopleSelect