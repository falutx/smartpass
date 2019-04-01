package com.bcval.smartpass.web.rest;

import com.bcval.smartpass.SmartpassApp;

import com.bcval.smartpass.domain.Pass;
import com.bcval.smartpass.repository.PassRepository;
import com.bcval.smartpass.service.PassService;
import com.bcval.smartpass.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.bcval.smartpass.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bcval.smartpass.domain.enumeration.Status;
/**
 * Test class for the PassResource REST controller.
 *
 * @see PassResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SmartpassApp.class)
public class PassResourceIntTest {

    private static final String DEFAULT_SEASON = "AAAAAAAAAA";
    private static final String UPDATED_SEASON = "BBBBBBBBBB";

    private static final Status DEFAULT_STATUS = Status.VALID;
    private static final Status UPDATED_STATUS = Status.CANCELLED;

    private static final String DEFAULT_OWNER = "AAAAAAAAAA";
    private static final String UPDATED_OWNER = "BBBBBBBBBB";

    private static final Integer DEFAULT_PASS_ID = 1;
    private static final Integer UPDATED_PASS_ID = 2;

    @Autowired
    private PassRepository passRepository;

    @Autowired
    private PassService passService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPassMockMvc;

    private Pass pass;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PassResource passResource = new PassResource(passService);
        this.restPassMockMvc = MockMvcBuilders.standaloneSetup(passResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pass createEntity(EntityManager em) {
        Pass pass = new Pass()
            .season(DEFAULT_SEASON)
            .status(DEFAULT_STATUS)
            .owner(DEFAULT_OWNER)
            .passId(DEFAULT_PASS_ID);
        return pass;
    }

    @Before
    public void initTest() {
        pass = createEntity(em);
    }

    @Test
    @Transactional
    public void createPass() throws Exception {
        int databaseSizeBeforeCreate = passRepository.findAll().size();

        // Create the Pass
        restPassMockMvc.perform(post("/api/passes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pass)))
            .andExpect(status().isCreated());

        // Validate the Pass in the database
        List<Pass> passList = passRepository.findAll();
        assertThat(passList).hasSize(databaseSizeBeforeCreate + 1);
        Pass testPass = passList.get(passList.size() - 1);
        assertThat(testPass.getSeason()).isEqualTo(DEFAULT_SEASON);
        assertThat(testPass.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testPass.getOwner()).isEqualTo(DEFAULT_OWNER);
        assertThat(testPass.getPassId()).isEqualTo(DEFAULT_PASS_ID);
    }

    @Test
    @Transactional
    public void createPassWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = passRepository.findAll().size();

        // Create the Pass with an existing ID
        pass.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPassMockMvc.perform(post("/api/passes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pass)))
            .andExpect(status().isBadRequest());

        // Validate the Pass in the database
        List<Pass> passList = passRepository.findAll();
        assertThat(passList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPasses() throws Exception {
        // Initialize the database
        passRepository.saveAndFlush(pass);

        // Get all the passList
        restPassMockMvc.perform(get("/api/passes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pass.getId().intValue())))
            .andExpect(jsonPath("$.[*].season").value(hasItem(DEFAULT_SEASON.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].owner").value(hasItem(DEFAULT_OWNER.toString())))
            .andExpect(jsonPath("$.[*].passId").value(hasItem(DEFAULT_PASS_ID)));
    }
    
    @Test
    @Transactional
    public void getPass() throws Exception {
        // Initialize the database
        passRepository.saveAndFlush(pass);

        // Get the pass
        restPassMockMvc.perform(get("/api/passes/{id}", pass.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pass.getId().intValue()))
            .andExpect(jsonPath("$.season").value(DEFAULT_SEASON.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.owner").value(DEFAULT_OWNER.toString()))
            .andExpect(jsonPath("$.passId").value(DEFAULT_PASS_ID));
    }

    @Test
    @Transactional
    public void getNonExistingPass() throws Exception {
        // Get the pass
        restPassMockMvc.perform(get("/api/passes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePass() throws Exception {
        // Initialize the database
        passService.save(pass);

        int databaseSizeBeforeUpdate = passRepository.findAll().size();

        // Update the pass
        Pass updatedPass = passRepository.findById(pass.getId()).get();
        // Disconnect from session so that the updates on updatedPass are not directly saved in db
        em.detach(updatedPass);
        updatedPass
            .season(UPDATED_SEASON)
            .status(UPDATED_STATUS)
            .owner(UPDATED_OWNER)
            .passId(UPDATED_PASS_ID);

        restPassMockMvc.perform(put("/api/passes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPass)))
            .andExpect(status().isOk());

        // Validate the Pass in the database
        List<Pass> passList = passRepository.findAll();
        assertThat(passList).hasSize(databaseSizeBeforeUpdate);
        Pass testPass = passList.get(passList.size() - 1);
        assertThat(testPass.getSeason()).isEqualTo(UPDATED_SEASON);
        assertThat(testPass.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testPass.getOwner()).isEqualTo(UPDATED_OWNER);
        assertThat(testPass.getPassId()).isEqualTo(UPDATED_PASS_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingPass() throws Exception {
        int databaseSizeBeforeUpdate = passRepository.findAll().size();

        // Create the Pass

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPassMockMvc.perform(put("/api/passes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pass)))
            .andExpect(status().isBadRequest());

        // Validate the Pass in the database
        List<Pass> passList = passRepository.findAll();
        assertThat(passList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePass() throws Exception {
        // Initialize the database
        passService.save(pass);

        int databaseSizeBeforeDelete = passRepository.findAll().size();

        // Delete the pass
        restPassMockMvc.perform(delete("/api/passes/{id}", pass.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Pass> passList = passRepository.findAll();
        assertThat(passList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pass.class);
        Pass pass1 = new Pass();
        pass1.setId(1L);
        Pass pass2 = new Pass();
        pass2.setId(pass1.getId());
        assertThat(pass1).isEqualTo(pass2);
        pass2.setId(2L);
        assertThat(pass1).isNotEqualTo(pass2);
        pass1.setId(null);
        assertThat(pass1).isNotEqualTo(pass2);
    }
}
