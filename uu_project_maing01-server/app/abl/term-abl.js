"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/term-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
};
const DEFAULTS = {
  sortBy: "year",
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};


class TermAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("term");
    this.subjectDao = DaoFactory.getDao("subject");
    this.assignmentDao = DaoFactory.getDao("assignment")
    this.personDao = DaoFactory.getDao("person")
    this.gradeDao = DaoFactory.getDao("grade")
  }

  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //checks for term existence
    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Get.TermDoesNotExist(uuAppErrorMap, { termId: dtoIn.id });
    }

    //returns the dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //Checks DtoIn for unfilled values which it fills from the default constant set in this file

    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    //list filter base on Subject ID

    let dtoOut;
    if (dtoIn.subjectList) {
      dtoOut = await this.dao.listBySubjectIdList(awid, dtoIn.subjectList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      dtoOut = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    //returns filtred Dao file and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async edit(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termEditDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );

    //checks for term existence

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Edit.TermDoesNotExist({ uuAppErrorMap }, { termId: dtoIn.id });
    }

    dtoIn.awid = awid;

    //checks for subject existence base on the subject list

    if (dtoIn.subjectList) {
      let presentSubjects = await this._checkSubjectExistence(awid, dtoIn.subjectList);
      if (dtoIn.subjectList.length > 0) {
        ValidationHelper.addWarning(
          uuAppErrorMap,
          WARNINGS.createSubjectDoesNotExist.code,
          WARNINGS.createSubjectDoesNotExist.message,
          { subjectList: [...new Set(dtoIn.subjectList)] }
        );
      }
      dtoIn.subjectList = [...new Set(presentSubjects)];
    } else {
      dtoIn.subjectList = [];
    }

    //attemps to change dao record

    try {
      dtoOut = await this.dao.edit(dtoIn);
    } catch (e) {

      if (e instanceof ObjectStoreError) {

        throw new Errors.Edit.TermDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async delete(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Checks for existence of term

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Delete.TermDoesNotExist({ uuAppErrorMap }, { termId: dtoIn.id });
    }

    //attempts to delete Dao record

    await this.dao.delete(awid, dtoIn.id);

    //returns the errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async create(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("termCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    dtoIn.awid = awid;

    //check for subject existencec if a subjectList is provided

    // if (dtoIn.subjectList) {
    // //   let presentSubjects = await this._checkSubjectExistence(awid, dtoIn.subjectList);

    //   if (dtoIn.subjectList.length > 0) {
    //     ValidationHelper.addWarning(
    //       uuAppErrorMap,
    //       WARNINGS.createSubjectDoesNotExist.code,
    //       WARNINGS.createSubjectDoesNotExist.message,
    //       { subjectList: [...new Set(dtoIn.subjectList)] }
    //     );
    //   }
    //   dtoIn.subjectList = [...new Set(presentSubjects)];
    // } else {
    //   dtoIn.subjectList = [];
    // }

    let dtoOut;

    //attempts to create a DAO record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.TermDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns DAO record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  //function which craetes subject verification

  async _checkSubjectsExistence(awid, subjectList) {
    let subjects;
    let presentSubjects = [];
    let subjectIndex;
    subjects = await this.subjectDao.listBySubjectIdList(awid, subjectList);
    subjects.itemList.forEach((subject) => {
      subjectIndex = subjectList.indexOf(subject.id.toString());
      if (subjectIndex !== -1) {
        presentSubjects.push(subject.id.toString());
        subjectList.splice(subjectIndex, 1);
      }
    });

    return presentSubjects;
  }

}

module.exports = new TermAbl();
