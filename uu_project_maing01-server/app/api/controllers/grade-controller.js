"use strict";
const GradeAbl = require("../../abl/grade-abl.js");

class GradeController {

  assignment(ucEnv) {
    return GradeAbl.assignment(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return GradeAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return GradeAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new GradeController();
