import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

import ContextLink from '../../../elements/ContextLink';
import RenderMarkdown from '../../../components/RenderMarkdown';

const UL = styled.ul`
  & > li > div > p {
    margin-bottom: 0;
  }
`;

const Tick = styled.i.attrs({
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

const PackFeatureList = ({ features, monthlyFlightCenterCredits }) => (
  <UL className="fa-ul">
    {
      features.map((item, idx) => (
        <li key={idx}>
          <Tick />
          <RenderMarkdown value={item} />
        </li>
      ))
    }
    <li>
      <Tick />
      {monthlyFlightCenterCredits} <FlightCenterLink /> support credits per
      month.
    </li>
  </UL>
);

PackFeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  monthlyFlightCenterCredits: PropTypes.node.isRequired,
};

export default PackFeatureList;
