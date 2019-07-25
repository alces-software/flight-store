import React from 'react';
import styled from 'styled-components';

const Iconography = ({ name, count }) => {
  let icons;
  // XXX Remove the hard-coding of the translateX values below.
  switch (count) {
    case 1:
      icons = <Icon name={name} />;
      break;
    case 2:
      icons = (
        <span>
          <Icon
            name={name}
            style={{ transform: 'translateX(-40px)' }}
          />
          <Icon
            name={name}
            style={{ transform: 'translateX(40px)' }}
          />
        </span>
      );
      break;
    case 3:
      icons = (
        <span>
          <Icon
            name={name}
            style={{ transform: 'translateX(-80px)' }}
          />
          <Icon name={name} />
          <Icon
            name={name}
            style={{ transform: 'translateX(80px)' }}
          />
        </span>
      );
      break;
  }

  return (
    <IconContainer>
      {icons}
    </IconContainer>
  );
};

const IconContainer = styled.div`
  opacity: 0.2;
  font-size: 5em;
`;

const Icon = ({ name, style }) => (
  <i
    className={`fa fa-stack-1x fa-${name}`}
    style={{
      top: 0,
      ...style,
    }}
  />
);

export default Iconography;
