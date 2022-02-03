//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/assignment-lsi"
import GradeDataList from "./grade-data-list"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AssignmentForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AssignmentForm = GradeDataList(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedAssignment: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedAssignment: UU5.PropTypes.func,
    handleCreateAssignment: UU5.PropTypes.func,
    handleUpdateAssignment: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    //@@viewOn:private

    const assignmentListData = useDataList({
      handlerMap: {
        load: Calls.Assignment.list,
      },
      initialDtoIn: {},
    });


    const assignmentAvailableTags = [];
    if (assignmentListData.data) {
      assignmentListData.data.forEach((assignment) => {
        assignmentAvailableTags.push({
          value: assignment.data.id,
          content: assignment.data.name,
          content: assignment.data.description,
          content: assignment.data.dateOfTerm,
          content: assignment.data.deadline,
          content: assignment.data.requirements,
          value: assignment.data.capacity,
          content: assignment.data.supervisor,
          content: assignment.data.gradeList
        });
      });
    }

    const gradeAvailableTags = [];
    if (props.data) {
      props.data.forEach((grade) => {
        gradeAvailableTags.push({
          value: grade.data.id,
          content: grade.data.uuIdentity,
        });
      });
    }

    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedAssignment?.id) await props.handleUpdateAssignment({ id: props.selectedAssignment.id, ...opt.values });
        else await props.handleCreateAssignment(opt.values);
        opt.component.setReady();
        props.setSelectedAssignment(null);
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
          onCancel={() => props.setSelectedAssignment(null)}
        >
          <UU5.Forms.Text
            name={"name"}
            label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
            value={props.selectedAssignment?.name || ""}
          />

          <UU5.Forms.Text
            valueColWidth={"xs-15 s-15 m-11 l-10 xl-10"}
            name={"description"}
            label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
            
            value={props.selectedAssignment?.description || ""}


          />
          <UU5.Forms.DatePicker
            name={"dateOfTerm"}
            label={<UU5.Bricks.Lsi lsi={Lsi.dateOfTerm} />}
            
            value={props.selectedAssignment?.dateOfTerm || ""}

          />
          <UU5.Forms.DatePicker
            name={"deadline"}

            label={<UU5.Bricks.Lsi lsi={Lsi.deadline} />}
            
            value={props.selectedAssignment?.deadline || ""}
          />

          <UU5.Forms.Text
            valueColWidth={"xs-15 s-15 m-11 l-10 xl-10"}
            name={"requirements"}
            label={<UU5.Bricks.Lsi lsi={Lsi.requirements} />}
            
            value={props.selectedAssignment?.requirements || ""}


          />
          <UU5.Forms.Number
            name={"capacity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.capacity} />}
            
            value={props.selectedAssignment?.capacity || ""}

          />
          <UU5.Forms.Text
            name={"supervisor"}
            label={<UU5.Bricks.Lsi lsi={Lsi.supervisor} />}
            
            value={props.selectedAssignment?.supervisor || ""}

          />

          <UU5.Forms.TagSelect
            name={"gradeList"}
            label={<UU5.Bricks.Lsi lsi={Lsi.gradeList} />}
            value={props.selectedAssignment?.gradeList || []}
            availableTags={gradeAvailableTags}
            multiple
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
})
);

export default AssignmentForm;
