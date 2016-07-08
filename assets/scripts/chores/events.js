'use strict';

const api = require('./api.js');
const ui = require('./ui.js');
// const app = require('../app.js');
const getFormFields = require('../../../lib/get-form-fields.js');

// const displayChores = () => {
//   api.displayChores()
//   .done(ui.displayChores)
//   .fail(ui.failure);
// };

const updateChore = (event) => {
  event.preventDefault();
  let chore_id = $('#chore-id').val();
  let data = getFormFields(event.target);
  $('#update-form').find('[type="text"]').val('');
  api.updateChore(data, chore_id)
  .done(ui.createChoreSuccess)
  .fail(ui.failure);
};

const createChore = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  $('#create-chore').find('[type="text"]').val('');
  api.createChore(data)
  .done(ui.createChoreSuccess)
  .fail(ui.failure);
};

// const deleteChore = (event) => {
//   event.preventDefault();
//   let chore_id = $(event.target).data('id');
//   api.deleteChore(chore_id)
//   .done(ui.deleteChoreSuccess)
//   .fail(ui.failure);
// };

const addHandlers = () => {
  $('#create-chore').on('submit', createChore);
  $('#update-form').on('submit', updateChore);
};

module.exports = {
  addHandlers,
};
