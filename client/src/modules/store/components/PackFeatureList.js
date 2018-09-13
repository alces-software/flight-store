import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

import ContextLink from '../../../elements/ContextLink';

const Tick = styled.li.attrs({
  className: 'fa-li fa fa-check',
})`
  color: ${Theme.orange};
`;

const FlightCenterLink = () => (
  <ContextLink
    linkSite="Center"
    location="/"
  >
    Alces Flight Center
  </ContextLink>
);

const PackFeatureList = ({ items, monthlyFlightCenterCredits }) => (
  <ul className="fa-ul">
    {
      items.map((item, idx) => (
        <li key={idx}>
          <Tick />
          {item}
        </li>
      ))
    }
    <li>
      <Tick />
      {monthlyFlightCenterCredits} <FlightCenterLink /> support credits per
      month.
    </li>
  </ul>
);

PackFeatureList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  monthlyFlightCenterCredits: PropTypes.node.isRequired,
};

export default PackFeatureList;
