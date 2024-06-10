import { deleteUser, getUsers } from '../../../services/user_service';
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { DateTime } from "luxon";
import { toast } from "react-toastify";
import ReactModal from 'react-modal';
import themes from '../../../common/theme';
import Confirm from '../../Confirm';

function UserManagementContent() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const selectedUser = useRef({});
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    getUsersData();
  }, []);

  function handlePageClick(e) {
    getUsersData(e.selected + 1);
  }

  async function getUsersData(page = 1) {
    const data = await getUsers(page);
    setUsers(data.data.data);
    setTotalPage(data.data.totalPages);
  }

  async function deleteUserHandler() {
    await deleteUser(selectedUser.current.id);
    getUsersData();
    closeModal();
    toast.success('User deleted successfully');
  }

  async function confirmDelete(u) {
    setOpenModal(true);
    selectedUser.current = u;
  }

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <div>
      <ReactModal 
        isOpen={openModal}
        style={themes.modalStyle}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <Confirm title={'Delete this user?'} cancelHandler={closeModal} confirmHandler={() => deleteUserHandler()} />
      </ReactModal>
      <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
        Users Management
      </div>
      
      <div className="p-6">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Active Sessions
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Favourites
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Meal Plans
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Shopping Lists
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((u, i) => 
                      <tr key={i} className="bg-white dark:bg-gray-800">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {u.username}
                          </th>
                          <td className="px-6 py-4">
                            {u.sessions.length}
                          </td>
                          <td className="px-6 py-4">
                            {DateTime.fromISO(u.created_at).toFormat('yyyy mm dd HH:mm:ss')}
                          </td>
                          <td className="px-6 py-4">
                            {u.favourites.length}
                          </td>
                          <td className="px-6 py-4">
                            {u.meal_plans.length}
                          </td>
                          <td className="px-6 py-4">
                            {u.shopping_lists.length}
                          </td>
                          <td className="px-6 py-4">
                            <button type="button" onClick={() => confirmDelete(u)} className="text-blue-400 hover:text-blue-600">
                              Delete
                            </button>
                          </td>
                      </tr>
                    )
                  }
                </tbody>
            </table>
        </div>
      </div>

      <div className='mt-5'>
        <ReactPaginate
          className='react-paginate'
          breakLabel="..."
          nextLabel=">>"
          previousLabel="<<"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default UserManagementContent
