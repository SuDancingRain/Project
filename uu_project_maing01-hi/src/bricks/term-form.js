//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/term-lsi"
import SubjectDataList from "./subject-data-list";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TermForm = SubjectDataList(
 createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedTerm: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedTerm: UU5.PropTypes.func,
    handleCreateTerm: UU5.PropTypes.func,
    handleUpdateTerm: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    

    const termListData = useDataList({
      handlerMap: {
        load: Calls.Term.list,
      },
      initialDtoIn: {},
    });


    const termAvailableTags = [];
    if (termListData.data) {
      termListData.data.forEach((term) => {
        termAvailableTags.push({
          value: term.data.id,
          value: term.data.year,
          content: term.data.termSeason,
          content: term.data.subjectList,
        });
      });
    }
    
    const subjectAvailableTags = [];
    if (props.data) {
      props.data.forEach((subject) => {
        subjectAvailableTags.push({
          value: subject.data.id,
          content: subject.data.name,
        });
      });
    }


    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedTerm?.id) await props.handleUpdateTerm({ id: props.selectedTerm.id, ...opt.values });
        else await props.handleCreateTerm(opt.values);
        opt.component.setReady();
        props.setSelectedTerm(null);
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
          onCancel={() => props.setSelectedTerm(null)}
        >

          <UU5.Forms.Number
            name={"year"}
            label={<UU5.Bricks.Lsi lsi={Lsi.year} />}
            
            value={props.selectedTerm?.year || ""}
          />

          <UU5.Forms.Select
            name={"termSeason"}
            label={<UU5.Bricks.Lsi lsi={Lsi.termSeason} />}
            
            value={props.selectedTerm?.termSeason || ""}
          >

            <UU5.Forms.Select.Option value={"winter"} />
            <UU5.Forms.Select.Option value={"summer"} />

          </UU5.Forms.Select>

          <UU5.Forms.TagSelect
              name={"subjectList"}
              label={<UU5.Bricks.Lsi lsi={Lsi.subjectList} />}
              value={props.selectedTerm?.subjectList || []}
              availableTags={subjectAvailableTags}
              multiple
              controlled
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

export default TermForm;