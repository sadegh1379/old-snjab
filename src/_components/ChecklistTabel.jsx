import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Search } from '@material-ui/icons';
import edit from '../assets/images/edit.png'
import { Box, Grid, Typography } from '@material-ui/core'
import { userActions } from './../_actions'
import { useDispatch, useSelector } from 'react-redux'
import InputText from "./InputText";
import Select from 'react-select';
import DeleteIcon from '../assets/images/delete.png';
import EditIcon from '../assets/images/edit.png';


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
        borderRadius: '10px',
        marginBottom: '46px',
    }
    ,

    searchContainer: {
        float: 'left',
        marginBottom: '-16px',
    },


    search: {
        color: '#969696',
        marginTop: '-30px',
        marginRight: '298px',
        // position: 'absolute',
        // zIndex: '0',
    },
    area: {
        border: '1px solid #cac8c8',
        borderRadius: '50px',
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


    tr: {
        textAlign: 'center',
        background: '#dddd',

    },
    th: {
        textAlign: 'center!important',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '12px',
        fontFamily: 'iransansBold',
        color: '#555555',
    },
    td: {
        textAlign: 'center',
        paddingTop: '10px',
        paddingBottom: '10px',
        fontSize: '12px',
        color: '#444444',

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
    },
    tbl: {
        direction: 'rtl',
        marginTop: '20px',
        borderCollapse: 'collapse',
        width: '98%',
        margin: 'auto',
        marginBottom :'20px'
    },
    lto: {
        bordeRadius: '50px',
        width: '40px',
        height: '40px',
        cursor: 'pointer'
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

    part: {
        float: 'right',
        display: 'inline-block',
        fontSize: '18px',
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#555555',
        width: '47%',
        marginBottom: '-25px',
    },
    Add: {
        textAlign: 'left',
        marginTop: '0px',
        float: 'left',

    },
    AddButon: {
        color :'white !important',
        padding: '2px',
        paddingLeft: '35px',
        backgroundColor: '#104c82',
        borderRadius: '39px',
        paddingRight: '39px',
        fontSize: '13px',
        fontFamily: 'iransansBold',
        marginLeft: '-4px',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: ".5s",
        border: '1px solid #fff',
        '&:hover': {
            color: '#104c82 !important',
            backgroundColor: 'white',
            border: '1px solid #104c82',

        }
    },
    twoBo: {
        width: '100px',
        padding: '7px',
        backgroundColor: '#104c82',
        borderRadius: '39px',
        color: 'white !important',
        fontSize: '13px',
        fontFamily: 'iransansBold',
        fontWeight: 'bold',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: ".5s",
        border: '1px solid #fff',
        textAlign: 'center',
        '&:hover': {
            color: '#104c82 !important',
            backgroundColor: 'white',
            border: '1px solid #104c82',

        }
    },
    matn: {
        float: 'right',
        display: 'inline-block',
        textAlign: 'right',
        fontWeight: 'bold',
        width: '80%',

    },
    Header: {
        width: '98%',
        margin: '0 auto',
        marginBottom: '9px',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between'
    },
    Tr: {
        borderBottom: '1px solid #e4e0e0',
    },
    bottomBox: {
        // backgroundColor:'red',
        padding: 15,
    },
    inputT: {
        width: '100%',
        border: '2px solid rgb(240, 230, 230)',
        borderRadius: '1px',

        lineHeight: '30px',
        fontSize: '12px',
        textAlign: 'justify',
        outline: 'none',
    }
});

function ChecklistTabel(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { year } = useSelector(state => state.globalStorage)
    const [questions, setQuestions] = useState(props.questions)

    const [showAddBox, setShowAddBox] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [lastTitle, setLastTitle] = useState('')
    const [level, setLevel] = useState(null)
    const [title, setTitle] = useState('')


    const handleAddQ = () => {
        if (title === '') {
            userActions.failure('  شرح سوال  را وارد کنیـد')
            return
        }
        if (level === null) {
            userActions.failure('نوع امتیاز دهی را وارد کنید')
            return
        }
        props.addQ(title, level.label)
        setTitle('')
        setLevel(null)
        setShowAddBox(false)

    }

    const handleEdit = (title , select) => {
        setShowAddBox(true)
        setIsEdit(true)
        setLevel(select);
        setLastTitle(title)
        setTitle(title);

        
    }

    const sendEdit = () => {
        if (title === '') {
            userActions.failure('  شرح سوال  را وارد کنیـد')
            return
        }
        if(level === '' || level === null){
            userActions.failure('نوع امتیاز دهی را وارد کنید')
            return
        }
        props.editQuestion(lastTitle , title , level)
        setTitle('')
        setLevel(null)
        setIsEdit(false)
        setLastTitle('')
        setShowAddBox(false)
    }
    return (

        <Box component='div' className={classes.container}>

            {/* start Header */}

            <Box component='div' className={classes.Header}>
                <Box component='div' className={classes.matn}><p className="iran-sans_Bold bolder" style={{ fontWeight: 'bolder' }}>تعریف سوالات</p></Box>

                <Box onClick={() => setShowAddBox(!showAddBox)} component='div' className={classes.Add} > <a className={classes.AddButon} >افـزودن</a></Box>

            </Box>
            {/* end Header */}


            <Box component='div' className={classes.kol} >

                {/* start table */}
                <Box component='table' className={classes.tbl}>
                    <thead>
                        <Box component='tr' className={classes.tr}>
                            <Box component='th' className={classes.th}>ردیف</Box>
                            <Box component='th' className={classes.th}>شرح سوال</Box>
                            <Box component='th' className={classes.th}>نوع امتیاز دهی</Box>
                            <Box component='th' className={classes.th}>عملیـات</Box>

                        </Box>
                    </thead>
                    <tbody>
                        { props.questions.length > 0 ?  props.questions.sort((a, b) => {
                            if (a.select && b.select) {
                                if (a.select.label < b.select.label) { return 1; }
                                if (a.select.label > b.select.label) { return -1; }
                                return 0;
                            }
                            return 0;
                        }).map((q, i) => {
                            const class_name = i % 2 === 0 ? classes.td : classes.tdd
                            return (
                                <Box key={i} component="tr">
                                    <Box className={class_name} component='td'>
                                        {i + 1}
                                    </Box>
                                    <Box style={{width:'70%'}} className={class_name} component='td'>
                                        {q.title}
                                    </Box>
                                    <Box className={class_name} component='td'>
                                        {q.select.label}
                                    </Box>
                                    <Box component="td" className={class_name}>
                                        <img onClick={() => {
                                            props.deleteQuestion(q)
                                        }}
                                            src={DeleteIcon} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
                                        <img onClick={()=>handleEdit(q.title  , q.select)} src={EditIcon} style={{ cursor: 'pointer', width: '40px', height: '40px' }} />
                                    </Box>

                                </Box>
                            )
                        }) : null
                        }
                       
                        {
                            showAddBox && (
                                <Box component='tr' className="text-center animated zoomIn my-4">
                                    <td colSpan={2} className={classes.td} style={{ width: '80%', textAlign: 'center' }}>
                                        <input
                                            autoFocus={true}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            type="text-aria"
                                            name="title"
                                            placeholder="شرح سوال ..."
                                            className="form-control  border-0 rounded-pill  boxshadow py-4 mx-auto" />
                                    </td>
                                    <td className={classes.td} style={{ width: '60%', textAlign: 'center' }}>
                                        <Select className="text-justify custom-select-2 mx-2"
                                            placeholder="انتخاب  نوع امتیازدهی"
                                            onChange={(e) => setLevel(e)}
                                            value={level}
                                            options={[{
                                                label : 'عددی',
                                                value : 'عددی'
                                            }, {
                                                label: 'دو سطحی',
                                                value : 'دو سطحی'
                                            }, {
                                                label: 'سوال باز',
                                                value : 'سوال باز'
                                            }]}
                                            getOptionLabel={opt => opt.label}
                                            getOptionValue={opt => opt.value}
                                        />
                                    </td>
                                    <td style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                      {
                                          isEdit ? (
                                            <a onClick={sendEdit} className={classes.twoBo}>ثبت</a>

                                          ) : (
                                        <a onClick={handleAddQ} className={classes.twoBo}>ثبت</a>

                                          )
                                      }
                                        <a onClick={() =>{
                                             setShowAddBox(false);
                                              setIsEdit(false)}
                                              } className={classes.twoBo}>انصراف</a>
                                    </td>
                                </Box>
                            )
                        }

                    </tbody>

                </Box>
            </Box>
        </Box>
    )
}
export default ChecklistTabel