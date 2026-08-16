import {
  useEffect,
  useMemo,
  useState,
} from "react"

import AppLayout from "../components/layout/AppLayout"
import PageHeader from "../components/ui/PageHeader"

import {
  subscribeToLiabilities,
  addLiability,
  updateLiability,
} from "../services/liabilityService"

import {
  recordLoanRepayment,
} from "../services/loanRepayment"


/* =====================================
   EMPTY LIABILITY FORM
===================================== */

const emptyForm = {
  name: "",
  type: "Loan",
  lenderName: "",
  principalAmount: "",
  currentBalance: "",
  interestRate: "",
  minimumMonthlyPayment: "",
  termMonths: "",
  startDate: "",
  notes: "",
}


/* =====================================
   EMPTY REPAYMENT FORM
===================================== */

const emptyRepaymentForm = {
  amount: "",
  interestAmount: "0",
  paymentDate:
    new Date()
      .toISOString()
      .split("T")[0],
  notes: "",
}


/* =====================================
   COMPONENT
===================================== */

export default function Liabilities() {

  /* =====================================
     STATE
  ===================================== */

  const [liabilities, setLiabilities] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [showModal, setShowModal] =
    useState(false)

  const [showRepaymentModal, setShowRepaymentModal] =
    useState(false)

  const [selectedLiability, setSelectedLiability] =
    useState(null)

  const [saving, setSaving] =
    useState(false)

  const [repaying, setRepaying] =
    useState(false)

  const [error, setError] =
    useState("")


  /* =====================================
     LIABILITY FORM
  ===================================== */

  const [form, setForm] =
    useState({
      ...emptyForm,
    })


  /* =====================================
     REPAYMENT FORM
  ===================================== */

  const [repaymentForm, setRepaymentForm] =
    useState({
      ...emptyRepaymentForm,
    })


  /* =====================================
     LOAD LIABILITIES
  ===================================== */

  useEffect(() => {

    let unsubscribe = () => {}

    try {

      unsubscribe =
        subscribeToLiabilities(
          (data) => {

            setLiabilities(
              Array.isArray(data)
                ? data
                : []
            )

            setLoading(false)

          }
        )

    } catch (err) {

      console.error(
        "Liability loading error:",
        err
      )

      setError(
        "Unable to load your liabilities."
      )

      setLoading(false)

    }


    return () => {

      if (
        typeof unsubscribe ===
        "function"
      ) {

        unsubscribe()

      }

    }

  }, [])


  /* =====================================
     TOTAL OUTSTANDING
  ===================================== */

  const totalOutstanding =
    useMemo(() => {

      return liabilities.reduce(
        (total, liability) => {

          return (
            total +
            Number(
              liability.currentBalance ||
              liability.outstandingBalance ||
              0
            )
          )

        },
        0
      )

    }, [liabilities])


  /* =====================================
     ACTIVE LIABILITIES
  ===================================== */

  const activeLiabilities =
    useMemo(() => {

      return liabilities.filter(
        (liability) =>
          Number(
            liability.currentBalance ??
            liability.outstandingBalance ??
            0
          ) > 0
      )

    }, [liabilities])


  /* =====================================
     CLEARED LIABILITIES
  ===================================== */

  const clearedLiabilities =
    useMemo(() => {

      return liabilities.filter(
        (liability) =>
          Number(
            liability.currentBalance ??
            liability.outstandingBalance ??
            0
          ) <= 0
      )

    }, [liabilities])


  /* =====================================
     LIABILITY FORM CHANGE
  ===================================== */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

  }


  /* =====================================
     REPAYMENT FORM CHANGE
  ===================================== */

  const handleRepaymentChange = (e) => {

    const {
      name,
      value,
    } = e.target

    setRepaymentForm(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    )

  }


  /* =====================================
     OPEN ADD MODAL
  ===================================== */

  const openAddModal = () => {

    setError("")

    setForm({
      ...emptyForm,
    })

    setShowModal(true)

  }


  /* =====================================
     CLOSE ADD MODAL
  ===================================== */

  const closeAddModal = () => {

    if (saving) {
      return
    }

    setShowModal(false)

    setForm({
      ...emptyForm,
    })

    setError("")

  }


  /* =====================================
     ADD LIABILITY
  ===================================== */

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")


    const principal =
      Number(
        form.principalAmount || 0
      )

    const balance =
      Number(
        form.currentBalance || 0
      )

    const interestRate =
      Number(
        form.interestRate || 0
      )

    const monthlyPayment =
      Number(
        form.minimumMonthlyPayment ||
        0
      )

    const termMonths =
      Number(
        form.termMonths || 0
      )


    /* ================================
       VALIDATION
    ================================= */

    if (!form.name.trim()) {

      setError(
        "Please enter the liability name."
      )

      return

    }


    if (principal <= 0) {

      setError(
        "Original loan amount must be greater than zero."
      )

      return

    }


    if (balance < 0) {

      setError(
        "Outstanding balance cannot be negative."
      )

      return

    }


    if (balance > principal) {

      setError(
        "Outstanding balance cannot be greater than the original amount."
      )

      return

    }


    if (interestRate < 0) {

      setError(
        "Interest rate cannot be negative."
      )

      return

    }


    if (monthlyPayment < 0) {

      setError(
        "Monthly payment cannot be negative."
      )

      return

    }


    if (termMonths < 0) {

      setError(
        "Term cannot be negative."
      )

      return

    }


    setSaving(true)


    try {

      await addLiability({

        name:
          form.name.trim(),

        type:
          form.type,

        lenderName:
          form.lenderName.trim(),

        principalAmount:
          principal,

        currentBalance:
          balance,

        interestRate:
          interestRate,

        minimumMonthlyPayment:
          monthlyPayment,

        termMonths:
          termMonths,

        startDate:
          form.startDate,

        notes:
          form.notes.trim(),

        status:
          balance <= 0
            ? "cleared"
            : "active",

      })


      setShowModal(false)

      setForm({
        ...emptyForm,
      })


    } catch (err) {

      console.error(
        "Add liability error:",
        err
      )

      setError(
        err.message ||
        "Unable to save the liability."
      )

    } finally {

      setSaving(false)

    }

  }


  /* =====================================
     OPEN REPAYMENT MODAL
  ===================================== */

  const openRepaymentModal = (
    liability
  ) => {

    setError("")

    setSelectedLiability(
      liability
    )

    setRepaymentForm({
      ...emptyRepaymentForm,
    })

    setShowRepaymentModal(true)

  }


  /* =====================================
     CLOSE REPAYMENT MODAL
  ===================================== */

  const closeRepaymentModal = () => {

    if (repaying) {
      return
    }

    setShowRepaymentModal(false)

    setSelectedLiability(null)

    setRepaymentForm({
      ...emptyRepaymentForm,
    })

    setError("")

  }


  /* =====================================
     RECORD REPAYMENT
  ===================================== */

  const handleRepayment = async (e) => {

    e.preventDefault()

    setError("")


    if (!selectedLiability) {

      setError(
        "No liability selected."
      )

      return

    }


    const amount =
      Number(
        repaymentForm.amount || 0
      )

    const interest =
      Number(
        repaymentForm.interestAmount ||
        0
      )

    const currentBalance =
      Number(
        selectedLiability.currentBalance ??
        selectedLiability.outstandingBalance ??
        0
      )


    /* ================================
       VALIDATION
    ================================= */

    if (amount <= 0) {

      setError(
        "Enter a repayment amount."
      )

      return

    }


    if (interest < 0) {

      setError(
        "Interest cannot be negative."
      )

      return

    }


    if (interest > amount) {

      setError(
        "Interest cannot be greater than the total payment."
      )

      return

    }


    const principalReduction =
      amount - interest


    if (principalReduction <= 0) {

      setError(
        "The payment must contain some principal reduction."
      )

      return

    }


    if (
      principalReduction >
      currentBalance
    ) {

      setError(
        `Principal repayment cannot exceed the outstanding balance of KSh ${currentBalance.toLocaleString()}.`
      )

      return

    }


    /* =================================
       LINKED ASSET
    ================================= */

    const assetId =
      selectedLiability.linkedAssetId


    if (!assetId) {

      setError(
        "This loan does not have a linked asset account. The repayment cannot be processed because WealthPilot needs to know which account the money is coming from."
      )

      return

    }


    setRepaying(true)


    try {

      /*
        The repayment service handles:

        1. Reducing the liability
        2. Reducing the linked asset
        3. Recording the loan transaction
        4. Recording interest as an expense
        5. Updating repayment information

        Everything happens inside
        one Firestore transaction.
      */

      await recordLoanRepayment({

        liabilityId:
          selectedLiability.id,

        assetId:
          assetId,

        paymentAmount:
          amount,

        principalAmount:
          principalReduction,

        paymentDate:
          repaymentForm.paymentDate,

        reference:
          repaymentForm.notes.trim(),

      })


      /* ================================
         CLOSE MODAL
      ================================= */

      setShowRepaymentModal(false)

      setSelectedLiability(null)

      setRepaymentForm({
        ...emptyRepaymentForm,
      })


    } catch (err) {

      console.error(
        "Loan repayment error:",
        err
      )

      setError(
        err.message ||
        "Unable to record repayment."
      )

    } finally {

      setRepaying(false)

    }

  }


  /* =====================================
     CLEAR LIABILITY
  ===================================== */

  const clearLiability = async (
    liability
  ) => {

    const balance =
      Number(
        liability.currentBalance ??
        liability.outstandingBalance ??
        0
      )


    if (balance <= 0) {
      return
    }


    const confirmed =
      window.confirm(
        `Mark "${liability.name}" as cleared? This will set the outstanding balance to KSh 0.`
      )


    if (!confirmed) {
      return
    }


    setError("")


    try {

      await updateLiability(

        liability.id,

        {

          currentBalance:
            0,

          outstandingBalance:
            0,

          status:
            "cleared",

        }

      )

    } catch (err) {

      console.error(
        "Clear liability error:",
        err
      )

      setError(
        err.message ||
        "Unable to clear the liability."
      )

    }

  }


  /* =====================================
     RENDER
  ===================================== */

  return (

    <AppLayout>

      <PageHeader
        title="Liabilities"
        subtitle="Track loans, debts and other amounts you owe."
      />


      {/* =================================
          SUMMARY
      ================================= */}

      <div className="mb-6 grid gap-4 sm:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Outstanding
          </p>

          <h2 className="mt-2 text-2xl font-bold text-red-600 sm:text-3xl">

            KSh{" "}

            {totalOutstanding.toLocaleString()}

          </h2>

        </div>


        {/* ACTIVE */}

        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Active Liabilities
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">

            {activeLiabilities.length}

          </h2>

        </div>


        {/* CLEARED */}

        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900">

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cleared
          </p>

          <h2 className="mt-2 text-2xl font-bold text-green-600 sm:text-3xl">

            {clearedLiabilities.length}

          </h2>

        </div>

      </div>


      {/* =================================
          MAIN CARD
      ================================= */}

      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900 sm:p-6">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>

            <h2 className="text-lg font-semibold sm:text-xl">
              My Liabilities
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Loans and other amounts you owe.
            </p>

          </div>


          <button
            type="button"
            onClick={openAddModal}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5 sm:py-3"
          >
            + Add Liability
          </button>

        </div>


        {/* =================================
            ERROR
        ================================= */}

        {error && (

          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">

            {error}

          </div>

        )}


        {/* =================================
            LOADING
        ================================= */}

        {loading ? (

          <div className="py-12 text-center text-sm text-slate-500">
            Loading liabilities...
          </div>


        ) : liabilities.length === 0 ? (

          /* =================================
             EMPTY
          ================================= */

          <div className="mt-8 rounded-xl border border-dashed p-8 text-center dark:border-slate-700 sm:p-10">

            <p className="text-base font-medium sm:text-lg">
              No liabilities recorded yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Add a loan or debt to start tracking what you owe.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + Add Your First Liability
            </button>

          </div>


        ) : (

          /* =================================
             LIABILITY LIST
          ================================= */

          <div className="mt-6 space-y-4">

            {liabilities.map(
              (liability) => {

                const balance =
                  Number(
                    liability.currentBalance ??
                    liability.outstandingBalance ??
                    0
                  )

                const principal =
                  Number(
                    liability.principalAmount ??
                    liability.originalAmount ??
                    0
                  )

                const paid =
                  Math.max(
                    0,
                    principal - balance
                  )

                const progress =
                  principal > 0
                    ? Math.min(
                        100,
                        Math.round(
                          (paid /
                            principal) *
                          100
                        )
                      )
                    : 0


                const isCleared =
                  balance <= 0


                return (

                  <div
                    key={liability.id}
                    className="rounded-xl border p-4 dark:border-slate-700 sm:p-5"
                  >

                    {/* HEADER */}

                    <div className="flex flex-wrap items-start justify-between gap-4">

                      <div className="min-w-0">

                        <h3 className="font-semibold">
                          {liability.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                          {liability.type ||
                            "Loan"}

                          {liability.lenderName
                            ? ` • ${liability.lenderName}`
                            : ""}

                        </p>

                      </div>


                      <div className="text-right">

                        <p className="text-lg font-bold">

                          KSh{" "}

                          {balance.toLocaleString()}

                        </p>

                        <p className="text-xs text-slate-500">
                          Outstanding
                        </p>

                      </div>

                    </div>


                    {/* LINKED ACCOUNT */}

                    {liability.linkedAssetName && (

                      <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">

                        Repayment account:{" "}

                        <span className="font-medium text-slate-700 dark:text-slate-300">

                          {liability.linkedAssetName}

                        </span>

                      </div>

                    )}


                    {/* PROGRESS */}

                    <div className="mt-5">

                      <div className="mb-2 flex justify-between text-xs">

                        <span className="text-slate-500">
                          Repayment Progress
                        </span>

                        <span className="font-semibold">
                          {progress}%
                        </span>

                      </div>


                      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">

                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-500"
                          style={{
                            width:
                              `${progress}%`,
                          }}
                        />

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">

                      <div>

                        <span className="text-slate-500">
                          Original Amount
                        </span>

                        <p className="font-medium">

                          KSh{" "}

                          {principal.toLocaleString()}

                        </p>

                      </div>


                      <div>

                        <span className="text-slate-500">
                          Interest
                        </span>

                        <p className="font-medium">

                          {Number(
                            liability.interestRate ||
                            0
                          )}%

                        </p>

                      </div>


                      <div>

                        <span className="text-slate-500">
                          Monthly Payment
                        </span>

                        <p className="font-medium">

                          KSh{" "}

                          {Number(
                            liability.minimumMonthlyPayment ??
                            liability.monthlyPayment ??
                            0
                          ).toLocaleString()}

                        </p>

                      </div>


                      <div>

                        <span className="text-slate-500">
                          Status
                        </span>

                        <p
                          className={`font-semibold ${
                            isCleared
                              ? "text-green-600"
                              : "text-amber-600"
                          }`}
                        >

                          {isCleared
                            ? "Cleared"
                            : "Active"}

                        </p>

                      </div>

                    </div>


                    {/* LAST PAYMENT */}

                    {liability.lastPaymentDate && (

                      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">

                        <div className="flex flex-wrap gap-x-5 gap-y-1">

                          <span>

                            Last payment:{" "}

                            <strong>

                              KSh{" "}

                              {Number(
                                liability.lastPaymentAmount ||
                                0
                              ).toLocaleString()}

                            </strong>

                          </span>


                          <span>

                            Principal:{" "}

                            <strong>

                              KSh{" "}

                              {Number(
                                liability.lastPrincipalReduction ||
                                0
                              ).toLocaleString()}

                            </strong>

                          </span>


                          <span>

                            Interest:{" "}

                            <strong>

                              KSh{" "}

                              {Number(
                                liability.lastPaymentInterest ||
                                0
                              ).toLocaleString()}

                            </strong>

                          </span>


                          <span>

                            Date:{" "}

                            <strong>
                              {liability.lastPaymentDate}
                            </strong>

                          </span>

                        </div>

                      </div>

                    )}


                    {/* NOTES */}

                    {liability.notes && (

                      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                        {liability.notes}
                      </p>

                    )}


                    {/* ACTIONS */}

                    {balance > 0 && (

                      <div className="mt-5 flex flex-wrap justify-end gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            openRepaymentModal(
                              liability
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Make Repayment
                        </button>


                        <button
                          type="button"
                          onClick={() =>
                            clearLiability(
                              liability
                            )
                          }
                          className="rounded-lg px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30"
                        >
                          Mark as Cleared
                        </button>

                      </div>

                    )}

                  </div>

                )

              }
            )}

          </div>

        )}

      </div>


      {/* =================================
          ADD LIABILITY MODAL
      ================================= */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6">

            <div className="mb-6 flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Add Liability
                </h2>

                <p className="text-sm text-slate-500">
                  Record something you owe.
                </p>

              </div>


              <button
                type="button"
                onClick={closeAddModal}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Liability Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Personal Loan"
                  className="w-full rounded-xl border p-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                  required
                />

              </div>


              {/* TYPE */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                >

                  <option value="Loan">
                    Loan
                  </option>

                  <option value="Credit Card">
                    Credit Card
                  </option>

                  <option value="Mortgage">
                    Mortgage
                  </option>

                  <option value="Hire Purchase">
                    Hire Purchase
                  </option>

                  <option value="Payable">
                    Payable
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              {/* LENDER */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Lender / Creditor
                </label>

                <input
                  name="lenderName"
                  value={form.lenderName}
                  onChange={handleChange}
                  placeholder="e.g. Bank / SACCO / Person"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* AMOUNTS */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Original Amount
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="principalAmount"
                    value={form.principalAmount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                    required
                  />

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Current Balance
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="currentBalance"
                    value={form.currentBalance}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                    required
                  />

                </div>

              </div>


              {/* INTEREST + MONTHLY */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Interest Rate (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="interestRate"
                    value={form.interestRate}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                  />

                </div>


                <div>

                  <label className="mb-1 block text-sm font-medium">
                    Monthly Payment
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    name="minimumMonthlyPayment"
                    value={
                      form.minimumMonthlyPayment
                    }
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                  />

                </div>

              </div>


              {/* TERM */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Term (Months)
                </label>

                <input
                  type="number"
                  min="0"
                  name="termMonths"
                  value={form.termMonths}
                  onChange={handleChange}
                  placeholder="e.g. 24"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* START DATE */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* NOTES */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Optional notes"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeAddModal}
                  className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >

                  {saving
                    ? "Saving..."
                    : "Save Liability"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================
          REPAYMENT MODAL
      ================================= */}

      {showRepaymentModal &&
        selectedLiability && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-6">

            <div className="mb-6 flex items-start justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Make Repayment
                </h2>

                <p className="text-sm text-slate-500">
                  {selectedLiability.name}
                </p>

              </div>


              <button
                type="button"
                onClick={closeRepaymentModal}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>

            </div>


            {/* =================================
                BALANCE
            ================================= */}

            <div className="mb-5 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">

              <p className="text-sm text-slate-500">
                Current Outstanding Balance
              </p>

              <p className="mt-1 text-2xl font-bold text-red-600">

                KSh{" "}

                {Number(
                  selectedLiability.currentBalance ??
                  selectedLiability.outstandingBalance ??
                  0
                ).toLocaleString()}

              </p>

            </div>


            {/* =================================
                LINKED ACCOUNT
            ================================= */}

            {selectedLiability.linkedAssetName ? (

              <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-300">

                <p className="font-semibold">
                  Repayment account
                </p>

                <p className="mt-1">
                  {selectedLiability.linkedAssetName}
                </p>

              </div>

            ) : (

              <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">

                This loan has no linked asset account. A repayment cannot be processed until the loan is connected to an account.

              </div>

            )}


            <form
              onSubmit={handleRepayment}
              className="space-y-4"
            >

              {/* TOTAL PAYMENT */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Total Payment
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="amount"
                  value={
                    repaymentForm.amount
                  }
                  onChange={
                    handleRepaymentChange
                  }
                  placeholder="e.g. 15000"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                  required
                />

                <p className="mt-1 text-xs text-slate-500">
                  The full amount leaving your account.
                </p>

              </div>


              {/* INTEREST */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Interest Paid
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="interestAmount"
                  value={
                    repaymentForm.interestAmount
                  }
                  onChange={
                    handleRepaymentChange
                  }
                  placeholder="0"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

                <p className="mt-1 text-xs text-slate-500">
                  The remaining amount reduces the loan principal.
                </p>

              </div>


              {/* DATE */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Payment Date
                </label>

                <input
                  type="date"
                  name="paymentDate"
                  value={
                    repaymentForm.paymentDate
                  }
                  onChange={
                    handleRepaymentChange
                  }
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                  required
                />

              </div>


              {/* NOTES / REFERENCE */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Reference / Notes
                </label>

                <textarea
                  name="notes"
                  value={
                    repaymentForm.notes
                  }
                  onChange={
                    handleRepaymentChange
                  }
                  rows="3"
                  placeholder="e.g. August loan repayment"
                  className="w-full rounded-xl border p-3 dark:border-slate-700 dark:bg-slate-800"
                />

              </div>


              {/* =================================
                  BREAKDOWN
              ================================= */}

              {Number(
                repaymentForm.amount || 0
              ) > 0 && (

                <div className="rounded-xl border p-4 text-sm dark:border-slate-700">

                  <div className="flex justify-between gap-4">

                    <span>
                      Total Payment
                    </span>

                    <strong>

                      KSh{" "}

                      {Number(
                        repaymentForm.amount ||
                        0
                      ).toLocaleString()}

                    </strong>

                  </div>


                  <div className="mt-2 flex justify-between gap-4">

                    <span>
                      Interest
                    </span>

                    <strong>

                      KSh{" "}

                      {Number(
                        repaymentForm.interestAmount ||
                        0
                      ).toLocaleString()}

                    </strong>

                  </div>


                  <div className="mt-2 flex justify-between gap-4 border-t pt-2">

                    <span>
                      Principal Reduction
                    </span>

                    <strong className="text-green-600">

                      KSh{" "}

                      {Math.max(
                        0,
                        Number(
                          repaymentForm.amount ||
                          0
                        ) -
                        Number(
                          repaymentForm.interestAmount ||
                          0
                        )
                      ).toLocaleString()}

                    </strong>

                  </div>

                </div>

              )}


              {/* =================================
                  BUTTONS
              ================================= */}

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={
                    closeRepaymentModal
                  }
                  disabled={repaying}
                  className="flex-1 rounded-xl border px-4 py-3 text-sm font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={
                    repaying ||
                    !selectedLiability.linkedAssetId
                  }
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                >

                  {repaying
                    ? "Processing..."
                    : "Record Repayment"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </AppLayout>

  )

}