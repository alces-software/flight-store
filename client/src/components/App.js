import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';
import { CSSTransitionGroup } from 'react-transition-group';
import { compose } from 'recompose';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router';
import isFunction from 'lodash.isfunction';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withProps } from 'recompose';

import { Page } from 'flight-reactware';

import ScrollToTop from './ScrollToTop';
import SitePage from './Page';
import appVersion from '../version';
import routes from '../routes';
import { store } from '../modules';


// Use our own version of `renderRoutes` which incorporates currently
// unreleased fixes from `react-router-config`'s `renderRoutes`.  The
// important fix being the ability to pass props to the `Switch` used
// internally by `renderRoutes`.
//
// This fix is important due to the nesting of `Switch` under
// `CSSTransitionGroup`.  When a `Switch` is nested under
// `CSSTransitionGroup`, we must make sure that it uses the same `location`
// when transitioning out as it did when transitioning in.  If it doesn't, the
// `Switch` which is transitioning out, will perform unnecessary mounting and
// unmounting of its children due to different components matching the updated
// location.
//
// At best, this results in unnecessary processing and a less smooth
// animation.  If the components have a side-effect when mounted or unmounted,
// something may be broken.
//
// We're currently using `react-router-config@1.0.0-beta.4`.  When a new
// release is made, we can revert to using `react-router-config`'s
// `renderRoutes`.
//
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable semi */
const renderRoutes = (routes, extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) => (
      <Route
        key={route.key || i}
        path={route.path}
        exact={route.exact}
        strict={route.strict}
        render={(props) => (
          <route.component {...props} {...extraProps} route={route}/>
        )}
      />
    ))}
  </Switch>
) : null
/* eslint-enable react/jsx-sort-props */
/* eslint-enable react/jsx-max-props-per-line */
/* eslint-enable react/jsx-tag-spacing */
/* eslint-enable semi */

const productName = process.env.REACT_APP_PRODUCT_NAME;

const propTypes = {
  location: PropTypes.object,
  matchedRouteConfig: PropTypes.object.isRequired,
  productTypeDef: PropTypes.object,
  route: PropTypes.object,
};

const withBranches = withProps(({ location }) => {
  const branches = matchRoutes(routes, location.pathname);
  const branch = branches[branches.length - 1];
  return {
    branches: branches,
    branch: branch,
    matchedRouteConfig: branch.route,
  };
});

const withMatchFix = withProps(({ branch }) => {
  const correctMatch = branch.match;
  return ({
    match: correctMatch,
  });
});


const App = ({ location, matchedRouteConfig, productTypeDef, route }) => {
  const pageKey = isFunction(matchedRouteConfig.pageKey) ?
    matchedRouteConfig.pageKey(productTypeDef) :
    matchedRouteConfig.pageKey;
  const title = isFunction(matchedRouteConfig.title) ?
    matchedRouteConfig.title(productTypeDef) :
    matchedRouteConfig.title;

  return (
    <ScrollToTop>
      <Page
        serviceText={process.env.REACT_APP_SERVICE_TEXT}
        site={process.env.REACT_APP_SITE}
      >
        <Helmet
          defaultTitle={productName}
          titleTemplate={`${productName} - %s`}
        >
          <meta
            content={appVersion}
            name="client-version"
          />
        </Helmet>
        <SitePage
          pageKey={pageKey}
          productTypeDef={productTypeDef}
          title={title}
        >
          <CSSTransitionGroup
            transitionEnterTimeout={250}
            transitionLeave={false}
            transitionName="fade"
          >
            <div key={matchedRouteConfig.key || location.pathname}>
              {renderRoutes(route.routes, {}, { location: location })}
            </div>
          </CSSTransitionGroup>
        </SitePage>
      </Page>
    </ScrollToTop>
  );
};

App.propTypes = propTypes;

const enhance = compose(
  withRouter,
  withBranches,
  withMatchFix,

  connect(createStructuredSelector({
    productTypeDef: store.selectors.productTypeDef,
  })),
);

export default enhance(App);
