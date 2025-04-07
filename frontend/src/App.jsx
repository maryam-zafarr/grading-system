import React, { useEffect, useState } from "react";
import { getAverageResults } from "./api";
import StudentTable from "./components/StudentTable";
import SearchBar from "./components/SearchBar";
import AddStudentForm from "./components/AddStudentForm";
import Modal from "./components/Modal";
import './index.css';

function App() {
  // State variables
  const [averages, setAverages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classAvg, setClassAvg] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedAvg, setSelectedAvg] = useState(null);

  // Fetch average results for all students
  useEffect(() => {
    async function fetchData() {
      const avgRes = await getAverageResults();
      setAverages(avgRes.data.students);
      setClassAvg(avgRes.data.class_average);
    }
    fetchData();
  }, []);


  // Fetch average results for selected students
  useEffect(() => {
    if (selectedStudents.length > 0) {
      const selectedAvgs = averages.filter(s => selectedStudents.includes(s.student_id)).map(s => s.average_grade);
      const combinedAvg = selectedAvgs.reduce((sum, avg) => sum + avg, 0) / selectedAvgs.length;
      setSelectedAvg(combinedAvg);
    } else {
      setSelectedAvg(null);
    }
  }, [selectedStudents, averages]);


  // Filter students based on search term
  const filtered = averages.filter((s) =>
    `${s.first_name} ${s.last_name} ${s.student_id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Add or removes student from selectedStudents array
  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId) 
        : [...prev, studentId]
    );
  };


  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold my-12">Student Performance Dashboard</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-400">Add Record</button>
      </div>

      <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="my-4 p-4 bg-blue-100 rounded-lg text-md">
        <p><span className="font-medium">Class Average:</span> {classAvg.toFixed(2)}%</p>
        {selectedAvg && ( <p className="mt-2"><span className="font-medium">Selected Students Average:</span> {selectedAvg.toFixed(2)}%</p>)}
      </div>

      <StudentTable students={filtered} selectedStudents={selectedStudents} onSelectStudent={toggleStudentSelection} />
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddStudentForm onAddStudent={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;