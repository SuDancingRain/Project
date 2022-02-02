//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useDataList } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./grade-lsi";
import GradeForm from "../bricks/grade-form";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GradeList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const GradeList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [selectedGrade, setSelectedGrade] = useState(null);
    const [gradeToDelete, setGradeToDelete] = useState(null);

    const gradeListData = useDataList({
      handlerMap: {
        load: Calls.Grade.list,
        createItem: Calls.Grade.create,
      },
      itemHandlerMap: {
        update: Calls.Grade.edit,
        delete: Calls.Grade.delete,
      },
      initialDtoIn: {},
    });
    //@@viewOff:private

    //@@viewOn:interface
    
    function handleCreateGrade(newGradeData) {
      return gradeListData.handlerMap.createItem(newGradeData);
    }

    function handleUpdateGrade(updatedGradeData) {
      return selectedGrade.handlerMap.update(updatedGradeData);
    }

    async function handleGradeDelete() {
      await gradeToDelete.handlerMap.delete({ id: gradeToDelete.data.id });
      setGradeToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props,className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.grade} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.grade,

        },
        
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.uuIdentity}/>,
          cell: (cellProps) => cellProps.data.data.uuIdentity,
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
                    onClick={() => { UU5.Environment.getRouter().setRoute("gradeDetail", { id: cellProps.data.data.id }) }}
                  >
                    <UU5.Bricks.Icon
                      icon="mdi-magnify"
                    />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="blue"
                    onClick={() => setSelectedGrade(cellProps.data)}
                  >
                    <UU5.Bricks.Icon icon="mdi-pencil" />
                  </UU5.Bricks.Button>
                  <UU5.Bricks.Button
                    colorSchema="red"
                    onClick={() => setGradeToDelete(cellProps.data)}
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
          selectedGrade && (
            <UU5.Bricks.Modal
              header={<UU5.Bricks.Lsi lsi={props.selectedGrade?.id ? Lsi.updateGrade : Lsi.createGrade} />}
              shown={!!selectedGrade}
              onClose={() => setSelectedGrade(null)}
            >
              <GradeForm
                selectedGrade={selectedGrade.data}
                setSelectedGrade={setSelectedGrade}
                handleCreateGrade={handleCreateGrade}
                handleUpdateGrade={handleUpdateGrade}
              />
            </UU5.Bricks.Modal>
          )
        }

        {gradeToDelete && (
          <UU5.Bricks.Modal
            header={"Confirm Grade Deletion"}
            shown={true}
            onClose={() => setGradeToDelete(null)}
          >
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setGradeToDelete(null)}>
                Refuse
              </UU5.Bricks.Button>
              {""}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleGradeDelete}>
                Confirm
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )
        }
        <UU5.Bricks.Button colorSchema={"green"} onClick={()=> setSelectedGrade({data: {} })}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>

        <Uu5Tiles.List columns={getCollumns()} data={gradeListData.data || []} rowAlignment="center" rowHeight={150} />
        
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default GradeList;
