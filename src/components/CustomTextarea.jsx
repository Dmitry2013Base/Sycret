import '../styles/input.css';

const CustomTextarea = ({ header, ...props }) => {
    return (
        <div className="input-container">
            <textarea className='textarea' { ...props }></textarea>
            <span className='input-placeholder'>{ header }</span>
        </div>
    );
}

export default CustomTextarea;
