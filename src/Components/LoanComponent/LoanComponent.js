import React, { Component } from "react";
import './LoanComponent.scss'

class LoanComponent extends Component {
    render() {
        return (
            <div className="row">
                <div className="card">
                    <div className="card-body">
                        <h1>Loan Calculator</h1>
                        <div className="hrLine"></div>
                        <div className="row content">
                            <div className="col-sm-4">
                                <label className="mr-sm-2" for="inlineFormCustomSelect">Preference</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="Email">
                                </input>
                            </div>
                        </div>
                        <div className="row content">
                            <div className="col-sm-4">
                                Tenure
                                </div>
                            <div className="col-sm-4">
                                Traanm
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