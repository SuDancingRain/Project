//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../calls.js";
import Config from "./config/config.js";

import Get from "./subject/get.js";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "AdminControl",
    //@@viewOff:statics
};

export const AdminControl = createVisualComponent({
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
                    <UU5.Bricks.Column>
                        <UU5.Bricks.Button onClick={Calls.getSubject}>Get Subject</UU5.Bricks.Button>
                    </UU5.Bricks.Column>
                </UU5.Bricks.Row>
            </div>
        );
        //@@viewOff:render
    },
});

export default AdminControl;
