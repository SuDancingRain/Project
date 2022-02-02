/* eslint-disable */
const subjectCreateDtoInType = shape({
    name: uu5String(255).isRequired(),
    description: uu5String(4000).isRequired(),
    credits:integer(12).isRequired(),
    supervisor:uu5String(255).isRequired(),
    degree:oneOf("bachelors","masters").isRequired(),
    language:oneOf("english","czech").isRequired(),
    assignmentList:array(id(),100),
  });
  
  const subjectEditDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255),
    description: uu5String(4000),
    credits:integer(12),
    supervisor:uu5String(255),
    degree:oneOf("bachelors","masters"),
    language:oneOf("english","czech"),
    assignmentList:array(id(),100),
  });
  const subjectDeleteDtoInType = shape({
    id: id().isRequired(),
      });

  const subjectListDtoInType = shape({
    order: oneOf(["asc", "desc"]),
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer(),
    }),
  });
  const subjectGetDtoInType = shape({
    id: id().isRequired("name"),
    name: uu5String(255).isRequired("id"),
  });
  
  