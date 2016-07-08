'use strict';

const template = require('../../templates/choresTemplate.handlebars');
// const updateModaltemplate = require('../../templates/choreModal.handlebars');
const api = require('./api.js');
// const getFormFields = require('../../../lib/get-form-fields.js');

const failure = (error) => {
  console.error(error);
};

const getChores = () => {
  api.getChores()
  .done(displayChores)
  .fail(failure);
};

const deleteChore = (event) => {
  event.preventDefault();
  let chore_id = $(event.target).attr('data-id');
  api.deleteChore(chore_id)
  .done(getChores)
  .fail(failure);
};

const updateChore = (data, chore_id) => {
  api.updateChore(data, chore_id)
  .done(getChores)
  .fail();
};

const displayChores = (data) => {
  let chores = data;
  $('#update-form').addClass('hide');
  $('#chores-table').html('');
  $('#chores-table').html(template(chores));
  $('.delete-chore').click(deleteChore);
  $('.update-chore').on('click', (event) => {
    event.preventDefault();
    let chore_id = $(event.target).data('id');
    $('#chore-id').val(chore_id);
    $('#update-form').removeClass('hide');
  });
};

const createChoreSuccess = () => {
  $('#chores-table').html('');
  api.getChores()
  .done(displayChores)
  .fail(failure);
};

module.exports = {
  displayChores,
  getChores,
  failure,
  deleteChore,
  createChoreSuccess,
updateChore
};
