import React from 'react';
import {Trolley} from '../../../assets/img/trolley';
import {Box} from '../../../assets/img/box';
import {Checklist} from '../../../assets/img/checklist';
import InProgress from '../../../assets/img/inprogress';
import DropOff from '../../../assets/img/dropoff';
import Cancelled from '../../../assets/img/cancelled';

const progressColor = {
  OrderPlaced: '#357BF3',
  PickUp: '#C367F1',
  InProgress: '#2CC0CB',
  DropOff: '#2CD285',
  Delivered: '#949EAE',
  Cancelled: '#E83A1E',
};

const progressImage = {
  OrderPlaced: <Checklist />,
  PickUp: <Trolley />,
  InProgress: <InProgress />,
  DropOff: <DropOff />,
  Delivered: <Box />,
  Cancelled: <Cancelled />,
};

const progressImageLarge = {
  OrderPlaced: <Checklist width="100" height="50" />,
  PickUp: <Trolley width="100" height="50" />,
  InProgress: <InProgress width="120" height="60" />,
  DropOff: <DropOff width="120" height="60" />,
  Delivered: <Box width="100" height="50" />,
  Cancelled: <Cancelled width="120" height="60" />,
};

const progressCount = {
  OrderPlaced: '20',
  PickUp: '40',
  InProgress: '60',
  DropOff: '80',
  Delivered: '100',
  Cancelled: '100',
};

const statusTitle = {
  OrderPlaced: 'Order Placed',
  PickUp: 'Ready for Pick Up',
  InProgress: 'In Progress',
  DropOff: 'Ready for Drop Off',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
};

export {
  progressColor,
  progressImage,
  progressImageLarge,
  progressCount,
  statusTitle,
};
