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
grade:integer(5).isRequired(),
description:uu5String(255),
name:uuIdentity().isRequired(),
subject:uu5String(255).isRequired(),
term:uu5String(255).isRequired()
})
const gradeEditDtoInType =shape({
  id:id(),
  grade:integer(5).isRequired(),
description:uu5String(255),
name:uuIdentity().isRequired(),
subject:uu5String(255),
term:uu5String(255)
})
const gradeDeleteDtoInType =shape({
  id:id()
})