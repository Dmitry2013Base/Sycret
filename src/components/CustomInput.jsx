import '../styles/input.css';

const CustomInput = ({ header, innerRef, ...props }) => {
    return (
        <div className="input-container">
            <input {...props} ref={innerRef} className='input'/>
            <span className='input-placeholder'>{ header }</span>
        </div>
    );
}

export default CustomInput;
