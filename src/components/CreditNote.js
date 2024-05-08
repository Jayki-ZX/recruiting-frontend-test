export default function CreditNote({ invoice, selectedInvoice, setSelectedInvoice }) {
    return (
      <div key={invoice.id}
        className={`${
          selectedInvoice === invoice.id ? "bg-indigo-200" : "bg-white"
      } active:bg-indigo-200 items-center flex justify-between w-full p-1 p-4 border first:rounded-t-lg last:rounded-b-lg`}>
          <div>
            <input className='mr-2' type="radio" name="invoice" onChange={(e) => setSelectedInvoice(e.target.value)}
              value={invoice.id}/>
            {invoice.id} <span className='font-light'>({invoice.organization_id}) </span>
          </div>
          <div className="text-center">
            {invoice.amount} {invoice.currency}
          </div>
          <div className="text-right">
            <span className='text-slate-500'>{invoice.reference}</span>
          </div>
      </div>)
}