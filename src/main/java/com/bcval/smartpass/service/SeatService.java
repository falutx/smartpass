package com.bcval.smartpass.service;

import com.bcval.smartpass.domain.Seat;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Seat.
 */
public interface SeatService {

    /**
     * Save a seat.
     *
     * @param seat the entity to save
     * @return the persisted entity
     */
    Seat save(Seat seat);

    /**
     * Get all the seats.
     *
     * @return the list of entities
     */
    List<Seat> findAll();


    /**
     * Get the "id" seat.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Seat> findOne(Long id);

    /**
     * Delete the "id" seat.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
