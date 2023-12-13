import { initialValues, values, read, save } from './services/services';
import { useState } from 'react';
import './App.css';
import Result from './result';

function App() {
  let active = 'btn btn-outline-primary active'
  let inactive = 'btn btn-outline-primary'

  if (!localStorage.getItem(values)) {
    save(values, initialValues);
  }

  let [state, setState] = useState(read(values))

  function changePrincipal(e) {
    let v = e.target.value;
    setState({ ...state, principal: parseFloat(v) });
    save(values, { ...state, principal: parseFloat(v) });
  }

  function changeRate(e) {
    let v = e.target.value;
    setState({ ...state, rate: v });
    save(values, { ...state, rate: v });
  }

  function changeCount(e) {
    let v = e.target.value;
    setState({ ...state, count: parseInt(v) });
    save(values, { ...state, count: parseInt(v) });
  }

  function changeCurrency(e) {
    let v = e.target.value;
    setState({ ...state, currency: v });
    save(values, { ...state, currency: v });
  }

  function changeRateType(e) {
    let v = e.target.value;
    setState({ ...state, rateType: v });
    save(values, { ...state, rateType: v });
  }

  function changeDuration(e) {
    let v = e.target.value;
    setState({ ...state, duration: v });
    save(values, { ...state, duration: v });
  }

  function changeTab(v) {
    setState({ ...state, active: v });
  }

  function setDefaults() {
    setState({ ...state, ...initialValues });
    save(values, initialValues);
  }

  function edit() {
    changeTab('O');
  }

  return (window.innerHeight > window.innerWidth) ?
    <div className='rootElement'>
      <div className='AppBar'>Smart Returns Calculator</div>
      <br />
      <div className='appWrap'>
        <div className='App'>

          <div className='Content'>
            <div className='d-grid gap-2'>
              <div className='btn-group' role='group' aria-label='Basic outlined example'>
                <button type='button' className={(state.active === 'V') ? active : inactive} onClick={() => { changeTab('V') }}>Values</button>
                <button type='button' className={(state.active != 'V') ? active : inactive} onClick={() => { changeTab('O') }}>Outcomes</button>
              </div>
            </div>
          </div>

          {(state.active == 'V') ?
            <div>
              <div className='Title'>
                <span className='material-symbols-outlined'>
                  currency_rupee
                </span>
                &nbsp; Principal
              </div>
              <div className='Content'>
                <label htmlFor='currency' className='form-label'>Currency</label>
                <select className='form-select' aria-label='Currency' id='Currency' value={state.currency} onChange={changeCurrency}>
                  <option value='₹'>₹</option>
                  <option value='$'>$</option>
                </select>
                <div className='brk'></div>
                <label htmlFor='principal' className='form-label'>Amount</label>
                <input type='number' className='form-control' value={state.principal} id='principal' onChange={changePrincipal}></input>
              </div>

              <div className='Title'>
                <span className='material-symbols-outlined'>
                  percent
                </span>
                &nbsp; Rate
              </div>
              <div className='Content'>
                <label htmlFor='rate-type' className='form-label'>Rate Type</label>
                <select className='form-select' aria-label='Rate Type' id='rate-type' value={state.rateType} onChange={changeRateType}>
                  <option value='FIX'>Fixed</option>
                  <option value='VAR'>Variable</option>
                </select>
                <div className='brk'></div>
                <label htmlFor='rate' className='form-label'>Rate(s)</label>
                <input type='text' className='form-control' value={state.rate} id='rate' onChange={changeRate}></input>
              </div>

              <div className='Title'>
                <span className='material-symbols-outlined'>
                  schedule
                </span>
                &nbsp; Time
              </div>
              <div className='Content'>
                <label htmlFor='duration' className='form-label'>Duration</label>
                <select className='form-select' aria-label='Rate Type' id='duration' value={state.duration} onChange={changeDuration}>
                  <option value='H'>Hour</option>
                  <option value='D'>Day</option>
                  <option value='M'>Month</option>
                  <option value='Y'>Year</option>
                  <option value='T'>Times</option>
                </select>
                <div className='brk'></div>
                <label htmlFor='count' className='form-label'>Count</label>
                <input type='number' className='form-control' value={state.count} id='count' onChange={changeCount}></input>
              </div>
              <br />

              <div className='Content'>
                <div className='d-grid gap-2'>
                  <button className='btn btn-primary' type='button' onClick={() => { changeTab('O') }}>Calculate</button>
                  <button className='btn btn-primary' type='button' onClick={setDefaults}>Default</button>
                </div>
              </div>
              <br />
              <br />
            </div>
            :
            <div>
              {
                <Result e={edit} />
              }
            </div>
          }
        </div>
      </div>
    </div>
    :
    <div className='rootElement'>
      <div className='AppBar'>Smart Returns Calculator</div>
      <br />
      <div className='appWrap'>
        <div className='App AppDesktop'>
          <div className='desktopLT'>
            <div className='Title'>
              <span className='material-symbols-outlined'>
                currency_rupee
              </span>
              &nbsp; Principal
            </div>
            <div className='Content'>
              <label htmlFor='currency' className='form-label'>Currency</label>
              <select className='form-select' aria-label='Currency' id='Currency' value={state.currency} onChange={changeCurrency}>
                <option value='₹'>₹</option>
                <option value='$'>$</option>
              </select>
              <div className='brk'></div>
              <label htmlFor='principal' className='form-label'>Amount</label>
              <input type='number' className='form-control' value={state.principal} id='principal' onChange={changePrincipal}></input>
            </div>

            <div className='Title'>
              <span className='material-symbols-outlined'>
                percent
              </span>
              &nbsp; Rate
            </div>
            <div className='Content'>
              <label htmlFor='rate-type' className='form-label'>Rate Type</label>
              <select className='form-select' aria-label='Rate Type' id='rate-type' value={state.rateType} onChange={changeRateType}>
                <option value='FIX'>Fixed</option>
                <option value='VAR'>Variable</option>
              </select>
              <div className='brk'></div>
              <label htmlFor='rate' className='form-label'>Rate(s)</label>
              <input type='text' className='form-control' value={state.rate} id='rate' onChange={changeRate}></input>
            </div>

            <div className='Title'>
              <span className='material-symbols-outlined'>
                schedule
              </span>
              &nbsp; Time
            </div>
            <div className='Content'>
              <label htmlFor='duration' className='form-label'>Duration</label>
              <select className='form-select' aria-label='Rate Type' id='duration' value={state.duration} onChange={changeDuration}>
                <option value='H'>Hour</option>
                <option value='D'>Day</option>
                <option value='M'>Month</option>
                <option value='Y'>Year</option>
                <option value='T'>Times</option>
              </select>
              <div className='brk'></div>
              <label htmlFor='count' className='form-label'>Count</label>
              <input type='number' className='form-control' value={state.count} id='count' onChange={changeCount}></input>
            </div>
            <br />

            <div className='Content'>
              <div className='d-grid gap-2'>
                <button className='btn btn-primary' type='button' onClick={() => { window.location.assign(window.location) }}>Calculate</button>
                <button className='btn btn-primary' type='button' onClick={setDefaults}>Default</button>
              </div>
            </div>
            <br />
            <br />
          </div>

          <div className='desktopRT'>
            {
              <Result />
            }
          </div>

        </div>
      </div>
    </div>

}

export default App;
