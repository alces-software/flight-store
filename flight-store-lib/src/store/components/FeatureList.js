import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Theme } from 'flight-reactware';

import utils from '../../utils';

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

const Cross = styled.i.attrs({
  className: 'fa-li fa fa-times',
})`
  color: ${Theme.textMutedColour};
`;

function massageFeatures(features) {
  return features.map((f) => {
    if (f.tick != null) {
      return f;
    } else {
      return { tick: true, text: f };
    }
  });
}

const FeatureList = ({ features }) => {
  return (
    <UL className="fa-ul">
      {
        massageFeatures(features).map((feature, idx) => (
          <li key={idx}>
            { feature.tick ? <Tick /> : <Cross /> }
            <utils.RenderMarkdown value={feature.text} />
          </li>
        ))
      }
    </UL>
  );
};

FeatureList.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.shape({
        tick: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired,
    ]).isRequired,
  ).isRequired,
};

export default FeatureList;
