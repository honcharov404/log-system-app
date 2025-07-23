import { RotatingLines } from 'react-loader-spinner';

const Spinner = ({ color, width, height }) => (
  <RotatingLines
    radius='9'
    wrapperStyle
    wrapperClass
    width={width || '32'}
    height={height || '32'}
    strokeColor={color || 'grey'}
    ariaLabel='three-dots-loading'
  />
);

export default Spinner;