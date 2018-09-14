import React from 'react';
import PropTypes from 'prop-types';
import { PageHeadingContainer, SectionButtons } from 'flight-reactware';


const PageHeading = ({ overview, sections, title }) => (
  <PageHeadingContainer>
    <div className="d-flex justify-content-center">
      <div>
        <div className="d-flex justify-content-center">
          <h1>{title}</h1>
        </div>
        <div className="d-flex justify-content-center">
          {/* children */}
        </div>
        <p>{overview}</p>
      </div>
    </div>
    <SectionButtons sections={sections} />
  </PageHeadingContainer>

);

PageHeading.propTypes = {
  overview: PropTypes.node.isRequired,
  sections: PropTypes.array.isRequired,
  title: PropTypes.node.isRequired,
};

PageHeading.defaultProps = {
};

export default PageHeading;
