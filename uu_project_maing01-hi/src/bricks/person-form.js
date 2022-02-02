//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import Lsi from "../routes/person-lsi"
// import UuPlus4UPeopleForms from "uu_plus4upeopleng01-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PersonForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
}

export const PersonForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    shown: UU5.PropTypes.bool,
    selectedPerson: UU5.PropTypes.object,
    setFormOpened: UU5.PropTypes.func,
    setSelectedPerson: UU5.PropTypes.func,
    handleCreatePerson: UU5.PropTypes.func,
    handleUpdatePerson: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    //@@viewOn:private
    const personListData = useDataList({
      handlerMap: {
        load: Calls.Person.list,
      },
      initialDtoIn: {},
    });


    const personAvailableTags = [];
    if (personListData.data) {
      personListData.data.forEach((person) => {
        personAvailableTags.push({
          value: person.data.id,
          content: person.data.uuIdentity,
          content: person.data.role,
          content: person.data.subject,
        });
      });
    }


    async function handleOnSave(opt) {
      opt.component.setPending();
      try {
        if (props.selectedPerson?.id) await props.handleUpdatePerson({ id: props.selectedPerson.id, ...opt.values });
        else await props.handleCreatePerson(opt.values);
        opt.component.setReady();
        props.setSelectedPerson(null);
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
          onCancel={() => props.setSelectedPerson(null)}
        >
          {/* <UuPlus4UPeopleForms.PersonalCard.Input
            name={"uuIdentity"}
            baseUri="https://uuapp.plus4u.net/uu-plus4upeople-maing01/56ac93ddb0034de8b8e4f4b829ff7d0f/"
            label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
            value={props.selectedPerson?.uuIdentity || ""}
          /> */}
<UU5.Forms.Text
 name={"uuIdentity"}
 label={<UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />}
 value={props.selectedPerson?.uuIdentity || ""}
/>
          <UU5.Forms.Select
            name={"role"}
            label={<UU5.Bricks.Lsi lsi={Lsi.role} />}
          >

            <UU5.Forms.Select.Option value="Administrator" />
            <UU5.Forms.Select.Option value="Teacher" />
            <UU5.Forms.Select.Option value="Student" />

          </UU5.Forms.Select>

          <UU5.Forms.Text
            name={"subject"}
            label={<UU5.Bricks.Lsi lsi={Lsi.subject} />}

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

export default PersonForm;