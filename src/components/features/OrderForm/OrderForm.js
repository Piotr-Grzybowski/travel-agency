import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary';
import PropTypes from 'prop-types';

const OrderForm = ({options, tripCost}) => (
  <Row>
    <Col xs={12}>
      <OrderSummary options={options} tripCost={tripCost} />
    </Col>
  </Row>
);

OrderForm.propTypes = {
  options: PropTypes.object,
  tripCost: PropTypes.string,
};

export default OrderForm;
