import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({currentValue, setOptionValue, placeholder}) => (
  <DatePicker selected={currentValue} placeholderText={placeholder} dateFormat="yyyy/MM/dd" value={currentValue} onSelect={date => setOptionValue(date)}>
  </DatePicker>
);

OrderOptionDate.propTypes = {
  type: PropTypes.string,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default OrderOptionDate;
