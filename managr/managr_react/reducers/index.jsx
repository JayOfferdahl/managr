import { combineReducers } from 'redux';

import { first_name,
         last_name,
         username,
         email,
         password,
         password_confirmation,
         registration_errors,
         registration_success,
         user_type } from './RegistrationReducer';

import { username_or_email,
         login_errors,
         login_success,
         logout_success } from './LoginReducer';

import { is_authenticated,
         user_first_and_last } from './AuthenticationReducer';
        
import { proposal_form_title,
         proposal_form_address,
         proposal_form_contact_number,
         proposal_form_budget,
         proposal_form_start_date,
         proposal_form_end_date,
         proposal_form_description,
         proposal_form_success,
         proposal_form_errors,
         proposal_load_success,
         proposal_load_failure,
         proposal_owner,
         proposal_update_in_progress,
         proposal_deleted,
         bids_on_proposal } from './ProposalReducer';

import { bid_in_progress,
         bid_form_contact_number,
         bid_form_budget,
         bid_form_start_date,
         bid_form_end_date,
         bid_form_description,
         bid_form_success,
         bid_form_errors,
         bid_exists_on_proposal,
         bid_data,
         bid_deleted,
         bid_declined,
         proposal_removed,
         proposals } from './BidReducer';
        
import { create_project_name,
         create_project_description,
         create_project_budget,
         create_project_success,
         create_project_errors,
         new_project_uuid,
         project_overview_name,
         project_overview_description,
         project_overview_budget } from './ProjectReducer';

import { company_name,
         company_email,
         company_address,
         company_city,
         company_state,
         company_postal_code,
         company_description,
         company_creation_success,
         company_creation_errors,
         company_key,
         company_join_success,
         company_join_errors } from './CompanyCreationReducer';

import { proposal_metadata_load_errors,
         proposal_metadata,
         bid_metadata_load_errors,
         bid_metadata,
         project_metadata_load_errors,
         project_metadata } from './AppReducer';

import { reload_milestones } from './MilestonesReducer';

import { google_documents,
         uploaded_documents,
         currently_shown_doc_link,
         document_management_view_controller,
         new_google_doc_link,
         new_google_doc_title,
         create_new_google_doc_link } from './DocumentsReducer';

export default combineReducers ({
    // Registration reducers
    first_name,
    last_name,
    username,
    email,
    password,
    password_confirmation,
    registration_errors,
    registration_success,
    user_type,

    // Login reducers
    username_or_email,
    login_errors,
    login_success,
    logout_success,

    // Authentication reducers
    user_first_and_last,
    is_authenticated,

    // Proposal reducers
    proposal_form_title,
    proposal_form_address,
    proposal_form_contact_number,
    proposal_form_budget,
    proposal_form_start_date,
    proposal_form_end_date,
    proposal_form_description,
    proposal_form_success,
    proposal_form_errors,
    proposal_load_success,
    proposal_load_failure,
    proposal_owner,
    proposal_update_in_progress,
    proposal_deleted,
    bids_on_proposal,

    // General App reducers
    proposal_metadata_load_errors,
    proposal_metadata,
    bid_metadata_load_errors,
    bid_metadata,
    project_metadata_load_errors,
    project_metadata,

    // Bid reducers
    bid_in_progress,
    bid_form_contact_number,
    bid_form_budget,
    bid_form_start_date,
    bid_form_end_date,
    bid_form_description,
    bid_form_success,
    bid_form_errors,
    bid_exists_on_proposal,
    bid_data,
    bid_deleted,
    bid_declined,
    proposal_removed,
    proposals,

    // Company creation reducers
    company_name,
    company_email,
    company_address,
    company_city,
    company_state,
    company_postal_code,
    company_description,
    company_creation_success,
    company_creation_errors,
    company_key,
    company_join_success,
    company_join_errors,

    // Project creation reducers
    create_project_name,
    create_project_description,
    create_project_budget,
    create_project_success,
    create_project_errors,
    new_project_uuid,
    project_overview_name,
    project_overview_description,
    project_overview_budget,

    // Milestones reducers
    reload_milestones,

    // Documents reducers
    google_documents,
    uploaded_documents,
    currently_shown_doc_link,
    document_management_view_controller,
    new_google_doc_link,
    new_google_doc_title,
    create_new_google_doc_link,
});
