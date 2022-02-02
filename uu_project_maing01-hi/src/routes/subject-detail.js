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
    //@@viewOff:private

    //@@viewOn:interface
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
              {subjectData.data.name}
              <br />{subjectData.data.description}
              <br />{subjectData.data.credits}
              <br />{subjectData.data.supervisor}
              <br />{subjectData.data.degree}
              <br />{subjectData.data.language}
              <br />
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
