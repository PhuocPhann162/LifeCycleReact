import React, { useEffect, useState } from "react";
import { getRandomUser } from "./Utility/Api";
import Instructor from "./Instructor";

const CyclOpediaFuncPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  const [inputName, setInputName] = useState("");
  const [inputFeedback, setInputFeedback] = useState("");

  useEffect(() => {
    console.log("This will be called on EVERY Render");
  });

  useEffect(() => {
    console.log("This will be called on Initial/first Render/Mount");
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            email: response.data.email,
            phone: response.data.phone_number,
          },
        };
      });
    };
    if (!state.hideInstructor) {
      getUser();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    console.log(
      "This will be called on whenever value of studentCounte changes"
    );
    const getUser = async () => {
      const response = await getRandomUser();
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [
            ...prevState.studentList,
            {
              name: response.data.first_name + " " + response.data.last_name,
            },
          ],
        };
      });
    };
    if (state.studentList.length < state.studentCount) {
      getUser();
    } else if (state.studentList.length > state.studentCount) {
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [],
        };
      });
    }
  }, [state.studentCount]);

  useEffect(() => {
    console.log("This will be called on Initial/first Render/Mount");
    return () => {
      console.log("This will be called on when component will be UNMOUNTED");
    };
  }, []);

  // componentDidUpdate = async (previousProps, previousState) => {
  //   console.log("Component Did Update");
  //   localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
  //   console.log("Old State - " + previousState.studentCount);
  //   console.log("New State - " + this.state.studentCount);

  //   if (previousState.studentCount < this.state.studentCount) {
  //     const response = await getRandomUser();
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [
  //           ...prevState.studentList,
  //           {
  //             name: response.data.first_name + " " + response.data.last_name,
  //           },
  //         ],
  //       };
  //     });
  //   } else if (previousState.studentCount > this.state.studentCount) {
  //     this.setState((prevState) => {
  //       return {
  //         studentList: [],
  //       };
  //     });
  //   }
  // };

  // componentWillUnmount() {
  //   console.log("Component Will Unmount");
  // }

  const handleAddStudent = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: prevState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudents = () => {
    setState((prevState) => {
      return {
        ...prevState,
        studentCount: 0,
      };
    });
  };

  const handleToggleInstructor = () => {
    setState((prevState) => {
      return {
        ...prevState,
        hideInstructor: !prevState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>&nbsp;
        <i
          onClick={handleToggleInstructor}
          className={`btn btn-success btn-sm ${
            state.hideInstructor ? "bi bi-toggle-off" : "bi bi-toggle-on"
          }`}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <Instructor instructor={state.instructor} />
        ) : null}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Feedback</span>
        <br />
        <input
          type="text"
          placeholder="Name..."
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
          }}
        ></input>{" "}
        Value: {inputName}
        <br />
        <textarea
          placeholder="Feedback..."
          value={inputFeedback}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
        ></textarea>{" "}
        Value: {inputFeedback}
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span> <br />
        <div>Student Count: {state.studentCount}</div>
        <button onClick={handleAddStudent} className="btn btn-success btn-sm">
          Add Student
        </button>
        &nbsp;
        <button
          onClick={handleRemoveAllStudents}
          className="btn btn-danger btn-sm"
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CyclOpediaFuncPage;
