import { useState, useEffect } from 'react';
import { createShift, getShifts } from '../services/shiftService';

export default function Shift() {
  const [form, setForm] = useState({ date: '', type: '', capacity: '' });
  const [shifts, setShifts] = useState([]);

  const fetchShifts = async () => {
    const res = await getShifts();
    console.log('Shifts', res.data)
    setShifts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createShift(form);
    setForm({ date: '', type: '', capacity: '' });
    fetchShifts();
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="">
      <h2 className="">Create Shift</h2>
      <form onSubmit={handleSubmit} className="">
        <input type="date" className="" value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <select className="" value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="">Select Shift</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Night</option>
        </select>
        <input type="number" placeholder="Capacity" className="" value={form.capacity}
          onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        <button className="">Create Shift</button>
      </form>

      <h2 className="">All Shifts</h2>
      <table className="">
        <thead>
          <tr className="">
            <th className="">Date</th>
            <th className="">Type</th>
            <th className="">Capacity</th>
            <th className="">Assigned</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((s) => (
            <tr key={s._id}>
              <td className="">{new Date(s.date).toLocaleDateString()}</td>
              <td className="">{s.type}</td>
              <td className="">{s.capacity}</td>
              <td className="">{s.assignedStaff?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
