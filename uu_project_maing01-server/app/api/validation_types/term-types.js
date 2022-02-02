/* eslint-disable */
const termCreateDtoInType = shape({
    year:integer(2030).isRequired(),
    termSeason:oneOf(["winter","summer"]).isRequired(),
    subjectList: array(id(),20)
})

const termEditDtoInType = shape({
    id:id().isRequired(),
    year:integer(2030),
    termSeason:oneOf(["winter","summer"]),
    subjectList: array(id(),20)
})

const termGetDtoInType = shape({
    id:id().isRequired()
})

const termDeleteDtoInType = shape({
    id:id().isRequired()
})

const termListDtoInType= shape({
    sortBy: oneOf(["year", "termSeason"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
})