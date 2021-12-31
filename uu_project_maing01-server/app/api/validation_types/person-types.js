/* eslint-disable */
const personAddDtoInType = shape({
    uuIdentity: uuIdentity().isRequired(),
    role: oneOf(["Administrator","Teacher","Student"]).isRequired(),
    subject:oneOf([array(id()),id()]),
})
const personEditDtoInType = shape({
    id:id().isRequired("uuIdentity"),
    uuIdentity:uuIdentity().isRequired("id"),
      role: oneOf(["Administrator","Teacher","Student"]),
      subject:oneOf([array(id()),id()]),
    })
const personDeleteDtoInType = shape({
    id:id().isRequired("uuIdentity"),
    uuIdentity:uuIdentity().isRequired("id"),
})
const personGetDtoInType = shape({
    id:id().isRequired("uuIdentity"),
    uuIdentity:uuIdentity().isRequired("id"),
})
const personListDtoInType = shape({
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
})
const personAddToSubjectDtoInType = shape({
    id:id().isRequired("uuIdentity"),
    uuIdentity:uuIdentity().isRequired("id"),
    subject:oneOf([array(id()),id()]).isRequired(),
})
const personRemoveFromSubjectDtoInType = shape({
    id:id().isRequired("uuIdentity"),
    uuIdentity:uuIdentity().isRequired("id"),
    subject:uu5String(),
})