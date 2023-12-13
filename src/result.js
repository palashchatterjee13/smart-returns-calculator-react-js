import React, { useState } from 'react';
import { values, read, save } from './services/services';


export default function Result() {

    let [state, setState] = useState(read(values))
    let principal = state.principal;
    let count = state.count;
    let amount = principal;

    let imp = {
        fontWeight: 'bold'
    }

    function f(x) {
        let c = 'INR';
        switch (state.currency) {
            case '$': {
                c = 'USD'
                break;
            }
            case '₹': {
                c = 'INR'
                break;
            }
        }
        return x.toLocaleString('en-IN', {
            maximumFractionDigits: 2,
            style: 'currency',
            currency: c,
        })
    }

    if (state.rateType == 'FIX') {
        let rate = parseFloat(state.rate);
        let tableData = [];
        let returnValue;
        for (let i = 1; i <= count; i++) {
            let lastAmount = amount;
            amount += amount * rate / 100;
            let change = amount - principal;
            tableData.push(
                <tr key={i} style={imp}>
                    <td>{i}</td>
                    <td>{f(amount)}</td>
                    <td>{(amount > lastAmount) ? <span className='g'> {f(amount - lastAmount)} </span> : <span className='r'> {f(amount - lastAmount)} </span>}</td>
                    <td>{(amount > lastAmount) ? <span className='g'> {((amount - lastAmount) * 100 / lastAmount).toFixed(2)}% </span> : <span className='r'> {((amount - lastAmount) * 100 / lastAmount).toFixed(2)}% </span>}</td>
                    <td>{(change > 0) ? <span className='g'> {f(change)} </span> : <span className='r'> {f(change)} </span>}</td>
                    <td>{(change > 0) ? <span className='g'> {(change / principal * 100).toFixed(2)}% </span> : <span className='r'> {(change / principal * 100).toFixed(2)}% </span>}</td>
                </tr>
            );
            returnValue = (change / principal * 100).toFixed(2);
        }
        let interest = (amount > principal) ? amount - principal : principal - amount;
        let difference = amount - principal;
        return (
            <div>
                <div className='Title'>
                    <span className='material-symbols-outlined'>
                        donut_large
                    </span>
                    &nbsp; Report
                </div>
                <div className='Content'>
                    <b>Principal: </b> {f(state.principal)} <br />
                    <b>Amount: {(difference > 0) ? <span className='g'> {f(amount)} </span> : <span className='r'> {f(amount)} </span>} </b> <br />
                    <b>{(difference > 0) ? 'Profit' : 'Loss'}: {(difference > 0) ? <span className='g'> {f(interest)} </span> : <span className='r'> {f(interest)} </span>} </b> <br />
                    <b>Return: {(difference > 0) ? <span className='g'> {returnValue}% </span> : <span className='r'> {returnValue}% </span>} </b> <br />
                </div>
                <div className='Title'>
                    <span className='material-symbols-outlined'>
                        bar_chart
                    </span>
                    &nbsp; Details
                </div>
                <div className='Content TB'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Index</th>
                                <th>Amount</th>
                                <th>Change</th>
                                <th>Change (%)</th>
                                <th>Net Change</th>
                                <th>Net Change (%)</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>{f(state.principal)}</td>
                                <td><span className='g'>{f(0)}</span></td>
                                <td><span className='g'>0.00%</span></td>
                                <td><span className='g'>{f(0)}</span></td>
                                <td><span className='g'>0.00%</span></td>
                            </tr>
                            {tableData}
                        </tbody>
                    </table>

                </div>
                <br />
            </div>
        );
    } else {
        let rates = state.rate.split(' ').map((v) => { return parseFloat(v) });
        let tableData = [];
        let returnValue;
        for (let i = 1; i <= rates.length; i++) {
            let lastAmount = amount;
            amount += amount * rates[i - 1] / 100;
            let change = amount - principal;
            tableData.push(
                <tr key={i} style={imp}>
                    <td>{i}</td>
                    <td>{f(amount)}</td>
                    <td>{(amount > lastAmount) ? <span className='g'> {f(amount - lastAmount)} </span> : <span className='r'> {f(amount - lastAmount)} </span>}</td>
                    <td>{(amount > lastAmount) ? <span className='g'> {((amount - lastAmount) * 100 / lastAmount).toFixed(2)}% </span> : <span className='r'> {((amount - lastAmount) * 100 / lastAmount).toFixed(2)}% </span>}</td>
                    <td>{(change > 0) ? <span className='g'> {f(change)} </span> : <span className='r'> {f(change)} </span>}</td>
                    <td>{(change > 0) ? <span className='g'> {(change / principal * 100).toFixed(2)}% </span> : <span className='r'> {(change / principal * 100).toFixed(2)}% </span>}</td>
                </tr>
            );
            returnValue = (change / principal * 100).toFixed(2);
        }
        let interest = (amount > principal) ? amount - principal : principal - amount;
        let difference = amount - principal;

        return (
            <div>
                <div className='Title'>
                    <span className='material-symbols-outlined'>
                        donut_large
                    </span>
                    &nbsp; Report
                </div>
                <div className='Content'>
                    <b>Principal: </b> {f(state.principal)} <br />
                    <b>Amount: {(difference > 0) ? <span className='g'> {f(amount)} </span> : <span className='r'> {f(amount)} </span>} </b> <br />
                    <b>{(difference > 0) ? 'Profit' : 'Loss'}: {(difference > 0) ? <span className='g'> {f(interest)} </span> : <span className='r'> {f(interest)} </span>} </b> <br />
                    <b>Return: {(difference > 0) ? <span className='g'> {returnValue}% </span> : <span className='r'> {returnValue}% </span>} </b> <br />
                </div>
                <div className='Title'>
                    <span className='material-symbols-outlined'>
                        bar_chart
                    </span>
                    &nbsp; Details
                </div>
                <div className='Content TB'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Index</th>
                                <th>Amount</th>
                                <th>Change</th>
                                <th>Change (%)</th>
                                <th>Net Change</th>
                                <th>Net Change (%)</th>
                            </tr>
                            <tr>
                                <td>0</td>
                                <td>{f(state.principal)}</td>
                                <td><span className='g'>{f(0)}</span></td>
                                <td><span className='g'>0.00%</span></td>
                                <td><span className='g'>{f(0)}</span></td>
                                <td><span className='g'>0.00%</span></td>
                            </tr>
                            {tableData}
                        </tbody>
                    </table>

                </div>
                <br />
            </div>
        );
    }

}