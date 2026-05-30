"use client";

import { Button } from "@/src/components/ui/button";
import { ContactState, sendContactMessage } from "@/src/lib/actions/contact";
import { useActionState } from "react";

const initialState: ContactState = {
  success: false,
  values: {
    name: "",
    email: "",
    subject: "",
    category: "Support",
    message: "",
  },
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialState,
  );

  const v = state.values ?? initialState.values;

  // Shared design style definitions for consistent clean rendering
  const fieldClasses =
    "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-200 disabled:opacity-60 disabled:bg-gray-50";
  const labelClasses =
    "text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 ml-1";
  const errorClasses =
    "text-xs font-medium text-red-500 mt-1.5 ml-1 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-200";

  return (
    <main className="min-h-screen bg-gray-50/50 text-gray-800 antialiased flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/40 p-8 sm:p-10 transition-all">
        {/* Header Section */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Support Active
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Get in touch
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Have questions? We usually respond within 24–48 hours.
          </p>
        </div>

        {/* Form Container */}
        <form action={formAction} className="space-y-5">
          {/* 2-Column Row for Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* NAME FIELD */}
            <div className="flex flex-col">
              <label className={labelClasses}>Your Name</label>
              <input
                name="name"
                type="text"
                disabled={isPending}
                defaultValue={v?.name}
                placeholder="John Doe"
                className={fieldClasses}
              />
              {state.errors?.name && (
                <p className={errorClasses}>⚠️ {state.errors.name[0]}</p>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className="flex flex-col">
              <label className={labelClasses}>Email Address</label>
              <input
                name="email"
                type="email"
                disabled={isPending}
                defaultValue={v?.email}
                placeholder="you@example.com"
                className={fieldClasses}
              />
              {state.errors?.email && (
                <p className={errorClasses}>⚠️ {state.errors.email[0]}</p>
              )}
            </div>
          </div>

          {/* SUBJECT FIELD */}
          <div className="flex flex-col">
            <label className={labelClasses}>Subject</label>
            <input
              name="subject"
              type="text"
              disabled={isPending}
              defaultValue={v?.subject}
              placeholder="How can we help?"
              className={fieldClasses}
            />
            {state.errors?.subject && (
              <p className={errorClasses}>⚠️ {state.errors.subject[0]}</p>
            )}
          </div>

          {/* CATEGORY FIELD */}
          <div className="flex flex-col">
            <label className={labelClasses}>Topic Category</label>
            <div className="relative">
              <select
                name="category"
                disabled={isPending}
                defaultValue={v?.category}
                className={`${fieldClasses} appearance-none cursor-pointer pr-10`}
              >
                <option value="Support">Technical Support</option>
                <option value="Bug Report">Report a Bug</option>
                <option value="Feature Request">Request a Feature</option>
                <option value="Business">Business Partnership</option>
                <option value="Other">Something Else</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {state.errors?.category && (
              <p className={errorClasses}>⚠️ {state.errors.category[0]}</p>
            )}
          </div>

          {/* MESSAGE FIELD */}
          <div className="flex flex-col">
            <label className={labelClasses}>Your Message</label>
            <textarea
              name="message"
              disabled={isPending}
              defaultValue={v?.message}
              rows={4}
              placeholder="Tell us details about your inquiry..."
              className={`${fieldClasses} resize-none`}
            />
            {state.errors?.message && (
              <p className={errorClasses}>⚠️ {state.errors.message[0]}</p>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full  text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-gray-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending Message...</span>
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </div>

          {/* SUCCESS STATUS PANEL */}
          {state.success && (
            <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-xl text-green-800 text-sm flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
              <span className="text-base">🎉</span>
              <div>
                <p className="font-semibold">Message sent successfully!</p>
                <p className="text-xs text-green-700/80 mt-0.5">
                  We'll review your submission and reach out shortly.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
