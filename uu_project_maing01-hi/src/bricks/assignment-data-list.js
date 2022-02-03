//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "../calls";
//@@viewOff:imports

function AssignmentDataList(Component, displayName) {
  return createComponent({
    //@@viewOn:statics
    displayName,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const assignmentListData = useDataList({
        handlerMap: {
          load: Calls.Assignment.list
        },
        initialDtoIn: {},
      });

      let result;

      switch (assignmentListData.state) {
        case "pendingNoData":
        case "pending":
          result = <UU5.Bricks.Loading />;
          break;
        case "readyNoData":
        case "ready":
          result = <Component {...props} data={assignmentListData.data} />;
          break;
        case "errorNoData":
        case "error":
          result = <UU5.Bricks.Error data={assignmentListData.error} />;
      }

      return result;
    },
  });
  //@@viewOff:render
}

export default AssignmentDataList;
