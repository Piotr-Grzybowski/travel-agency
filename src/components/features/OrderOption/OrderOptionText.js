import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({type, currentValue, setOptionValue, placeholder}) => (
  <input className={styles.component} type={type} placeholder={placeholder} value={currentValue} onChange={event => setOptionValue(event.currentTarget.value)}>

  </input>
);

OrderOptionText.propTypes = {
  type: PropTypes.string,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default OrderOptionText;
