"use strict";
const ProjectMainAbl = require("../../abl/project-main-abl.js");

class ProjectMainController {
  init(ucEnv) {
    return ProjectMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new ProjectMainController();
