/* eslint-disable */
const gradeListDtoInType= shape({
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
})
const gradeGetDtoInType = shape({
    id:id().isRequired()
})
const gradeCreateDtoInType =shape({
grade:integer().isRequired(),
uuIdentity:uuIdentity().isRequired()
})
const gradeEditDtoInType =shape({
  id:id(),
  grade:integer().isRequired(),
uuIdentity:uuIdentity().isRequired()
})
const gradeDeleteDtoInType =shape({
  id:id()
})