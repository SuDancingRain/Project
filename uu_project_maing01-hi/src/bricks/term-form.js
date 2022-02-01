//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/term-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermForm",
  netsingLevel: "bigBoxCollection"
  //@@viewOff:statics
};

export const TermForm = createVisualComponent({
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
    let attrs = UU5.Common.VisualComponent.getAttrs(props);

    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.Form>
          <UU5.Forms.Text
            name={"year"}
            label={<UU5.Bricks.Lsi lsi={Lsi.year} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Select
          name={"termSeason"}
            label={<UU5.Bricks.Lsi lsi={Lsi.termSeason} />}
            required
          >

            <UU5.Forms.Select.Option value="Summer" />
            <UU5.Forms.Select.Option value="Winter" />

          </UU5.Forms.Select>
          <UU5.Forms.Text
            name={"subject"}
            label={<UU5.Bricks.Lsi lsi={Lsi.subject} />}
          >
          </UU5.Forms.Text>


        </UU5.Forms.Form>
      </div>
    ) : null;
    //@@viewOff:render
  }
});

export default TermForm;