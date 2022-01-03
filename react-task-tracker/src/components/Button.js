import PropTypes from 'prop-types';

export const Button = ({text, color, onClick, handleDoubleClick}) => {
   
    return <button 
    onClick ={onClick} 
    className='btn' 
    style={{backgroundColor:color}}
    >{text}
    </button>
}


Button.defaultProps = {
    color:'blue',
}

Button.propTypes ={
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
    }

export default Button;
