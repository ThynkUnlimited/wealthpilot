import { useMemo, useState } from "react"

export default function VaultSearch(vaults) {

  const [search, setSearch] = useState("")

  const filteredVaults = useMemo(() => {

    return vaults.filter(vault =>

      vault.title
        .toLowerCase()
        .includes(search.toLowerCase())

    )

  }, [vaults, search])

  return {

    filteredVaults,

    search,

    setSearch,

  }

}