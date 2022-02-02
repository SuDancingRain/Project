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

const Create = {
  UC_CODE: `${GRADE_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}gradeDaoCreateFailed`;
      this.message = "Create grade by grade Dao create failed.";
    }
  }
};

const Edit = {
  UC_CODE: `${GRADE_ERROR_PREFIX}edit/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
 
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
    }
  },
  GradeDaoEditFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}gradeDaoEditFailed`;
      this.message = "Edit grade by grade Dao edit failed.";
    }
    }
  
};

const Delete = {
  UC_CODE: `${GRADE_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  GradeDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}gradeDoesNotExist`;
      this.message = "Grade does not exist.";
    }
  }
};

module.exports = {
  Delete,
  Edit,
  Create,
  Get,
  List
};
