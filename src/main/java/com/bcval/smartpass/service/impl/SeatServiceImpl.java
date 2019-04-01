package com.bcval.smartpass.service.impl;

import com.bcval.smartpass.service.SeatService;
import com.bcval.smartpass.domain.Seat;
import com.bcval.smartpass.repository.SeatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Seat.
 */
@Service
@Transactional
public class SeatServiceImpl implements SeatService {

    private final Logger log = LoggerFactory.getLogger(SeatServiceImpl.class);

    private final SeatRepository seatRepository;

    public SeatServiceImpl(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    /**
     * Save a seat.
     *
     * @param seat the entity to save
     * @return the persisted entity
     */
    @Override
    public Seat save(Seat seat) {
        log.debug("Request to save Seat : {}", seat);
        return seatRepository.save(seat);
    }

    /**
     * Get all the seats.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Seat> findAll() {
        log.debug("Request to get all Seats");
        return seatRepository.findAll();
    }


    /**
     * Get one seat by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Seat> findOne(Long id) {
        log.debug("Request to get Seat : {}", id);
        return seatRepository.findById(id);
    }

    /**
     * Delete the seat by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Seat : {}", id);
        seatRepository.deleteById(id);
    }
}
