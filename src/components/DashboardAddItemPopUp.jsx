import PopUp from './PopUp';

const DashboardAddItemPopUp = ({ closePopUp }) => {
  return (
    <div className='dashboard-add-popup'>
      <PopUp onCloseHandler={closePopUp}>
        <h3>Añadir item al menú</h3>
      </PopUp>
    </div>
  );
};

export default DashboardAddItemPopUp;
