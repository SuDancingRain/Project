"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const TERM_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}term/`;

const Create = {
  UC_CODE: `${TERM_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDaoCreateFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}termDaoCreateFailed`;
      this.message = "Create term by term Dao create failed.";
    }
  }
};

const Delete = {
  UC_CODE: `${TERM_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },
};

const Edit = {
  UC_CODE: `${TERM_ERROR_PREFIX}edit/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
 
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },
  TermDaoEditFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}termDaoEditFailed`;
      this.message = "Edit term by term Dao edit failed.";
    }
    }
};

const List = {
  UC_CODE: `${TERM_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Get = {
  UC_CODE: `${TERM_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  TermDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}termDoesNotExist`;
      this.message = "Term does not exist.";
    }
  },

};

module.exports = {
  Get,
  List,
  Edit,
  Delete,
  Create
};
