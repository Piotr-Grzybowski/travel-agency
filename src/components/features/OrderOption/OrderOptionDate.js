import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import gb from 'date-fns/locale/en-GB';
import { setHours } from 'date-fns/';

registerLocale('gb', gb);
setDefaultLocale(gb);

// const addhours = (date) => {
// const hoursAmount = date.getTimezoneOffset() / 60;
// console.log(hoursAmount, date, subHours(date, hoursAmount));
// const newDate = subHours(date, hoursAmount);
// return setHours(date, 12);
// };
// eslint-disable-next-line react/prop-types
const OrderOptionDate = ({currentValue, setOptionValue, placeholder}) => (
  <DatePicker
    selected={currentValue}
    placeholderText={placeholder}
    dateFormat="yyyy/MM/dd"
    locale={gb}
    inline
    value={new Date(currentValue)}
    onChange={date => {console.log(date);date = setHours(date, 12); setOptionValue(date);}} />
);

OrderOptionDate.propTypes = {
  type: PropTypes.string,
  setOptionValue: PropTypes.func,
  placeholder: PropTypes.string,
};

export default OrderOptionDate;
