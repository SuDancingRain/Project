//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import Lsi from "./grade-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GradeDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const GradeDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    gradeId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const gradeData = useDataObject({
      handlerMap: {
        load: Calls.Grade.get,
      },
      initialDtoIn: {
        id: props.gradeId || props.params.id,
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

      if (gradeData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (gradeData.state.includes("error")) {
        result = <UU5.Common.Error errorData={gradeData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue"  size= "l"card={"content"}>
             <b> <UU5.Bricks.Lsi lsi={Lsi.grade}/> </b> : {gradeData.data.grade}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.description}/> </b> : {gradeData.data.description}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.name}/> </b> : {gradeData.data.name}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.subject}/> </b> : {gradeData.data.subject}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.term}/> </b> : {gradeData.data.term}
            </UU5.Bricks.Block>

          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("gradeDetail", { id: props.gradeId })}
            >
              {gradeData.data.name}
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

export default GradeDetail;
