import { faAdd, faLongArrowAltRight, faTrashAlt, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import OptionsLogo from "../../assets/svg/options.svg";
import ReactModal from "react-modal";
import RecipeSelector from "../RecipeSelector";
import { addShoppingList, getShoppingLists, deleteShoppingLists } from "../../services/shopping_list_service";
import { getShoppingListItems, updateShoppingListItems } from "../../services/shopping_list_item_service";
import { toast } from "react-toastify";
import themes from "../../common/theme";

function ShoppingListContent() {
  const [progress, setProgress] = useState('0');
  const [openRecipeSelectorModal, setRecipeSelectorModal] = useState(false);
  const [selectedList, setSelectedList] = useState({
    name: 'Shopping List'
  });
  const [list, setList] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getShoppingListData();
  }, []);

  async function check(selectedTodo) {
    const updateItem = await updateShoppingListItems(selectedTodo.id, {
      isDone: !selectedTodo.is_done
    });

    const updatedTodos = todos.map((t) => {
      if(t.id === selectedTodo.id) {
        return {
          ...t,
          is_done: updateItem.data.is_done
        }
      }

      return t;
    });

    setProgress(calculateCompletionPercentage(updatedTodos));
    setTodos(updatedTodos);
  }
  
  async function selectList(selectedList) {
    const data = await getShoppingListItems(selectedList.id);
    setTodos(data.data);
    setProgress(calculateCompletionPercentage(data.data));
    setSelectedList(selectedList);
  }

  async function deleteList(e, selectedL) {
    e.stopPropagation();

    if(selectedList.id == selectedL.id) {
      setTodos([]);
      setSelectedList({});
    }

    await deleteShoppingLists(selectedL.id);

    setList(list.filter((l) => {
      if(l.id === selectedL.id) {
        return false
      }

      return true;
    }));
    toast.success('Shopping List Deleted');
  }

  function calculateCompletionPercentage(array) {
    if (array.length === 0) return 0;

    const completedCount = array.reduce((count, obj) => {
        return count + (obj.is_done ? 1 : 0);
    }, 0);

    const completionPercentage = (completedCount / array.length) * 100;
    
    return Math.floor(completionPercentage);
  }

  async function getShoppingListData() {
    const data = await getShoppingLists();
    setList(data.data);
  }

  function closeRecipeSelectorModal() {
    setRecipeSelectorModal(false);
  }

  async function selectRecipe(r) {
    closeRecipeSelectorModal();
    const sl = await addShoppingList(r.id);
    setList([...list, sl.data]);
    toast.success('Shopping List Added');
  }

  return (
    <div className="flex flex-wrap">
      <ReactModal
        isOpen={openRecipeSelectorModal}
        onRequestClose={closeRecipeSelectorModal}
        style={themes.modalStyle}
        contentLabel="Example Modal"
      >
        <RecipeSelector selectHandler={selectRecipe} />
      </ReactModal>

      <div className="w-2/3">
        <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
          {
            todos.length === 0 
              ? <>Items</>
              : <>{selectedList.name} ({progress}%)</>
          }
          
        </div>

        {
          todos.length === 0 
            ? <center>
              <img src={OptionsLogo} className="bg-slate-600 p-10 rounded-lg w-1/3 mt-24" alt="" srcSet="" />
              <div className="mt-6 font-semibold text-xl">
                Select a list from the right pane&nbsp;&nbsp;<FontAwesomeIcon icon={faLongArrowAltRight} /> 
              </div>
            </center>
            : <div className="p-3">
              {
                todos.map((t, i) => <div key={i} onClick={() => check(t)} className="cursor-pointer flex w-full text-left hover:bg-gray-700 p-2 rounded">
                  <div>
                    <input readOnly type="checkbox" checked={t.is_done} name="" id="" />
                  </div>
                  <div>&nbsp;&nbsp;</div>
                  <div className={`${t.is_done ? 'line-through' : ''} flex-grow`}>
                    {t.name}
                  </div>
                </div>
                )
              }
            </div>
        }
        
      </div>
      <div className="w-1/3 h-screen border-l">
        <div className="p-3 dark:bg-gray-800 bg-white shadow-lg text-center text-white font-semibold sticky">
          Shopping Lists
        </div>
        <div className="p-3">
          {
            list.map((l, i) => <div key={i} onClick={() => selectList(l)} className={`mb-2 cursor-pointer flex text-left hover:bg-gray-700 p-2 rounded ${selectedList.id === l.id ? 'bg-slate-600' : ''}`}>
              <div className="flex-grow">
                {l.name}
              </div>

              <div>
                <button onClick={(e) => deleteList(e, l)} className="p-.5 px-1.5 hover:bg-gray-600 rounded">
                  <FontAwesomeIcon icon={faTrashAlt} className='text-xs' title='Delete' />
                </button>
              </div>
            </div>)
          }
          
          <button onClick={() => setRecipeSelectorModal(true)} className="mt-3 w-full dark:bg-gray-800 bg-white p-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faAdd} title='Add' /> New List
          </button>
        </div>
      </div>
    </div>
  );
}
  
  export default ShoppingListContent;
  