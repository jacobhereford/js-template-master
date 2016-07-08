'use strict';

const app = require('../app.js');

const createChore = (data) => {
  return $.ajax({
    url: app.host + '/chores',
    method: "POST",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data
  });
};

const deleteChore = (chore_id) => {
  return $.ajax({
    url: app.host + '/chores/' + chore_id,
    method: "DELETE",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const updateChore = (data, chore_id) => {
  return $.ajax({
    url: app.host + '/chores/' + chore_id,
    method: "PATCH",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data
  });
};

const getChores = () => {
  return $.ajax({
    url: app.host + '/chores',
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const getChore = (chore_id) => {
  return $.ajax({
    url: app.host + '/chores/' + chore_id,
    method: "GET",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};


module.exports = {
  createChore,
  getChores,
  deleteChore,
  updateChore,
  getChore
};
