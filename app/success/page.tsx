import { CheckCircle, Download, ArrowRight } from "lucide-react"
import Stripe from "stripe"

// ✅ Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PaymentSuccess({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {

  const params = await searchParams
  const sessionId = params.session_id


if (!sessionId) {
  return (
    <div>Session ID is required</div>
  )
}

  // ✅ Retrieve session from Stripe
 const session = await stripe.checkout.sessions.retrieve(
  sessionId,
  {
    expand: ["line_items", "customer_details"],
  }
)

  // ✅ Build order details object
  const orderDetails = {
    orderNumber: session.id,
    date: new Date(session.created * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amount: `$${(session.amount_total || 0) / 100}`,
    email: session.customer_details?.email || "N/A",
    receiptUrl: (session as any).invoice_pdf || null, // may exist if invoiced
    items:
      (session.line_items?.data as Stripe.LineItem[]).map((item: Stripe.LineItem) => ({
        name: item.description || "Unnamed Item",
        quantity: item.quantity ?? 0,
        price: `$${(item.amount_total || 0) / 100}`,
      })) || [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 mt-">
      <div className="max-w-2xl  w-full bg-white rounded-2xl shadow-2xl overflow-hidden mt-22">
        {/* ✅ Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 text-center h-[250px] items-center flex flex-col justify-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 animate-bounce">
              <CheckCircle
                className="w-16 h-16 text-green-600"
                strokeWidth={2.5}
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-green-50 text-lg">Thank you for your purchase</p>
        </div>

        {/* ✅ Order Details */}
        <div className="p-8">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Details
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Order Number</p>
                <p className="font-semibold text-gray-800">
                  {orderDetails.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Date</p>
                <p className="font-semibold text-gray-800">
                  {orderDetails.date}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Total Amount</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {orderDetails.amount}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-800">
                  {orderDetails.email}
                </p>
              </div>
            </div>
          </div>

          {/* ✅ Items List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Items Purchased
            </h3>
            <div className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-800">{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Confirmation Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              A confirmation email has been sent to{" "}
              <span className="font-semibold">{orderDetails.email}</span> with
              your order details and receipt.
            </p>
          </div>

          {/* ✅ Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {orderDetails.receiptUrl ? (
              <a
                href={orderDetails.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Receipt
              </a>
            ) : (
              <button
                disabled
                className="flex-1 bg-gray-300 text-gray-600 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
              >
                No Receipt Available
              </button>
            )}
            <a
              href="/"
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
