import './spinner.scss';
import spinnerIcon from 'assets/login/Spinner.svg';

const Spinner = () => {
  return (
    <div className='spinner-image'>
      <img src={spinnerIcon} alt='spinner' />
    </div>
  );
};
export default Spinner;
