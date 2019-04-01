package com.bcval.smartpass.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import com.bcval.smartpass.domain.enumeration.Status;

/**
 * A Pass.
 */
@Entity
@Table(name = "pass")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pass implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "season")
    private String season;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "owner")
    private String owner;

    @Column(name = "pass_id")
    private Integer passId;

    @OneToOne
    @JoinColumn(unique = true)
    private Seat seat;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSeason() {
        return season;
    }

    public Pass season(String season) {
        this.season = season;
        return this;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public Status getStatus() {
        return status;
    }

    public Pass status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getOwner() {
        return owner;
    }

    public Pass owner(String owner) {
        this.owner = owner;
        return this;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public Integer getPassId() {
        return passId;
    }

    public Pass passId(Integer passId) {
        this.passId = passId;
        return this;
    }

    public void setPassId(Integer passId) {
        this.passId = passId;
    }

    public Seat getSeat() {
        return seat;
    }

    public Pass seat(Seat seat) {
        this.seat = seat;
        return this;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Pass pass = (Pass) o;
        if (pass.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pass.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pass{" +
            "id=" + getId() +
            ", season='" + getSeason() + "'" +
            ", status='" + getStatus() + "'" +
            ", owner='" + getOwner() + "'" +
            ", passId=" + getPassId() +
            "}";
    }
}
