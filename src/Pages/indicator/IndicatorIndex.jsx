import React from 'react';
import moment from 'jalali-moment';
import {globalStorage} from "../../_reducers/globalStorage.reducer";
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Select from 'react-select';
import {userActions} from "../../_actions";
import {userConstants} from "../../_constants";
import {Routes, ToggleBotton,AdminMessage,Chart} from "../../_components";
import conceptIcon from '../../assets/images/concept.png';
import addIcon from '../../assets/images/add.png';
import reportIcon from '../../assets/images/report.png';
import excelIcon from '../../assets/images/excel.png';


const options = {
    chart: {
        type: "column"
    },
    title: {
        text: "",
        align: "center"
    },
    subtitle: {
        text: ""
    },
    series: [
        {
            data: []
        }
    ],
    xAxis:[{
        categories:[

        ]
    }]
};
class IndicatorIndex extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            wards:[],
            ward:'',
            general_indicators_info:null,
            chart1:null,
            chart2:null,
            indicator:''

        }
        this.myRef = React.createRef();
    }

    goBack = () => {
        this.props.history.goBack();
    }
    componentDidMount(){
        window.localStorage.setItem('indicator_page' , 1)
        if(!this.props.globalStorage.indicators.length){
            this.props.dispatch(userActions.getIndicator(this.props.globalStorage.year))
        }
        this.props.dispatch(userActions.API('get',`/v2/get_general_indicators_info?year=${this.props.globalStorage.year}`)).then(res=>{
            this.setState({general_indicators_info:res.data});
        })
        this.getWardChart()
        if(!this.props.globalStorage.wards.length){
            this.props.dispatch(userActions.getWards()).then(res=>{
                this.setState({wards:res.data})
            })
        }else{
            this.setState({wards:this.props.globalStorage.wards})
        }
    }

    getWardChart=()=>{
        this.props.dispatch(userActions.API('get',`/v2/indicator/ward_chart?year=${this.props.globalStorage.year}`)).then(res=>{
            const chart1={
                data:[{name:'',data:res.data.map(d=>d.count)}],
                categories:res.data.map(d=>d.ward)
            }
            this.setState({chart1})
        })
    }
    getIntervalChart=(indicator)=>{
        this.props.dispatch(userActions.API('get',`/v2/indicator/interval_chart?id=${indicator.id}&year=${this.props.globalStorage.year}`)).then(res=>{
            const categories=userActions.getIntervalTitles(indicator.measure_interval,this.props.globalStorage.year).map(d=>d.name)
            const data=[
                {
                    name:'?????????? ?????????? ???????????? ????????',
                    data:res.data.map(d=>({
                        y:d.data.users.length,
                        name:d.data.users.map(
                            user=>user.firstname+' '+user.lastname+(user.post?'('+user.post+')':'')
                        ).join('</br>')
                    })),
                    dataLabels:{
                        enabled:true,
                        y:10
                    }

                },
                {
                    name:'?????????? ?????????? ???????????? ???????? ??????',
                    data:res.data.map(d=>({
                        y:d.data.collected_users.length,
                        name:d.data.collected_users.map(
                            user=>user.firstname+' '+user.lastname+(user.post?'('+user.post+')':'')
                        ).join('</br>')
                    })),
                    dataLabels:{
                        enabled:true,
                        y:10
                    }

                }
                ]
            /*const tooltipFormatter=function(){
                console.log(this,this.point)
                if(this.point && this.point.myData){
                    return '<p>'+this.point.myData.join('</br>')+'</p>'
                }

            }*/
           const chart2={
               data,
               categories,
               tooltipFormatter:undefined
           }
            this.setState({chart2})
        })
    }
    componentDidUpdate(Props,State){
        if(State.indicator!==this.state.indicator && this.state.indicator){
            this.getIntervalChart(this.state.indicator);
        }
    }
    exportExcle=()=>{
        const Exceldata=
            {
                name:'???????? ?????? ??????????????????',
                data:[]
            }
        ;
        this.props.globalStorage.indicators.map(indicator=>{

            Exceldata.data.push({'?????????? ????????':indicator.title,'??????????':indicator.target,'???? ????????':indicator.upper_limit,'???? ??????????':indicator.lower_limit,})
        })
        userActions.exportExcel([Exceldata],'???????? ?????? ??????????????????')
    }
    render() {
        const {general_indicators_info,indicator,ward,wards} = this.state;
        const {indicators} =this.props.globalStorage;
        return (
                <div className="content bg-light pt-3 pb-5 px-3 ">
                    <Routes page="indicator"/>
                    <div className="container-fluid">
                        <div className="card  bg-white shadow  text-center  border-0  ">

                            <AdminMessage/>
                        </div>
                    </div>
                    <br/>
                    {general_indicators_info &&
                    <div className="container-fluid">
                        <div className="row my-1">
                            <div className="col-lg-6  my-1">
                                <div className="card-deck ">
                                    <div className="card text-center borderDarkpurple ">
                                        <div className="card-body">
                                            <p className="card-title Darkpurple ">
                                                <small className="Darkpurple lalezar"> ???? ???????? ?????? ????????????????????</small>
                                            </p>
                                            <h5 className="card-text Darkpurple iran-sans_Bold my-1">{general_indicators_info.info.total_number_of_indicators}</h5>
                                        </div>
                                    </div>
                                    <div className="card text-center borderbluecolor">
                                        <div className="card-body">
                                            <p className=" card-title">
                                                <small className="bluecolor lalezar"> ???????? ?????? ??????????????</small>
                                            </p>
                                            <h5 className="card-text bluecolor iran-sans_Bold ">{general_indicators_info.info.mandatory_indicators}</h5>
                                        </div>
                                    </div>
                                    <div className="card text-center borderlightBlue">
                                        <div className="card-body">
                                            <p className=" card-title">
                                                <small className="lightBlue lalezar"> ???????? ?????? ????????????????</small>
                                            </p>
                                            <h5 className="card-text iran-sans_Bold lightBlue ">{general_indicators_info.info.voluntary_indicators}</h5>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div className="card-deck ">
                                    <div className="card text-center borderOrange">
                                        <div className="card-body">
                                            <p className=" card-title">
                                                <small className="orange lalezar"> ???????? ?????? ??????????</small>
                                            </p>
                                            <h5 className="card-text orange iran-sans_Bold">{general_indicators_info.info.saftety_indicators}</h5>
                                        </div>
                                    </div>
                                    <div className="card text-center borderGreen">
                                        <div className="card-body">
                                            <p className=" card-title">
                                                <small className="green lalezar"> ???????? ?????? ??????????</small>
                                            </p>
                                            <h5 className="card-text green iran-sans_Bold">{general_indicators_info.info.temporarily_indicators}</h5>
                                        </div>
                                    </div>
                                    <div className="card text-center borderLightpurple">
                                        <div className="card-body">
                                            <p className=" card-title Lightpurple">
                                                <small className="Lightpurple lalezar"> ???????? ?????? ?????????? ??????</small>
                                            </p>
                                            <h5 className="card-text Lightpurple iran-sans_Bold">{general_indicators_info.info.sent_indicators}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6   indexSec my-1 ">
                                <div className="card-deck border-0 h-100 ">
                                    <div className="card border-0 shadow">
                                        <div className="card-body">

                                            <div className="d-flex justify-content-center">
                                                <div className="card-deck ">
                                                    <div className="card text-center border-0">
                                                        <div className="card-body border-0 d-flex">
                                                            <NavLink className="d-flex flex-column align-items-center   indexs    btn"
                                                                     to="/indicator/list">
                                                                <img src={conceptIcon} alt="" width="95"
                                                                     height="95"/>
                                                                <span className="lalezar text-center text-dark my-2">  ?????????? ???????????????</span>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="card text-center border-0">
                                                        <div className="card-body border-0">
                                                            <NavLink className="d-flex flex-column align-items-center      indexs btn"
                                                                     to="/indicator/list/create">
                                                                <img src={addIcon}  alt="" width="95"
                                                                     height="95"/>
                                                                <span className="lalezar text-center text-dark my-2">  ?????? ????????</span>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="card text-center border-0">
                                                        <div className="card-body border-0">
                                                            <NavLink className="d-flex flex-column align-items-center      indexs btn"
                                                                     to="/indicator/dashboard/null">
                                                                <img src={reportIcon} alt="" width="95"
                                                                     height="95"/>
                                                                <span className="lalezar text-center text-dark my-2">?????????????? ????????</span>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="card text-center border-0">
                                                        <div className="card-body border-0">
                                                            <button onClick={this.exportExcle} className="d-flex flex-column align-items-center      indexs btn"
                                                                    >
                                                                <img src={excelIcon} alt="" width="95"
                                                                     height="95"/>
                                                                <span className="lalezar text-center text-dark my-2">?????????? ????????</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>}
                    <div className="container-fluid chart-section my-3">
                        <div className="row ">
                            <div className="col-lg-6 my-2 ">
                                <div className="card-deck   h-100 ">
                                    <div className="card border-0 shadow bg-gray2">
                                        <div className="card-body ">
                                            <div className="d-flex justify-content-between    my-lg-1 pb-2">
                                                <div className="iran-sans text-white  ">???????????????? ?????????? ???????? ???? ???? ?????????? ??????</div>

                                            </div>
                                            <div className="bg-light SalesChart dirLTR" >
                                                {this.state.chart1 &&
                                                <Chart
                                                    data={this.state.chart1.data}
                                                    categories={this.state.chart1.categories}
                                                    chartType={"column"}
                                                    legend={false}
                                                />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 my-2  ">
                                <div className="card-deck h-100">
                                    <div className="card border-0 shadow ">
                                        <div className="card-body text-center  ">
                                            <div className="py-1 d-flex justify-content-center">
                                                <label className="py-1 mx-2 w-100 d-block" style={{maxWidth:350,fontSize:'.8em'}}>
                                                    <Select className="text-justify custom-select-2"
                                                            value={ward}
                                                            name="ward"
                                                            placeholder="?????? ???????? ?????? ???? ???????????? ????????"
                                                            onChange={(v,d)=>{userActions.handleChangeSelect.call(this,v,d,null,null,()=>{
                                                                this.setState({indicator:''})
                                                            })}}
                                                            options={wards}
                                                            getOptionLabel={opt => opt.name}
                                                            getOptionValue={opt => opt._id}

                                                    />
                                                </label>
                                                <label className="py-1 mx-2 w-100 d-block" style={{maxWidth:350,fontSize:'.8em'}}>
                                                    <Select className="text-justify custom-select-2"
                                                            value={indicator}
                                                            name="indicator"
                                                            placeholder="???????? ???????? ?????? ???? ???????????? ????????"
                                                            onChange={userActions.handleChangeSelect.bind(this)}
                                                            options={ward?indicators.filter(ind=>ind.ward_id===ward._id):indicators}
                                                            getOptionLabel={opt => opt.title}
                                                            getOptionValue={opt => opt.id}

                                                    />
                                                </label>
                                            </div>
                                            <div className="bg-light SalesChart dirLTR" >
                                                {this.state.chart2 &&
                                                <Chart
                                                    data={this.state.chart2.data}
                                                    categories={this.state.chart2.categories}
                                                    tooltipFormatter={this.state.chart2.tooltipFormatter}
                                                    chartType={"column"}
                                                    legend={true}
                                                    chartMargin={[60,50,150,80]}
                                                />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



        )
    }
}

const IndicatorIndexComponent=connect((state) => ({globalStorage: state.globalStorage}))(IndicatorIndex);
export {IndicatorIndexComponent}
