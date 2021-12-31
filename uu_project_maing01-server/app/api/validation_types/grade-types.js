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
const gradeAssignmentDtoInType = shape({
    id:id().isRequired(),
    grade:oneOf([1,2,3,4,5])
})