//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Calls from "../calls.js";
import Config from "./config/config.js";

import CreateTerm from "./term/create.js";
import TermForm from "../bricks/term-form.js";
import SubjectForm from "../bricks/subject-form.js";
import PersonForm from "../bricks/person-form.js";
import AssignmentForm from "../bricks/assignment-form.js";
import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AdminControl",
  netsingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AdminControl = createVisualComponent({
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

    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <SubjectForm />
        <UU5.Bricks.Line />
        <TermForm />
        <UU5.Bricks.Line />
        <PersonForm />
        <UU5.Bricks.Line />
        <AssignmentForm />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default AdminControl;
