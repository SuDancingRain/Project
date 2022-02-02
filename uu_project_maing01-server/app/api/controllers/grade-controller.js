"use strict";
const GradeAbl = require("../../abl/grade-abl.js");

class GradeController {

  delete(ucEnv) {
    return GradeAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  edit(ucEnv) {
    return GradeAbl.edit(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return GradeAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return GradeAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return GradeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new GradeController();
