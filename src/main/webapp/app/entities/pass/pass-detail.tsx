import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pass.reducer';
import { IPass } from 'app/shared/model/pass.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPassDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PassDetail extends React.Component<IPassDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { passEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="smartpassApp.pass.detail.title">Pass</Translate> [<b>{passEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="season">
                <Translate contentKey="smartpassApp.pass.season">Season</Translate>
              </span>
            </dt>
            <dd>{passEntity.season}</dd>
            <dt>
              <span id="status">
                <Translate contentKey="smartpassApp.pass.status">Status</Translate>
              </span>
            </dt>
            <dd>{passEntity.status}</dd>
            <dt>
              <span id="owner">
                <Translate contentKey="smartpassApp.pass.owner">Owner</Translate>
              </span>
            </dt>
            <dd>{passEntity.owner}</dd>
            <dt>
              <span id="passId">
                <Translate contentKey="smartpassApp.pass.passId">Pass Id</Translate>
              </span>
            </dt>
            <dd>{passEntity.passId}</dd>
            <dt>
              <Translate contentKey="smartpassApp.pass.seat">Seat</Translate>
            </dt>
            <dd>{passEntity.seat ? passEntity.seat.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pass" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/pass/${passEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ pass }: IRootState) => ({
  passEntity: pass.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassDetail);
