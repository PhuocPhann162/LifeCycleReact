import React, { useEffect } from "react";

const InstructorFunc = (props) => {

  useEffect(() => {
    return () => {
      console.log("Instructor - UNMOUNTED");
    }
  })

  return (
    <div>
      Name: {props.instructor.name} <br />
      Email: {props.instructor.email} <br />
      Phone: {props.instructor.phone} <br />
    </div>
  );
};

export default InstructorFunc;
