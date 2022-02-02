/* eslint-disable */
const assignmentCreateDtoInType = shape({
    
    activity: uu5String(255).isRequired(),
    description: uu5String(4000).isRequired(),
    dateOfTerm: uu5String(255).isRequired(),
    deadline: uu5String(255).isRequired(),
    requirements:uu5String(255).isRequired(),
    capacity:integer(50).isRequired(),
    supervisor:uu5String(255).isRequired(),
    gradeList:array(id(),200),
    
})

const assignmentEditDtoInType = shape({
    id:id().isRequired(),
    activity: uu5String(255),
    description: uu5String(4000),
    dateOfTerm: uu5String(255),
    deadline: uu5String(255),
    requirements:uu5String(255),
    capacity:integer(50),
    supervisor:uu5String(255),
    subject:id(),
    term:id(),
    
})
const assignmentGetDtoInType = shape({
    id:id().isRequired()
})

const assignmentDeleteDtoInType = shape({
    id:id().isRequired()
})

const assignmentListDtoInType= shape({
    sortBy: oneOf(["activity", "supervisor"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
})
const assignmentSubmitDtoInType= shape({
    id:id().isRequired(),
    fileLocation: uu5String().isRequired(),
})