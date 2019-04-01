import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pass from './pass';
import PassDetail from './pass-detail';
import PassUpdate from './pass-update';
import PassDeleteDialog from './pass-delete-dialog';
import PassValidateDialog from './pass-validate-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PassUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PassUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PassDetail} />
      <ErrorBoundaryRoute path={match.url} component={Pass} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PassDeleteDialog} />
    <ErrorBoundaryRoute path={`${match.url}/:id/validate`} component={PassValidateDialog} />
  </>
);

export default Routes;
