"use client"
import { useState } from "react"

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false)
  const [input, setInput] = useState("")

  const correctPassword = process.env.NEXT_PUBLIC_STUDIO_PASSWORD || "luxskin123"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input === correctPassword) setAuthorized(true)
    else alert("Incorrect password")
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fff8ec]">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 text-center w-80"
        >
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Enter Admin Password</h1>
          <input
            type="password"
            placeholder="Password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700 focus:ring-2 focus:ring-[#D4AF37]"
          />
          <button
            type="submit"
            className="w-full bg-[#D4AF37] text-white py-2 rounded-lg hover:bg-[#b8952e] transition"
          >
            Enter
          </button>
        </form>
      </div>
    )
  }

  return <>{children}</>
}
