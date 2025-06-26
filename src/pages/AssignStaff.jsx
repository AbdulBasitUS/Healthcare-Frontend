import { useState, useEffect } from 'react';
import { assignStaff } from '../services/assignService';
import { getStaff } from '../services/staffService';
import { getShifts } from '../services/shiftService';
import { toast } from 'react-toastify';

export default function AssignStaff() {
  const [shifts, setShifts] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState('');
  const [availableStaff, setAvailableStaff] = useState([]);

  useEffect(() => {
    getShifts().then(res => setShifts(res.data));
    getStaff().then(res => setStaffList(res.data));
  }, []);

  const handleShiftSelect = (shiftId) => {
    setSelectedShiftId(shiftId);
    const shift = shifts.find(s => s._id === shiftId);
    const shiftDate = shift?.date?.split('T')[0];

    const assignedStaffIds = shift?.assignedStaff?.map(s => s._id) || [];

    const unassignedStaff = staffList.filter(staff => {
      // Prevent if this staff is already assigned to any shift on the same day
      return !shifts.some(s =>
        new Date(s.date).toISOString().split('T')[0] === shiftDate &&
        s.assignedStaff?.some(a => a._id === staff._id)
      );
    });

    setAvailableStaff(unassignedStaff);
  };

  const handleAssign = async (staffId) => {
    try {
      await assignStaff(selectedShiftId, staffId);
      toast.success('Staff assigned successfully!');
      handleShiftSelect(selectedShiftId); // refresh list
    } catch (err) {
      console.log("ERR", err)
      if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Error: Staff might already be assigned on this day.');
      }
    }
  };

  console.log("availableStaff", availableStaff)

  return (
    <>
      <div className="">
        <h2 className="">Assign Staff to Shift</h2>

        <select className="" onChange={e => handleShiftSelect(e.target.value)}>
          <option value="">Select Shift</option>
          {shifts.map(shift => (
            <option key={shift._id} value={shift._id}>
              {shift.type} - {new Date(shift.date).toLocaleDateString()}
            </option>
          ))}
        </select>

        {selectedShiftId && (
          <div className="">
            <h3 className="">Available Staff</h3>
            <div className="">
              {availableStaff.map(staff => (
                <div key={staff._id} className="">
                  <div>
                    <div className="">{staff.name}</div>
                    <div className="">{staff.role}</div>
                  </div>
                  <button
                    className=""
                    onClick={() => handleAssign(staff._id)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
