import React, { Component } from "react";
import './LoanComponent.scss'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css";
import Axios from 'axios'

class LoanComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderAmountValues: 500,
            sliderTimeValues: 6,
            loanAmount: 500,
            loanTenure: 6,
            tenureError: false,
            amountError: false
        }
    }

    getInterestPerTenure = (amount, tenure) => {
        Axios.get('https://ftl-frontend-test.herokuapp.com/interest?' + 'amount=' + amount + '&numMonths=' + tenure)
            .then(data => {
                if (data.status == 200) {
                    console.log('check data', data.data)
                }
                if (data.status == "error") {
                    console.log("error")
                }
            })
            .catch(function (error) {

            })
    }

    onChange = (e) => {
        var amount = this.state.loanAmount
        var tenure = this.state.loanTenure
        var val = Number(e.target.value)
        if (e.target.id == "money") {
            this.setState({
                loanAmount: e.target.value,
            })
            if (val >= 500 && val <= 5000) {
                amount = val
                this.setState({
                    sliderAmountValues: val,
                    amountError: false
                })
                this.getAllInterestsCheck(amount, tenure)
            }

            else {
                this.setState({
                    amountError: true
                })
            }

        }

        if (e.target.id == "tenure") {
            this.setState({
                loanTenure: e.target.value,
            })
            if (val >= 6 && val <= 24) {
                tenure = val
                this.setState({
                    sliderTimeValues: val,
                    tenureError: false
                })
                this.getAllInterestsCheck(amount, tenure)
            }
            else {
                this.setState({
                    tenureError: true
                })
            }
        }
    }

    getAllInterestsCheck = (amount, tenure) => {
        this.getInterestPerTenure(amount, tenure)
    }

    convertToCurrencyFormat = (str) => {
        if (str) {
            var x = str;
            x = x.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            return res;
        }
        else {
            return str;
        }
    }

    bindSliderValues = (value, type) => {
        if (type == 'tenure') {
            this.setState({
                loanTenure: value
            })
        }
        else {
            this.setState({
                loanAmount: value
            })
        }
        this.getInterestPerTenure(this.state.loanAmount, this.state.loanTenure)
    }

    maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.value.maxLength)
            e.target.value = e.target.value.slice(0, e.target.value.maxLength)
    }


    isNumeric(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h1>Loan Calculator</h1>
                        <div className="hrLine"></div>
                        <div className="row content">
                            <div className="col-sm-12">
                                <div className="row-sm-12 content-values">
                                    <input type="text" maxLength="4" className="form-control col-sm-8" onKeyPress={this.isNumeric.bind(this)} onInput={this.maxLengthCheck.bind(this)} id="money" value={this.state.loanAmount} onChange={(e) => this.onChange(e)} >
                                    </input>
                                </div>
                                {
                                    this.state.amountError ?
                                        (<span className="errorMsg">
                                            * Please Enter Amount between 500 and 5000$
                                        </span>) : null
                                }
                                <div className="row-sm-12 content-values">
                                    <div className="slider">
                                        <InputRange
                                            formatLabel={value => `${this.convertToCurrencyFormat(value)}$`}
                                            maxValue={5000}
                                            minValue={500}
                                            ref="input_range"
                                            value={this.state.sliderAmountValues}
                                            onChange={sliderAmountValues => this.setState({ sliderAmountValues })}
                                            onChangeComplete={sliderAmountValues => this.bindSliderValues(sliderAmountValues, 'amount')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row content">
                            <div className="col-sm-12">
                                <div className="row-sm-12 content-values">
                                    Tenure
                                    <input type="text" maxLength="2" className="form-control col-sm-8" onKeyPress={this.isNumeric.bind(this)} onInput={this.maxLengthCheck.bind(this)} id="tenure" value={this.state.loanTenure} onChange={(e) => this.onChange(e)} >
                                    </input>
                                </div>
                                {
                                    this.state.tenureError ?
                                        (<span className="errorMsg">
                                            * Please Enter between 6 and 12 months
                                        </span>) : null
                                }
                                <div className="row-sm-12 content-values">
                                    <div className="slider">
                                        <InputRange
                                            formatLabel={value => `${value} months`}
                                            maxValue={24}
                                            minValue={6}
                                            ref="input_range"
                                            value={this.state.sliderTimeValues}
                                            onChange={sliderTimeValues => this.setState({ sliderTimeValues })}
                                            onChangeComplete={sliderTimeValues => this.bindSliderValues(sliderTimeValues, 'tenure')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row content">
                        </div>
                        <div className="row content">
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default LoanComponent;