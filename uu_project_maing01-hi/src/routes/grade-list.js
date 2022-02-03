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

    const gradeAvailableTags = [];
    if (gradeListData.data) {
      gradeListData.data.forEach((grade) => {
        gradeAvailableTags.push({
          value: grade.data.name,
          content: grade.data.name,
        });
      });
    }
    const gradeAvailableTags2 = [];
    if (gradeListData.data) {
      gradeListData.data.forEach((grade) => {
        gradeAvailableTags2.push({

          value: grade.data.subject,
          content: grade.data.subject,
        });
      });
    }
    const gradeAvailableTags3 = [];
    if (gradeListData.data) {
      gradeListData.data.forEach((grade) => {
        gradeAvailableTags3.push({

          value: grade.data.term,
          content: grade.data.term,
        });
      });
    }

    const nameFilter = [
      "3106-1769-1",
      "2032-8932-1",
      "201-3150-1",
      "9635-983-1"
    ];
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getCollumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.grade} />,
          sorterKey: "nameAsc",
          cell: (cellProps) => cellProps.data.data.grade,

        },

        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
          cell: (cellProps) => cellProps.data.data.name,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.subject} />,
          cell: (cellProps) => cellProps.data.data.subject,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.term} />,
          cell: (cellProps) => cellProps.data.data.term,
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
    const Filter = [
      {
        key: "name",
        label: { cs: "uuIdentity", en: "uuIdentity" },
        filterFn: (item, value) => {
          console.log(item, value[0])
          return item.data.name.includes(value[0]);
        },
        component: (
          <UU5.Forms.TagSelect
            name={"uuIdentity"}
            label={<UU5.Bricks.Lsi lsi={Lsi.name} />}
            availableTags={gradeAvailableTags}
            multiple={false}
            required={true}
          />
        ),
        getValueLabel: (value) => {
          let gradeObject = gradeAvailableTags.find((gradeOption) => gradeOption.value === value[0]);
          return gradeObject.content;
        },
      },
      {
        key: "name2",
        label: { cs: "Predmet", en: "Subject" },
        filterFn: (item, value) => {
          return item.data.subject.includes(value[0]);
        },
        component: (
          <UU5.Forms.TagSelect
            name={"Subject"}
            label={<UU5.Bricks.Lsi lsi={Lsi.subject} />}
            availableTags={gradeAvailableTags2}
            multiple={false}
            required={true}
          />
        ),
        getValueLabel: (value) => {
          let gradeObject = gradeAvailableTags2.find((gradeOption) => gradeOption.value === value[0]);
          return gradeObject.content;
        },
      },
      {
        key: "name3",
        label: { cs: "Semestr", en: "Semester" },
        filterFn: (item, value) => {
          console.log(item, value[0])
          return item.data.term.includes(value[0]);
        },
        component: (
          <UU5.Forms.TagSelect
            name={"Semester"}
            label={<UU5.Bricks.Lsi lsi={Lsi.term} />}
            availableTags={gradeAvailableTags3}
            multiple={false}
            required={true}
          />
        ),
        getValueLabel: (value) => {
          let gradeObject = gradeAvailableTags3.find((gradeOption) => gradeOption.value === value[0]);
          return gradeObject.content;
        },
      },
        
    ]


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

    <UU5.Bricks.Container>
      <Uu5Tiles.ControllerProvider data={gradeListData.data || []} filters={Filter}>
        <Uu5Tiles.ActionBar
          searchable={true}
          actions={[
            {
              onClick: () => setSelectedGrade({ data: {} }),
              icon: "mdi-plus",
              content: Lsi.create,
              colorSchema: "green",
              active: true,
              bgStyle: "filled",
            },
          ]}
        />
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List columns={getCollumns()} rowAlignment="center" rowHeight={150} />
      </Uu5Tiles.ControllerProvider>
    </UU5.Bricks.Container>
  </div>
) : null;
    //@@viewOff:render
  },
});

export default GradeList;
