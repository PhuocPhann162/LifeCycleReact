import React from "react";
import { getRandomUser } from "./Utility/Api";

class CyclOpediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  }

  componentDidMount = async () => {
    console.log("Component Did Mount");
    const resposne = await getRandomUser();
    console.log(resposne);
    this.setState((prevState) => {
      return {
        instructor: {
          name: resposne.data.first_name + " " + resposne.data.last_name,
          email: resposne.data.email,
          phone: resposne.data.phone_number,
        },
      };
    });
  };

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  render() {
    console.log("Render Component");
    return (
      <div>
        {this.state.instructor && (
          <div className="p-3">
            <span className="h4 text-success">Instructor</span>
            <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
            <br />
            Name: {this.state.instructor.name} <br />
            Email: {this.state.instructor.email} <br />
            Phone: {this.state.instructor.phone} <br />
          </div>
        )}
        <div className="p-3">
          <span className="h4 text-success">Students</span> <br />
          <div>Student Count: {this.state.studentCount}</div>
          <button className="btn btn-success btn-sm">Add Student</button>
          &nbsp;
          <button className="btn btn-danger btn-sm">Remove Student</button>
        </div>
      </div>
    );
  }
}

export default CyclOpediaClassPage;
