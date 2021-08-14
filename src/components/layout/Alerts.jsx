import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const Alerts = ({ alerts }) => {
  return (
    <Fragment>
      {alerts?.length > 0 &&
        alerts.map((alert) => (
          <div
            key={alert.id}
            style={{
              borderRadius: '5px',
              width: '50%',
              margin: '0 auto',
              zIndex: '50000',
              position: 'absolute',
              top: '13%',
              left: '30%'
            }}
            className={'myAlerts z-depth-1  ' + alert.type}
          >
            <p
              style={{
                padding: '10px 15px',
                display: 'flex',
                alignItems: 'center'
              }}
              className=' white-text'
            >
              <i
                className='material-icons small'
                style={{ marginRight: '5px' }}
              >
                {alert.type === 'red' ? 'mood_bad' : 'mood'}
              </i>
              <b>{alert.msg}</b>
            </p>
          </div>
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(Alerts);
