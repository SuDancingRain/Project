"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const GRADE_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}grade/`;

const List = {
  UC_CODE: `${GRADE_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Get = {
  UC_CODE: `${GRADE_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
    }
  },
};

const Assignment = {
  UC_CODE: `${GRADE_ERROR_PREFIX}assignment/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Assignment.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Assignment.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
  GradeDaoAssignmentFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Assignment.UC_CODE}gradeDaoSubmitFailed`;
      this.message = "Assignemnt grade by grade Dao assignment failed.";
    }
  }
};

module.exports = {
  Assignment,
  Get,
  List
};
