'use strict';

const app = require('../app.js');

const signUp = (data) => {
  return $.ajax({
    url: app.host + '/sign-up',
    method: "POST",
    data: data,
  });
};

const signIn = (data) => {
    return $.ajax({
      url: app.host + '/sign-in',
      method: "POST",
      data: data,
    });
};

const signOut = () => {
  return $.ajax({
    url: app.host + '/sign-out/' + app.user.id,
    method: "DELETE",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
  });
};

const changePassword = (data) => {
  return $.ajax({
    url: app.host + '/change-password/' + app.user.id,
    method: "PATCH",
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const updateChore = (data) => {
  return $.ajax({
    url: app.host + '/chores/' + data.chore.id,
    method: "PATCH",
    headers: {
      Authorization: 'Token token=' +app.user.token,
    },
    data:data
  });
};

const createChore = (data) => {
  return $.ajax({
    url:app.host + '/chores',
    method: "POST",
    headers: {
      Authorization: 'Token token=' +app.user.token,
    },
    data: data
  });
};

const deleteChore = (id) => {
  return $.ajax({
  url: app.host + '/chores/' + id,
  method: "DELETE",
  headers: {
    Authorization: 'Token token=' +app.user.token,
  }});
};

const displayChores = () => {
  return $.ajax({
    url: app.host + '/chores',
    method: "GET",
    headers: {
      Authorization: 'Token token=' +app.user.token,
    }
  });
};

const displayChore = (data) => {
  return $.ajax({
    url: app.host + '/chores/' + data.id,
    method: "GET",
  });
};


// $().ready(function(){
//   $("#hide").click(function(){
//   $("").hide();
//   });
//   $("#show").click(function(){
//     $("p").show();
//   });
//   });

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
  updateChore,
  createChore,
  deleteChore,
  displayChore,
  displayChores,
};
