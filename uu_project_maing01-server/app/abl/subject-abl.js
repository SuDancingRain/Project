"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

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

  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
};
const DEFAULTS = {
  order: "asc",
  pageIndex: 0,
  pageSize: 100,
};
class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.termDao = DaoFactory.getDao("term");
    this.assignmentDao = DaoFactory.getDao("assignment")
    this.personDao = DaoFactory.getDao("person")
    this.gradeDao = DaoFactory.getDao("grade")

  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut;
     if(dtoIn.id){
       dtoOut = await this.dao.get(awid, dtoIn.id);
     }else{
       dtoOut = await this.dao.getByName(awid, dtoIn.name)
     }
    if (!dtoOut) {
      let paramMap = {};
      if(dtoIn.id) paramMap.subjectId = dtoIn.id;
      if(dtoIn.name) paramMap.subjectName = dtoIn.name;
      throw new Errors.Get.SubjectDoesNotExist(uuAppErrorMap, { paramMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    if (!dtoIn.pageInfo) dtoIn.pageInfo = {};
    if (!dtoIn.pageInfo.pageSize) dtoIn.pageInfo.pageSize = DEFAULTS.pageSize;
    if (!dtoIn.pageInfo.pageIndex) dtoIn.pageInfo.pageIndex = DEFAULTS.pageIndex;
    if (!dtoIn.order) dtoIn.order = DEFAULTS.order;

  let dtoOut = await this.dao.list(awid, dtoIn.order, dtoIn.pageInfo);

    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async delete(awid, dtoIn) {

    let validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Delete.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }
  
    await this.dao.delete(awid, dtoIn.id);

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }

  async edit(awid, dtoIn) {
   
    let validationResult = this.validator.validate("subjectEditDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.editUnsupportedKeys.code,
      Errors.Edit.InvalidDtoIn
    );
   
    let dtoOut;
    if (!dtoOut) {
      throw new Errors.Edit.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }
    dtoIn.awid = awid;
    try {
      dtoOut = await this.dao.edit(dtoIn);
    } catch (e) {
    
      if (e instanceof ObjectStoreError) {
        
        throw new Errors.Edit.SubjectDaoEditFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async create(awid, dtoIn) {
    
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);

    
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult,
      WARNINGS.createUnsupportedKeys.code, Errors.Create.InvalidDtoIn);

      let name = dtoIn.name;
    let subjectDb = await this.dao.getByName(awid, name);

    if (subjectDb) {
      throw new Errors.Create.SubjectAlreadyExists({ uuAppErrorMap }, { code: name });
    }

    dtoIn.awid = awid;
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
     
      if (e instanceof ObjectStoreError) { 
        throw new Errors.Create.SubjectDaoCreateFailed({uuAppErrorMap}, e);
      }
      throw e;
    }


    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

}

module.exports = new SubjectAbl();
