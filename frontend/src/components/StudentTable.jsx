export default function StudentTable({ students, selectedStudents, onSelectStudent }) {
  return (
    <table className="w-full mt-4 table-auto">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-2 font-medium"></th>
          <th className="p-2 font-medium">Student ID</th>
          <th className="p-2 font-medium">Name</th>
          <th className="p-2 font-medium">DOB</th>
          <th className="p-2 font-medium">Module 1 Grade</th>
          <th className="p-2 font-medium">Module 2 Grade</th>
          <th className="p-2 font-medium">Module 3 Grade</th>
          <th className="p-2 font-medium">Average</th>
          <th className="p-2 font-medium">Classification</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.student_id} className="border-t hover:bg-gray-50">
            <td className="p-2">
              <input type="checkbox" checked={selectedStudents.includes(s.student_id)} onChange={() => onSelectStudent(s.student_id)} className="h-4 w-4"/>
            </td>
            <td className="p-2">{s.student_id}</td>
            <td className="p-2">{s.first_name} {s.last_name}</td>
            <td className="p-2">{s.dob}</td>

            {/* Module Grades */}
            {s.grades && s.grades.map((grade, index) => (
              <td key={index} className="p-2">{grade.grade.toFixed(2)}%</td>
            ))}

            {/* Average Grade */}
            <td className="p-2">{s.average_grade.toFixed(2)}%</td>

            {/* Classification */}
            <td className={`p-2 ${
              s.classification === 'Distinction' ? 'bg-[#a9abe7]' :
              s.classification === 'Merit' ? 'bg-[#a9d1e7]' :
              s.classification === 'Pass' ? 'bg-[#a9e7c2]' :
              'bg-red-300'
            }`}>
              {s.classification}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}