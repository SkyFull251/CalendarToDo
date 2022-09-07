import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { setShow, updateObjDate } from '../dateList/sliceDate';

import './addForm.scss';

const AddForm = () => {
    const [newDate, setNewDate] = useState(new Date());
    const dispatch = useDispatch();
    const { showModal, objDate } = useSelector(state => state.date);

    const MyTextInput = ({ label, ...props }) => {

        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.name}>{label}</label>
                <input {...props} {...field} />
                {meta.touched && meta.error ? (
                    <div className='error'>{meta.error}</div>
                ) : null}
            </>
        )
    };
    
    return (
        <Modal show={showModal} onHide={() => { dispatch(setShow(false)); dispatch(updateObjDate(null)); }}>
            <Modal.Header closeButton>
                <Modal.Title>Add new idea item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        title: objDate.date ? objDate.date.title: '',
                        desc: objDate.date ? objDate.date.desc: ''
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .min(2, 'Min 2 symbol')
                            .required('Required field')
                    })}
                    onSubmit={values => {
                        objDate.date?
                             (localStorage.setItem(new Date(objDate.date.local.getFullYear(), objDate.date.local.getMonth(), objDate.date.local.getDate()), JSON.stringify(values))) :
                            (localStorage.setItem(new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()), JSON.stringify(values)));
                        dispatch(setShow(false));
                        dispatch(updateObjDate(null));
                    }}
                >
                    <Form className="form">
                        <MyTextInput
                            label="Title"
                            name="title"
                            type="text"
                            placeholder='Title goes here'
                        />
                        <Field
                            id="text"
                            name="desc"
                            as="textarea"
                            placeholder="Description"
                        />
                        <label htmlFor="">Set date</label>
                        <DatePicker className='form__date' selected={objDate.date? objDate.date.local :newDate} onChange={(date) => setNewDate(date)} />
                        <ErrorMessage className='error' name='text' component='div' />
                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                            {
                                objDate.date? 
                                <Button variant="danger" onClick={() => { 
                                    dispatch(setShow(false));
                                    dispatch(updateObjDate(null));
                                    localStorage.removeItem(objDate.date.local);
                                    }}>
                                    Delete
                            </Button> 
                            :
                            null
                            }
                            <Button variant="secondary" onClick={() => { dispatch(setShow(false)); dispatch(updateObjDate(null))}}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddForm;