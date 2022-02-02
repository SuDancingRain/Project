//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";

import Config from "./config/config";
import Left from "./left";
import Bottom from "./bottom";
import Home from "../routes/home";

import SubjectList from '../routes/subject-list';
import SubjectDetail from '../routes/subject-detail';
import TermList from '../routes/term-list';
import TermDetail from '../routes/term-detail';
import AssignmentList from '../routes/assignment-list';
import AssignmentDetail from '../routes/assignment-detail';
import PersonList from '../routes/person-list';
import PersonDetail from '../routes/person-detail';
import GradeDetail from "../routes/grade-detail";
import GradeList from "../routes/grade-list";

import CreateTerm from '../routes/term/create';
import DeleteTerm from '../routes/term/delete';
import EditTerm from '../routes/term/edit';
import ListTerm from '../routes/term/list';
import GetTerm from '../routes/term/get';

import CreateSubject from '../routes/subject/create';
import DeleteSubject from '../routes/subject/delete';
import EditSubject from '../routes/subject/edit';
import ListSubject from '../routes/subject/list';
import GetSubject from '../routes/subject/get';

import SubmitAssignment from '../routes/assignment/submit';
import CreateAssignment from '../routes/assignment/create';
import DeleteAssignment from '../routes/assignment/delete';
import EditAssignment from '../routes/assignment/edit';
import ListAssignment from '../routes/assignment/list';
import GetAssignment from '../routes/assignment/get';

import AddPerson from '../routes/person/add';
import DeletePerson from '../routes/person/delete';
import EditPerson from '../routes/person/edit';
import ListPerson from '../routes/person/list';
import GetPerson from '../routes/person/get';
import AddToSubjectPerson from '../routes/person/add-to-subject';
import RemoveFromSubjectPerson from '../routes/person/remove-from-subject';

import ListGrade from '../routes/grade/list';
import GetGrade from '../routes/grade/get';
import CreateGrade from '../routes/grade/create';
import EditGrade from '../routes/grade/edit';
import DeleteGrade from '../routes/grade/delete';
;

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics
};

const About = UU5.Common.Component.lazy(() => import("../routes/about"));
const InitAppWorkspace = UU5.Common.Component.lazy(() => import("../routes/init-app-workspace"));
const ControlPanel = UU5.Common.Component.lazy(() => import("../routes/control-panel"));

const DEFAULT_USE_CASE = "home";
const ROUTES = {
  "": DEFAULT_USE_CASE,
  home: { component: <Home /> },
  about: { component: <About /> },

  subjectDetail: { component: <SubjectDetail /> },
  subjectList: { component: <SubjectList /> },
  termDetail: { component: <TermDetail /> },
  termList: { component: <TermList /> },
  assignmentDetail: { component: <AssignmentDetail /> },
  assignmentList: { component: <AssignmentList /> },
  personDetail: { component: <PersonDetail /> },
  personList: { component: <PersonList /> },
  gradeDetail: { component: <GradeDetail /> },
  gradeList: { component: <GradeList /> },

  createTerm: { component: <CreateTerm /> },
  deleteTerm: { component: <DeleteTerm /> },
  editTerm: { component: <EditTerm /> },
  listTerm: { component: <ListTerm /> },
  getTerm: { component: <GetTerm /> },

  createSubject: { component: <CreateSubject /> },
  deleteSubject: { component: <DeleteSubject /> },
  editSubject: { component: <EditSubject /> },
  listSubject: { component: <ListSubject /> },
  getSubject: { component: <GetSubject /> },

  addPerson: { component: <AddPerson /> },
  deletePerson: { component: <DeletePerson /> },
  editPerson: { component: <EditPerson /> },
  listPerson: { component: <ListPerson /> },
  getPerson: { component: <GetPerson /> },
  addToSubjectPerson: { component: <AddToSubjectPerson /> },
  removeFromSubjectPerson: { component: <RemoveFromSubjectPerson /> },

  createGrade: { component: <CreateGrade /> },
  deleteGrade: { component: <DeleteGrade /> },
  editGrade: { component: <EditGrade /> },
  getGrade: { component: <GetGrade /> },
  listGrade: { component: <ListGrade /> },


  createAssignment: { component: <CreateAssignment /> },
  deleteAssignment: { component: <DeleteAssignment /> },
  editAssignment: { component: <EditAssignment /> },
  listAssignment: { component: <ListAssignment /> },
  getAssignment: { component: <GetAssignment /> },
  submitAssignment: { component: <SubmitAssignment /> },

  "sys/uuAppWorkspace/initUve": { component: <InitAppWorkspace /> },
  controlPanel: { component: <ControlPanel /> },
};

export const SpaAuthenticated = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    let [initialActiveItemId] = useState(() => {
      let url = UU5.Common.Url.parse(window.location.href);
      return url.useCase || DEFAULT_USE_CASE;
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
        <Plus4U5.App.Page
          {...props}
          top={<Plus4U5.App.TopBt />}
          topFixed="smart"
          bottom={<Bottom />}
          type={3}
          displayedLanguages={["cs", "en"]}
          left={<Left />}
          leftWidth="!xs-300px !s-300px !m-288px !l-288px !xl-288px"
          leftFixed
          leftRelative="m l xl"
          leftResizable="m l xl"
          leftResizableMinWidth={220}
          leftResizableMaxWidth={500}
          isLeftOpen="m l xl"
          showLeftToggleButton
          fullPage
        >
          <Plus4U5.App.MenuConsumer>
            {({ setActiveItemId }) => {
              let handleRouteChanged = ({ useCase, parameters }) => setActiveItemId(useCase || DEFAULT_USE_CASE);
              return <UU5.Common.Router routes={ROUTES} controlled={false} onRouteChanged={handleRouteChanged} />;
            }}
          </Plus4U5.App.MenuConsumer>
        </Plus4U5.App.Page>
      </Plus4U5.App.MenuProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
