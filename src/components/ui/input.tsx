
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

// This hook is for the search functionality.
// It will be used to filter the content on the page.
const useSearch = (inputSelector: string, itemSelector: string) => {
  React.useEffect(() => {
    const input = document.querySelector(inputSelector) as HTMLInputElement
    if (!input) return

    const handleSearch = (event: Event) => {
      const query = (event.target as HTMLInputElement).value.toLowerCase()
      const items = document.querySelectorAll(itemSelector)
      items.forEach((item) => {
        const row = item as HTMLElement
        const searchableElements = Array.from(
          row.querySelectorAll("[data-search-value]")
        )
        const textContent = searchableElements
          .map((el) => (el as HTMLElement).dataset.searchValue?.toLowerCase())
          .join(" ")
        row.style.display = textContent.includes(query) ? "" : "none"
      })
    }

    input.addEventListener("input", handleSearch)
    return () => input.removeEventListener("input", handleSearch)
  }, [inputSelector, itemSelector])
}

// Add this to the page component to enable search.
// E.g. `useSearch("[data-search-input]", "[data-search-item]")`
export { Input, useSearch }
