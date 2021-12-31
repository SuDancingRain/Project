"use strict";
const PersonAbl = require("../../abl/person-abl.js");

class PersonController {

  removeFromSubject(ucEnv) {
    return PersonAbl.removeFromSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  addToSubject(ucEnv) {
    return PersonAbl.addToSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return PersonAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return PersonAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return PersonAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  edit(ucEnv) {
    return PersonAbl.edit(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  add(ucEnv) {
    return PersonAbl.add(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new PersonController();
