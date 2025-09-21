import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "../hooks/AccountHooks.jsx";
import "../styles/FloatingModal.css"; // we’ll style modal separately

export default function FloatingButton({ refreshTodos }) {
  const [isOpen, setIsOpen] = useState(false);
  const { accountId } = useAccount();
  console.log(`Account ID = ${accountId}`);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  console.log(`URL => ${API_BASE}`);

  const [formData, setFormData] = useState({
    Title__c: "",
    Description__c: "",
    Priority__c: "Low",
    Due_Date__c: "",
    Is_Completed__c: false,
    Account__c: accountId,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (accountId) {
        setFormData({ ...formData, Account__c: accountId }); // fetch todos when accountId becomes available
      }
    }, [accountId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API_BASE}/create-todo`,
        formData
      );

      //   await axios.post("http://localhost:4321/sf-create", formData); // 👈 your Express API
      setIsOpen(false);
      setFormData({
        Title__c: "",
        Description__c: "",
        Priority__c: "Low",
        Due_Date__c: "",
        Is_Completed__c: false,
        Account__c: accountId,
      });
      refreshTodos(); // 👈 refresh parent ToDo list
    } catch (err) {
      console.error("Error creating todo:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button className="floating-btn" onClick={() => setIsOpen(true)}>
        +
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New To-Do</h2>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input
                type="text"
                name="Title__c"
                placeholder="Title"
                value={formData.Title__c}
                onChange={handleChange}
                required
              />
              <label>Description</label>
              <textarea
                name="Description__c"
                placeholder="Description"
                value={formData.Description__c}
                onChange={handleChange}
              />
              <label>Priority</label>
              <select
                name="Priority__c"
                value={formData.Priority__c}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <label>Due Date</label>
              <input
                type="date"
                name="Due_Date__c"
                value={formData.Due_Date__c}
                onChange={handleChange}
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
