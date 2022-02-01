//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/subject-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectForm",
  netsingLevel: "bigBoxCollection",
  //@@viewOff:statics
}

export const SubjectForm = createVisualComponent({
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
            name={"name"}
            label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"description"}
            label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"credits"}
            label={<UU5.Bricks.Lsi lsi={Lsi.credits} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Text
            name={"supervisor"}
            label={<UU5.Bricks.Lsi lsi={Lsi.supervisor} />}
            required
          >
          </UU5.Forms.Text>
          <UU5.Forms.Select
            name={"degree"}
            label={<UU5.Bricks.Lsi lsi={Lsi.degree} />}
            required
          >
            <UU5.Forms.Select.Option value="bachelors" />
            <UU5.Forms.Select.Option value="masters" />
          </UU5.Forms.Select>

          <UU5.Forms.Select
            name={"language"}
            label={<UU5.Bricks.Lsi lsi={Lsi.language} />}
            required
          >
            <UU5.Forms.Select.Option value="english" />
            <UU5.Forms.Select.Option value="czech" />
          </UU5.Forms.Select>
        </UU5.Forms.Form>
      </div>
    ) : null;
    //@@viewOff:render
  }
});

export default SubjectForm;