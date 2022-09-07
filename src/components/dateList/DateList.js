import { useSelector } from 'react-redux';

import DateListItem from '../dateListItem/DateListItem';

import './dateList.scss';

const DateList = () => {

    const { startDate } = useSelector(state => state.date);
    const dayMonth = 32 - new Date(startDate.getFullYear(), startDate.getMonth(), 32).getDate();
    const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const renderItems = () => {

        const arr = [];
        for (let i = 1; i <= dayMonth; i++) {
            const newDate = new Date(startDate.getFullYear(), startDate.getMonth(), i);
            if (i === startDate.getDate()) {
                if (localStorage.getItem(newDate)) {
                    console.log(newDate);
                    arr.push(<DateListItem setClass={'item active'} day={i} week={week[newDate.getDay()]} key={i} title={localStorage.getItem(newDate)} idLocal={newDate} />)
                } else {
                    arr.push(<DateListItem setClass={'item active'} day={i} week={week[newDate.getDay()]} key={i} />)
                }
            } else {
                if (localStorage.getItem(newDate)) {
                    arr.push(<DateListItem setClass={'item'} day={i} week={week[newDate.getDay()]} key={i} title={localStorage.getItem(newDate)} idLocal={newDate} />)
                } else {
                    arr.push(<DateListItem setClass={'item'} day={i} week={week[newDate.getDay()]} key={i} />)
                }
            }
        }
        return arr
    }
    const items = renderItems();
    return (
        <ul className="list">
            {items}
        </ul>
    );
};

export default DateList;