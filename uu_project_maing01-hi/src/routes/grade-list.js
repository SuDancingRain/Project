//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls";
import Lsi from "./Grade-lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "GradeList",
  netsingLevel: "bigBoxCollection",
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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    // function getCollumns() {
    //   return [
    //     {
    //       header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
    //       cell: (cellProps) => cellProps.data.name,
    //     },
    //     {
    //       header: <UU5.Bricks.Lsi lsi={Lsi.date} />,
    //       cell: (cellProps) => {
    //         if (cellProps.data.date) {
    //           return new Date(cellProps.data.date).toLocaleString(UU5.Common.Tools.getLanguage());
    //         } else {
    //           return "";
    //         }
    //       },
    //     },

    //     {
    //       header: "Author",
    //       cell: (cellProps) => cellProps.data.author,
    //     },
    //     {
    //       header: "Cover",
    //       cell: (cellProps) => <UU5.Bricks.Image height="100px" src={cellProps.data.cover} />,
    //     },
    //     {
    //       cell: (cellProps) => {
    //         return (
    //           <>
    //           {/*<UU5.Bricks.Button colorSchema="blue" onClick={() => setFormOpened(true)}><UU5.Bricks.Icon icon="mdi-pencil" /></UU5.Bricks.Button>*/}
    //           <UU5.Bricks.Button colorSchema="blue" onClick= {() => setSelectedBook(cellProps.data)}>
    //             <UU5.Bricks.Icon icon="mdi-pencil" />
    //           </UU5.Bricks.Button>
    //           <UU5.Bricks.Button colorSchema="red" onClick= {() => setBookToDelete(cellProps.data)}>
    //             <UU5.Bricks.Icon icon="mdi-close" />
    //           </UU5.Bricks.Button>
    //           </>
    //         );
    //       },
    //     },
    //   ];
    // }

    return (
      <div {...attrs}>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="x-12 s-9" style="text-align:center">
            <UU5.Forms.Text label="search" placeholder="search for specific" />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
        <Uu5Tiles.List columns={[]} data={[]} rowAlignment="center" rowHeight={150} />
        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="x-12 s-2" style="text-align:center">
            <UU5.Bricks.Card>
              <UU5.Bricks.Header level="6">Grade name</UU5.Bricks.Header>
              <UU5.Bricks.Text>Describtion</UU5.Bricks.Text>
              <UU5.Bricks.Button colorSchema="green">Grade page</UU5.Bricks.Button>
            </UU5.Bricks.Card>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
      </div>
    );
    //@@viewOff:render
  },
});

export default GradeList;
