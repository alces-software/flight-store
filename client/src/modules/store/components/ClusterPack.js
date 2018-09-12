import React from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardImg,
  // CardImgOverlay,
  // CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import styled from 'styled-components';

const packHeadHeight = '140px';

const PackHead = styled(CardBody)`
  background-color: #304051;
  border-radius: 1rem 1rem 0 0;
  color: white;
  height: ${packHeadHeight};
  text-align: center;
`;

const PackBody = styled(CardBody)`
  padding-top: 45px;
`;

const costIconSize = '90px';

const CostIcon = styled.div`
  background-color: #d86b27;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  color: white;
  font-size: 110%;
  font-weight: 700;
  height: ${costIconSize};
  margin: 0 auto;
  padding: 6px 12px;
  position: relative;
  white-space: initial;
  width: ${costIconSize};
  word-wrap: break-word;
`;

const CostWrapper = styled.div`
  position: absolute;
  top: calc( ${packHeadHeight} - ( ${costIconSize} / 2 ) );
  left: 0;
  width: 100%;
`;

// eslint-disable-next-line react/prop-types
const Cost = ({ monthlyCost }) => (
  <CostWrapper>
    <CostIcon>
      <span>
        <small>£</small><big>{monthlyCost}</big> <small>/mo</small>
      </span>
    </CostIcon>
  </CostWrapper>
);

// eslint-disable-next-line react/prop-types
const Centered = ({ children }) => (
  <div className="d-flex flex-column justify-content-center">{children}</div>
);

// eslint-disable-next-line react/prop-types
const ClusterPack = ({ monthlyCost, subtitle, title }) => (
  <Card
    style={{
      borderRadius: '1rem',
    }}
  >
    <PackHead>
      <Centered>
        <CardTitle tag="h3">
          {title}
        </CardTitle>
        <CardSubtitle>
          {subtitle}
        </CardSubtitle>
      </Centered>
      <Cost monthlyCost={monthlyCost} />
    </PackHead>
    <PackBody>
      <CardText>
        Perhaps a detailed description of the cluster here?  Or maybe we
        should stick with bullet points and provide a link to show more
        details.
      </CardText>
      <ul>
        <li>List of primary features of the cluster</li>
        <li>How many support credits are made available each month</li>
        <li>Perhaps a link to show a detailed description?</li>
      </ul>
      <Button
        block
        color="primary"
        outline
      >
        Purchase
      </Button>
    </PackBody>
  </Card>
);

export default ClusterPack;
