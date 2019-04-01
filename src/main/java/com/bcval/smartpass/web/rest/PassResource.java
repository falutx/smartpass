package com.bcval.smartpass.web.rest;
import com.bcval.smartpass.domain.Pass;
import com.bcval.smartpass.service.PassService;
import com.bcval.smartpass.web.rest.errors.BadRequestAlertException;
import com.bcval.smartpass.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Pass.
 */
@RestController
@RequestMapping("/api")
public class PassResource {

    private final Logger log = LoggerFactory.getLogger(PassResource.class);

    private static final String ENTITY_NAME = "pass";

    private final PassService passService;

    public PassResource(PassService passService) {
        this.passService = passService;
    }

    /**
     * POST  /passes : Create a new pass.
     *
     * @param pass the pass to create
     * @return the ResponseEntity with status 201 (Created) and with body the new pass, or with status 400 (Bad Request) if the pass has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/passes")
    public ResponseEntity<Pass> createPass(@RequestBody Pass pass) throws URISyntaxException {
        log.debug("REST request to save Pass : {}", pass);
        if (pass.getId() != null) {
            throw new BadRequestAlertException("A new pass cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Pass result = passService.save(pass);
        return ResponseEntity.created(new URI("/api/passes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /passes : Updates an existing pass.
     *
     * @param pass the pass to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated pass,
     * or with status 400 (Bad Request) if the pass is not valid,
     * or with status 500 (Internal Server Error) if the pass couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/passes")
    public ResponseEntity<Pass> updatePass(@RequestBody Pass pass) throws URISyntaxException {
        log.debug("REST request to update Pass : {}", pass);
        if (pass.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Pass result = passService.save(pass);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, pass.getId().toString()))
            .body(result);
    }

    /**
     * GET  /passes : get all the passes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of passes in body
     */
    @GetMapping("/passes")
    public List<Pass> getAllPasses() {
        log.debug("REST request to get all Passes");
        return passService.findAll();
    }

    /**
     * GET  /passes/:id : get the "id" pass.
     *
     * @param id the id of the pass to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the pass, or with status 404 (Not Found)
     */
    @GetMapping("/passes/{id}")
    public ResponseEntity<Pass> getPass(@PathVariable Long id) {
        log.debug("REST request to get Pass : {}", id);
        Optional<Pass> pass = passService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pass);
    }

    /**
     * DELETE  /passes/:id : delete the "id" pass.
     *
     * @param id the id of the pass to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/passes/{id}")
    public ResponseEntity<Void> deletePass(@PathVariable Long id) {
        log.debug("REST request to delete Pass : {}", id);
        passService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
