//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./term-lsi";
import TermForm from "../bricks/term-form";
import SubjectDataList from "../bricks/subject-data-list.js";
import SubjectDetail from "./subject-detail"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TermList = SubjectDataList(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [termToDelete, setTermToDelete] = useState(null);

    const termListData = useDataList({
      handlerMap: {
        load: Calls.Term.list,
        createItem: Calls.Term.create,
      },
      itemHandlerMap: {
        update: Calls.Term.edit,
        delete: Calls.Term.delete,
      },
      initialDtoIn: {},
    });

    
    const subjectAvailableTags = [];
    if (props.data) {
      props.data.forEach((subject) => {
        subjectAvailableTags.push({
          value: subject.data.id,
          content: subject.data.name,
        });
      });
    }

    //@@viewOff:private

    //@@viewOn:interface
    
    function handleCreateTerm(newTermData) {
      return termListData.handlerMap.createItem(newTermData);
    }

    function handleUpdateTerm(updatedTermData) {
      return selectedTerm.handlerMap.update(updatedTermData);
    }

    async function handleTermDelete() {
      await termToDelete.handlerMap.delete({ id: termToDelete.data.id });
      setTermToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props,className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.year} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.year,

        },
        
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.termSeason}/>,
          cell: (cellProps) => cellProps.data.data.termSeason,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.subjectList}/>,
          cell: (cellProps) => {
            let subjectComponentList= []
            cellProps.data.data.subjectList.forEach((subject) => {
              subjectComponentList.push(
                <div key={subject}>
                  <SubjectDetail subjectId={subject} nestingLevel={"inline"}/>
                  <br/>
                </div>
              );
              });
              return <>{subjectComponentList}</>
            }
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
                    onClick={() => { UU5.Environment.getRouter().setRoute("termDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedTerm(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setTermToDelete(cellProps.data)}
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
          selectedTerm && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedTerm?.id ? Lsi.updateTerm : Lsi.createTerm} />}
              shown={!!selectedTerm}
              onClose={() => setSelectedTerm(null)}
            >
              <TermForm
                selectedTerm={selectedTerm.data}
                setSelectedTerm={setSelectedTerm}
                handleCreateTerm={handleCreateTerm}
                handleUpdateTerm={handleUpdateTerm}
              />
            </UU5.Bricks.Modal>
          )
        }

        {termToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Term Deletion"}
            shown={true}
            onClose={() => setTermToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setTermToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleTermDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedTerm({data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>

        <Uu5Tiles.List columns={getCollumns()} data={termListData.data || []} rowAlignment="center" rowHeight={150} />
        
      </div>
    ) : null;
    //@@viewOff:render
  },
})
);
export default TermList;
