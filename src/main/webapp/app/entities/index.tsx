import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pass from './pass';
import Zone from './zone';
import Seat from './seat';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/pass`} component={Pass} />
      <ErrorBoundaryRoute path={`${match.url}/zone`} component={Zone} />
      <ErrorBoundaryRoute path={`${match.url}/seat`} component={Seat} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
