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
  makeSection,
} from 'flight-reactware';
import FontAwesome from 'react-fontawesome';

import CommunitySiteLink from '../elements/CommunitySiteLink';
import ContextLink from '../elements/ContextLink';
import DocsSiteLink from '../elements/DocsSiteLink';

const sections = {
  whatIsIt: makeSection('What is Flight Store?', 'what-is-it', 'pink', 'question'),
  moreInfo: makeSection('Getting more information', 'more-information', 'blue', 'book'),
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
          overview="This service has been developed to facilitate aquiring a
          fully managed High Performance Computing (HPC) cluster."
          sections={Object.values(sections)}
          title="Welcome to the Alces Flight Store."
        />
      </Container>
      <Container>
        <Section
          overview="The Alces Flight Store service allows you to purchase
          fully managed Alces Flight HPC clusters complete with comprehensive
          support."
          section={sections.whatIsIt}
          title="What is Alces Flight Store?"
        >
          <Row>
            <Col>
              <p>
                Select the HPC cluster pack you want, enter your credit card
                details and cluster name and you are ready to go!
              </p>
              <p>
                Your cluster will be built by our experienced engineering team
                in a Virtual Private Cluster (VPC) environment for security,
                with SSH and graphical-desktop connectivity for users.  Data
                management tools for POSIX and S3 object storage are also
                included to help users transfer files and manage storage
                resources.
              </p>
              <p>
                Your cluster will be fully managed by Alces using the {' '}
                <ContextLink
                  linkSite="Center"
                  location="/"
                >
                  Alces Flight Center
                </ContextLink>
                {' '} service.  Where you will be able to
                view the dozens of daily checks our engineering team will
                perform to ensure the health of your cluster request support
                and advice and access the comprehensive support logs for your
                cluster.
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
        <Section
          overview="Want to spend some time reading up on Alces Flight Compute
          prior to starting?"
          section={sections.moreInfo}
          title="Getting more information."
        >
          <p>
            We have a{' '}
            <DocsSiteLink>documentation site</DocsSiteLink> dedicated to the
            cause as well as a {' '}
            <CommunitySiteLink>Community Support Portal</CommunitySiteLink>
            {' '} available for you to join in and read through.
          </p>
          <p>
            Enjoy your flight!
          </p>
        </Section>
      </Container>
    </div>
  );
};

export default Home;
