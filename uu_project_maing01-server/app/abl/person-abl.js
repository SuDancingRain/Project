"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/person-error.js");

const WARNINGS = {
  removeFromSubjectUnsupportedKeys: {
    code: `${Errors.RemoveFromSubject.UC_CODE}unsupportedKeys`
  },
  addToSubjectUnsupportedKeys: {
    code: `${Errors.AddToSubject.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`
  },
  addUnsupportedKeys: {
    code: `${Errors.Add.UC_CODE}unsupportedKeys`
  },
};
const DEFAULTS = {
  sortBy: "role",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
  subject: "",
};


class PersonAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("person");
    this.assignmentDao = DaoFactory.getDao("assignment");
    this.termDao = DaoFactory.getDao("term");
    this.subjectDao = DaoFactory.getDao("subject");
    this.gradeDao = DaoFactory.getDao("grade")
  }

  async removeFromSubject(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personRemoveFromSubjectDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.removeFromSubjectUnsupportedKeys.code,
      Errors.RemoveFromSubject.InvalidDtoIn
    );

    //checks for person existence

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (dtoIn.id) {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } else {
      dtoOut = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity)
    }
    if (!dtoOut) {
      let paramMap = {};
      if (dtoIn.id) paramMap.personId = dtoIn.id;
      if (dtoIn.uuIdentity) paramMap.personUuIdentity = dtoIn.uuIdentity;
      throw new Errors.RemoveFromSubject.PersonDoesNotExist(uuAppErrorMap, { paramMap });
    }

    //removes subject from person Dao record

    if (!dtoIn.subject) dtoIn.subject = DEFAULTS.subject;

    //attemps the change in dao file

    dtoIn.awid = awid;
    try {
      dtoOut = await this.dao.removeFromSubject(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {

        throw new Errors.RemoveFromSubject.PersonDaoRemoveFromSubjectFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async addToSubject(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personAddToSubjectDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.addToSubjectUnsupportedKeys.code,
      Errors.AddToSubject.InvalidDtoIn
    );

    //checks for person existence

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (dtoIn.id) {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } else {
      dtoOut = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity)
    }
    if (!dtoOut) {
      let paramMap = {};
      if (dtoIn.id) paramMap.personId = dtoIn.id;
      if (dtoIn.uuIdentity) paramMap.personUuIdentity = dtoIn.uuIdentity;
      throw new Errors.AddToSubject.PersonDoesNotExist(uuAppErrorMap, { paramMap });
    }

    //Checks for subject existence

    dtoOut = await this.subjectDao.get(awid, dtoIn.subject);
    if (!dtoOut) {
      throw new Errors.AddToSubject.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.subject });
    }

    dtoIn.awid = awid;

    //attemps to add record to Person Dao file

    try {
      dtoOut = await this.dao.addToSubject(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.AddToSubject.PersonDaoAddToSubjectFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //Checks DtoIn for unfilled values which it fills from the default constant set in this file

    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;

    //attempts to get Dao file

    let dtoOut = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);

    //returns Dao file and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async get(awid, dtoIn) {


    let validationResult = this.validator.validate("personGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;
    if (dtoIn.id) {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } else {
      dtoOut = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity)
    }
    if (!dtoOut) {
      let paramMap = {};
      if (dtoIn.id) paramMap.personId = dtoIn.id;
      if (dtoIn.uuIdentity) paramMap.personUuIdentity = dtoIn.uuIdentity;
      throw new Errors.Get.PersonDoesNotExist(uuAppErrorMap, { paramMap });
    }



    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Checks for person existence

    let dtoOut;
    if (dtoIn.id) {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } else {
      dtoOut = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity)
    }
    if (!dtoOut) {
      let paramMap = {};
      if (dtoIn.id) paramMap.personId = dtoIn.id;
      if (dtoIn.uuIdentity) paramMap.personUuIdentity = dtoIn.uuIdentity;
      throw new Errors.Get.PersonDoesNotExist(uuAppErrorMap, { paramMap });
    }

    //attemps to delete record from Dao file 

    await this.dao.delete(awid, dtoIn.id);

    //returns Dao file with errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async edit(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personEditDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );

    //checks for person existence

    let dtoOut;
    if (dtoIn.id) {
      dtoOut = await this.dao.get(awid, dtoIn.id);
    } else {
      dtoOut = await this.dao.getByUuIdentity(awid, dtoIn.uuIdentity)
    }
    if (!dtoOut) {
      let paramMap = {};
      if (dtoIn.id) paramMap.personId = dtoIn.id;
      if (dtoIn.uuIdentity) paramMap.personUuIdentity = dtoIn.uuIdentity;
      throw new Errors.Get.PersonDoesNotExist(uuAppErrorMap, { paramMap });
    }

    dtoIn.awid = awid;

    //attemps change of Dao Record

    try {
      dtoOut = await this.dao.edit(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Edit.PersonDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async add(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("personAddDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.addUnsupportedKeys.code,
      Errors.Add.InvalidDtoIn
    );

    //checks for person existence

    let uuIdentity = dtoIn.uuIdentity;
    let personDb = await this.dao.getByUuIdentity(awid, uuIdentity);

    if (personDb) {
      throw new Errors.Add.PersonAlreadyExists({ uuAppErrorMap }, { code: uuIdentity });
    }

    dtoIn.awid = awid;

    // automaticly fills an empty subject

    if (!dtoIn.subject) dtoIn.subject = DEFAULTS.subject;

    let dtoOut;

    //attempts to create Dao record 

    try {
      dtoOut = await this.dao.add(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {
        throw new Errors.Add.PersonDaoAddFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;

  }

}

module.exports = new PersonAbl();
