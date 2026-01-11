import React from "react";
import { useNavigate } from "react-router-dom";
import "./InvoicePage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- Import your assets ---
import emailIcon from "../assets/email-icon-dark.jpg";
import printIcon from "../assets/print-icon.jpg";
import downloadIcon from "../assets/download-icon.png";

// --- MOCK DATA ---
const mockInvoiceData = {
  invoiceNumber: "INV-2025-001234",
  bookingId: "STM-789456",
  issueDate: "6/6/2025",
  status: "Paid",
  company: {
    name: "Staymaster",
    tagline: "Premium Vacation Rentals",
    address: "1234 Business Ave, Suite 100\nLos Angeles, CA 90210",
    contact: "contact@staymaster.com\n+1 (800) 123-STAY",
  },
  billTo: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
  },
  property: {
    name: "Ocean View Villa",
    address: "123 Oceanfront Drive, Malibu, CA 90210",
    checkIn: "May 30, 2025",
    checkOut: "June 6, 2025",
    nights: 7,
    guests: 4,
  },
  charges: {
    accommodation: 2100.0,
    cleaningFee: 150.0,
    serviceFee: 210.0,
    feedbackDiscount: -210.0,
    taxesAndFees: 188.7,
    securityDeposit: 500.0,
  },
  payment: {
    method: "•••• •••• •••• 1234",
    transactionId: "TXN-STM-789456",
    date: "6/6/2025",
    status: "Completed",
  },
  securityDepositRefund: {
    status: "Processing Refund",
    expected: "3-5 business days",
  },
};

const InvoicePage = ({ invoiceData = mockInvoiceData }) => {
  const navigate = useNavigate();

  // Calculate totals
  const subtotal =
    invoiceData.charges.accommodation +
    invoiceData.charges.cleaningFee +
    invoiceData.charges.serviceFee;

  const totalAmount =
    subtotal + invoiceData.charges.feedbackDiscount + invoiceData.charges.taxesAndFees;

  const totalPaid = totalAmount + invoiceData.charges.securityDeposit;

  // Helper to format currency
  const formatCurrency = (amount) =>
    amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

  const formatNegativeCurrency = (amount) => `-${formatCurrency(Math.abs(amount))}`;

  // Direct PDF Download Function
  const handleDownloadPDF = async () => {
    try {
      // Hide elements for clean PDF
      const actionBar = document.querySelector(".invoice-actions-bar");
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");

      if (actionBar) actionBar.style.display = "none";
      if (header) header.style.display = "none";
      if (footer) footer.style.display = "none";

      const invoiceContent = document.querySelector(".invoice-page").cloneNode(true);

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice-${invoiceData.invoiceNumber}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: white;
              color: #000;
              line-height: 1.6;
            }
            .invoice-page { padding: 20px; max-width: 900px; margin: 0 auto; }
            .invoice-container { background: white; border: none; box-shadow: none; padding: 0; }
            .invoice-actions-bar { display: none; }
            .company-logo {
              width: 48px; height: 48px; background-color: #04A286; color: white;
              font-size: 1.75rem; font-weight: bold; display: flex;
              align-items: center; justify-content: center; border-radius: 8px;
            }
            .invoice-top-strip{
              background:#eefaf7; padding:24px; border-radius:12px; margin-bottom:16px;
            }
            .invoice-header { display: flex; justify-content: space-between; gap: 16px; }
            .company-info { display: flex; gap: 1rem; }
            .invoice-title-section h1 { font-size: 2.5rem; margin-bottom: 1rem; }
            .status-pill {
              background-color: #d4edda; color: #04A286; padding: 0.35rem 0.8rem;
              border-radius: 20px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
            }
            .divider { border: none; border-top: 1px solid #eee; margin: 1.5rem 0; }
            .charge-item, .total-row, .subtotal-row {
              display: flex; justify-content: space-between; padding: 0.75rem 0;
              border-bottom: 1px solid #eee;
            }
            .total-paid-row {
              background-color: #eefaf7; padding: 1rem; border-radius: 8px; margin-top: 1rem;
            }
            h3 { color: #04A286; margin: 1.5rem 0 1rem 0; }
          </style>
        </head>
        <body>
          ${invoiceContent.outerHTML}
        </body>
        </html>
      `);

      printWindow.document.close();

      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 500);

      setTimeout(() => {
        if (actionBar) actionBar.style.display = "";
        if (header) header.style.display = "";
        if (footer) footer.style.display = "";
      }, 100);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert("PDF download failed. Please try again.");
    }
  };

  // Print Function
  const handlePrint = () => {
    const actionBar = document.querySelector(".invoice-actions-bar");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    if (actionBar) actionBar.style.display = "none";
    if (header) header.style.display = "none";
    if (footer) footer.style.display = "none";

    const originalTitle = document.title;
    document.title = `Invoice-${invoiceData.invoiceNumber}`;

    window.print();

    setTimeout(() => {
      document.title = originalTitle;
      if (actionBar) actionBar.style.display = "";
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    }, 100);
  };

  // Email Function
  const handleEmail = () => {
    const subject = `Invoice ${invoiceData.invoiceNumber} - ${invoiceData.company.name}`;
    const body = `Dear ${invoiceData.billTo.name},

Please find your invoice details below:

Invoice Number: ${invoiceData.invoiceNumber}
Booking ID: ${invoiceData.bookingId}
Property: ${invoiceData.property.name}
Total Amount: ${formatCurrency(totalPaid)}
Status: ${invoiceData.status}

Thank you for choosing ${invoiceData.company.name}!

Best regards,
${invoiceData.company.name} Team`;

    const mailtoLink = `mailto:${invoiceData.billTo.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_self");
  };

  return (
    <>
      <Header />

      <div className="invoice-page">
        {/* Action Bar */}
        <div className="invoice-actions-bar">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Feedback
          </button>

          <div className="action-buttons">
            <button className="action-btn email-btn" onClick={handleEmail}>
              <img src={emailIcon} alt="Email" /> Email
            </button>

            <button className="action-btn print-btn" onClick={handlePrint}>
              <img src={printIcon} alt="Print" /> Print
            </button>

            <button className="action-btn download-btn" onClick={handleDownloadPDF}>
              <img src={downloadIcon} alt="Download" /> Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Container */}
        <div className="invoice-container">
          {/* TOP STRIP (IMAGE LIKE) */}
          <div className="invoice-top-strip">
            <header className="invoice-header">
              <div className="company-info">
                <div className="company-logo">S</div>

                <div className="company-details">
                  <h2>{invoiceData.company.name}</h2>
                  <p className="company-tagline">{invoiceData.company.tagline}</p>

                  <div className="company-address">
                    {invoiceData.company.address.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>

                  <div className="company-contact">
                    {invoiceData.company.contact.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="invoice-title-section">
                <h1>INVOICE</h1>

                <div className="invoice-meta">
                  <div className="meta-row">
                    <span>Invoice #:</span>
                    <strong>{invoiceData.invoiceNumber}</strong>
                  </div>
                  <div className="meta-row">
                    <span>Booking ID:</span>
                    <strong>{invoiceData.bookingId}</strong>
                  </div>
                  <div className="meta-row">
                    <span>Issue Date:</span>
                    <strong>{invoiceData.issueDate}</strong>
                  </div>
                </div>

                <div className="status-container">
                  <span className="status-pill paid">{invoiceData.status}</span>
                </div>
              </div>
            </header>
          </div>

          <hr className="divider" />

          {/* Details Section */}
          <section className="invoice-details-section">
            <div className="detail-block">
              <h3>Bill To:</h3>
              <div className="detail-content">
                <p>{invoiceData.billTo.name}</p>
                <p>{invoiceData.billTo.email}</p>
                <p>{invoiceData.billTo.phone}</p>
              </div>
            </div>

            <div className="detail-block">
              <h3>Property Details:</h3>
              <div className="detail-content">
                <p className="property-name">{invoiceData.property.name}</p>
                <p className="property-address">{invoiceData.property.address}</p>

                <div className="stay-details">
                  <div className="stay-row">
                    <span>Check-in:</span>
                    <span>{invoiceData.property.checkIn}</span>
                  </div>
                  <div className="stay-row">
                    <span>Check-out:</span>
                    <span>{invoiceData.property.checkOut}</span>
                  </div>
                  <div className="stay-row">
                    <span>Nights:</span>
                    <span>{invoiceData.property.nights}</span>
                  </div>
                  <div className="stay-row">
                    <span>Guests:</span>
                    <span>{invoiceData.property.guests}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Charges Breakdown */}
          <section className="charges-breakdown">
            <h3>Charges Breakdown</h3>

            <div className="charge-item">
              <div className="charge-desc">
                <p>Accommodation ({invoiceData.property.nights} nights)</p>
                <small>$300.00 per night</small>
              </div>
              <span className="charge-amount">
                {formatCurrency(invoiceData.charges.accommodation)}
              </span>
            </div>

            <div className="charge-item">
              <div className="charge-desc">
                <p>Cleaning Fee</p>
              </div>
              <span className="charge-amount">
                {formatCurrency(invoiceData.charges.cleaningFee)}
              </span>
            </div>

            <div className="charge-item">
              <div className="charge-desc">
                <p>Service Fee</p>
              </div>
              <span className="charge-amount">
                {formatCurrency(invoiceData.charges.serviceFee)}
              </span>
            </div>

            <div className="subtotal-row">
              <div className="charge-desc">
                <p>Subtotal</p>
              </div>
              <strong className="charge-amount">{formatCurrency(subtotal)}</strong>
            </div>

            <div className="charge-item discount-item">
              <div className="charge-desc">
                <p>Feedback Discount (10%)</p>
              </div>
              <span className="charge-amount discount-amount">
                {formatNegativeCurrency(invoiceData.charges.feedbackDiscount)}
              </span>
            </div>

            <div className="charge-item">
              <div className="charge-desc">
                <p>Taxes & Fees</p>
              </div>
              <span className="charge-amount">
                {formatCurrency(invoiceData.charges.taxesAndFees)}
              </span>
            </div>

            <div className="total-row">
              <div className="charge-desc">
                <p>Total Amount</p>
              </div>
              <strong className="charge-amount">{formatCurrency(totalAmount)}</strong>
            </div>

            <div className="charge-item">
              <div className="charge-desc">
                <p>Security Deposit (Refundable)</p>
              </div>
              <span className="charge-amount">
                {formatCurrency(invoiceData.charges.securityDeposit)}
              </span>
            </div>

            <div className="total-paid-row">
              <div className="charge-desc">
                <p>Total Paid</p>
              </div>
              <strong className="charge-amount total-paid-amount">
                {formatCurrency(totalPaid)}
              </strong>
            </div>
          </section>

          <hr className="divider" />

          {/* Payment Details */}
          <section className="payment-details-section">
            <div className="detail-block">
              <h3>Payment Information</h3>
              <div className="info-grid">
                <div className="info-row">
                  <span>Payment Method:</span>
                  <strong>{invoiceData.payment.method}</strong>
                </div>
                <div className="info-row">
                  <span>Transaction ID:</span>
                  <strong>{invoiceData.payment.transactionId}</strong>
                </div>
                <div className="info-row">
                  <span>Payment Date:</span>
                  <strong>{invoiceData.payment.date}</strong>
                </div>
                <div className="info-row">
                  <span>Status:</span>
                  <span className="status-pill completed">{invoiceData.payment.status}</span>
                </div>
              </div>
            </div>

            <div className="detail-block">
              <h3>Security Deposit</h3>
              <div className="info-grid">
                <div className="info-row">
                  <span>Amount Held:</span>
                  <strong>{formatCurrency(invoiceData.charges.securityDeposit)}</strong>
                </div>
                <div className="info-row">
                  <span>Status:</span>
                  <span className="status-pill processing">
                    {invoiceData.securityDepositRefund.status}
                  </span>
                </div>
                <div className="info-row">
                  <span>Expected Refund:</span>
                  <strong>{invoiceData.securityDepositRefund.expected}</strong>
                </div>
              </div>
            </div>
          </section>

          <hr className="divider" />

          {/* Terms & Conditions */}
          <section className="terms-conditions">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>
                Security deposit will be refunded within 3-5 business days after checkout,
                subject to property inspection.
              </li>
              <li>Cancellation policy and terms as agreed upon at time of booking apply.</li>
              <li>For questions regarding this invoice, please contact our support team.</li>
              <li>This is an electronically generated invoice and does not require a physical signature.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="invoice-footer">
            <p>Thank you for choosing Staymaster for your vacation rental needs!</p>
            <p>We hope you had a wonderful stay and look forward to hosting you again.</p>
          </footer>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InvoicePage;
