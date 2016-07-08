'use strict';

const app = require('../app.js');
const api = require('./api.js');
// const getFormFields = require('../../../lib/get-form-fields');
const events = require('./events.js');

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

const displayEditChoreForm = (event) => {
  let form = $("#update-chore form");
  let choreID = $(event.currentTarget).data('choreId');
  form.toggle();
  $('input[name="chore[id]"]').val(choreID);
};

const displayChores = (data) => {
  const table = $('table#chores tbody');
  $.each(data.chores, function (i, chore){
    return table.append("<tr><td>" + chore.title + "</td><td>" +chore.where + "</td><td>" + chore.when + "</td><td><a class='btn btn-warning chore-delete' href='#' data-chore-id='" + chore.id + "'>Delete</a><a class='btn btn-primary chore-update' href='#' data-chore-id='" + chore.id + "'>Edit</a></td></tr>");
  });
  $('body').on('click', '.chore-update', displayEditChoreForm);
  $('body').on('click', '.chore-delete', deleteChore);
};


const displayChore = (data) => {
  const chore = data.chore;
  const table = $('table#chores tbody');
  table.append("<tr><td>" + chore.title + "</td><td>" +chore.where + "</td><td>" + chore.when + "</td><td><a class='btn btn-warning chore-delete' href='#' data-chore-id='" + chore.id + "'>Delete</a><a class='btn btn-primary chore-update' href='#' data-chore-id='" + chore.id + "'>Edit</a></td></tr>");

  $('body').on('click', '.chore-update', displayEditChoreForm);
  $('body').on('click', '.chore-delete', deleteChore);
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
