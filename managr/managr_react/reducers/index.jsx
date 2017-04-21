import { combineReducers } from 'redux';

import { first_name,
         last_name,
         username,
         email,
         password,
         password_confirmation,
         registration_errors,
         registration_success } from './RegistrationReducer';

import { username_or_email,
         login_errors,
         login_success,
         logout_success } from './LoginReducer';

import { is_authenticated } from './AuthenticationReducer';

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

import { proposal_metadata_load_errors,
         proposal_metadata,
         bid_metadata_load_errors,
         bid_metadata } from './AppReducer';

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

export default combineReducers ({
    // Registration reducers
    // TODO: Rename these to reflect purpose (registration_form_...)
    first_name,
    last_name,
    username,
    email,
    password,
    password_confirmation,
    registration_errors,
    registration_success,

    // Login reducers
    username_or_email,
    login_errors,
    login_success,
    logout_success,

    // Authentication reducers
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

    // Navigation proposal reducers
    proposal_metadata_load_errors,
    proposal_metadata,
    bid_metadata_load_errors,
    bid_metadata,

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
    proposals
});
