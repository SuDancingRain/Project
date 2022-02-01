//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./Assignment-lsi";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "AssignmentList",
    netsingLevel: "bigBoxCollection",
    //@@viewOff:statics
};

export const AssignmentList = createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
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
          <UU5.Bricks.Column colWidth="x-12 s-9" style="text-align:center">
        <UU5.Forms.Text label="search" placeholder="search for specific" />
        </UU5.Bricks.Column>
        </UU5.Bricks.Row>

        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="x-12 s-2" style="text-align:center">
            <UU5.Bricks.Card>
              <UU5.Bricks.Header level="6">Assignment name</UU5.Bricks.Header>
              <UU5.Bricks.Text>Describtion</UU5.Bricks.Text>
              <UU5.Bricks.Button colorSchema="green">Assignment page</UU5.Bricks.Button>
            </UU5.Bricks.Card>
          </UU5.Bricks.Column>
          </UU5.Bricks.Row>
            </div>
        );
        //@@viewOff:render
    },
});

export default AssignmentList;
