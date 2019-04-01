package com.bcval.smartpass.service.impl;

import com.bcval.smartpass.service.PassService;
import com.bcval.smartpass.domain.Pass;
import com.bcval.smartpass.repository.PassRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Pass.
 */
@Service
@Transactional
public class PassServiceImpl implements PassService {

    private final Logger log = LoggerFactory.getLogger(PassServiceImpl.class);

    private final PassRepository passRepository;

    public PassServiceImpl(PassRepository passRepository) {
        this.passRepository = passRepository;
    }

    /**
     * Save a pass.
     *
     * @param pass the entity to save
     * @return the persisted entity
     */
    @Override
    public Pass save(Pass pass) {
        log.debug("Request to save Pass : {}", pass);
        return passRepository.save(pass);
    }

    /**
     * Get all the passes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Pass> findAll() {
        log.debug("Request to get all Passes");
        return passRepository.findAll();
    }


    /**
     * Get one pass by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Pass> findOne(Long id) {
        log.debug("Request to get Pass : {}", id);
        return passRepository.findById(id);
    }

    /**
     * Delete the pass by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pass : {}", id);
        passRepository.deleteById(id);
    }
}
