import UU5 from "uu5g04";
import uuProject from "uu_project_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`uuProject.Routes.Assignment.Edit`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<uuProject.Routes.Assignment.Edit />);
    expect(wrapper).toMatchSnapshot();
  });
});
