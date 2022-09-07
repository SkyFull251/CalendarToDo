import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { dateChanged, setShow } from '../dateList/sliceDate';

import './navBar.scss';

const NavBar = () => {
    const dispatch = useDispatch();
    const { startDate } = useSelector(state => state.date);
    const setMonthDate = () => {
        const month = startDate.getMonth();
        const nameMonth = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        return nameMonth[month];
    }
    const updateMonth = (i) => {
        return startDate.setMonth(startDate.getMonth() + i);
    }
    const month = setMonthDate();
    return (
        <Navbar className='nav' bg="primary" variant="dark">
            <Container>
                <div className="nav__button" onClick={() => { dispatch(setShow(true)) }}>
                    <div className="nav__button-add" ></div>
                </div>
                <div className="nav__filter">
                    <div className="filter__button-left" onClick={() => { dispatch(dateChanged(new Date(updateMonth(-1)))) }}></div>
                    <p className='filter__text'>{month}</p>
                    <div className="filter__button-right" onClick={() => { dispatch(dateChanged(new Date(updateMonth(1)))) }}></div>
                </div>
                <div className="nav__datepick">
                    <DatePicker className='nav-date' selected={startDate} onChange={(date) => dispatch(dateChanged(date))} />
                </div>
            </Container>
        </Navbar>
    );
};

export default NavBar;