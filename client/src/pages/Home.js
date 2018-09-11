import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
} from 'reactstrap';
import styled from 'styled-components';
import {
  LinkContainer,
  PageHeading,
  Section,
  SectionIcon,
  makeSection,
} from 'flight-reactware';
import FontAwesome from 'react-fontawesome';

import ContextLink from '../elements/ContextLink';

const sections = {
  whatIsIt: makeSection('What is Flight Store?', 'what-is-it', 'pink', 'question'),
};

const CallToAction = styled(({ children, className, icon, to }) => {
  return (
    <LinkContainer 
      className={className}
      to={to}
    >
      <Button
        color="success"
        size="lg"
      >
        <FontAwesome
          fixedWidth
          name={icon}
        />
        {children}
      </Button>
    </LinkContainer>
  );
})`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
`;

const Home = () => {
  return (
    <div>
      <Container fluid>
        <PageHeading
          overview="This service provides facilities to purchase Alces Flight
          HPC clusters."
          sections={Object.values(sections)}
          title="Welcome to the Alces Flight Store."
        />
      </Container>
      <Container>
        <Section
          overview="The Alces Flight Store service provides access to a store
          front where you can purchase Alces Flight HPC clusters."
          section={sections.whatIsIt}
          title="What is the store service?"
        >
          <Row>
            <Col>
              <SectionIcon name="user" />
              <h4>
                Alces Flight Store
              </h4>
              <p>
                Alces Flight Store provides a number of cluster packs that can
                be bought for a monthly fee.  They provide a cluster and fully
                managed support through Alces Flight Center.
                <ContextLink
                  linkSite="Center"
                  location="/"
                >
                  Alces Flight Center
                </ContextLink>.
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <CallToAction
                icon="play-circle"
                to="/store"
              >
                Purchase a cluster pack
              </CallToAction>
            </Col>
          </Row>
        </Section>
      </Container>
    </div>
  );
};

export default Home;
