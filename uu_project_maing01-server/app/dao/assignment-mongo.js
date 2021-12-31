"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class AssignmentMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, termList: 1 });
    await super.createIndex({ awid: 1, subjectList: 1 });
    
 
  }
  async create(uuObject) {
    if (uuObject.termList) {
      uuObject.termList = uuObject.termList.map((termId) => new ObjectId(termId));
    }
    if (uuObject.subjectList) {
      uuObject.subjectList = uuObject.subjectList.map((subjectId) => new ObjectId(subjectId));
    }
    return await super.insertOne(uuObject);
  }
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }
  async getCountByTermId(awid, termId) {
    return await super.count({
      awid,
      termList: ObjectId.isValid(termId) ? new ObjectId(termId) : termId,
    });
  }
  async getCountBySubjectId(awid, subjectId) {
    return await super.count({
      awid,
      subjectList: ObjectId.isValid(subjectId) ? new ObjectId(subjectId) : subjectId,
    });
  }
    async edit(uuObject) {
      if (uuObject.termList) {
        uuObject.termList = uuObject.termList.map((termId) => new ObjectId(termId));
      }
      if (uuObject.subjectList) {
        uuObject.subjectList = uuObject.subjectList.map((subjectId) => new ObjectId(subjectId));
      }
      let filter = { id: uuObject.id, awid: uuObject.awid };
      return await super.findOneAndUpdate(filter, uuObject, "NONE");
    }
    async delete(awid, id) {
      await super.deleteOne({ awid, id });
    }
    async list(awid, sortBy, order, pageInfo) {
      const filter = { awid };
  
      const sort = {
        [sortBy]: order === "asc" ? 1 : -1,
      };
  
      return await super.find(filter, pageInfo, sort);
    }
    async listByTermIdList(awid, termIdList, sortBy, order, pageInfo) {
      const filter = {
        awid,
        termList: {
          $in: termIdList.map((id) => {
            if (!ObjectId.isValid(id)) return id;
            return new ObjectId(id);
          }),
        },
      };
  
      const sort = {
        [sortBy]: order === "asc" ? 1 : -1,
      };
  
      return await super.find(filter, pageInfo, sort);
    }
    async listBySubjectIdList(awid, subjectIdList, sortBy, order, pageInfo) {
      const filter = {
        awid,
        subjectList: {
          $in: subjectIdList.map((id) => {
            if (!ObjectId.isValid(id)) return id;
            return new ObjectId(id);
          }),
        },
      };
  
      const sort = {
        [sortBy]: order === "asc" ? 1 : -1,
      };
  
      return await super.find(filter, pageInfo, sort);
    }
    async submit(uuObject){
      return await super.insertOne(uuObject);
    }
  }
  


module.exports = AssignmentMongo;
