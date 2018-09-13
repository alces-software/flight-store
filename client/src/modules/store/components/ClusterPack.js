import React from 'react';
import {
  Button,
  Card,
  CardBody,
  // CardImg,
  // CardImgOverlay,
  // CardLink,
  CardSubtitle,
  // CardText,
  CardTitle,
} from 'reactstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Theme } from 'flight-reactware';

const PackCard = styled(Card)`
  border-radius: 1rem;
`;

const packHeadHeight = '140px';

const PackHead = styled(CardBody)`
  background-color: ${Theme.dark};
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
  background-color: ${Theme.orange};
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

const LearnMoreLink = () => (
  <Button
    block
    color="link"
  >
    Learn more about this cluster pack.
  </Button>
);

const PurchaseButton = () => (
  <Button
    block
    color="primary"
    outline
    size="lg"
  >
    Purchase{' '}
    <FontAwesome
      fixedWidth
      name="credit-card"
    />
  </Button>
);

// eslint-disable-next-line react/prop-types
const ClusterPack = ({ children, monthlyCost, subtitle, title }) => (
  <PackCard>
    <PackHead>
      <CardTitle tag="h3">
        {title}
      </CardTitle>
      <CardSubtitle>
        {subtitle}
      </CardSubtitle>
      <Cost monthlyCost={monthlyCost} />
    </PackHead>
    <PackBody>
      {children}
      <LearnMoreLink />
      <PurchaseButton />
    </PackBody>
  </PackCard>
);

export default ClusterPack;
