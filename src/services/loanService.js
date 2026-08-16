import {
  collection,
  doc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore"

import { auth, db } from "../firebase/firebase"


/* =====================================
   CREATE LOAN
===================================== */

export async function createLoan({
  name,
  principalAmount,
  interestRate,
  termMonths,
  minimumMonthlyPayment,
  lenderName,
  startDate,
  assetId,
}) {

  const user = auth.currentUser

  if (!user) {
    throw new Error("User not authenticated")
  }

  const amount = Number(principalAmount || 0)

  if (amount <= 0) {
    throw new Error(
      "Loan amount must be greater than zero"
    )
  }

  if (!assetId) {
    throw new Error(
      "Please select the asset account receiving the loan."
    )
  }


  /* =====================================
     REFERENCES
  ===================================== */

  const liabilityRef = doc(
    collection(
      db,
      "users",
      user.uid,
      "liabilities"
    )
  )


  const assetRef = doc(
    db,
    "users",
    user.uid,
    "assets",
    assetId
  )


  const transactionRef = doc(
    collection(
      db,
      "users",
      user.uid,
      "loanTransactions"
    )
  )


  /* =====================================
     ATOMIC LOAN TRANSACTION
  ===================================== */

  await runTransaction(
    db,
    async (transaction) => {

      /* ---------------------------------
         GET ASSET
      --------------------------------- */

      const assetSnapshot =
        await transaction.get(assetRef)


      if (!assetSnapshot.exists()) {

        throw new Error(
          "Selected asset account was not found."
        )

      }


      const assetData =
        assetSnapshot.data()


      const currentAssetValue =
        Number(
          assetData.value || 0
        )


      const assetName =
        assetData.name || "Asset Account"


      /* ---------------------------------
         1. CREATE LIABILITY
      --------------------------------- */

      transaction.set(
        liabilityRef,
        {

          name:
            name || "Personal Loan",

          type:
            "Loan",

          lender:
            lenderName || "",

          lenderName:
            lenderName || "",

          principalAmount:
            amount,

          currentBalance:
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

          startDate:
            startDate || null,

          linkedAssetId:
            assetId,

          linkedAssetName:
            assetName,

          status:
            "active",

          createdAt:
            serverTimestamp(),

          updatedAt:
            serverTimestamp(),

        }
      )


      /* ---------------------------------
         2. INCREASE ASSET
      --------------------------------- */

      transaction.update(
        assetRef,
        {

          value:
            currentAssetValue + amount,

          updatedAt:
            serverTimestamp(),

        }
      )


      /* ---------------------------------
         3. CREATE LOAN TRANSACTION
      --------------------------------- */

      transaction.set(
        transactionRef,
        {

          userId:
            user.uid,

          type:
            "LOAN_DISBURSEMENT",

          amount:
            amount,

          description:
            `Loan received: ${
              name || "Personal Loan"
            }`,

          assetAccountId:
            assetId,

          assetName:
            assetName,

          liabilityAccountId:
            liabilityRef.id,

          liabilityName:
            name || "Personal Loan",

          principalAllocated:
            amount,

          interestAllocated:
            0,

          transactionDate:
            startDate ||
            new Date()
              .toISOString()
              .split("T")[0],

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

    assetId,

    amount,

  }

}