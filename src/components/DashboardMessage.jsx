const DashboardMessage = () => {
  const getMessage = () => {
    let message = 'Espero que te encuentres bien!';
    const dateTime = new Date().getHours();

    if (dateTime > 0) message = 'Buenos días';
    if (dateTime >= 12) message = 'Buenas tardes';
    if (dateTime >= 18) message = 'Buenas noches';

    return message;
  };

  return (
    <div className='dashboard-message'>
      <p>{getMessage()}, que deseas hacer hoy?</p>
    </div>
  );
};

export default DashboardMessage;
