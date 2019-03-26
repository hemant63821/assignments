import React, { Component } from "react";
import './LoanComponent.scss'
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css";

class LoanComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            sliderAmountValues: 500,
            sliderTimeValues: 6,
            loanAmount: 500,
            loanTenure: 6
        }
    }

    onChange = (e) => {
        if (e.target.id == "money") {
            this.setState({
                loanAmount: e.target.value,
            })
        }
        if (e.target.id == "tenure") {
            this.setState({
                loanTenure: e.target.value,
            })
        }
    }


    convertToIndianCurrencyFormat = (str) => {
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
                                <div className="row-sm-12 content-values">
                                    <div className="slider">
                                        <InputRange
                                            formatLabel={value => `${this.convertToIndianCurrencyFormat(value)}\u20B9`}
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