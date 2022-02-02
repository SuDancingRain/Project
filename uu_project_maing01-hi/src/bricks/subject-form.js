//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
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
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedSubject: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedsubject: UU5.PropTypes.func,
    handleCreateSubject: UU5.PropTypes.func,
    handleUpdateSubject: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    //@@viewOn:private
    const subjectListData = useDataList({
      handlerMap: {
        load: Calls.Subject.list,
      },
      initialDtoIn: {},
    });


    const subjectAvailableTags = [];
    if (subjectListData.data) {
      subjectListData.data.forEach((subject) => {
        subjectAvailableTags.push({
          value: subject.data.id,
          content: subject.data.name,
          content: subject.data.description,
          value: subject.data.credits,
          content: subject.data.supervisor,
          content: subject.data.degree,
          content: subject.data.language,
        });
      });
    }


    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedSubject?.id) await props.handleUpdateSubject({ id: props.selectedSubject.id, ...opt.values });
        else await props.handleCreateSubject(opt.values);
        opt.component.setReady();
        props.setSelectedSubject(null);
      } catch {
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
    let attrs = UU5.Common.VisualComponent.getAttrs(props);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>

        <UU5.Forms.Form
          labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
          valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
          onSave={handleOnSave}
          onCancel={() => props.setSelectedSubject(null)}
        >
          <UU5.Forms.Text
            name={"name"}
            required={true}
            label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
            value={props.selectedSubject?.name || ""} 
          />
          <UU5.Forms.Text
            name={"description"}
            label={<UU5.Bricks.Lsi lsi={Lsi.description} />}
            required
          />
  
          <UU5.Forms.Text
            name={"credits"}
            label={<UU5.Bricks.Lsi lsi={Lsi.credits} />}
            required
          />
          <UU5.Forms.Text
            name={"supervisor"}
            label={<UU5.Bricks.Lsi lsi={Lsi.supervisor} />}
            required
          />
          
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

          <UU5.Bricks.Line size={"s"} />
          <UU5.Forms.Controls />
        </UU5.Forms.Form>


        
      </div >
    ) : null;
    //@@viewOff:render
  }
});

export default SubjectForm;