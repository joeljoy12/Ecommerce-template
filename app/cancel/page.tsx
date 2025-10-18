import { XCircle, RefreshCw, ArrowLeft, HelpCircle } from "lucide-react"
import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config()

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set.")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PaymentCancelled({
  searchParams,
}: {
  searchParams: { session_id?: string }
}) {
  const sessionId = searchParams?.session_id

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-lg text-red-600 font-semibold">
          Missing session ID
        </h1>
      </div>
    )
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "customer_details"],
  })

  const orderDetails = {
    orderNumber: session.id,
    date: new Date(session.created * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    amount: `$${(session.amount_total || 0) / 100}`,
    email: session.customer_details?.email || "N/A",
    items:
      session.line_items?.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        price: `$${(item.amount_total || 0) / 100}`,
      })) || [],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Cancelled Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3 animate-pulse">
              <XCircle className="w-16 h-16 text-red-600" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Cancelled
          </h1>
          <p className="text-red-50 text-lg">
            Your transaction was not completed
          </p>
        </div>

        {/* Order Details */}
        <div className="p-8">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
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
              <div className="col-span-2">
                <p className="text-gray-500 mb-1">Total Amount</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {orderDetails.amount}
                </p>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Items in Cart
            </h3>
            <div className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg opacity-75"
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

          {/* Information Message */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-900 font-medium mb-1">
                  What happened?
                </p>
                <p className="text-sm text-amber-800">
                  Your payment was cancelled and no charges were made to your
                  account. Your items are still saved in your cart.
                </p>
              </div>
            </div>
          </div>

          {/* Common Reasons */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-2">
              Common reasons for cancellation:
            </p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li className="list-disc">Payment was manually cancelled</li>
              <li className="list-disc">Browser or tab was closed during payment</li>
              <li className="list-disc">Session timed out</li>
              <li className="list-disc">Network connection issues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </button>
          </div>

          {/* Help Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-semibold underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
