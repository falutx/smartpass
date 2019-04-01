import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pass.reducer';
import { IPass } from 'app/shared/model/pass.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Pass extends React.Component<IPassProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { passList, match } = this.props;
    return (
      <div>
        <h2 id="pass-heading">
          <Translate contentKey="smartpassApp.pass.home.title">Passes</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="smartpassApp.pass.home.createLabel">Create new Pass</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="smartpassApp.pass.season">Season</Translate>
                </th>
                <th>
                  <Translate contentKey="smartpassApp.pass.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="smartpassApp.pass.owner">Owner</Translate>
                </th>
                <th>
                  <Translate contentKey="smartpassApp.pass.passId">Pass Id</Translate>
                </th>
                <th>
                  <Translate contentKey="smartpassApp.pass.seat">Seat</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {passList.map((pass, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pass.id}`} color="link" size="sm">
                      {pass.id}
                    </Button>
                  </td>
                  <td>{pass.season}</td>
                  <td>
                    <Translate contentKey={`smartpassApp.Status.${pass.status}`} />
                  </td>
                  <td>{pass.owner}</td>
                  <td>{pass.passId}</td>
                  <td>{pass.seat ? <Link to={`seat/${pass.seat.id}`}>{pass.seat.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pass.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pass.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pass.id}/validate`} color="warning" size="sm">
                        <FontAwesomeIcon icon="check" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.validate">Validate</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pass.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pass }: IRootState) => ({
  passList: pass.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pass);
