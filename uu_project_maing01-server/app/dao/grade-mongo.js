"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class GradeMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, assignmentList: 1 });
await super.createIndex({ awid: 1, termList: 1 });
await super.createIndex({ awid: 1, subjectList: 1 });

  }
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }
  async list(awid, sortBy, order, pageInfo) {
    const filter = { awid };

    const sort = {
      [sortBy]: order === "asc" ? 1 : -1,
    };
    return await super.find(filter, pageInfo, sort);
    }
    async listByAssignmentIdList(awid, assignmentIdList, sortBy, order, pageInfo) {
      const filter = {
        awid,
        assignmentList: {
          $in: assignmentIdList.map((id) => {
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
    async assignment(uuObject){
      if (uuObject.assignmentList) {
        uuObject.assignmentList = uuObject.assignmentList.map((assignmentId) => new ObjectId(assignmentId));
      }
      if (uuObject.termList) {
        uuObject.termList = uuObject.termList.map((termId) => new ObjectId(termId));
      }
      if (uuObject.subjectList) {
        uuObject.subjectList = uuObject.subjectList.map((subjectId) => new ObjectId(subjectId));
      }
      return await super.insertOne(uuObject);
    }



}

module.exports = GradeMongo;