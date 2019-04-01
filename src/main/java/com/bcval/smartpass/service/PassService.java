package com.bcval.smartpass.service;

import com.bcval.smartpass.domain.Pass;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Pass.
 */
public interface PassService {

    /**
     * Save a pass.
     *
     * @param pass the entity to save
     * @return the persisted entity
     */
    Pass save(Pass pass);

    /**
     * Get all the passes.
     *
     * @return the list of entities
     */
    List<Pass> findAll();


    /**
     * Get the "id" pass.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Pass> findOne(Long id);

    /**
     * Delete the "id" pass.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
