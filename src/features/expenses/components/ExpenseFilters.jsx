import categories from "../data/categories"

export default function ExpenseFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* Search */}

        <input
          type="text"
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            text-sm
            outline-none
            focus:border-blue-500
          "
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            text-sm
          "
        >

          <option value="All">
            All Categories
          </option>

          {categories.map((item) => (

            <option
              key={item.id}
              value={item.name}
            >
              {item.icon} {item.name}
            </option>

          ))}

        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            text-sm
          "
        >

          <option value="latest">
            Latest
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>

          <option value="alphabetical">
            A - Z
          </option>

        </select>

      </div>

    </div>
  )
}