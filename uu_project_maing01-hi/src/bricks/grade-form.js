//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/grade-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GradeForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const GradeForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedGrade: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedGrade: UU5.PropTypes.func,
    handleCreateGrade: UU5.PropTypes.func,
    handleUpdateGrade: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const gradeListData = useDataList({
      handlerMap: {
        load: Calls.Grade.list,
      },
      initialDtoIn: {},
    });


    const gradeAvailableTags = [];
    if (gradeListData.data) {
      gradeListData.data.forEach((grade) => {
        gradeAvailableTags.push({
          value: grade.data.id,
          value: grade.data.grade,
          content: grade.data.uuIdentity,
        });
      });
    }


    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedGrade?.id) await props.handleUpdateGrade({ id: props.selectedGrade.id, ...opt.values });
        else await props.handleCreateGrade(opt.values);
        opt.component.setReady();
        props.setSelectedGrade(null);
      } catch (e) {
        opt.component.getAlertBus().setAlert({
          content: <UU5.Bricks.Lsi lsi={Lsi.unsuccessful} />,
          colorSchema: "red",
        });
        opt.component.setReady();
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const className = Config.Css.css``;
    let attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>

        <UU5.Forms.Form
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
          onSave={handleOnSave}
          onCancel={() => props.setSelectedGrade(null)}
        >

          <UU5.Forms.Number
            name={"grade"}
            label={<UU5.Bricks.Lsi lsi={Lsi.grade} />}
          />
          
          <UU5.Forms.Text
            name={"uuIdentity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
          />


          <UU5.Bricks.Line size={"s"} />
          <UU5.Forms.Controls
            buttonReset
          />
        </UU5.Forms.Form>



      </div >
    ) : null;
    //@@viewOff:render
  }
});

export default GradeForm;