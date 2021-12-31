"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/assignment-error.js");

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
  submitUnsupportedKeys: {
    code: `${Errors.Submit.UC_CODE}unsupportedKeys`
  },
};
  const DEFAULTS = {
    sortBy: "activity",
    order: "asc",
    pageIndex: 0,
    pageSize: 100,
  
};

class AssignmentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("assignment");
    this.termDao = DaoFactory.getDao("term");
    this.subjectDao = DaoFactory.getDao("subject");
    this.personDao = DaoFactory.getDao("person")
    this.gradeDao = DaoFactory.getDao("grade")
  }

 

  async submit(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentSubmitDtoInType", dtoIn);
  let uuAppErrorMap = ValidationHelper.processValidationResult(
    dtoIn,
    validationResult,
    WARNINGS.submitUnsupportedKeys.code,
    Errors.Submit.InvalidDtoIn
  );
  dtoIn.awid = awid
  let dtoOut;
  if (!dtoOut) {
    throw new Errors.Submit.AssignmentDoesNotExist(uuAppErrorMap, { assignmentId: dtoIn.id });
  }
    try {
      dtoOut = await this.dao.submit(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Submit.AssignmentDaoSubmitFailed({uuAppErrorMap}, e);
      }
      throw e;
    }

  dtoOut.uuAppErrorMap = uuAppErrorMap;
  return dtoOut;
}
  

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentGetDtoInType", dtoIn);
   
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Get.AssignmentDoesNotExist(uuAppErrorMap, { assignmentId: dtoIn.id });
    }

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
    
    if (!dtoIn.sortBy) dtoIn.sortBy = DEFAULTS.sortBy;
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
    } else {
      dtoOut = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    }

    
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  
  }

  async edit(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentEditDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);
    if (!dtoOut) {
      throw new Errors.Edit.AssignmentDoesNotExist({ uuAppErrorMap }, { assignmentId: dtoIn.id });
    }
    
    dtoIn.awid = awid;

    try {
      dtoOut = await this.dao.edit(dtoIn);
    } catch (e) {
    
      if (e instanceof ObjectStoreError) {
        
        throw new Errors.Edit.AssignmentDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentDeleteDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);
  
    if (!dtoOut) {
      throw new Errors.Delete.AssignmentDoesNotExist({ uuAppErrorMap }, { assignmentId: dtoIn.id });
    }

    await this.dao.delete(awid, dtoIn.id);

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

  async create(awid, dtoIn) {
    let validationResult = this.validator.validate("assignmentCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);
 
      dtoIn.awid = awid;
 
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.AssignmentDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }
 
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  
  }

}

module.exports = new AssignmentAbl();
