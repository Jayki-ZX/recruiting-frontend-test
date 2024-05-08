import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Modal from './Modal';

import PendingInvoice from './components/PendingInvoice';
import CreditNote from './components/CreditNote'
import InvoicesRadioForm from './components/InvoicesRadioForm';

function App() {
  const [pendingInvoices, setPendingInvoices] = useState([])
  const [creditNotes, setCreditNotes] = useState([])
  const [filterCreditNotes, setFilteredCreditNotes] = useState([])
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [selectedCreditNote, setSelectedCreditNote] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAssign = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if(selectedInvoice) {
      setSelectedCreditNote(null);
      setFilteredCreditNotes(creditNotes.filter(cr => cr.reference === selectedInvoice))
    }
  }, [selectedInvoice, creditNotes])


  useEffect(() => {
    axios.get('https://recruiting.api.bemmbo.com/invoices/pending')
      // Si la API ofrece la opción filtrar por el tipo de factura, se podría minimizar el payload de
      // esta request (pensando en el caso donde se tengan demasiadas facturas de todos los tipos)
      .then(resp => {
        setPendingInvoices(
          resp.data.filter(factura => factura.type === 'received')
        );
        setCreditNotes(
          resp.data.filter(factura => factura.type === 'credit_note')
        );
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <div className="App content-center w-7/12 mx-auto">
      <form  
        onSubmit={handleAssign}>
        <div className='font-bold pb-2'>Invoices</div>
        {/* Menu facturas pendientes */}
        <InvoicesRadioForm
          invoices={pendingInvoices}
          selectedInvoice={selectedInvoice}
          setSelectedInvoice={setSelectedInvoice}
          Child={PendingInvoice} />

        {/* Menu notas de credito */}
        {pendingInvoices &&
        <div className='pt-10'>
          <div className='font-bold pb-2'>Credit notes</div>
          <InvoicesRadioForm
            invoices={filterCreditNotes}
            selectedInvoice={selectedCreditNote}
            setSelectedInvoice={setSelectedCreditNote}
            Child={CreditNote} />
        </div>}
        
        {/* Boton de asignacion */}
        {selectedInvoice && selectedCreditNote && 
          <button type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
          Asignar
        </button>}

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex items-center justify-center">
              <FaCheckCircle className="text-green-500 text-3xl" />
          </div>
          <p>Asignación completada para factura {selectedInvoice} y nota de crédito {selectedCreditNote}.</p>

        </Modal>
      </form>
    </div>
  );
}

export default App;
