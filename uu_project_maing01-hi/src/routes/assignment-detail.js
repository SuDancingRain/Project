//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import config from "../config/config.js";
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
    //@@viewOff:private

    //@@viewOn:interface
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
              {assignmentData.data.activity}
              <br />{assignmentData.data.description}
              <br />{assignmentData.data.dateOfTerm}
              <br />{assignmentData.data.deadline}
              <br />{assignmentData.data.requirements}
              <br />{assignmentData.data.capacity}
              <br />{assignmentData.data.supervisor}
              <br />{assignmentData.data.subject}
              <br />{assignmentData.data.term}
              <br />
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
