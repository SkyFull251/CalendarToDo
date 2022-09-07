import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { setShow, updateObjDate } from '../dateList/sliceDate';

import './dateListItem.scss';

const DateListItem = ({setClass,day,week, title, idLocal}) => {
    const dispatch = useDispatch();

    const [localDate] = useState(idLocal);
    const obj ={};
    if(title){
        obj.date = JSON.parse(title);
        obj.date.local = localDate;
    }
    
    return (
        <div className={setClass}>
            <div className="item__date">
                <div className="item__date-day">{day}</div>
                <div className="item__date-week">{week}</div>
            </div>
            <ul className="item__list">
                <li onClick={() => {
                    dispatch(setShow(true));
                    dispatch(updateObjDate(obj.date));
                    }}>{title ? obj.date.title :""}</li>
            </ul>
        </div>
    );
};

export default DateListItem;