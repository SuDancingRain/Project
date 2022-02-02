//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
    //@@viewOn:statics
    displayName: Config.TAG + "StudentCard",
    netsingLevel: "bigBoxCollection",
    //@@viewOff:statics
};


const CLASS_NAMES = {
    main: () => Config.Css.css`
      padding: 24px 0;
      max-width: 624px;
      margin: 0 auto;
    `,
};

export const StudentCard = createVisualComponent({
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
        let attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
        return (
            <div {...attrs}>
                <UU5.Bricks.Accordion>
                    <UU5.Bricks.Panel header="Student Index" colorSchema="blue" iconExpanded="mdi-chevron-up" iconCollapsed="mdi-chevron-down">

                        <UU5.BlockLayout.Row weight="primary">
                            <UU5.Common.Identity>
                                {({ identity }) => <UU5.Bricks.Text  content={identity.name} />}
                            </UU5.Common.Identity>
                        </UU5.BlockLayout.Row>
                        <UU5.BlockLayout.Block>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={150}>
                                    <UU5.BlockLayout.Text weight="secondary">
                                        Email
                                    </UU5.BlockLayout.Text>
                                </UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column>
                                    <UU5.Common.Identity>
                                        {({ identity }) => <UU5.Bricks.Link content={identity.email} />}
                                    </UU5.Common.Identity>
                                </UU5.BlockLayout.Column>
                            </UU5.BlockLayout.Row>
                        </UU5.BlockLayout.Block>
                        <UU5.BlockLayout.Line />

                        <UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Column width={150}>
                                <UU5.BlockLayout.Text weight="secondary">
                                    Plus4U Person
                                </UU5.BlockLayout.Text>
                            </UU5.BlockLayout.Column>
                            <UU5.BlockLayout.Column>
                                <UU5.Common.Identity>
                                    {({ identity }) => <UU5.Bricks.Text content={identity.uuIdentity} />}
                                </UU5.Common.Identity>
                            </UU5.BlockLayout.Column>
                        </UU5.BlockLayout.Row>
                    </UU5.Bricks.Panel>

                    <UU5.Bricks.Panel
                        header="2020/2021"
                        colorSchema="light-grey"
                        iconExpanded="mdi-chevron-up"
                        iconCollapsed="mdi-chevron-down"
                    >
                        <UU5.BlockLayout.Block>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={150}>
                                    <UU5.BlockLayout.Text weight="secondary">
                                        Subject 1
                                    </UU5.BlockLayout.Text>
                                </UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column>
                                    Subject 1 evaluation
                                </UU5.BlockLayout.Column>
                            </UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={150}>
                                    <UU5.BlockLayout.Text weight="secondary">
                                        Subject 2
                                    </UU5.BlockLayout.Text>
                                </UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column>
                                    Subject 2 evaluation
                                </UU5.BlockLayout.Column>
                            </UU5.BlockLayout.Row>
                        </UU5.BlockLayout.Block>
                        <UU5.BlockLayout.Line />

                        <UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Column width={150}>
                                <UU5.BlockLayout.Text weight="secondary">
                                    Plus4U Person
                                </UU5.BlockLayout.Text>
                            </UU5.BlockLayout.Column>
                            <UU5.BlockLayout.Column>
                                <UU5.Common.Identity>
                                    {({ identity }) => <UU5.Bricks.Text level="2" content={identity.uuIdentity} />}
                                </UU5.Common.Identity>
                            </UU5.BlockLayout.Column>
                        </UU5.BlockLayout.Row>
                    </UU5.Bricks.Panel>

                    <UU5.Bricks.Panel
                        header="2019/2020"
                        colorSchema="light-grey"
                        iconExpanded="mdi-chevron-up"
                        iconCollapsed="mdi-chevron-down"
                    >
                        <UU5.BlockLayout.Block>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={150}>
                                    <UU5.BlockLayout.Text weight="secondary">
                                        Subject 1
                                    </UU5.BlockLayout.Text>
                                </UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column>
                                    Subject 1 evaluation
                                </UU5.BlockLayout.Column>
                            </UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Row>
                                <UU5.BlockLayout.Column width={150}>
                                    <UU5.BlockLayout.Text weight="secondary">
                                        Subject 2
                                    </UU5.BlockLayout.Text>
                                </UU5.BlockLayout.Column>
                                <UU5.BlockLayout.Column>
                                    Subject 2 evaluation
                                </UU5.BlockLayout.Column>
                            </UU5.BlockLayout.Row>
                        </UU5.BlockLayout.Block>
                        <UU5.BlockLayout.Line />

                        <UU5.BlockLayout.Row>
                            <UU5.BlockLayout.Column width={150}>
                                <UU5.BlockLayout.Text weight="secondary">
                                    Plus4U Person
                                </UU5.BlockLayout.Text>
                            </UU5.BlockLayout.Column>
                            <UU5.BlockLayout.Column>
                                <UU5.Common.Identity>
                                    {({ identity }) => <UU5.Bricks.Text level="2" content={identity.uuIdentity} />}
                                </UU5.Common.Identity>
                            </UU5.BlockLayout.Column>
                        </UU5.BlockLayout.Row>
                    </UU5.Bricks.Panel>
                </UU5.Bricks.Accordion>
            </div>
        );
        //@@viewOff:render
    },
});

export default StudentCard;
