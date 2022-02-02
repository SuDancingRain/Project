"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/grade-error.js");

const WARNINGS = {
  
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  
  editUnsupportedKeys: {
    code: `${Errors.Edit.UC_CODE}unsupportedKeys`
  },
  
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
};
const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,

};

class GradeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("grade");
    this.assignmentDao = DaoFactory.getDao("assignment");
    this.gradeDao = DaoFactory.getDao("grade");
    this.subjectDao = DaoFactory.getDao("subject");
    this.personDao = DaoFactory.getDao("person")
  }

  async delete(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeDeleteDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    //Checks for existence of grade

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Delete.GradeDoesNotExist({ uuAppErrorMap }, { gradeId: dtoIn.id });
    }

    //attempts to delete Dao record

    await this.dao.delete(awid, dtoIn.id);

    //returns the errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async edit(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeEditDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );

    //checks for grade existence

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Edit.GradeDoesNotExist({ uuAppErrorMap }, { gradeId: dtoIn.id });
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

        throw new Errors.Edit.GradeDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns Dao record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async create(awid, dtoIn) {
    
    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

    dtoIn.awid = awid;


    let dtoOut;

    //attempts to create a DAO record

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.GradeDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    //returns DAO record and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;


  }

  async get(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("gradeGetDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    //Check for grade existence  

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Get.GradeDoesNotExist(uuAppErrorMap, { gradeId: dtoIn.id });
    }

    //returns Dao record with errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async list(awid, dtoIn) {

    //Checks the input of DtoIn and for unsuported keys

    let validationResult = this.validator.validate("assignmentListDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    //Checks DtoIn for unfilled values which it fills from the default constant set in this file

    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;

    //list filter base on Subject, assignment and grade ID

    let dtoOut;
    if (dtoIn.subjectList) {
      dtoOut = await this.dao.listBySubjectIdList(awid, dtoIn.subjectList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }
    if (dtoIn.gradeList) {
      dtoOut = await this.dao.listByGradeIdList(awid, dtoIn.gradeList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } if (dtoIn.assignmentList) {
      dtoOut = await this.dao.listByAssignemntIdList(awid, dtoIn.assignemntList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    } else {
      dtoOut = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    //return of filtered Dao file and errormap

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

}

module.exports = new GradeAbl();
