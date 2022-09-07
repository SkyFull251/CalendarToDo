import NavBar from '../navBar/NavBar';
import DateList from '../dateList/DateList';
import AddForm from '../addForm/AddForm';

import 'react-datepicker/dist/react-datepicker.css';

const App = () => {
    return (
        <div>
            <AddForm/>
            <NavBar/>
            <DateList/>
        </div>
    );
};

export default App;