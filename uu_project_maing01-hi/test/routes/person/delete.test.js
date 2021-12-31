import UU5 from "uu5g04";
import uuProject from "uu_project_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`uuProject.Routes.Person.Delete`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<uuProject.Routes.Person.Delete />);
    expect(wrapper).toMatchSnapshot();
  });
});
