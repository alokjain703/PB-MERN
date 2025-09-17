const AdminPage = () => {
   

  return (
    <>
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <p>Manage your application settings and users from this page.</p>
    </div>
    
    <div className="mt-4">
      <h3 className="text-xl font-semibold mb-2">User Roles</h3>
      <p>Manage user roles and permissions from this section.</p>
      {/* Add more admin functionalities as needed */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Add User Role</h4>
        <form>
          <input
            type="text"
            placeholder="User ID"
            className="border p-2 rounded mr-2"
          />
          <input
            type="text"
            placeholder="Role Name"
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Role
          </button>
        </form>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Existing Roles</h4>
        <ul className="list-disc list-inside">
          <li>Admin</li>
          <li>Editor</li>
          <li>Viewer</li>
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Remove User Role</h4>
        <form>
          <input
            type="text"
            placeholder="User ID"
            className="border p-2 rounded mr-2"
          />
           <input
            type="text"
            placeholder="Role Name"
            className="border p-2 rounded mr-2"
          />
          <button type="submit" className="bg-red-500 text-white p-2 rounded">
            Remove Role
          </button>
        </form>
      </div>
    </div>
  </>
  );
};

export default AdminPage;
