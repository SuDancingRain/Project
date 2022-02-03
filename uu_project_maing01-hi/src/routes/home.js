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
  netsingLevel: "bigBoxCollection",
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
  welcomeRow: () => Config.Css.css`
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <Plus4U5.App.ArtifactSetter territoryBaseUri="" artifactId="" />

        <UU5.Bricks.Row className={CLASS_NAMES.StudentCard()}>
          <UU5.Bricks.Column colWidth="x-12s s-10" style="text-align:center">
            <StudentCard></StudentCard>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

        <WelcomeRow textPadding="14px" icon="mdi-human-greeting">
          <UU5.Bricks.Lsi lsi={Lsi.auth.intro} />
        </WelcomeRow>

        <UU5.Bricks.Image src="../assets/team7.png" />
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
