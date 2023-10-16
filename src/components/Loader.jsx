import '../styles/loader.css';

const Loader = ({ isVisible }) => {
    return (
        <>
            {
                isVisible &&
                <div className='loader-container'>
                    <div className="loader"></div>
                </div>
            }
        </>
    );
}

export default Loader;
