import React from 'react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';
import pricing from '../../../data/pricing.json';
import OrderOption from '../OrderOption/OrderOption';
import styles from './OrderForm.scss';
import Button from '../../common/Button/Button';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, name, countryCode, tripId) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if (!options.name || !options.contact) {
    return alert('Please fill in "name" and "contact info" sections');
  }

  const payload = {
    ...options,
    totalCost,
    tripId,
    name,
    countryCode,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({options, tripCost, name, countryCode, tripId, setOrderOption}) => (
  <Grid className={styles.component}>
    <Row>
      {pricing.map(option => (
        <Col md={4} key={option.id}>
          <OrderOption {...option} currentValue={options[option.id]} setOrderOption={setOrderOption} />
        </Col>
      ))}
      <Col xs={12}>
        <OrderSummary options={options} tripCost={tripCost} />
      </Col>
      <Button onClick={() => sendOrder(options, tripCost, name, countryCode, tripId)}>Order now!</Button>
    </Row>
  </Grid>
);

OrderForm.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
  setOrderOption: PropTypes.func,
  name: PropTypes.string,
  countryCode: PropTypes.string,
  tripId: PropTypes.string,
};

export default OrderForm;
