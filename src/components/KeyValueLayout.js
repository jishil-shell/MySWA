import React from 'react';

const KeyValueLayout = ({data}) => {
  return (
    <div style={styles.container}>
      {Object.keys(data).map((key) => (
        <div style={styles.row} key={key}>
          <div style={styles.key}>{key} : </div>
          <div style={styles.value}>{data[key]}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    //width: '50%',
    
  },
  row: {
    display: 'flex',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  key: {
    //fontWeight: 'bold',
    width: '20%',
  },
  value: {
   // width: '70%',
    color:'green',
    fontSize:16
  },
};

export default KeyValueLayout;
