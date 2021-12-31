"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/grade-error.js");

const WARNINGS = {
  assignmentUnsupportedKeys: {
    code: `${Errors.Assignment.UC_CODE}unsupportedKeys`
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
    this.termDao = DaoFactory.getDao("term");
    this.subjectDao = DaoFactory.getDao("subject");
    this.personDao = DaoFactory.getDao("person")
  }

  async assignment(awid, dtoIn) {
    let validationResult = this.validator.validate("gradeAssignmentDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.assignmentUnsupportedKeys.code,
      Errors.Assignment.InvalidDtoIn
    );
    dtoIn.awid = awid
    let dtoOut = await this.assignmentDao.get(awid,dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Assignment.AssignmentDoesNotExist(uuAppErrorMap, { assignmentId: dtoIn.id });
    }
      try {
        dtoOut = await this.dao.assignment(dtoIn);
      } catch (e) {
        if (e instanceof ObjectStoreError) { 
          throw new Errors.Assignment.GradeDaoAssignmentFailed({uuAppErrorMap}, e);
        }
        throw e;
      }
  
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("gradeGetDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Get.GradeDoesNotExist(uuAppErrorMap, { gradeId: dtoIn.id });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentListDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;
    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    
    
    let dtoOut ;
    if (dtoIn.subjectList) {
      dtoOut = await this.dao.listBySubjectIdList(awid, dtoIn.subjectList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }
    if (dtoIn.termList) {
      dtoOut = await this.dao.listByTermIdList(awid, dtoIn.termList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }if (dtoIn.assignmentList) {
      dtoOut = await this.dao.listByAssignemntIdList(awid, dtoIn.assignemntList, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }else {
      dtoOut = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new GradeAbl();
