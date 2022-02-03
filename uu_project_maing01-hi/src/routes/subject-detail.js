//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject, useState, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import AssignmentForm from "../bricks/assignment-form"
import Lsi from "./subject-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    subjectId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const subjectData = useDataObject({
      handlerMap: {
        load: Calls.Subject.get,
      },
      initialDtoIn: {
        id: props.subjectId || props.params.id,
      },
    });

    
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (subjectData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (subjectData.state.includes("error")) {
        result = <UU5.Common.Error errorData={subjectData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>
              
             <b> <UU5.Bricks.Lsi lsi={Lsi.name}/> </b> : {subjectData.data.name}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.description}/> </b> : {subjectData.data.description}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.credits}/> </b> : {subjectData.data.credits}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.supervisor}/> </b> : {subjectData.data.supervisor}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.degree}/> </b> : {subjectData.data.degree}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.language}/> </b> : {subjectData.data.language}
            <UU5.Bricks.Line />
            <UU5.Bricks.Header level="4" content="Subject Form" />
            <AssignmentForm
            setSelectedAssignment={setSelectedAssignment}
            handleCreateAssignment={handleCreateAssignment}
            handleUpdateAssignment={handleUpdateAssignment}
            />
            </UU5.Bricks.Block>

          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("subjectDetail", { id: props.subjectId })}
            >
              {subjectData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }

    return getResult();
    //@@viewOff:render
  },
});

export default SubjectDetail;
