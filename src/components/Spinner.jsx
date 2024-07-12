const Spinner = ({ spinnerContainerClassName }) => {
  let className = 'spinner-container';

  if (spinnerContainerClassName)
    className = `${className} ${spinnerContainerClassName}`;

  return (
    <div className={className}>
      <div className='lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
