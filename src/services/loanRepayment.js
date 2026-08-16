import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =====================================
   RECORD LOAN REPAYMENT
===================================== */

export async function recordLoanRepayment({
  liabilityId,
  assetId,
  paymentAmount,
  principalAmount,
  paymentDate,
  reference = "",
}) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }


  const totalPayment = Number(paymentAmount || 0)
  const principal = Number(principalAmount || 0)

  if (totalPayment <= 0) {
    throw new Error(
      "Payment amount must be greater than zero"
    )
  }

  if (principal <= 0) {
    throw new Error(
      "Principal repayment must be greater than zero"
    )
  }

  if (principal > totalPayment) {
    throw new Error(
      "Principal cannot be greater than the total payment"
    )
  }


  const interest = totalPayment - principal


  /* =====================================
     REFERENCES
  ===================================== */

  const liabilityRef = doc(
    db,
    "users",
    user.uid,
    "liabilities",
    liabilityId
  )

  const assetRef = doc(
    db,
    "users",
    user.uid,
    "assets",
    assetId
  )

  const repaymentRef = doc(
    collection(
      db,
      "users",
      user.uid,
      "loanTransactions"
    )
  )

  const expenseRef =
    interest > 0
      ? doc(
          collection(
            db,
            "users",
            user.uid,
            "expenses"
          )
        )
      : null


  /* =====================================
     FIRESTORE TRANSACTION
  ===================================== */

  await runTransaction(
    db,
    async (transaction) => {

      /* ================================
         READ LIABILITY
      ================================= */

      const liabilitySnapshot =
        await transaction.get(
          liabilityRef
        )

      if (!liabilitySnapshot.exists()) {
        throw new Error(
          "Loan liability was not found"
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

      if (principal > currentBalance) {
        throw new Error(
          `Principal repayment cannot exceed the outstanding balance of KSh ${currentBalance.toLocaleString()}`
        )
      }


      /* ================================
         READ ASSET
      ================================= */

      const selectedAssetId =
        assetId ||
        liability.linkedAssetId

      if (!selectedAssetId) {
        throw new Error(
          "Please select the account used to make this repayment"
        )
      }

      const selectedAssetRef = doc(
        db,
        "users",
        user.uid,
        "assets",
        selectedAssetId
      )

      const assetSnapshot =
        await transaction.get(
          selectedAssetRef
        )

      if (!assetSnapshot.exists()) {
        throw new Error(
          "The selected asset account was not found"
        )
      }

      const asset =
        assetSnapshot.data()

      const currentAssetValue =
        Number(
          asset.value || 0
        )

      if (
        currentAssetValue <
        totalPayment
      ) {
        throw new Error(
          `Insufficient funds. Available balance: KSh ${currentAssetValue.toLocaleString()}`
        )
      }


      /* ================================
         CALCULATE NEW BALANCES
      ================================= */

      const newLoanBalance =
        Math.max(
          0,
          currentBalance - principal
        )

      const newAssetBalance =
        currentAssetValue - totalPayment

      const newStatus =
        newLoanBalance <= 0
          ? "cleared"
          : "active"


      /* ================================
         UPDATE LIABILITY
      ================================= */

      transaction.update(
        liabilityRef,
        {

          currentBalance:
            newLoanBalance,

          outstandingBalance:
            newLoanBalance,

          status:
            newStatus,

          lastPaymentAmount:
            totalPayment,

          lastPaymentInterest:
            interest,

          lastPrincipalReduction:
            principal,

          lastPaymentDate:
            paymentDate ||
            new Date()
              .toISOString()
              .split("T")[0],

          updatedAt:
            serverTimestamp(),

        }
      )


      /* ================================
         UPDATE ASSET
      ================================= */

      transaction.update(
        selectedAssetRef,
        {

          value:
            newAssetBalance,

          updatedAt:
            serverTimestamp(),

        }
      )


      /* ================================
         RECORD LOAN TRANSACTION
      ================================= */

      transaction.set(
        repaymentRef,
        {

          type:
            "LOAN_REPAYMENT",

          amount:
            totalPayment,

          description:
            `Loan repayment: ${
              liability.name ||
              "Loan"
            }`,

          assetAccountId:
            selectedAssetId,

          liabilityAccountId:
            liabilityId,

          assetName:
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

          newBalance:
            newLoanBalance,

          transactionDate:
            paymentDate ||
            new Date()
              .toISOString()
              .split("T")[0],

          reference:
            reference || "",

          createdAt:
            serverTimestamp(),

        }
      )


      /* ================================
         RECORD INTEREST AS EXPENSE
      ================================= */

      if (
        interest > 0 &&
        expenseRef
      ) {

        transaction.set(
          expenseRef,
          {

            title:
              `Loan Interest - ${
                liability.name ||
                "Loan"
              }`,

            category:
              "Interest",

            amount:
              interest,

            paymentMethod:
              asset.name ||
              "Asset Account",

            reference:
              reference || "",

            status:
              "active",

            date:
              paymentDate ||
              new Date()
                .toISOString()
                .split("T")[0],

            loanId:
              liabilityId,

            loanTransactionId:
              repaymentRef.id,

            createdAt:
              serverTimestamp(),

          }
        )

      }

    }
  )


  return {

    repaymentId:
      repaymentRef.id,

    expenseId:
      expenseRef
        ? expenseRef.id
        : null,

    paymentAmount:
      totalPayment,

    principalAmount:
      principal,

    interestAmount:
      interest,

  }

}