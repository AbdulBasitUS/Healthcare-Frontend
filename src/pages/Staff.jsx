import { useEffect, useState } from 'react';
import { addStaff, getStaff } from '../services/staffService';
import { toast } from 'react-toastify';

export default function Staff() {
  const [form, setForm] = useState({
    name: '', staffId: '', role: '', shiftPreference: '', contact: ''
  });
  const [staffList, setStaffList] = useState([]);

  const fetchStaff = async () => {
    const res = await getStaff();
    setStaffList(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStaff(form);
    setForm({ name: '', staffId: '', role: '', shiftPreference: '', contact: '' });
    fetchStaff();
    toast.success('Staff added successfully!');
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="">
      <h2 className="">Add Staff</h2>
      <form onSubmit={handleSubmit} className="">
        <input placeholder="Name" className="" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Staff ID" className="" value={form.staffId}
          onChange={(e) => setForm({ ...form, staffId: e.target.value })} />
        <select className="" value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="">Select Role</option>
          <option>Doctor</option>
          <option>Nurse</option>
          <option>Technician</option>
        </select>
        <select className="" value={form.shiftPreference}
          onChange={(e) => setForm({ ...form, shiftPreference: e.target.value })}>
          <option value="">Shift Preference</option>
          <option>Morning</option>
          <option>Afternoon</option>
          <option>Night</option>
        </select>
        <input placeholder="Contact" className="" value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })} />
        <button className="">Add Staff</button>
      </form>

      <h2 className="">All Staff</h2>
      <table className="">
        <thead>
          <tr className="">
            <th className="">Name</th>
            <th className="">ID</th>
            <th className="">Role</th>
            <th className="">Shift</th>
            <th className="">Contact</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((s) => (
            <tr key={s._id}>
              <td className="">{s.name}</td>
              <td className="">{s.staffId}</td>
              <td className="">{s.role}</td>
              <td className="">{s.shiftPreference}</td>
              <td className="">{s.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
