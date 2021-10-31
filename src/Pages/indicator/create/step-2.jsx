import React from 'react';
import Select from 'react-select';
import { userActions } from "../../../_actions";
import { connect } from "react-redux";
import { CollapseComp, ToggleBotton } from "../../../_components";

class Step2_ extends React.Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({}, props.globalStorage.temp);
        this.toggleItems = this.toggleItems.bind(this);
    }
    componentDidUpdate(props, state) {
        if (props.globalStorage.temp !== this.state) {
            this.props.dispatch(userActions.setTemp({ temp: this.state }))
        }
    }


    async toggleItems(item) {
        const { selectedItems } = this.state;
        const index = selectedItems.findIndex(i => i.answerer_info_menu_item_id === item.id);
        if (index === -1) {
            const itm = Object.assign({ answerer_info_menu_item_id: item.id, require: true }, item);

            selectedItems.push(itm);

        } else {
            if (selectedItems[index].checked) {
                await this.props.dispatch(userActions.API('delete', `/v2/delete_indicator_answerer_info_menu_items?item_id=${selectedItems[index].id}`, null, false))
            }
            selectedItems.splice(index, 1);


        }
        this.setState({ selectedItems })
    }

    async toggleItemsRequire(item) {
        const { selectedItems } = this.state;
        const index = selectedItems.findIndex(i => i.answerer_info_menu_item_id === item.id);

        if (index === -1) {
            return
        } else {
            if (selectedItems[index].require) {
                selectedItems[index].require = false
            
                // need set api ***************************************************
                // await this.props.dispatch(userActions.API('delete', `/v2/delete_indicator_answerer_info_menu_items?item_id=${selectedItems[index].id}`, null, false))

            } else {
                selectedItems[index].require = true
            }

        }
        this.setState({ selectedItems })
    }

    findItemRequire = (id)=>{
        const { selectedItems } = this.state;
        const index = selectedItems.findIndex(i => i.answerer_info_menu_item_id === id);
        return selectedItems[index].require

    }

    render() {
        // console.log('items', this.state.selectedItems)
        const { basis , basises, aspect, aspectes, source, sources, indicator_type, indicator_types, has_menu_item, quality_dimension, quality_dimensions, desirability, desirabilities, measurement_unit, measurement_units, report_type, report_types, score_card_aspect, score_card_aspects, other_measurement_unit, other_report_type, other_source, selectedItems, items } = this.state;
        return (
            <div className="second-step">
                <div className="step-content py-3">

                    <form>
                        <div className="row justify-content-center mb-5">
                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="basis" className="color-dark iran-sans_Bold my-3">مبنای شاخص</label>
                                <Select className="text-justify custom-select-2"
                                    value={basis}
                                    name="basis"
                                    placeholder="انتخاب مبنای شاخص"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={basises}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="basis"
                                />
                            </div>

                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="aspect" className="color-dark iran-sans_Bold my-3">جنبه شاخص</label>
                                <Select className="text-justify custom-select-2"
                                    value={aspect}
                                    name="aspect"
                                    placeholder="انتخاب جنبه شاخص"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={aspectes}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="aspect"
                                />
                            </div>

                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="source" className="color-dark iran-sans_Bold my-3">منبع شاخص</label>
                                <Select className="text-justify custom-select-2"
                                    value={source}
                                    name="source"
                                    placeholder="انتخاب منبع شاخص"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={sources}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="source"
                                />
                            </div>
                            {
                                source && source.value === 'سایر موارد' &&
                                <div className="form-group text-right col-sm-5 col-10">
                                    <label htmlFor="other_source" className="color-dark iran-sans_Bold my-3">
                                        سایر موارد منبع شاخص

                                    </label>
                                    <input id="other_source" type="text" className="form-control rounded-pill border-0"
                                        name="other_source"
                                        value={other_source}
                                        onChange={userActions.handleChangeInput.bind(this)} />
                                </div>

                            }
                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label className="color-dark iran-sans_Bold my-3" htmlFor="indicator_type">نوع شاخص</label>
                                <Select className="text-justify custom-select-2"
                                    value={indicator_type}
                                    name="indicator_type"
                                    placeholder="انتخاب نوع شاخص"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={indicator_types}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="indicator_type"
                                />
                            </div>

                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="quality_dimension" className="color-dark iran-sans_Bold my-3">بعد کیفیت</label>
                                <Select className="text-justify custom-select-2"
                                    value={quality_dimension}
                                    name="quality_dimension"
                                    placeholder="انتخاب بعد کیفیت"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={quality_dimensions}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="quality_dimension"
                                    isMulti
                                />
                            </div>



                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="measurement_unit" className="color-dark iran-sans_Bold my-3">واحد اندازه گیری شاخص</label>
                                <Select className="text-justify custom-select-2"
                                    value={measurement_unit}
                                    name="measurement_unit"
                                    placeholder="انتخاب واحد اندازه گیری"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={measurement_units}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="measurement_unit"
                                />
                            </div>
                            {
                                measurement_unit && measurement_unit.value === 'سایر موارد' &&
                                <div className="form-group text-right col-sm-5 col-10">
                                    <label htmlFor="other_measurement_unit" className="color-dark iran-sans_Bold my-3">
                                        سایر موارد واحد اندازه گیری

                                    </label>
                                    <input id="other_measurement_unit" type="text" className="form-control rounded-pill border-0"
                                        name="other_measurement_unit"
                                        value={other_measurement_unit}
                                        onChange={userActions.handleChangeInput.bind(this)} />
                                </div>

                            }


                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="report_type" className="color-dark iran-sans_Bold my-3">نحوه گزارش دهی</label>
                                <Select className="text-justify custom-select-2"
                                    value={report_type}
                                    name="report_type"
                                    placeholder="انتخاب نحوه گزارش دهی"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={report_types}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="report_type"
                                />
                            </div>
                            {
                                report_type && report_type.value === 'سایر موارد' &&
                                <div className="form-group text-right col-sm-5 col-10">
                                    <label htmlFor="other_report_type" className="color-dark iran-sans_Bold my-3">
                                        سایر موارد نحوه گزارش دهی

                                    </label>
                                    <input id="other_report_type" type="text" className="form-control rounded-pill border-0"
                                        name="other_report_type"
                                        value={other_report_type}
                                        onChange={userActions.handleChangeInput.bind(this)} />
                                </div>

                            }
                            <div className="custom-select-box form-group text-right col-sm-5 col-10">
                                <label htmlFor="score_card_aspect" className="color-dark iran-sans_Bold my-3">وجـه کارت امتیازی</label>
                                <Select className="text-justify custom-select-2"
                                    value={score_card_aspect}
                                    name="score_card_aspect"
                                    placeholder="انتخاب وجـه کارت امتیازی"
                                    onChange={userActions.handleChangeSelect.bind(this)}
                                    options={score_card_aspects}
                                    getOptionLabel={opt => opt.label}
                                    getOptionValue={opt => opt.value}
                                    id="score_card_aspect"
                                />
                            </div>

                            <div className="d-flex flex-column text-right col-sm-5 col-10">
                                <label className="color-dark iran-sans_Bold my-3">مطلوبیت شاخص</label>
                                <ToggleBotton btns={desirabilities} onClickHandel={(data) => {
                                    this.setState({ desirability: data })
                                }} toggle_state={desirability} className="toggle_btn text-center d-flex align-items-center"
                                    color="blue" />
                                {/*<div className="btn-group">
                                <button type="button" className="btn btn-outline-blue">کــاهنــده</button>
                                <button type="button" className="btn btn-blue">افـــزاینده</button>
                            </div>*/}
                            </div>
                            {
                                report_type && report_type.value !== 'چک لیست' && report_type.value !== 'پرسشنامه' &&
                                <div className={'row d-flex justify-content-center mt-4'}>
                                    <div className={'col-lg-6 col-md-10 col-sm-12'}>
                                        <CollapseComp
                                            title={report_type.value + ' دارای اطلاعات پـایه است؟'}
                                            className='btn-primary'
                                            isOpenedByDefault={has_menu_item}

                                            onChange={() => {
                                                this.setState({ has_menu_item: !has_menu_item })
                                            }
                                            }
                                        >

                                            <div style={{ maxHeight: '400px', overflowY: 'scroll' }} className={' my-3  boxshadow row mx-1  p-2 '}>
                                                {items.map((itm, i) => {
                                                    return (
                                                        <div key={i}
                                                            style={{ display: 'flex' , fontSize:'14px', backgroundColor: i % 2 == 0 ? '#e0e0e0' : '#fff', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '3px' }}>
                                                            <label htmlFor="" className={'align-items-center d-flex col-lg-6 p-1 m-0 '}
                                                                onClick={() => {
                                                                    this.toggleItems(itm);
                                                                }}>
                                                                <i className={`far  fa-2x px-2  ${selectedItems.find(item => item.answerer_info_menu_item_id === itm.id) ? 'fa-check-square text-primary' : 'fa-square text-black-50'}`}></i>
                                                                <span>{itm.item}</span>
                                                            </label>
                                                            {selectedItems.find(item => item.answerer_info_menu_item_id === itm.id)  ? (
                                                                <label key={i} htmlFor="" className={'align-items-center d-flex col-lg-6  p-1 m-0'}
                                                                    onClick={() => {
                                                                        this.toggleItemsRequire(itm);
                                                                    }}>
                                                                    <i className={`far  fa-2x px-2 
                                                                        ${this.findItemRequire(itm.id) ? 'fa-check-square text-primary' : 'fa-square text-black-50'} `
                                                                    //   ${selectedItems.find(item => item.answerer_info_menu_item_id === itm.id) ? 'fa-check-square text-primary' : 'fa-square text-black-50'}`
                                                                    }
                                                                    ></i>
                                                                    <span>اجباری</span>
                                                                </label>
                                                            ) : <div></div>}

                                                        </div>
                                                    )
                                                }


                                                )}
                                            </div>

                                        </CollapseComp>

                                    </div>
                                </div>
                            }
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}
const Step2 = connect((state) => ({ globalStorage: state.globalStorage }))(Step2_);
export { Step2 }
