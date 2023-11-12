import React from "react";
import { getRandomUser } from "./Utility/Api";
import Instructor from "./Instructor";

class CyclOpediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  componentDidMount = async () => {
    console.log("Component Did Mount");
    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
      // this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
    } else {
      const resposne = await getRandomUser();
      console.log(resposne);
      this.setState(() => {
        return {
          instructor: {
            name: resposne.data.first_name + " " + resposne.data.last_name,
            email: resposne.data.email,
            phone: resposne.data.phone_number,
          },
        };
      });
    }
  };

  componentDidUpdate = async (previousProps, previousState) => {
    console.log("Component Did Update");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
    console.log("Old State - " + previousState.studentCount);
    console.log("New State - " + this.state.studentCount);

    if (previousState.studentCount < this.state.studentCount) {
      const response = await getRandomUser();
      this.setState((prevState) => {
        return {
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    } else if (previousState.studentCount > this.state.studentCount) {
      this.setState((prevState) => {
        return {
          studentList: [],
        };
      });
    }
  };

  componentWillUnmount() {
    console.log("Component Will Unmount");
  }

  handleAddStudent = () => {
    this.setState((prevState) => {
      return {
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudents = () => {
    this.setState(() => {
      return {
        studentCount: 0,
      };
    });
  };

  handleToggleInstructor = () => {
    this.setState((prevState) => {
      return {
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  render() {
    console.log("Render Component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor</span>&nbsp;
          <i
            onClick={this.handleToggleInstructor}
            className={`btn btn-success btn-sm ${
              this.state.hideInstructor ? "bi bi-toggle-off" : "bi bi-toggle-on"
            }`}
          ></i>
          {!this.state.hideInstructor && this.state.instructor ? (
            <Instructor instructor={this.state.instructor} />
          ) : null}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Feedback</span>
          <br />
          <input
            type="text"
            placeholder="Name..."
            value={this.state.inputName}
            onChange={(e) => {
              this.setState({ inputName: e.target.value });
            }}
          ></input>{" "}
          Value: {this.state.inputName}
          <br />
          <textarea
            placeholder="Feedback..."
            value={this.state.inputFeedback}
            onChange={(e) => {
              this.setState({ inputFeedback: e.target.value });
            }}
          ></textarea>{" "}
          Value: {this.state.inputFeedback}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Students</span> <br />
          <div>Student Count: {this.state.studentCount}</div>
          <button
            onClick={this.handleAddStudent}
            className="btn btn-success btn-sm"
          >
            Add Student
          </button>
          &nbsp;
          <button
            onClick={this.handleRemoveAllStudents}
            className="btn btn-danger btn-sm"
          >
            Remove All Students
          </button>
          {this.state.studentList.map((student, index) => {
            return (
              <div className="text-white" key={index}>
                - {student.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CyclOpediaClassPage;
