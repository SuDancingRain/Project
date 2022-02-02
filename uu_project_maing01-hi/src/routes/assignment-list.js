//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./assignment-lsi";
import AssignmentForm from "../bricks/assignment-form";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "AssignmentList",
    nestingLevel: "bigBoxCollection",
    //@@viewOff:statics
};

export const AssignmentList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private

        
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

    const assignmentListData = useDataList({
      handlerMap: {
        load: Calls.Assignment.list,
        createItem: Calls.Assignment.create,
      },
      itemHandlerMap: {
        update: Calls.Assignment.edit,
        delete: Calls.Assignment.delete,
      },
      initialDtoIn: {},
    });
        //@@viewOff:private

        //@@viewOn:interface
        
    function handleCreateAssignment(newAssignmentData) {
      return assignmentListData.handlerMap.createItem(newAssignmentData);
    }

    function handleUpdateAssignment(updatedAssignmentData) {
      return selectedAssignment.handlerMap.update(updatedAssignmentData);
    }

    async function handleAssignmentDelete() {
      await assignmentToDelete.handlerMap.delete({ id: assignmentToDelete.data.id });
      setAssignmentToDelete(null);
    }
        //@@viewOff:interface

        //@@viewOn:render
        const className = Config.Css.css``;
        const attrs = UU5.Common.VisualComponent.getAttrs(props,className);
        const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    
        function getCollumns() {
          return [
            {
              header: <UU5.Bricks.Lsi lsi={Lsi.activity} />,
              sorterKey: "nameAsc",
              cell: (cellProps) => cellProps.data.data.activity,
    
            },
            
            {
              header: <UU5.Bricks.Lsi lsi={Lsi.dateOfTerm}/>,
              cell: (cellProps) => cellProps.data.data.dateOfTerm,
            },
            {
              header: <UU5.Bricks.Lsi lsi={Lsi.deadline}/>,
              cell: (cellProps) => cellProps.data.data.deadline,
            },
            {
              header: <UU5.Bricks.Lsi lsi={Lsi.requirements}/>,
              cell: (cellProps) => cellProps.data.data.requirements,
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
                        onClick={() => { UU5.Environment.getRouter().setRoute("assignmentDetail", { id: cellProps.data.data.id }) }}
                      >
                        <UU5.Bricks.Icon
                          icon="mdi-magnify"
                        />
                      </UU5.Bricks.Button>
                      <UU5.Bricks.Button
                        colorSchema="blue"
                        onClick={() => setSelectedAssignment(cellProps.data)}
                      >
                        <UU5.Bricks.Icon icon="mdi-pencil" />
                      </UU5.Bricks.Button>
                      <UU5.Bricks.Button
                        colorSchema="red"
                        onClick={() => setAssignmentToDelete(cellProps.data)}
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
              selectedAssignment && (
                <UU5.Bricks.Modal
                  header={<UU5.Bricks.Lsi lsi={props.selectedAssignment?.id ? Lsi.updateAssignment : Lsi.createAssignment} />}
                  shown={!!selectedAssignment}
                  onClose={() => setSelectedAssignment(null)}
                >
                  <AssignmentForm
                    selectedAssignment={selectedAssignment.data}
                    setSelectedAssignment={setSelectedAssignment}
                    handleCreateAssignment={handleCreateAssignment}
                    handleUpdateAssignment={handleUpdateAssignment}
                  />
                </UU5.Bricks.Modal>
              )
            }
    
            {assignmentToDelete && (
              <UU5.Bricks.Modal
                header={"Confirm Assignment Deletion"}
                shown={true}
                onClose={() => setAssignmentToDelete(null)}
              >
                <div className={"center uu5-common-padding-s"}>
                  <UU5.Bricks.Button onClick={() => setAssignmentToDelete(null)}>
                    Refuse
                  </UU5.Bricks.Button>
                  {""}
                  <UU5.Bricks.Button colorSchema={"red"} onClick={handleAssignmentDelete}>
                    Confirm
                  </UU5.Bricks.Button>
                </div>
              </UU5.Bricks.Modal>
            )
            }
            <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedAssignment({data: {} })}>
              <UU5.Bricks.Icon icon={"mdi-plus"} />
              <UU5.Bricks.Lsi lsi={Lsi.create} />
            </UU5.Bricks.Button>
    
            <Uu5Tiles.List columns={getCollumns()} data={assignmentListData.data || []} rowAlignment="center" rowHeight={150} />
    
          </div>
        ) : null;
            //@@viewOff:render
    },
});

export default AssignmentList;
