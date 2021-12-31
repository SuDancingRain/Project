import UU5 from "uu5g04";
import uuProject from "uu_project_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`uuProject.Routes.Assignment.Submit`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<uuProject.Routes.Assignment.Submit />);
    expect(wrapper).toMatchSnapshot();
  });
});
