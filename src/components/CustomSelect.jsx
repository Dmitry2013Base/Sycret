import { useEffect, useState } from 'react';
import '../styles/select.css'

const CustomSelect = ({ array, getSelect, isDefault = true }) => {
    const defaultCurrent = '-1';
    const [current, setCurrent] = useState(defaultCurrent);
    useEffect(() => { (current !== defaultCurrent) && getSelect(current) }, [current])

    return (
        <select className='select' onChange={(e) => setCurrent(e.currentTarget.value)} value={current}>
            {
                isDefault && <option value={defaultCurrent} disabled>Выберите товар</option>
            }
            {
                array.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
            }
        </select>
    );
}

export default CustomSelect;
