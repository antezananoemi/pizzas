import React from "react";
import Select from "react-select";

class SelectTopping extends React.Component {
  state = {
    selectedOption: null
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.handleSelect(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
    const { toppings = [] } = this.props;
    //console.log("asi---", toppings);
    let newToppings = toppings.map(top => {
      if (top == null) {
        top = [];
      }
      return top;
    });

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={newToppings}
        isMulti={true}
        getOptionLabel={option => option.name}
        getOptionValue={option => option._id}
      />
    );
  }
}
export default SelectTopping;
