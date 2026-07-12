import { useMemo, useState } from "react"

export default function useIncomeSearch(income = []) {

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredIncome = useMemo(() => {

    return income.filter((item) => {

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        (item.reference || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === "All" ||
        item.category === filter

      return matchesSearch && matchesFilter

    })

  }, [income, search, filter])

  const categories = [

    "All",

    ...new Set(income.map(item => item.category))

  ]

  return {

    filteredIncome,
    search,
    setSearch,
    filter,
    setFilter,
    categories,

  }

}