function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
          {children}
        <button onClick={onClose} className="text-white bg-indigo-600 rounded-md hover:text-gray-600">
            Seguir asignando
        </button>
        </div>
      </div>
    );
  }
  
  export default Modal;
  