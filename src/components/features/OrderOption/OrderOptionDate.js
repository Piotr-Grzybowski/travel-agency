import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { getDefaultLocale, registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
// eslint-disable-next-line no-unused-vars
import gb from 'date-fns/locale/en-GB';

registerLocale('gb', gb);
setDefaultLocale(gb);


// eslint-disable-next-line react/prop-types
const OrderOptionDate = ({currentValue, setOptionValue, placeholder}) => (
  <DatePicker selected={currentValue}
    placeholderText={placeholder}
    dateFormat="yyyy/MM/dd"
    value={currentValue}
    locale={gb}
    inline
    onChange={date => {console.log(date, getDefaultLocale()); setOptionValue(date);}} />
);

OrderOptionDate.propTypes = {
  type: PropTypes.string,
  setOptionValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default OrderOptionDate;
