'use strict';

const app = require('../app.js');
const template = require('../../templates/choresTemplate.handlebars');
// const modal = require('../../templates/modal.handlebars');
const choreApi = require('../chores/api.js');
const choreUi = require('../chores/ui.js');
// const getFormFields = require('../../../lib/get-form-fields.js');


const success = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const getChoresOnSignIn = () => {
  $('#chores-table').html(template());
  $('#create-chore').removeClass('hide');
  choreApi.getChores()
  .done((data) => {
    $('#chores-table').html('');
    $('#chores-table').html(template(data));
    $('.delete-chore').click(choreUi.deleteChore);
    $('.update-chore').on('click', (event) => {
      event.preventDefault();
      let chore_id = $(event.target).data('id');
      $('#chore-id').val(chore_id);
      $('#update-form').removeClass('hide');
    });
  });
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
  getChoresOnSignIn();
};

const signOutSuccess = () => {
  console.log('User signed out successfully');
  app.user = null;
  $('#chores-table').html('');
};

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  getChoresOnSignIn
};
