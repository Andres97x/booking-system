const Map = () => {
  return (
    <div className='map'>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d654.4870093456228!2d-75.86599782932687!3d8.772843823172444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fba6d098e27%3A0xa278d302cfa69874!2zQ2wuIDYyICM2LTY4LCBNb250ZXLDrWEsIEPDs3Jkb2Jh!5e0!3m2!1sen!2sco!4v1719352103566!5m2!1sen!2sco'
        width='600'
        height='450'
        style={{ border: '0' }}
        allowFullScreen
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      ></iframe>
    </div>
  );
};

export default Map;
