//@@viewOn:imports
import UU5, { Forms } from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/assignment-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AssignmentForm",
  netsingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AssignmentForm = createVisualComponent({
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

    let attrs = UU5.Common.VisualComponent.getAttrs(props);

    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.Form>
          <UU5.Forms.Text
            name={"activity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.activity} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"description"}
            label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
            required
          >
            <UU5.Forms.DatePicker
              name={"dateOfTerm"}
              label={<UU5.Bricks.Lsi lsi={Lsi.dateOfTerm} />}
              required
            >

            </UU5.Forms.DatePicker>
            <UU5.Forms.DatePicker
              name={"deadline"}
              label={<UU5.Bricks.Lsi lsi={Lsi.deadline} />}
              required
            >

            </UU5.Forms.DatePicker>
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"requirements"}
            label={<UU5.Bricks.Lsi lsi={Lsi.requirements} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"capacity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.capacity} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"supervisor"}
            label={<UU5.Bricks.Lsi lsi={Lsi.supervisor} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"subject"}
            label={<UU5.Bricks.Lsi lsi={Lsi.subject} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"term"}
            label={<UU5.Bricks.Lsi lsi={Lsi.term} />}
            required
          >
          </UU5.Forms.Text>

        </UU5.Forms.Form>
      </div>
    ) : null;
    //@@viewOff:render
  }
});

export default AssignmentForm;
