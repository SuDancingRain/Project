//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject, useState, useDataList } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import GradeForm from "../bricks/grade-form"
import Lsi from "./assignment-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AssignmentDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AssignmentDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    assignmentId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const assignmentData = useDataObject({
      handlerMap: {
        load: Calls.Assignment.get,
      },
      initialDtoIn: {
        id: props.assignmentId || props.params.id,
      },
    });
    
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeToDelete, setGradeToDelete] = useState(null);

    const gradeListData = useDataList({
      handlerMap: {
        load: Calls.Grade.list,
        createItem: Calls.Grade.create,
      },
      itemHandlerMap: {
        update: Calls.Grade.edit,
        delete: Calls.Grade.delete,
      },
      initialDtoIn: {},
    });
    //@@viewOff:private

    //@@viewOn:interface
    function handleCreateGrade(newGradeData) {
      return gradeListData.handlerMap.createItem(newGradeData);
    }

    function handleUpdateGrade(updatedGradeData) {
      return selectedGrade.handlerMap.update(updatedGradeData);
    }

    async function handleGradeDelete() {
      await gradeToDelete.handlerMap.delete({ id: gradeToDelete.data.id });
      setGradeToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (assignmentData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (assignmentData.state.includes("error")) {
        result = <UU5.Common.Error errorData={assignmentData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>
            
            <b> <UU5.Bricks.Lsi lsi={Lsi.name}/> </b> :   {assignmentData.data.name}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.description}/> </b> : {assignmentData.data.description}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.dateOfTerm}/> </b> : {assignmentData.data.dateOfTerm}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.deadline}/> </b> : {assignmentData.data.deadline}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.requirements}/> </b> : {assignmentData.data.requirements}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.capacity}/> </b> : {assignmentData.data.capacity}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.supervisor}/> </b> : {assignmentData.data.supervisor}
            <UU5.Bricks.Line />
            <UU5.Bricks.Header level="4" content="Grade Form" />
            <GradeForm 
            setSelectedGrade={setSelectedGrade}
            handleCreateGrade={handleCreateGrade}
            handleUpdateGrade={handleUpdateGrade}
            />
            </UU5.Bricks.Block>

          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("assignmentDetail", { id: props.assignmentId })}
            >
              {assignmentData.data.name}
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

export default AssignmentDetail;
