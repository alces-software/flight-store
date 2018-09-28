import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { compose } from 'recompose';

import { ProductBar } from 'flight-reactware';

import getItems from '../modules/items';

const Page = ({
  children,
  pageKey,
  productTypeDef,
  title,
}) => {
  const items = getItems(productTypeDef);
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ProductBar
        items={items}
        noaccount
        nosearch
        page={pageKey || title || ''}
        site={process.env.REACT_APP_SITE}
      />
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  pageKey: PropTypes.string,
  productTypeDef: PropTypes.object,
  title: PropTypes.string.isRequired,
};

const enhance = compose(
);

export default enhance(Page);
