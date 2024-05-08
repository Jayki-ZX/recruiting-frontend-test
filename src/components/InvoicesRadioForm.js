export default function InvoicesRadioForm({ invoices, selectedInvoice, setSelectedInvoice, Child }) {
    return (
      <fieldset>
        {invoices.map(invoice => (
          <Child key={invoice.id} invoice={invoice}
            selectedInvoice={selectedInvoice} 
            setSelectedInvoice={setSelectedInvoice}/>
        ))}
      </fieldset>)
}