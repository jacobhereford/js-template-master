'use strict';

const app = require('../app.js');
const api = require('./api.js');
const getFormFields = require('../../../lib/get-form-fields');


const success = (data) => {
  if (data) {
    console.log(data);
  } else {
    console.log('Success');
  }
};

const choreDeleteSuccess = (event) => {
  let parent = $(event.currentTarget).parents('tr');
  parent.remove();
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user);
};


const deleteChore = (event) => {
  event.preventDefault();
  let id = $(event.currentTarget).data('chore-id');
  api.deleteChore(id)
  .done(choreDeleteSuccess(event))
  .fail(failure);
};

const displayChores = (data) => {
  const table = $('table#chores tbody');
  $.each(data.chores, function (i, chore){
    return table.append("<tr><td>" + chore.chore + "</td><td>" +chore.where + "</td><td>" + chore.when + "</td><td><a class='btn btn-warning chore-delete' href='#' data-chore-id='" + chore.id + "'>Delete</a><a class='btn btn-primary chore-update' href='#' data-chore-id='" + chore.id + "'>Edit</a></td></tr>");
  });
  $(".chore-update").on("click", displayEditChoreForm);
  $(".chore-delete").on("click", deleteChore);
};

const updateChore = (event) => {
  event.preventDefault();
  let data = getFormFields(event.target);
  api.updateChore(data)
  .done(displayChore)
  .fail(failure);
};

const displayEditChoreForm = (event) => {
  let parent = $(event.currentTarget).parents('tr');

  parent.empty()
  parent.html("<form class='update-form' action='/chores/" + $(event.currentTarget).data('chore-id') + "' method='PUT'><td><input name='chore[chore]' /></td><td><input name='chore[where]' /></td><td><input name='chore[when]' /></td><td><button type='submit' value='Update' class='btn btn-primary'>Update</button></td></form>"
  );

  $('.update-form').on('submit', updateChore);
};

const displayChore = (data) => {
  const chore = data.chore;
  const table = $('table#chores tbody');
  table.append("<tr><td>" + chore.chore + "</td><td>" +chore.where + "</td><td>" + chore.when + "</td><td><a class='btn btn-warning chore-delete' href='#' data-chore-id='" + chore.id + "'>Delete</a><a class='btn btn-primary chore-update' href='#' data-chore-id='" + chore.id + "'>Edit</a></td></tr>");

  $(".chore-update").on("click", displayEditChoreForm);
  $(".chore-delete").on("click", deleteChore);
};

const signOutSuccess = () => {
  console.log('User signed out successfully');
  app.user = null;
};

module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
  displayChores,
  displayChore
};
