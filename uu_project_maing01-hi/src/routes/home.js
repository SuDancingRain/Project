//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Calls from "../calls";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
import WelcomeRow from "../bricks/welcome-row.js";
import StudentCard from "../bricks/student-card";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  StudentCard: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <Plus4U5.App.ArtifactSetter territoryBaseUri="" artifactId="" />

        <UU5.Bricks.Row className={CLASS_NAMES.StudentCard()}>
          <UU5.Bricks.Column colWidth="x-12s s-10" style="text-align:center">
            <StudentCard></StudentCard>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

        <UU5.Bricks.Row>
          <UU5.Bricks.Column colWidth="x-12s s-8" style="text-align:center">
            <UU5.Forms.Text label="search" placeholder="search for specific" />
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="x-12 s-2" style="text-align:center">
              <UU5.Bricks.Card>
                <UU5.Bricks.Header level="6">Subject name</UU5.Bricks.Header>
                <UU5.Bricks.Text>Describtion</UU5.Bricks.Text>
                <UU5.Bricks.Button colorSchema="green">Subject page</UU5.Bricks.Button>
              </UU5.Bricks.Card>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
