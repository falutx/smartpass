import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IPass } from 'app/shared/model/pass.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, validateEntity } from './pass.reducer';

export interface IPassValidateDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PassValidateDialog extends React.Component<IPassValidateDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmValidate = event => {
    this.props.validateEntity(this.props.passEntity);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { passEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.validate.title">Confirm validate operation</Translate>
        </ModalHeader>
        <ModalBody id="smartpassApp.pass.validate.question">
          <Translate contentKey="smartpassApp.pass.validate.question" interpolate={{ id: passEntity.id }}>
            Are you sure you want to validate this Pass?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-validate-pass" color="danger" onClick={this.confirmValidate}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.validate">Validate</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ pass }: IRootState) => ({
  passEntity: pass.entity
});

const mapDispatchToProps = { getEntity, validateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassValidateDialog);
