import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionIcons = ({values, required, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    {required ? '' : (
      <div className={styles.icon} >
        <Icon name="times-circle" /> None
      </div>
    )}
    {values.map(value => (
      <div className={currentValue === value.id ? styles.iconActive + ' '  + styles.icon : styles.icon} key={value.id} onClick={() => setOptionValue(value.id)}>
        <Icon name={value.icon} />
        {value.name} {formatPrice(value.price)}
      </div>
    ))}
  </div>
);

OrderOptionIcons.propTypes = {
  values: PropTypes.array,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
};

export default OrderOptionIcons;
