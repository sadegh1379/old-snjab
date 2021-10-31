import React,{ Component } from 'react';
import Marquee from "react-smooth-marquee";
import PropTypes from 'prop-types';

export class AdminMessage extends Component{

    render(){
        return(
            <div className="card-body iran-sans_Bold text-dark  fa-rotate-180 overflow-hidden position-relative">
                <Marquee>
                    <div className="fa-rotate-180">
                        {this.props.text}
                    </div>
                </Marquee>
            </div>
        )
    }
}
AdminMessage.defaultProps={
    text:'پیام مدیــر سنجــاب: برای بازگشت به صفحه' +
    ' اصلی از دکمه بازگشت بالا استفاده' +
    ' کنید'
}
AdminMessage.propTypes={
    text: PropTypes.string
}