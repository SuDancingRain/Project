//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent} from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubmitForm",
  
  netsingLevel: "bigBoxCollection"
  //@@viewOff:statics
}

export const SubmitForm = createVisualComponent({
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
      
    let attrs = UU5.Common.VisualComponent.getAttrs(props);

    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    return currentNestingLevel ? (
      <div {...attrs}>

      </div>
    ): null;
      //@@viewOff:render
  }
  });
  
  export default SubmitForm;