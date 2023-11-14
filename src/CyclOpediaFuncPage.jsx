import React, { useEffect, useId, useRef, useState } from "react";
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

  const totalRender = useRef(0);
  const prevStudentCount = useRef(0);
  const feedbackInputRef = useRef(null);

  const id = useId();

  const [inputName, setInputName] = useState("");
  const [inputFeedback, setInputFeedback] = useState("");

  useEffect(() => {
    totalRender.current = totalRender.current + 1;
    console.log("render" + totalRender.current);
  });

  useEffect(() => {
    // console.log("This will be called on Initial/first Render/Mount");
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
      "This will be called on whenever value of studentCount changes"
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
    if (prevStudentCount.current < state.studentCount) {
      getUser();
    } else if (prevStudentCount.current > state.studentCount) {
      setState((prevState) => {
        return {
          ...prevState,
          studentList: [],
        };
      });
    }
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
    console.log(prevStudentCount.current);
  }, [state.studentCount]);

  useEffect(() => {
    feedbackInputRef.current.focus();
    //console.log("This will be called on Initial/first Render/Mount");
    return () => {
      //console.log("This will be called on when component will be UNMOUNTED");
    };
  }, []);

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
      <div className="p-3">Total Render : {totalRender.current}</div>
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
          id={`${id}-inputName`}
        ></input>{" "}
        <label htmlFor={`${id}-inputName`}>Name Value: </label> {inputName}
        <br />
        <textarea
          placeholder="Feedback..."
          value={inputFeedback}
          ref={feedbackInputRef}
          onChange={(e) => {
            setInputFeedback(e.target.value);
          }}
          id={`${id}-inputFeedback`}
        ></textarea>{" "}
        <label htmlFor={`${id}-inputFeedback`}>Feedback Value: </label> {inputName}
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
