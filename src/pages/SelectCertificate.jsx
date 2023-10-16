import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getCertificates } from '../api';
import CustonButton from '../components/CustomButton';
import CustomSelect from '../components/CustomSelect';
import '../styles/page.css';
import '../styles/selectCertificatePage.css';

const SelectCertificate = () => {
    const navigate = useNavigate();
    const [selectCertificate, setSelectCertificate] = useState(null);
    const [certificates, setCertificates] = useState([]);
    
    useEffect(() => {
        const getArray = async () => setCertificates(await getCertificates());
        getArray();
    }, []);

    return (
        <div className='page-container'>
            <div className='page-content'>
                <p className='form-header'>Выберите сертификат</p>
                <CustomSelect 
                    array={ certificates.map(e => ({ id: e.ID, name: e.NAME })) }
                    getSelect={ (e) => setSelectCertificate(certificates.find(x => x.ID === e)) }/>
                    {
                        selectCertificate && 
                        <div className='price'>
                            <p>Скидка { selectCertificate.DISCOUNT }%</p>
                            <p>Цена - { selectCertificate.SUMMA } руб.</p>
                        </div>
                    }
                <CustonButton onClick={() => navigate(`../form`, { state: selectCertificate })} disabled={!selectCertificate}>Купить</CustonButton>
            </div>
        </div>
    );
}

export default SelectCertificate;
