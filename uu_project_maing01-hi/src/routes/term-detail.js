//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject , useDataList, useState} from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";
import Config from "./config/config.js";
import Calls from "../calls.js";
import SubjectForm from "../bricks/subject-form"
import Lsi from "./term-lsi"
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TermDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TermDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {

    termId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [subjectToDelete, setSubjectToDelete] = useState(null);

    const subjectListData = useDataList({
      handlerMap: {
        load: Calls.Subject.list,
        createItem: Calls.Subject.create,
      },
      itemHandlerMap: {
        update: Calls.Subject.edit,
        delete: Calls.Subject.delete,
      },
      initialDtoIn: {},
    });



    const termData = useDataObject({
      handlerMap: {
        load: Calls.Term.get,
      },
      initialDtoIn: {
        id: props.termId || props.params.id,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    
    function handleCreateSubject(newSubjectData) {
      return subjectListData.handlerMap.createItem(newSubjectData);
    }

    function handleUpdateSubject(updatedSubjectData) {
      return selectedSubject.handlerMap.update(updatedSubjectData);
    }

    async function handleSubjectDelete() {
      await subjectToDelete.handlerMap.delete({ id: subjectToDelete.data.id });
      setSubjectToDelete(null);
    }
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;

      if (termData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (termData.state.includes("error")) {
        result = <UU5.Common.Error errorData={termData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <UU5.Bricks.Block colorScheme="blue" card={"content"}>
              
             <b> <UU5.Bricks.Lsi lsi={Lsi.year}/> </b> : {termData.data.year}
              <br />
             <b> <UU5.Bricks.Lsi lsi={Lsi.termSeason}/> </b> : {termData.data.termSeason}
            <UU5.Bricks.Line />
            <UU5.Bricks.Header level="4" content="Subject Form" />
            <SubjectForm 
            setSelectedSubject={setSelectedSubject}
            handleCreateSubject={handleCreateSubject}
            handleUpdateSubject={handleUpdateSubject}
            />
            </UU5.Bricks.Block>
          );
        } else {
          result = (
            <UU5.Bricks.Link
              onClick={() => UU5.Environment.getRouter().setRoute("termDetail", { id: props.termId })}
            >
              {termData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }

    return getResult();
    //@@viewOff:render
  },
});

export default TermDetail;
