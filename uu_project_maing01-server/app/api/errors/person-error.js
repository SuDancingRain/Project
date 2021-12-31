"use strict";

const ProjectMainUseCaseError = require("./project-main-use-case-error.js");
const PERSON_ERROR_PREFIX = `${ProjectMainUseCaseError.ERROR_PREFIX}person/`;

const Add = {
  UC_CODE: `${PERSON_ERROR_PREFIX}add/`,

  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Add.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  PersonAlreadyExists: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Add.UC_CODE}personAlreadyExists`;
      this.message = "Person already exists.";
    }
  },

  PersonDaoAddFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Add.UC_CODE}personDaoAddFailed`;
      this.message = "Add person by person Dao add failed.";
    }
  },
  
};

const Edit = {
  UC_CODE: `${PERSON_ERROR_PREFIX}edit/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PersonDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}personDoesNotExist`;
      this.message = "Person does not exist.";
    }
  },
  PersonDaoEditFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}personDaoEditFailed`;
      this.message = "Edit person by person Dao edit failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${PERSON_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PersonDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}personDoesNotExist`;
      this.message = "Person does not exist.";
    }
  },
};

const Get = {
  UC_CODE: `${PERSON_ERROR_PREFIX}get/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PersonDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}personDoesNotExist`;
      this.message = "Person does not exist.";
    }
  },
};

const List = {
  UC_CODE: `${PERSON_ERROR_PREFIX}list/`,
  
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const AddToSubject = {
  UC_CODE: `${PERSON_ERROR_PREFIX}addToSubject/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddToSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PersonDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddToSubject.UC_CODE}personDoesNotExist`;
      this.message = "Person does not exist.";
    }
  },
  SubjectDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddToSubject.UC_CODE}subjectDoesNotExist`;
      this.message = "Subject does not exist.";
    }
  },
  PersonDaoAddToSubjectFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${AddToSubject.UC_CODE}personDaoAddToSubjectFailed`;
      this.message = "AddToSubject person by person Dao addToSubject failed.";
    }
  },
};

const RemoveFromSubject = {
  UC_CODE: `${PERSON_ERROR_PREFIX}removeFromSubject/`,
  InvalidDtoIn: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Edit.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  PersonDoesNotExist: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveFromSubject.UC_CODE}personDoesNotExist`;
      this.message = "Person does not exist.";
    }
  },
  PersonDaoRemoveFromSubjectFailed: class extends ProjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${RemoveFromSubject.UC_CODE}personDaoRemoveFromSubjectFailed`;
      this.message = "RemoveFromSubject person by person Dao removeFromSubject failed.";
    }
  },
};

module.exports = {
  RemoveFromSubject,
  AddToSubject,
  List,
  Get,
  Delete,
  Edit,
  Add
};
