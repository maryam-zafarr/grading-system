import axios from 'axios';

const BASE_URL = 'http://localhost:8001/api';

// Get all students
export const getAllStudents = () => axios.get(`${BASE_URL}/students/`);

// Get average results
export const getAverageResults = (studentIds = []) => {
  const params = studentIds.map(id => `student_ids=${id}`).join('&');
  return axios.get(`${BASE_URL}/students/average_results/?${params}`);
};

// Create a new student
export const createStudent = (studentData) => {
  return axios.post(`${BASE_URL}/students/`, studentData);
};