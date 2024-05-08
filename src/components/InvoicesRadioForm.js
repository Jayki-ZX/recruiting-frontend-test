export default function InvoicesRadioForm({ invoices, selectedInvoice, setSelectedInvoice, Child }) {
    return (
      // Entrega un radio form para invoices con el formato indicado por el componente Child
      <fieldset>
        {invoices.map(invoice => (
          <Child key={invoice.id} invoice={invoice}
            selectedInvoice={selectedInvoice} 
            setSelectedInvoice={setSelectedInvoice}/>
        ))}
      </fieldset>)
}