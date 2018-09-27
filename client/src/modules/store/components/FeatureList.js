import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

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

const FeatureList = ({ features }) => (
  <UL className="fa-ul">
    {
      features.map((item, idx) => (
        <li key={idx}>
          <Tick />
          <RenderMarkdown value={item} />
        </li>
      ))
    }
  </UL>
);

FeatureList.propTypes = {
  features: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default FeatureList;
