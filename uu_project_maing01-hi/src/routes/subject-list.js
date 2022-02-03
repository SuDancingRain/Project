//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent,useState,useDataList} from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./subject-lsi";
import SubjectForm from "../bricks/subject-form"
import AssignmentDataList from "../bricks/assignment-data-list.js";
import AssignmentDetail from "./assignment-detail"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectList = AssignmentDataList(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const subjectListData = useDataList({
      handlerMap: {
        load: Calls.Subject.list,
        createItem: Calls.Subject.create,
      },
      itemHandlerMap: {
        update: Calls.Subject.edit,
        delete: Calls.Subject.delete,
      },
      initialDtoIn: {},
    });


    const assignmentAvailableTags = [];
    if (props.data) {
      props.data.forEach((assignment) => {
        assignmentAvailableTags.push({
          value: assignment.data.id,
          content: assignment.data.name,
        });
      });
    }


    //@@viewOff:private

    //@@viewOn:interface

    function handleCreateSubject(newSubjectData) {
      return subjectListData.handlerMap.createItem(newSubjectData);
    }

    function handleUpdateSubject(updatedSubjectData) {
      return selectedSubject.handlerMap.update(updatedSubjectData);
    }

    async function handleSubjectDelete() {
      await subjectToDelete.handlerMap.delete({ id: subjectToDelete.data.id });
      setSubjectToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.name,

        },
        
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.credits}/>,
          cell: (cellProps) => cellProps.data.data.credits,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.supervisor}/>,
          cell: (cellProps) => cellProps.data.data.supervisor,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.degree}/>,
          cell: (cellProps) => cellProps.data.data.degree,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.language}/>,
          cell: (cellProps) => cellProps.data.data.language,
        },

        {
          header: <UU5.Bricks.Lsi lsi={Lsi.assignmentList}/>,
          cell: (cellProps) => {
            let assignmentComponentList= []
            cellProps.data.data.assignmentList.forEach((assignment) => {
              assignmentComponentList.push(
                <div key={assignment}>
                  <AssignmentDetail assignmentId={assignment} nestingLevel={"inline"}/>
                  <br/>
                </div>
              );
              });
              return <>{assignmentComponentList}</>
            }
        },
        {
          cell: (cellProps) => {
            if (cellProps.data.state.includes("pending")) {
              return <UU5.Bricks.Loading />
            } else {
              return (
                <>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => { UU5.Environment.getRouter().setRoute("subjectDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedSubject(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setSubjectToDelete(cellProps.data)}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-close"
                    />
                  </UU5.Bricks.Button>
                </>
              );
            }
          },
        },
      ];
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        {
          selectedSubject && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedSubject?.id ? Lsi.updateSubject : Lsi.createSubject} />}
              shown={!!selectedSubject}
              onClose={() => setSelectedSubject(null)}
            >
              <SubjectForm
                selectedSubject={selectedSubject.data}
                setSelectedSubject={setSelectedSubject}
                handleCreateSubject={handleCreateSubject}
                handleUpdateSubject={handleUpdateSubject}
              />
            </UU5.Bricks.Modal>
          )
        }

        {subjectToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Subject Deletion"}
            shown={true}
            onClose={() => setSubjectToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setSubjectToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleSubjectDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedSubject({data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>

        <Uu5Tiles.List columns={getCollumns()} data={subjectListData.data || []} rowAlignment="center" rowHeight={150} />

      </div>
    ) : null;
    //@@viewOff:render
  },
})
);

export default SubjectList;
