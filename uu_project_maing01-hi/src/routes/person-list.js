//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./person-lsi";
import PersonForm from "../bricks/person-form"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PersonList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PersonList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private

    const [selectedPerson, setSelectedPerson] = useState(null);
    const [personToDelete, setPersonToDelete] = useState(null);

    const personListData = useDataList({
      handlerMap: {
        load: Calls.Person.list,
        createItem: Calls.Person.add,
      },
      itemHandlerMap: {
        update: Calls.Person.edit,
        delete: Calls.Person.delete,
      },
      initialDtoIn: {},
    });
    //@@viewOff:private

    //@@viewOn:interface

    function handleCreatePerson(newPersonData) {
      return personListData.handlerMap.createItem(newPersonData);
    }

    function handleUpdatePerson(updatedPersonData) {
      return selectedPerson.handlerMap.update(updatedPersonData);
    }

    async function handlePersonDelete() {
      await personToDelete.handlerMap.delete({ id: personToDelete.data.id });
      setPersonToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.uuIdentity} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.uuIdentity,

        },

        {
          header: <UU5.Bricks.Lsi lsi={Lsi.role} />,
          cell: (cellProps) => cellProps.data.data.role,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.subject} />,
          cell: (cellProps) => cellProps.data.data.subject,
        },

        {
          cell: (cellProps) => {
            if (cellProps.data.state.includes("pending")) {
              return <UU5.Bricks.Loading />
            } else {
              return (
                <>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => { UU5.Environment.getRouter().setRoute("personDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedPerson(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setPersonToDelete(cellProps.data)}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-close"
                    />
                  </UU5.Bricks.Button>
                </>
              );
            }
          },
        },
      ];
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        {
          selectedPerson && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedPerson?.id ? Lsi.updatePerson : Lsi.createPerson} />}
              shown={!!selectedPerson}
              onClose={() => setSelectedPerson(null)}
            >
              <PersonForm
                selectedPerson={selectedPerson.data}
                setSelectedPerson={setSelectedPerson}
                handleCreatePerson={handleCreatePerson}
                handleUpdatePerson={handleUpdatePerson}
              />
            </UU5.Bricks.Modal>
          )
        }

        {personToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Person Deletion"}
            shown={true}
            onClose={() => setPersonToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setPersonToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handlePersonDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedPerson({ data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>

        <Uu5Tiles.List columns={getCollumns()} data={personListData.data || []} rowAlignment="center" rowHeight={150} />

      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default PersonList;
