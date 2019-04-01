import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISeat } from 'app/shared/model/seat.model';
import { getEntities as getSeats } from 'app/entities/seat/seat.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pass.reducer';
import { IPass } from 'app/shared/model/pass.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPassUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPassUpdateState {
  isNew: boolean;
  seatId: string;
}

export class PassUpdate extends React.Component<IPassUpdateProps, IPassUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      seatId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getSeats();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { passEntity } = this.props;
      const entity = {
        ...passEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/pass');
  };

  render() {
    const { passEntity, seats, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartpassApp.pass.home.createOrEditLabel">
              <Translate contentKey="smartpassApp.pass.home.createOrEditLabel">Create or edit a Pass</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : passEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pass-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="seasonLabel" for="season">
                    <Translate contentKey="smartpassApp.pass.season">Season</Translate>
                  </Label>
                  <AvField id="pass-season" type="text" name="season" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="smartpassApp.pass.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="pass-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && passEntity.status) || 'VALID'}
                  >
                    <option value="VALID">
                      <Translate contentKey="smartpassApp.Status.VALID" />
                    </option>
                    <option value="CANCELLED">
                      <Translate contentKey="smartpassApp.Status.CANCELLED" />
                    </option>
                    <option value="PENDING">
                      <Translate contentKey="smartpassApp.Status.PENDING" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="ownerLabel" for="owner">
                    <Translate contentKey="smartpassApp.pass.owner">Owner</Translate>
                  </Label>
                  <AvField id="pass-owner" type="text" name="owner" />
                </AvGroup>
                <AvGroup>
                  <Label id="passIdLabel" for="passId">
                    <Translate contentKey="smartpassApp.pass.passId">Pass Id</Translate>
                  </Label>
                  <AvField id="pass-passId" type="string" className="form-control" name="passId" />
                </AvGroup>
                <AvGroup>
                  <Label for="seat.id">
                    <Translate contentKey="smartpassApp.pass.seat">Seat</Translate>
                  </Label>
                  <AvInput id="pass-seat" type="select" className="form-control" name="seat.id">
                    <option value="" key="0" />
                    {seats
                      ? seats.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/pass" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  seats: storeState.seat.entities,
  passEntity: storeState.pass.entity,
  loading: storeState.pass.loading,
  updating: storeState.pass.updating,
  updateSuccess: storeState.pass.updateSuccess
});

const mapDispatchToProps = {
  getSeats,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassUpdate);
