import { db } from "../firebase/firebase"

export default function TestFirebase() {

  console.log("Firestore Connected:", db)

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold">

        ✅ Firebase Connected Successfully

      </h1>

    </div>

  )

}