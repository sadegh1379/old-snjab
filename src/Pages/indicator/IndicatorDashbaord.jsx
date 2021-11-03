import React, {Component} from "react";
import Select from "react-select";
import {connect} from "react-redux";
import {ROTATION} from "../../_constants";
import * as _ from "lodash";
import "../../assets/sass/template.scss";
import mapicon from "../../assets/images/map-icon.png";
import spider from "../../assets/images/spiderchart.png";
import lineChart from "../../assets/images/linechat.png";
import sbar_icon from "../../assets/images/sbar-icon-5.png";
import threemap from "../../assets/images/treemap-icon-5.png";
import xmas from "../../assets/images/xmas-icon-1.png";
import arrowicon from "../../assets/images/arrow-icon-1.png";
import sbaricon6 from "../../assets/images/sbar-icon-6.png";
import ploticon from "../../assets/images/plot-icon-5.png";
import donut_icon from "../../assets/images/donut-icon.png";
import moment from "jalali-moment";
import {userActions} from "../../_actions";
import {Routes, ToggleBotton, AdminMessage, Chart} from "../../_components";

const CHARTS = [
    "روند ارزیابی # در دوره تناوب اندازه گیری شده",
    "مقایسه میانگین بخش ها با کل بیمارستان",
    "میانگین نظرات بخش ها برای سوالات مختلف",
    "تعداد نظرات بخش ها برای سوالات مختلف",
    "میانگین نظرات روی حیطه مختلف سؤالات",

];

class IndicatorDashbaord_ extends Component {
    constructor() {
        super();
        this.state = {
            
            chart_data: null,
            polar: false,
            wards: [],
            ward: [],
            measure_interval: "",
            indicator: "",
            isComparison: false,
            showChart: false,
            ToolBox1: false,
            ToolBox2: false,
            chartIcons: [
                {
                    icon: lineChart,
                    name: "line"
                },
                {
                    icon: sbar_icon,
                    name: "column"
                },
                {
                    icon: threemap,
                    name: "treemap"
                },
                {
                    icon: xmas,
                    name: "xmas"
                },
                {
                    icon: arrowicon,
                    name: "arrowicon"
                },
                {
                    icon: sbaricon6,
                    name: "bar"
                },
                {
                    icon: ploticon,
                    name: "boxplot"
                },
                {
                    icon: spider,
                    name: "spider"
                },
                {
                    icon: donut_icon,
                    name: "pie"
                }
            ],
            chartType: "column",
            gauges1: null,
            gauges2: null,
            gauges2Config: {},
            gauges1Config: {},
            charts_checklist: userActions.generateSelectLabelValue(
                CHARTS.slice(0, 5)
            ),
            charts_formula: userActions.generateSelectLabelValue(CHARTS.slice(0, 2)),
            chart_: "",
            rotation:""
        };
        this.setChart = this.setChart.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.indicator_id !== 'null'){
            const id = this.props.match.params.indicator_id
            this.getIndicator({id : id})
        }
        if (!this.props.globalStorage.indicators.length) {
            this.props.dispatch(
                userActions.getIndicator(this.props.globalStorage.year)
            ).then(() => {
                this.selectIndicator()
                const search = this.props.location.search;
                const params = new URLSearchParams(search);
                const indicator_id = params.get('id');

                if (indicator_id) {
                    const {indicators} = this.props.globalStorage;
                    console.log(indicators)
                    const indicator = indicators.find(indi => indi.id == indicator_id);
                    console.log(indicator)
                    this.setState({indicator}, () => {
                        this.setState({
                            chart_: {
                                label: 'روند ارزیابی # در دوره تناوب اندازه گیری شده',
                                value: "روند ارزیابی # در دوره تناوب اندازه گیری شده"
                            }
                        })
                    })
                }
            });
        } else {
            this.selectIndicator();
            const search = this.props.location.search;
                const params = new URLSearchParams(search);
                const indicator_id = params.get('id');

                if (indicator_id) {
                    const {indicators} = this.props.globalStorage;
                    console.log(indicators)
                    const indicator = indicators.find(indi => indi.id == indicator_id);
                    console.log(indicator)
                    this.setState({indicator}, () => {
                        this.setState({
                            chart_: {
                                label: 'روند ارزیابی # در دوره تناوب اندازه گیری شده',
                                value: "روند ارزیابی # در دوره تناوب اندازه گیری شده"
                            }
                        })
                    })
                }
        }

        


    }

    selectIndicator = () => {
        const {id, indicators} = this.props.globalStorage;
        if (id && indicators) {
            const indicator = indicators.find(indi => indi.id == id);
            this.setState({indicator}, () => {
                this.setState({
                    chart_: {
                        label: 'روند ارزیابی # در دوره تناوب اندازه گیری شده',
                        value: "روند ارزیابی # در دوره تناوب اندازه گیری شده"
                    }
                })
            })
        }
    }

    componentDidUpdate(Props, State) {
        if (State.indicator !== this.state.indicator && this.state.indicator) {
            this.getWards(this.state.indicator.id);
            this.getGauge1(this.state.indicator.id);
            this.getGauge2(this.state.indicator.id);
        }
        if (
            State.ward !== this.state.ward &&
            ((this.state.ward && this.state.ward.length) || (State.ward && State.ward.length))
        ) {
            this.getGauge1(
                this.state.indicator.id,
                this.state.ward ? this.state.ward.map(w => w._id) : []
            );
            this.getGauge2(
                this.state.indicator.id,
                this.state.ward ? this.state.ward.map(w => w._id) : []
            );
            if (this.state.chart_) {
                this.setChart(this.state.chart_)
            }
        }
    }

    getGauge1 = (id, wards = null) => {
        this.setState({gauges1: null}, () => {
            this.props
                .dispatch(
                    userActions.API(
                        "post",
                        `/v2/indicator/average_by_ward_chart?id=${id}`,
                        {
                            wards
                        }
                    )
                )
                .then(res => {
                    const gauges1 = {};
                    gauges1["کل بیمارستان"] = res.data.hospital
                        ? parseFloat(userActions.fixed(res.data.hospital))
                        : 0;
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            gauges1[w.name] = parseFloat(userActions.fixed(w.value));
                        });
                    }
                    let max = 0;
                    let min = 0;
                    Object.keys(gauges1).forEach(d => {
                        if (gauges1[d] >= max) {
                            max = gauges1[d];
                        }
                        if (gauges1[d] <= min) {
                            min = gauges1[d];
                        }
                    });
                    const gauges1Config = {
                        min,
                        max
                    };
                    console.log(gauges1, gauges1Config)
                    this.setState({gauges1, gauges1Config});
                });
        });
    };
    getGauge2 = (id, wards = null) => {
        this.setState({gauges1: null}, () => {
            this.props
                .dispatch(
                    userActions.API(
                        "post",
                        `/v2/indicator/count_by_ward_chart?id=${id}`,
                        {wards}
                    )
                )
                .then(res => {
                    const gauges2 = {};
                    gauges2["کل بیمارستان"] = res.data.hospital
                        ? parseFloat(userActions.fixed(res.data.hospital))
                        : 0;
                    if (res.data.wards)
                        res.data.wards.map(w => {
                            gauges2[w.name] = parseFloat(userActions.fixed(w.value));
                        });
                    let max = 0;
                    let min = 0;
                    Object.keys(gauges2).forEach(d => {
                        if (gauges2[d] >= max) {
                            max = gauges2[d];
                        }
                        if (gauges2[d] <= min) {
                            min = gauges2[d];
                        }
                    });
                    const gauges2Config = {
                        min,
                        max
                    };
                    this.setState({gauges2, gauges2Config});
                });
        });
    };
    getWards = id => {
        this.props
            .dispatch(userActions.API("get", `/v2/indicator/answers/wards?id=${id}`))
            .then(res => {
                this.setState({chart: null, measure_interval: null});
                this.setState({wards: res.data, ward: []});
            });
    };

    async setChart(value) {
        await this.setState({chart: null});
        const func = "chart" + CHARTS.indexOf(value.value);
        const res = await this[func](this.state.indicator.id, this.state.ward ? this.state.ward.map(w => w._id) : []);

        if (res) {
            const chart = {};
            chart.data = Object.keys(res.chart_data).map(d => {
                let data = res.chart_data[d];
                if(res.chart_additional_data)
                {
                    //console.log(res.chart_additional_data[d])
                    data=res.chart_additional_data[d].map((dd,i)=>({
                        y:data[i],
                        name:dd.data.map(
                            ddd=>ddd.answer+'='+ddd.count+'('+userActions.fixed(ddd.value)+'%)'
                        ).join('</br>')
                    }))
                }
                const name = d;
                return Object.assign({
                    dataLabels: {
                        enabled: true,
                        y: 10
                    }
                }, {data, name});
            })
            chart.categories = res.chart_category.map(c => c.name)

            this.setState({chart});
        }
    }

    handleChangeChart = chartType => {
        if (chartType === "spider") {
            chartType = "line";
            this.setState({polar: true});
        } else {
            this.setState({polar: false});
        }

        if (chartType === "xmas") {
            return;
        }

        if (chartType === "arrowicon") {
            return;
        }

        if (chartType === "ploticon") {
            return;
        }

        this.setState({chartType});
    };
    getIndicator = indicator => {
        this.props
            .dispatch(
                userActions.API("get", `/v2/get_indicator?indicator_id=${indicator.id}`)
            )
            .then(res => {
                this.setState({indicator: res.data});
            });
    };
    chart0 = (id, wards = null,rotation=this.state.rotation) => {
        return new Promise((resolve, rej) => {
            this.props
                .dispatch(
                    userActions.API("post", `/v2/indicator/interval_by_ward?id=${id}`, {
                        wards,rotation
                    })
                )
                .then(res => {
                    const chart_data = {};
                    const chart_category = [];
                    const {measure_interval, indicator} = this.state;
                    const period = measure_interval
                        ? measure_interval.value
                        : indicator.measure_interval;
                    for (let i = 1; i <= userActions.getPeriodCount(period); i++) {
                        chart_category.push({
                            name:
                                period === "ماهانه" ? userActions.persianMonth(i)
                                    : (period === "سالانه" ? this.props.globalStorage.year
                                        : (period === "روزانه" ? moment().jDayOfYear(i).format("jMMMM jDD")
                                                : userActions.intervalPerfix(period) + userActions.persianNumber(i, true)
                                        )
                                    )
                            ,
                            interval_number: i
                        });
                    }
                    chart_data["کل بیمارستان"] = [];
                    const wards = {};
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            chart_data[w.name] = [];
                            wards[w.name] = w.values;
                        });
                    }
                    chart_category.map(cat => {
                        Object.keys(chart_data).map(key => {
                            let value = null;
                            if (key === "کل بیمارستان") {
                                if (['چک لیست', 'پرسشنامه', 'HIS'].indexOf(indicator.report_type) === -1) {
                                    console.log(indicator)
                                    const groupIntervals = userActions.groupBy(res.data.hospital, 'interval_number');
                                    let intervals = [];

                                    Object.keys(groupIntervals).map(g => {
                                        const l = groupIntervals[g].length;
                                        const value = groupIntervals[g].reduce((a, b) => ({['value']: parseFloat(a['value']) + parseFloat(b['value'])}))['value'] / l;

                                        intervals.push({
                                            interval_number: g,
                                            value,
                                        })
                                    })
                                    console.log(intervals)
                                    res.data.hospital = intervals;
                                }
                                const data = res.data.hospital.find(d => d.interval_number.toString() === cat.interval_number.toString());
                                if (data) {
                                    value = parseFloat(userActions.fixed(data.value));
                                }
                            } else {
                                if (res.data.wards) {
                                    const data = wards[key].find(d => d.interval_number === cat.interval_number);
                                    if (data) {
                                        value = parseFloat(userActions.fixed(data.value));
                                    }
                                }
                            }
                            chart_data[key].push(
                                value
                            )
                        })
                        //  res.data.hospital.map(d => {

                        //     // if(d.interval_name==cat.interval_name){
                        //     //   chart_data["کل بیمارستان"]
                        //     // }
                        //   })
                    });


                    resolve({chart_data, chart_category});
                });
        });
    };
    chart1 = (id, wards = null,) => {
        return new Promise((resolve, rej) => {
            this.props
                .dispatch(
                    userActions.API("post", `/v2/indicator/average_by_ward_chart?id=${id}`, {
                        wards: wards && wards.length ? wards : this.state.wards.map(w => w._id)
                    })
                )
                .then(res => {
                    const chart_data = {};
                    const chart_category = res.data.wards.map(w => ({name: w.name}));
                    const {indicator} = this.state;


                    chart_data["کل بیمارستان"] = [];
                    if (res.data.hospital) {
                        chart_category.map(h => {
                            chart_data["کل بیمارستان"].push(parseFloat(userActions.fixed(res.data.hospital)));
                        })
                    }
                    const wards = {};
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            chart_data[w.name] = [];
                            wards[w.name] = w.value;
                            chart_category.map(h => {
                                if (h.name === w.name) {
                                    chart_data[w.name].push(parseFloat(userActions.fixed(w.value)));
                                } else {
                                    chart_data[w.name].push(null)
                                }
                            })
                        });
                    }


                    resolve({chart_data, chart_category});
                });
        });
    };
    chart2 = (id, wards = null) => {
        return new Promise((resolve, rej) => {
            this.props
                .dispatch(
                    userActions.API("post", `/v2/indicator/question_average?id=${id}`, {
                        wards
                    })
                )
                .then(res => {
                    const chart_data = {};
                    const chart_category = [];
                    const {indicator} = this.state;

                    chart_data["کل بیمارستان"] = [];
                    if (res.data.hospital) {
                        res.data.hospital.map(h => {
                            chart_data["کل بیمارستان"].push(parseFloat(userActions.fixed(h.value)))
                            chart_category.push({name: h.question})
                        })
                    }
                    ;
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            chart_data[w.name] = [];
                            chart_category.map(c => {
                                w.values.map(v => {
                                    if (v.question === c.name) {
                                        chart_data[w.name].push(parseFloat(userActions.fixed(v.value)))
                                    }
                                })
                            })
                        });
                    }


                    resolve({chart_data, chart_category});
                });
        });
    };
    chart3 = (id, wards = null) => {
        return new Promise((resolve, rej) => {
            this.props
                .dispatch(
                    userActions.API("post", `/v2/indicator/question_answers_average?id=${id}`, {
                        wards
                    })
                )
                .then(res => {
                    const chart_data = {};
                    const chart_category = [];
                    const chart_additional_data = {};
                    const {indicator} = this.state;

                    chart_data["کل بیمارستان"] = [];
                    if (res.data.hospital) {
                        chart_additional_data["کل بیمارستان"]=[];
                        res.data.hospital.map(h => {
                            const y=h.answers.reduce((a, b) => {
                                return {count: parseFloat(a.count || 0) + parseFloat(b.count || 0)}
                            }, 0)['count'];
                            chart_data["کل بیمارستان"].push(parseFloat(userActions.fixed(
                                y
                                ))
                            )
                            chart_category.push({name: h.question})
                            chart_additional_data["کل بیمارستان"].push({data:h.answers})
                        })
                    }
                    ;
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            chart_data[w.name] = [];
                            chart_additional_data[w.name]=[];
                            chart_category.map(c => {
                                w.values.map(v => {
                                    if (v.question === c.name) {
                                        chart_additional_data[w.name].push(v.answers)
                                        chart_data[w.name].push(parseFloat(userActions.fixed(v.answers.reduce((a, b) => {
                                                return {count: parseFloat(a.count || 0) + parseFloat(b.count || 0)}
                                            }, 0)['count']
                                        )))
                                    }
                                })
                            })
                        });
                    }


                    resolve({chart_data, chart_category,chart_additional_data});
                });
        });
    };
    chart4 = (id, wards = null) => {
        return new Promise((resolve, rej) => {
            this.props
                .dispatch(
                    userActions.API("post", `/v2/indicator/question_average_by_component?id=${id}`, {
                        wards
                    })
                )
                .then(res => {
                    const chart_data = {};
                    const chart_category = [];
                    const {indicator} = this.state;

                    chart_data["کل بیمارستان"] = [];
                    if (res.data.hospital) {
                        res.data.hospital.map(h => {
                            chart_data["کل بیمارستان"].push(parseFloat(userActions.fixed(h.value)))
                            chart_category.push({name: h.title})
                        })
                    }
                    ;
                    if (res.data.wards) {
                        res.data.wards.map(w => {
                            chart_data[w.name] = [];
                            chart_category.map(c => {
                                w.values.map(v => {
                                    if (v.title === c.name) {
                                        chart_data[w.name].push(parseFloat(userActions.fixed(v.value)))
                                    }
                                })
                            })
                        });
                    }


                    resolve({chart_data, chart_category});
                });
        });
    };
    changeInterval=interval=>{
        this.setState({rotation:interval?ROTATION[interval.value]:null},()=>{
            if (this.state.chart_) {
                this.setChart(this.state.chart_)
            }
        })
    }
    render() {
        const {
            indicator,
            measure_interval,
            wards,
            ward,
            charts_checklist,
            charts_formula,
            chart_
        } = this.state;
        const {indicators} = this.props.globalStorage;
        console.log(indicators)
        return (
            <>
                <Routes page="indicator/dashboard"/>
                <div className="back-dashbord ">
                    <div className="container-fluid shadow px-5 pb-5 ">
                        <div className="row py-3 pb-5">
                            <div
                                className="col-md-3  bg-white  p-4 box-shadow "
                                style={{borderRadius: "12px"}}
                            >
                                {/*<div className="d-flex justify-content-center">
                  <button
                    onClick={() => {
                      this.setState({
                        isComparison: false
                      });
                    }}
                    style={{
                      height: "80px",
                      width: "100px",
                      borderRadius: "12px"
                    }}
                    className="btn btn-blue mx-2   text-iransansBold col-lg-6  d-flex flex-column align-items-center justify-content-center text-white"
                  >
                    <i className="far fa-chart-pie fa-2x mr-2"/>
                    <img src={addi} width={40} />
                    <span>عـــادی</span>
                  </button>
                  <button
                    onClick={() => {
                      this.setState({
                        isComparison: true
                      });
                    }}
                    style={{
                      height: "80px",
                      width: "100px",
                      borderRadius: "12px"
                    }}
                    className="btn btn-outline-blue mx-2  text-iransansBold col-lg-6 d-flex flex-column align-items-center justify-content-center "
                  >
                    <i className="far fa-chart-pie fa-2x mr-2"/>
                    <img src={moghayeseh} width={40} />
                    <span>مقایســـه</span>
                  </button>
                </div>*/}
                                <div className={"custom-title2   mt-5 text-center"}>
                                    <div className={"line"}></div>
                                    <div className=" rounded-pill bg-white border">نوع نمایش</div>
                                </div>

                                <div className="row">
                                    <div className="row">
                                        {this.state.chartIcons.map((icon, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className=" col-lg-4 d-flex flex-column align-items-center justify-content-around  my-2"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            this.handleChangeChart(icon.name);
                                                        }}
                                                        className={`rounded-0 btn w-100 ${
                                                            this.state.chartType === icon.name
                                                                ? "border-bottom"
                                                                : ""
                                                            }  gray-light `}
                                                    >
                                                        <img alt="" src={icon.icon} width={50}/>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div
                                    className={
                                        "custom-title2  text-iransansBold text-center mt-5"
                                    }
                                >
                                    <div className={"line"}></div>
                                    <div className="rounded-pill bg-white border">فیلتر ها</div>
                                </div>

                                <div className="custom-select-box form-group text-right">
                                    <label
                                        className="color-dark text-iransansBold my-3"
                                        style={{fontSize: "0.8em"}}
                                    >
                                        نام شـاخص
                                    </label>

                                    <Select
                                        className="text-justify custom-select-2"
                                        value={indicator}
                                        name="indicator"
                                        placeholder="انتخاب کنید"
                                        onChange={(value, data) => {
                                            userActions.handleChangeSelect.call(
                                                this,
                                                value,
                                                data,
                                                null,
                                                null,
                                                this.getIndicator
                                            );
                                        }}
                                        options={indicators}
                                        getOptionLabel={opt => opt.title}
                                        getOptionValue={opt => opt.id}
                                    />
                                </div>
                                <div className="custom-select-box form-group text-right">
                                    <label
                                        className="color-dark text-iransansBold my-3"
                                        style={{fontSize: "0.8em"}}
                                    >
                                        نوع گزارش
                                    </label>

                                    <Select
                                        className="text-justify custom-select-2"
                                        value={chart_}
                                        name="chart_"
                                        placeholder="انتخاب کنید"
                                        onChange={(value, data) => {
                                            userActions.handleChangeSelect.call(
                                                this,
                                                value,
                                                data,
                                                null,
                                                null,
                                                this.setChart
                                            );
                                        }}
                                        options={
                                            indicator
                                                ? indicator.report_type === "چک لیست" ||
                                                indicator.report_type === "پرسشنامه"
                                                ? charts_checklist
                                                : charts_formula
                                                : []
                                        }
                                        getOptionLabel={opt =>
                                            opt.label.replace("#", `"${indicator.title}"`)
                                        }
                                    />
                                </div>
                                <div className="custom-select-box form-group text-right">
                                    <label
                                        className="color-dark text-iransansBold my-3"
                                        style={{fontSize: "0.8em"}}
                                    >
                                        دوره تناوب
                                    </label>
                                    <Select
                                        options={
                                            indicator
                                                ? userActions.getAvailableInterval(
                                                indicator.measure_interval
                                                )
                                                : []
                                        }
                                        value={measure_interval}
                                        name="measure_interval"
                                        onChange={(v,d)=>userActions.handleChangeSelect.call(this,v,d,null,null,this.changeInterval)}
                                        className="text-center custom-select-2"
                                        isClearable
                                        autoFocus={false}
                                        //   onChange={userActions.handleChangeSelect.bind(this)}
                                        placeholder={"انتخاب کنید"}
                                        //   options={type_options}
                                    />
                                </div>

                                <div
                                    className={
                                        "custom-title2 d-flex justify-content-center  text-iransansBold mt-5"
                                    }
                                >
                                    <div className={"line"}></div>
                                    <div className="rounded-pill bg-white border text-center">
                                        {" "}
                                        سایر
                                    </div>
                                </div>

                                <div className="custom-select-box form-group text-right">
                                    <label
                                        className="color-dark text-iransansBold my-3"
                                        style={{fontSize: "0.8em"}}
                                    >
                                        بخــش ها
                                    </label>
                                    <Select
                                        options={wards}
                                        className="text-center custom-select-2"
                                        isClearable
                                        getOptionLabel={opt => opt.name}
                                        getOptionValue={opt => opt._id}
                                        onChange={userActions.handleChangeSelect.bind(this)}
                                        value={ward}
                                        name="ward"
                                        autoFocus={false}
                                        isMulti={true}
                                        //   onChange={userActions.handleChangeSelect.bind(this)}
                                        placeholder={"انتخاب کنید"}
                                        //   options={type_options}
                                    />
                                </div>
                                {/* <div className="custom-select-box form-group text-right">
                  <label
                    className="color-dark text-iransansBold my-3"
                    style={{ fontSize: "0.8em" }}
                  >
                    از تـاریخ
                  </label>
                  <Select

                    className="text-center custom-select-2"
                    isClearable
                    value={"select_type"}
                    autoFocus={false}
                    name="select_type"
                    //   onChange={userActions.handleChangeSelect.bind(this)}
                    placeholder={"انتخاب کنید"}
                    //   options={type_options}
                    id="select_type"
                  />
                </div>
                <div className="custom-select-box form-group text-right">
                  <label
                    className="color-dark iran-sans_Bold my-3"
                    style={{ fontSize: "0.8em" }}
                  >
                    تا تـاریخ
                  </label>
                  <Select

                    className="text-center custom-select-2"
                    isClearable
                    value={"select_type"}
                    autoFocus={false}
                    name="select_type"
                    //   onChange={userActions.handleChangeSelect.bind(this)}
                    placeholder={"انتخاب کنید"}
                    //   options={type_options}
                    id="select_type"
                  />
                </div>*/}

                                {/*<div className="custom-select-box form-group text-right">
                  <label
                    className="color-dark iran-sans_Bold my-3 text-iransansBold"
                    style={{ fontSize: "0.8em" }}
                  >
                    جنسیت (Sex)
                  </label>
                  <ToggleBotton
                    btns={this.state.sexButtons}
                    onClickHandel={data => {
                      this.setState({ toggle: data });
                    }}
                    toggle_state={this.state.toggle}
                    className="toggle_btn text-center d-flex align-items-center"
                    myBgColor={"#600530"}
                    myColor={"btn-dark-outline"}
                  />
                </div>*/}
                            </div>
                            <div className="col-md-9 text-center   d-flex flex-wrap">
                                {this.state.gauges1 && (
                                    <div
                                        className=" p-5   mb-3  col-6 "
                                        style={{borderRadius: "12px"}}
                                    >
                                        <div className="w-100 bg-white box-shadow ">
                                            {Object.keys(this.state.gauges1).map((g, i) => (
                                                <Chart
                                                    height={300}
                                                    exporting={{
                                                        enabled: false
                                                    }}
                                                    className="gauge-chart-container"
                                                    pane={{
                                                        center: ["50%", "50%"],
                                                        size: "100%",
                                                        startAngle: -90,
                                                        endAngle: 90,
                                                        background: {
                                                            innerRadius: "60%",
                                                            outerRadius: "100%",
                                                            shape: "arc"
                                                        }
                                                    }}
                                                    tooltip={{
                                                        enabled: false
                                                    }}
                                                    yAxis={{
                                                        min: this.state.gauges1Config.min !== this.state.gauges1Config.max ? this.state.gauges1Config.min : this.state.gauges1Config.min,
                                                        max: this.state.gauges1Config.min !== this.state.gauges1Config.max ? this.state.gauges1Config.max : this.state.gauges1Config.max + 1,
                                                        stops: indicator.upper_limit != null && indicator.lower_limit != null && indicator.lower_limit !== indicator.upper_limit ? [

                                                            [indicator.lower_limit, indicator.desirability == "افزاینده"
                                                                ? "#DF5353"
                                                                : "#55BF3B"],
                                                            [
                                                                indicator.upper_limit,
                                                                indicator.desirability == "افزاینده"
                                                                    ? "#55BF3B"
                                                                    : "#DF5353"
                                                            ] // green
                                                        ] : undefined,
                                                        lineWidth: 0,
                                                        tickWidth: 0,
                                                        minorTickInterval: null,
                                                        tickAmount: 1,
                                                        title: {
                                                            y: -70,

                                                        },
                                                        labels: {
                                                            y: 16,

                                                        }
                                                    }}
                                                    key={i}
                                                    data={[
                                                        {
                                                            name: g,
                                                            data: [this.state.gauges1[g]],
                                                            dataLabels: {
                                                                format:
                                                                    '<div style="text-align:center;white-space: normal;width: 103px;">' +
                                                                    '<span style="font-size:1.5em">{y:.2f}</span><br/>' +
                                                                    '<span style="font-size:.8em;">' +
                                                                    " مقدار شاخص در " +
                                                                    g +
                                                                    "</span>" +
                                                                    "</div>"
                                                            }
                                                        }
                                                    ]}
                                                    chartType={"solidgauge"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {this.state.gauges2 && (
                                    <div
                                        className=" p-5   mb-3 col-6 "
                                        style={{borderRadius: "12px"}}
                                    >
                                        <div className="w-100 box-shadow bg-white ">
                                            {Object.keys(this.state.gauges2).map((g, i) => (
                                                <Chart
                                                    height={300}
                                                    exporting={{
                                                        enabled: false
                                                    }}
                                                    className="gauge-chart-container"
                                                    pane={{
                                                        center: ["50%", "50%"],
                                                        size: "100%",
                                                        startAngle: -90,
                                                        endAngle: 90,
                                                        background: {
                                                            innerRadius: "60%",
                                                            outerRadius: "100%",
                                                            shape: "arc"
                                                        }
                                                    }}
                                                    tooltip={{
                                                        enabled: false
                                                    }}
                                                    yAxis={{
                                                        min: this.state.gauges2Config.min,
                                                        max: this.state.gauges2Config.max,
                                                        lineWidth: 0,
                                                        tickWidth: 0,
                                                        minorTickInterval: null,
                                                        tickAmount: 1,
                                                        title: {
                                                            y: -70
                                                        },
                                                        labels: {
                                                            y: 16
                                                        }
                                                    }}
                                                    key={i}
                                                    data={[
                                                        {
                                                            name: g,
                                                            data: [this.state.gauges2[g]],
                                                            dataLabels: {
                                                                format:
                                                                    '<div style="text-align:center;white-space: normal;width: 103px;">' +
                                                                    '<span style="font-size:1.5em">{y}</span><br/>' +
                                                                    '<span style="font-size:.8em">' +
                                                                    " تعداد پاسخ ها در " +
                                                                    g +
                                                                    "</span>" +
                                                                    "</div>"
                                                            }
                                                        }
                                                    ]}
                                                    chartType={"solidgauge"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {this.state.chart && (
                                    <div
                                        className=" col-12 "
                                        style={{borderRadius: "12px", padding: "60px", maxHeight: 500}}
                                    >
                                        <div
                                            style={{position: "relative"}}
                                            className="bg-white box-shadow"
                                        >
                                            <div className="w-100  text-center">
                                                <Chart
                                                    data={this.state.chart.data}
                                                    categories={this.state.chart.categories}
                                                    tooltipFormatter={this.state.chart.tooltipFormatter}
                                                    chartType={this.state.chartType}
                                                    legend={true}
                                                    chartMargin={[60, 50, 100, 60]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const IndicatorDashbaord = connect(state => ({
    globalStorage: state.globalStorage
}))(IndicatorDashbaord_);
export {IndicatorDashbaord};
