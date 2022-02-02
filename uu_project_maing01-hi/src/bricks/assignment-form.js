//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/assignment-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AssignmentForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AssignmentForm = createVisualComponent({
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
          content: assignment.data.activity,
          content: assignment.data.description,
          content: assignment.data.dateOfTerm,
          content: assignment.data.deadline,
          content: assignment.data.requirements,
          value: assignment.data.capacity,
          content: assignment.data.supervisor,
          content: assignment.data.subject,
          content: assignment.data.term,
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
            name={"activity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.activity} />}
            value={props.selectedAssignment?.activity || ""}
          />

          <UU5.Forms.Text
            valueColWidth={"xs-15 s-15 m-11 l-10 xl-10"}
            name={"description"}
            label={<UU5.Bricks.Lsi lsi={Lsi.description} />}


          />
          <UU5.Forms.DatePicker
            name={"dateOfTerm"}
            label={<UU5.Bricks.Lsi lsi={Lsi.dateOfTerm} />}

          />
          <UU5.Forms.DatePicker
            name={"deadline"}

            label={<UU5.Bricks.Lsi lsi={Lsi.deadline} />}
          />

          <UU5.Forms.Text
            valueColWidth={"xs-15 s-15 m-11 l-10 xl-10"}
            name={"requirements"}
            label={<UU5.Bricks.Lsi lsi={Lsi.requirements} />}


          />
          <UU5.Forms.Number
            name={"capacity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.capacity} />}

          />
          <UU5.Forms.Text
            name={"supervisor"}
            label={<UU5.Bricks.Lsi lsi={Lsi.supervisor} />}

          />

          <UU5.Forms.Select
            name={"subject"}
            label={<UU5.Bricks.Lsi lsi={Lsi.subject} />}

          >
            <UU5.Forms.Select.Option value="bachelors" />
            <UU5.Forms.Select.Option value="masters" />
          </UU5.Forms.Select>

          <UU5.Forms.Select
            name={"term"}
            label={<UU5.Bricks.Lsi lsi={Lsi.term} />}

          >
            <UU5.Forms.Select.Option value="english" />
            <UU5.Forms.Select.Option value="czech" />
          </UU5.Forms.Select>

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

export default AssignmentForm;
