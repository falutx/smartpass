import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IZone } from 'app/shared/model/zone.model';
import { getEntities as getZones } from 'app/entities/zone/zone.reducer';
import { getEntity, updateEntity, createEntity, reset } from './seat.reducer';
import { ISeat } from 'app/shared/model/seat.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISeatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISeatUpdateState {
  isNew: boolean;
  zoneId: string;
}

export class SeatUpdate extends React.Component<ISeatUpdateProps, ISeatUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      zoneId: '0',
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

    this.props.getZones();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { seatEntity } = this.props;
      const entity = {
        ...seatEntity,
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
    this.props.history.push('/entity/seat');
  };

  render() {
    const { seatEntity, zones, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="smartpassApp.seat.home.createOrEditLabel">
              <Translate contentKey="smartpassApp.seat.home.createOrEditLabel">Create or edit a Seat</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : seatEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="seat-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="rowLabel" for="row">
                    <Translate contentKey="smartpassApp.seat.row">Row</Translate>
                  </Label>
                  <AvField id="seat-row" type="string" className="form-control" name="row" />
                </AvGroup>
                <AvGroup>
                  <Label id="seatLabel" for="seat">
                    <Translate contentKey="smartpassApp.seat.seat">Seat</Translate>
                  </Label>
                  <AvField id="seat-seat" type="string" className="form-control" name="seat" />
                </AvGroup>
                <AvGroup>
                  <Label id="seatIdLabel" for="seatId">
                    <Translate contentKey="smartpassApp.seat.seatId">Seat Id</Translate>
                  </Label>
                  <AvField id="seat-seatId" type="text" name="seatId" />
                </AvGroup>
                <AvGroup>
                  <Label for="zone.id">
                    <Translate contentKey="smartpassApp.seat.zone">Zone</Translate>
                  </Label>
                  <AvInput id="seat-zone" type="select" className="form-control" name="zone.id">
                    <option value="" key="0" />
                    {zones
                      ? zones.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/seat" replace color="info">
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
  zones: storeState.zone.entities,
  seatEntity: storeState.seat.entity,
  loading: storeState.seat.loading,
  updating: storeState.seat.updating,
  updateSuccess: storeState.seat.updateSuccess
});

const mapDispatchToProps = {
  getZones,
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
)(SeatUpdate);
