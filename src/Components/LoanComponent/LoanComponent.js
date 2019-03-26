import React, { Component } from "react";
import './LoanComponent.scss'

class LoanComponent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h1>Loan Calculator</h1>
                            <div class="hrLine"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoanComponent;