import React, { useState } from 'react';
import { createStudent } from '../api';

const AddStudentForm = ({ onAddStudent }) => {
  const [studentData, setStudentData] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    dob: '',
    grades: [
      { module_name: 'Module 1', grade: '' },
      { module_name: 'Module 2', grade: '' },
      { module_name: 'Module 3', grade: '' }
    ]
  });

  // Handle input change for student details and grades
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      setStudentData({ ...studentData, [name]: value });
    } else if (name.startsWith('grade_')) {
      const index = parseInt(name.split('_')[1]) - 1;
      const newGrades = [...studentData.grades];
      newGrades[index].grade = value;
      setStudentData({ ...studentData, grades: newGrades });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDob = studentData.dob.split('-').reverse().join('/'); // Converts DD/MM/YYYY to YYYY-MM-DD
    console.log(formattedDob)
    // Construct the data to send to the API
    const dataToSend = {
      student: {
        student_id: studentData.student_id,
        first_name: studentData.first_name,
        last_name: studentData.last_name,
        dob: formattedDob
      },
      grades: studentData.grades.map((grade) => ({
        module_name: grade.module_name,
        grade: parseFloat(grade.grade), // Ensure grade is a number
      })),
    };
  
    try {
      // Send the student data to the API
      const response = await createStudent(dataToSend);
      
      if (response.status === 201) {
        onAddStudent(response.data);
        alert('Student added successfully!');
      }
    } catch (error) {
      console.error("There was an error adding the student:", error);
      alert('Failed to add student.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <div>
          <label className="block">Student ID</label>
          <input
            type="text"
            name="student_id"
            value={studentData.student_id}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">First Name</label>
          <input
            type="text"
            name="first_name"
            value={studentData.first_name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            type="text"
            name="last_name"
            value={studentData.last_name}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
      </div>
      <div>
        <label className="block">Module 1 Grade</label>
        <input
          type="number"
          name="grade_1"
          value={studentData.grades[0].grade}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Module 2 Grade</label>
        <input
          type="number"
          name="grade_2"
          value={studentData.grades[1].grade}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Module 3 Grade</label>
        <input
          type="number"
          name="grade_3"
          value={studentData.grades[2].grade}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Add Student</button>
    </form>
  );
};

export default AddStudentForm;
