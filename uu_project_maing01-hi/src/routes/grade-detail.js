//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "GradeDetail",
    netsingLevel: "bigBoxCollection",
    //@@viewOff:statics
};

export const GradeDetail = createVisualComponent({
    ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

    render(props) {
        //@@viewOn:private
        //@@viewOff:private

        //@@viewOn:interface
        //@@viewOff:interface

        //@@viewOn:render
        const attrs = UU5.Common.VisualComponent.getAttrs(props);
        return (
            <div {...attrs}>
                <UU5.Bricks.Row>
                    Grade Detail
                </UU5.Bricks.Row>
            </div>
        );
        //@@viewOff:render
    },
});

export default GradeDetail;
