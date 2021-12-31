"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class PersonMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
    await super.createIndex({ awid: 1, uuIdentity: 1 }, { unique: true })
    await super.createIndex({ awid: 1, subjectList: 1 });
  }

async add(uuObject){
  return await super.insertOne(uuObject);
}
async get(awid, id) {
  return await super.findOne({ id, awid });
}

async getByUuIdentity(awid, uuIdentity) {
  return await super.findOne({ uuIdentity, awid });
}

async edit(uuObject) {
  let filter = { id: uuObject.id, awid: uuObject.awid };
  return await super.findOneAndUpdate(filter, uuObject, "NONE");
}
async delete(awid, id) {
  await super.deleteOne({ awid, id });
}

async list(awid, sortBy,order, pageInfo) {
  const filter = { awid };
  const sort = {[sortBy]: order === "asc" ? 1 : -1 };

  return await super.find(filter, pageInfo, sort);
}
async addToSubject(uuObject){
  let filter = {id: uuObject.id, awid: uuObject.awid}
return await super.findOneAndUpdate(filter, uuObject, "NONE")
}
async removeFromSubject(uuObject){
  let filter = {id: uuObject.id, awid: uuObject.awid}
  return await super.findOneAndUpdate(filter,uuObject,"NONE" )

}
}

module.exports = PersonMongo;
