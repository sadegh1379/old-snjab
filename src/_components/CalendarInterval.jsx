import React, { Component } from 'react'
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import validator from 'validator';
import ReactTooltip from 'react-tooltip';
import moment from 'jalali-moment';
import {userActions} from "../_actions";


const daysStyle = {
    minWidth: 21,
    minHeight:21,
    maxWidth: 21,
    maxHeight: 21,
    fontSize: '0.7em',
}

export class CalendarInterval extends Component {
    btnHandler = (data, interval_number,dayOfYear=null) => {
    
        if(dayOfYear!=null){
            const year = this.props.year;
            const m=moment(`${year}/${interval_number+1}/${dayOfYear}`, 'jYYYY/jMM/jDD');

            this.props.btnHandler(data,m.jDayOfYear());
        }else{
            this.props.btnHandler(data,interval_number + 1)
        }
    }

    detailHandler = (interval) => {
        this.props.openDetailRecords(interval);
    }

    render() {

        return (
                <div className="col-lg-4 col-md-6 my-3 " key={this.props.boxIndex}>
                    <div className={`card ${this.props.pwa?'border_calender_pwa_none':''}`}>
                        <div style={{background: this.props.colorTheme}} className={`${this.props.pwa?'border_calender_pwa_header':''} card-header text-center h-100 text-white`}>
                            <div className="row align-items-center align-self-center">
                                {
                                   this.props.status !== undefined ? 
                                        <button className="icon-status btn bg-white  rounded-circle btn-cal bg-white   d-flex justify-content-center">
                                            <i className={this.props.status}></i>
                                        </button>
                                    : <></>
                                }
                                <span className="col"> {this.props.title}</span>
                            </div>
                        </div>
                            {
                                this.props.measure_interval === 'روزانه' ? 
                                    <>  
                                         <div style={{backgroundColor: tinycolor(this.props.colorTheme).brighten(65).toString()}} className="card-body d-flex flex-row flex-wrap text-center w-100 h-100 p-2">
                                            {
                                                this.props.days.map((day, index) => {
                                                    // console.log(day, index)
                                                    return <>
                                                        <button data-tip={day.data.average?userActions.fixed(day.data.average):day.data.average}
                                                                onClick={(ev) => {if(!this.props.readOnly)this.btnHandler(day.data,this.props.boxIndex, day.day)}} style={Object.assign({backgroundColor:day.data.average!=undefined?tinycolor(this.props.colorTheme).toString():'',},daysStyle)} key={index} className={`text-center rounded-circle btn btn-outline-primary p-0 m-1 ${day.data.average!=undefined?'text-white':''}`} >{day.day}</button>

                                                    </>
                                                })
                                            }
                                         </div>

                                    </>
                                : 
                                <>
                                    <div style={{backgroundColor: tinycolor(this.props.colorTheme).brighten(65).toString()}} className={`card-body ${this.props.pwa?'border_calender_pwa':''} text-center w-100 h-100 p-2`}>

                                        {
                                            this.props.readOnly?
                                                <h6
                                                    style={{color: this.props.colorTheme, minHeight: '50px'}}
                                                    className="iran-sans_Bold mt-3 mb-3">
                                                    {this.props.interval.average != null ?userActions.fixed(this.props.interval.average):'مقداری وارد نشده'}
                                                </h6>
                                                :
                                                <h4
                                                    style={{color: this.props.colorTheme, minHeight: '50px'}}
                                                    className="iran-sans_Bold mt-3 mb-3">
                                                    {this.props.interval.average != null ?userActions.fixed(this.props.interval.average):''}
                                                </h4>
                                        }
                                        {!this.props.readOnly && <button onClick={(ev) => {
                                            this.btnHandler(this.props.interval, this.props.boxIndex)
                                        }}
                                                                        className="btn   rounded-pill w-100"
                                                                        style={{
                                                                            borderColor: this.props.colorTheme,
                                                                            color: this.props.colorTheme
                                                                        }}
                                        >ورود مقادیر</button>
                                        }

                                        {this.props.readOnly &&  this.props.showDetails && this.props.interval.average != null ? <button onClick={(ev) => {
                                            this.detailHandler(this.props.interval)
                                        }}
                                        className="btn   rounded-pill w-100"
                                        style={{
                                            borderColor: this.props.colorTheme,
                                            color: this.props.colorTheme
                                        }}
                                        >مشاهده جزئیات</button>
                                        : <></>}
                                    </div>
                                </>
                            }
                    </div>
                    <ReactTooltip type="light"/>
                 </div>
        )
    }
}



function checkHexProp(props, propName, componentName) {
    componentName = componentName || 'ANONYMOUS';
    if (props[propName]) {
      let value = props[propName];
      if (typeof value === 'string') {
          return validator.isHexColor(value) ? null : new Error(propName + ' in ' + componentName + " is not a hex Color");
      }
    }
  
    // assume all ok
    return null;
  }

CalendarInterval.propTypes = {
    title: PropTypes.string.isRequired,
    colorTheme: checkHexProp,
    btnHandler: PropTypes.func.isRequired,
    day: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number]),
    status: PropTypes.string

    
}

CalendarInterval.defaultProps = {
    colorTheme: '#343a40'
}