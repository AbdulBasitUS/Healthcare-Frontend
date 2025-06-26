import { useEffect, useState } from 'react';
import { getShifts } from '../services/shiftService';
import { markAttendance } from '../services/attendanceService';
import { toast } from 'react-toastify';

export default function Attendance() {
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState('');
  const [staffList, setStaffList] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    getShifts().then(res => setShifts(res.data));
  }, []);

  const loadStaff = async (shiftId) => {
    setSelectedShift(shiftId);
    const shift = shifts.find(s => s._id === shiftId);
    setStaffList(shift?.assignedStaff || []);
  };

  const handleChange = (staffId, field, value) => {
    setStatusMap(prev => ({
      ...prev,
      [staffId]: { ...prev[staffId], [field]: value }
    }));
  };

  const handleSubmit = async () => {
    for (const staff of staffList) {
      const entry = statusMap[staff._id];
      if (!entry?.status) continue;

      await markAttendance({
        shiftId: selectedShift,
        staffId: staff._id,
        status: entry.status,
        remarks: entry.remarks || ''
      });
    }
    toast.success('Attendance marked successfully!');
  };

  return (
    <>
      <div className="">
        <h2 className="">Mark Attendance</h2>

        <select className="" onChange={e => loadStaff(e.target.value)}>
          <option value="">Select Shift</option>
          {shifts.map((shift) => (
            <option key={shift._id} value={shift._id}>
              {shift.type} - {new Date(shift.date).toLocaleDateString()}
            </option>
          ))}
        </select>

        {staffList.length > 0 && (
          <table className="">
            <thead>
              <tr className="">
                <th className="">Name</th>
                <th className="">Role</th>
                <th className="">Status</th>
                <th className="">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s._id}>
                  <td className="">{s.name}</td>
                  <td className="">{s.role}</td>
                  <td className="">
                    <select
                      className=""
                      onChange={(e) => handleChange(s._id, 'status', e.target.value)}
                      value={s.status}
                    >
                      <option value="">--</option>
                      <option>Present</option>
                      <option>Absent</option>
                    </select>
                  </td>
                  <td className="">
                    <input
                      className=""
                      type="text"
                      placeholder="Remarks"
                      onChange={(e) => handleChange(s._id, 'remarks', e.target.value)}
                      value={s.remarks}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {staffList.length > 0 && (
          <button
            onClick={handleSubmit}
            className=""
          >
            Submit Attendance
          </button>
        )}
      </div>
    </>
  );
}
