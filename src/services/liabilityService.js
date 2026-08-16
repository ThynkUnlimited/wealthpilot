import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  runTransaction,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =====================================
   LIABILITY COLLECTION
===================================== */

const liabilityCollection = () => {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  return collection(
    db,
    "users",
    user.uid,
    "liabilities"
  )

}


/* =====================================
   REALTIME LIABILITY SUBSCRIPTION
===================================== */

export function subscribeToLiabilities(callback) {

  const q = query(
    liabilityCollection(),
    orderBy("createdAt", "desc")
  )

  return onSnapshot(
    q,
    (snapshot) => {

      callback(

        snapshot.docs.map((document) => ({

          id: document.id,

          ...document.data(),

        }))

      )

    },
    (error) => {

      console.error(
        "Liability subscription error:",
        error
      )

      callback([])

    }
  )

}


/* =====================================
   ADD NORMAL LIABILITY
===================================== */

export async function addLiability(data) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  const principalAmount =
    Number(
      data.principalAmount ??
      data.originalAmount ??
      0
    )

  const currentBalance =
    Number(
      data.currentBalance ??
      data.outstandingBalance ??
      principalAmount
    )

  await addDoc(

    liabilityCollection(),

    {

      ...data,

      type:
        data.type ||
        "Other",

      principalAmount,

      currentBalance,

      /*
        Keep these fields too because
        your current Liabilities page
        still uses them.
      */

      originalAmount:
        Number(
          data.originalAmount ??
          principalAmount
        ),

      outstandingBalance:
        currentBalance,

      interestRate:
        Number(
          data.interestRate || 0
        ),

      termMonths:
        Number(
          data.termMonths || 0
        ),

      minimumMonthlyPayment:
        Number(
          data.minimumMonthlyPayment ??
          data.monthlyPayment ??
          0
        ),

      monthlyPayment:
        Number(
          data.monthlyPayment ??
          data.minimumMonthlyPayment ??
          0
        ),

      status:
        currentBalance > 0
          ? "active"
          : "cleared",

      createdAt:
        serverTimestamp(),

    }

  )

}


/* =====================================
   UPDATE LIABILITY
===================================== */

export async function updateLiability(
  id,
  data
) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  const updateData = {
    ...data,
    updatedAt: serverTimestamp(),
  }


  /*
    Keep currentBalance and
    outstandingBalance synchronized.
  */

  if (
    data.currentBalance !== undefined
  ) {

    updateData.currentBalance =
      Number(data.currentBalance)

    updateData.outstandingBalance =
      Number(data.currentBalance)

  }


  if (
    data.outstandingBalance !== undefined
  ) {

    updateData.outstandingBalance =
      Number(data.outstandingBalance)

    updateData.currentBalance =
      Number(data.outstandingBalance)

  }


  if (
    data.principalAmount !== undefined
  ) {

    updateData.principalAmount =
      Number(data.principalAmount)

  }


  if (
    data.originalAmount !== undefined
  ) {

    updateData.originalAmount =
      Number(data.originalAmount)

  }


  if (
    data.interestRate !== undefined
  ) {

    updateData.interestRate =
      Number(data.interestRate)

  }


  if (
    data.termMonths !== undefined
  ) {

    updateData.termMonths =
      Number(data.termMonths)

  }


  if (
    data.minimumMonthlyPayment !== undefined
  ) {

    updateData.minimumMonthlyPayment =
      Number(
        data.minimumMonthlyPayment
      )

  }


  if (
    data.monthlyPayment !== undefined
  ) {

    updateData.monthlyPayment =
      Number(
        data.monthlyPayment
      )

  }


  await updateDoc(

    doc(
      db,
      "users",
      user.uid,
      "liabilities",
      id
    ),

    updateData

  )

}


/* =====================================
   DELETE LIABILITY
===================================== */

export async function deleteLiability(id) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  await deleteDoc(

    doc(
      db,
      "users",
      user.uid,
      "liabilities",
      id
    )

  )

}


/* =====================================
   CREATE CONNECTED LOAN
=====================================

   Loan creates TWO things:

   1. Liability
      Example:
      KSh 100,000 loan owed

   2. Asset increase
      Example:
      Bank account +KSh 100,000

   Both happen inside one Firestore
   transaction.
===================================== */

export async function createLoan({

  name,

  principalAmount,

  interestRate = 0,

  termMonths = 0,

  minimumMonthlyPayment = 0,

  lenderName = "",

  startDate = null,

  assetId,

  assetName = "",

}) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }


  const amount =
    Number(principalAmount || 0)


  if (amount <= 0) {

    throw new Error(
      "Loan amount must be greater than zero"
    )

  }


  if (!assetId) {

    throw new Error(
      "Please select the asset account receiving the loan"
    )

  }


  const liabilityRef =
    doc(
      collection(
        db,
        "users",
        user.uid,
        "liabilities"
      )
    )


  const assetRef =
    doc(
      db,
      "users",
      user.uid,
      "assets",
      assetId
    )


  const transactionRef =
    doc(
      collection(
        db,
        "users",
        user.uid,
        "loanTransactions"
      )
    )


  await runTransaction(
    db,
    async (transaction) => {

      /*
        READ ASSET FIRST
      */

      const assetSnapshot =
        await transaction.get(
          assetRef
        )


      if (!assetSnapshot.exists()) {

        throw new Error(
          "Selected asset account was not found"
        )

      }


      const assetData =
        assetSnapshot.data()


      const currentAssetValue =
        Number(
          assetData.value || 0
        )


      /*
        1. CREATE LIABILITY
      */

      transaction.set(
        liabilityRef,
        {

          name,

          type:
            "Loan",

          lenderName,

          lender:
            lenderName,

          principalAmount:
            amount,

          originalAmount:
            amount,

          currentBalance:
            amount,

          outstandingBalance:
            amount,

          interestRate:
            Number(
              interestRate || 0
            ),

          termMonths:
            Number(
              termMonths || 0
            ),

          minimumMonthlyPayment:
            Number(
              minimumMonthlyPayment || 0
            ),

          monthlyPayment:
            Number(
              minimumMonthlyPayment || 0
            ),

          startDate,

          linkedAssetId:
            assetId,

          linkedAssetName:
            assetName ||
            assetData.name ||
            "",

          status:
            "active",

          createdAt:
            serverTimestamp(),

        }
      )


      /*
        2. INCREASE ASSET
      */

      transaction.update(
        assetRef,
        {

          value:
            currentAssetValue +
            amount,

          updatedAt:
            serverTimestamp(),

        }
      )


      /*
        3. RECORD LOAN TRANSACTION
      */

      transaction.set(
        transactionRef,
        {

          type:
            "LOAN_DISBURSEMENT",

          amount,

          description:
            `Loan received: ${name}`,

          assetAccountId:
            assetId,

          liabilityAccountId:
            liabilityRef.id,

          assetName:
            assetName ||
            assetData.name ||
            "",

          liabilityName:
            name,

          principalAllocated:
            amount,

          interestAllocated:
            0,

          transactionDate:
            startDate ||
            new Date().toISOString(),

          createdAt:
            serverTimestamp(),

        }
      )

    }
  )


  return {

    liabilityId:
      liabilityRef.id,

    transactionId:
      transactionRef.id,

    amount,

  }

}


/* =====================================
   ALIAS
=====================================

   FinanceContext may call this
   createConnectedLoan.

   Keep both names so the app
   cannot break because of naming.
===================================== */

export const createConnectedLoan =
  createLoan


/* =====================================
   REPAY LOAN
===================================== */

export async function repayLoan({

  liabilityId,

  amount,

  interestAmount = 0,

  paymentDate = null,

  notes = "",

}) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }


  const payment =
    Number(amount || 0)


  const interest =
    Number(interestAmount || 0)


  if (payment <= 0) {

    throw new Error(
      "Repayment amount must be greater than zero"
    )

  }


  if (interest < 0) {

    throw new Error(
      "Interest cannot be negative"
    )

  }


  if (interest > payment) {

    throw new Error(
      "Interest cannot be greater than the repayment"
    )

  }


  const liabilityRef =
    doc(
      db,
      "users",
      user.uid,
      "liabilities",
      liabilityId
    )


  const transactionRef =
    doc(
      collection(
        db,
        "users",
        user.uid,
        "loanTransactions"
      )
    )


  await runTransaction(
    db,
    async (transaction) => {

      /*
        READ LIABILITY
      */

      const liabilitySnapshot =
        await transaction.get(
          liabilityRef
        )


      if (!liabilitySnapshot.exists()) {

        throw new Error(
          "Loan could not be found"
        )

      }


      const liability =
        liabilitySnapshot.data()


      const currentBalance =
        Number(
          liability.currentBalance ??
          liability.outstandingBalance ??
          0
        )


      if (currentBalance <= 0) {

        throw new Error(
          "This loan has already been cleared"
        )

      }


      /*
        PAYMENT SPLIT

        Example:

        Payment = 10,000
        Interest = 1,000

        Principal = 9,000

        Liability decreases
        by 9,000.

        Asset decreases
        by 10,000.
      */

      const principal =
        payment -
        interest


      if (principal > currentBalance) {

        throw new Error(

          `Principal repayment cannot exceed the outstanding loan balance of KSh ${currentBalance.toLocaleString()}`

        )

      }


      /*
        LINKED ASSET
      */

      const linkedAssetId =
        liability.linkedAssetId


      if (!linkedAssetId) {

        throw new Error(
          "This loan does not have a linked asset account"
        )

      }


      const assetRef =
        doc(
          db,
          "users",
          user.uid,
          "assets",
          linkedAssetId
        )


      const assetSnapshot =
        await transaction.get(
          assetRef
        )


      if (!assetSnapshot.exists()) {

        throw new Error(
          "The linked asset account could not be found"
        )

      }


      const asset =
        assetSnapshot.data()


      const currentAssetValue =
        Number(
          asset.value || 0
        )


      if (
        payment >
        currentAssetValue
      ) {

        throw new Error(

          `Insufficient funds in the linked asset account. Available: KSh ${currentAssetValue.toLocaleString()}`

        )

      }


      /*
        NEW LIABILITY BALANCE
      */

      const newBalance =
        Math.max(
          0,
          currentBalance -
          principal
        )


      const newStatus =
        newBalance <= 0
          ? "cleared"
          : "active"


      /*
        UPDATE LIABILITY
      */

      transaction.update(
        liabilityRef,
        {

          currentBalance:
            newBalance,

          outstandingBalance:
            newBalance,

          status:
            newStatus,

          updatedAt:
            serverTimestamp(),

        }
      )


      /*
        REDUCE ASSET
      */

      transaction.update(
        assetRef,
        {

          value:
            currentAssetValue -
            payment,

          updatedAt:
            serverTimestamp(),

        }
      )


      /*
        RECORD REPAYMENT
      */

      transaction.set(
        transactionRef,
        {

          type:
            "LOAN_REPAYMENT",

          amount:
            payment,

          description:
            notes ||
            `Loan repayment: ${
              liability.name ||
              "Loan"
            }`,

          assetAccountId:
            linkedAssetId,

          liabilityAccountId:
            liabilityId,

          assetName:
            liability.linkedAssetName ||
            asset.name ||
            "",

          liabilityName:
            liability.name ||
            "",

          principalAllocated:
            principal,

          interestAllocated:
            interest,

          previousBalance:
            currentBalance,

          newBalance,

          transactionDate:
            paymentDate ||
            new Date().toISOString(),

          createdAt:
            serverTimestamp(),

        }
      )

    }
  )


  return {

    liabilityId,

    amount:
      payment,

    principal,

    interest,

  }

}