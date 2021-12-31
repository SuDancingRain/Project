"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const ASSIGNMENT_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}assignment/`;

const Create = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}assignmentDaoCreateFailed`;
      this.message = "Create assignment by assignment Dao create failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
};

const Edit = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}edit/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
 
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
  AssignmentDaoEditFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}assignmentDaoEditFailed`;
      this.message = "Edit assignment by assignment Dao edit failed.";
    }
    },
};

const List = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
};

const Submit = {
  UC_CODE: `${ASSIGNMENT_ERROR_PREFIX}submit/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Submit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  AssignmentDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Submit.UC_CODE}assignmentDoesNotExist`;
      this.message = "Assignment does not exist.";
    }
  },
  AssignmentDaoSubmitFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Submit.UC_CODE}assignmentDaoSubmitFailed`;
      this.message = "Submit assignment by assignment Dao submit failed.";
    }
  }
};


module.exports = {
  Submit,
  Get,
  List,
  Edit,
  Delete,
  Create
};
