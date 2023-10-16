import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SaveCertificate } from '../api';
import CustonButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea';
import Loader from '../components/Loader';
import '../styles/userContactFormPage.css';

const UserContactForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoader, setIsLoader] = useState(false);
    const [phone, setPhone] = useState("+7(___)___-__-__");
    const [error, setError] = useState([]);
    const userName = useRef(null);
    const tel = useRef(null);
    const email = useRef(null);

    const phoneChange = (e) => {
        let indexes = [6, 10, 13];
        let removeIndex = -1;

        if (!/\)/.test(e.target.value)) {
            removeIndex = indexes[0];
        } else {
            if (e.target.value.match(/-/g)?.length !== 2) {
                removeIndex = (e.target.value.indexOf('-', 11) !== -1) ? indexes[1] : indexes[2];
            }
        }
        
        let numbers = e.target.value.match(/\d/g);
        if (numbers) {
            let chunks = [
                { chunk: numbers.slice(1, 4), length: 3 },
                { chunk: numbers.slice(4, 7), length: 3 },
                { chunk: numbers.slice(7, 9), length: 2 },
                { chunk: numbers.slice(9, 11), length: 2 },
            ];
            chunks.forEach((x, index) => {
                let count = x.length - x.chunk.length;
                x.chunk.push(...Array(count).fill('_'));
                if (removeIndex !== -1) {
                    let del = (removeIndex === indexes[0]) ? 0 : (removeIndex === indexes[1]) ? 1 : (removeIndex === indexes[2]) ? 2 : -1;
                    x.chunk[x.length - count - 1] = (index === del) ? '_' : x.chunk[x.length - count - 1];
                }
            });
            let nextPhone = `+7(${chunks[0].chunk.join('')})${chunks[1].chunk.join('')}-${chunks[2].chunk.join('')}-${chunks[3].chunk.join('')}`;
            setPhone(nextPhone);
            let index = nextPhone.indexOf('_');
            (index !== -1) && phoneFocus(index);
        }
    }

    const phoneFocus = (index = -1) => {
        let cursor = (index === -1) ? phone.indexOf('_') : index;
        setTimeout(() => tel.current.setSelectionRange(cursor, cursor), 5);
    }

    const submit = (e) => {
        e.preventDefault();
        const buy = async () => {
            setError([]);
            if (!/.{5,30}/.test(userName.current.value)) {
                setError([...error, 'Некорректный ФИО']);
            }
            if (!/\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/.test(tel.current.value)) {
                setError([...error, 'Некорректный номер телефрна']);
            }
            if (email.current.value.length === 0) {
                setError([...error, 'Некорректный email']);
            }

            if (error.length === 0) { 
                if (error.length === 0) {
                    let result = await SaveCertificate(state, 
                    {
                        name: userName.current.value,
                        phone: tel.current.value.match(/\d/g).join('').slice(1, -1),
                        email: email.current.value
                    });
                    
                    if (result.length) {
                        navigate('../payment');
                    }
                }
            }
        };


        setIsLoader(true);
        setTimeout(() => {
            buy();
            setIsLoader(false);
        }, 2000);
    }

    return (
        <div className='page-container'>
            <Loader isVisible={ isLoader }/>
            <div className="page-content">
                <div className='header'>
                    <span className="arrow" onClick={() => navigate(-1)} title='Назад'>&#10094;</span>
                    <p className='form-header'>{ state.NAME }</p>
                </div>
                <form className='form' onSubmit={submit}>
                    <CustomInput
                        title="Кол-во символов должно быть от 5 до 30"
                        innerRef={ userName }
                        header="ФИО*"
                        type="text"
                        pattern=".{5,30}"
                        required/>
                    <CustomInput
                        header="Телефон*"
                        type="tel"
                        innerRef={ tel }
                        pattern="\+7\(\d{3}\)\d{3}-\d{2}-\d{2}"
                        value={ phone }
                        onChange={ phoneChange }
                        onClick={ () => phoneFocus() }
                        style={{ caretColor: 'lightgray' }}/>
                    <CustomTextarea header="Сообщение"/>
                    <CustomInput header="Email*" type="email" innerRef={ email } required/>
                    <p className='form-error'>{error.join('\n')}</p>
                    <CustonButton type="submit">Отправить</CustonButton>
                </form>
            </div>
        </div>
    );
}

export default UserContactForm;
