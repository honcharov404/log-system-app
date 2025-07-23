import { RotatingLines } from 'react-loader-spinner';

const Spinner = ({ color, width, height }) => (
  <div className="flex justify-center items-center h-full">
    <RotatingLines
      radius='9'
      wrapperStyle
      wrapperClass
      width={width || '32'}
      height={height || '32'}
      strokeColor={color || 'grey'}
      ariaLabel='three-dots-loading'
    />
  </div>
);

export default Spinner;