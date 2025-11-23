import { ReactNode } from "react"
import { UseQueryResult } from "@tanstack/react-query"

interface QuerySuspenseProps<T> {
    query: UseQueryResult<T, unknown>
    fallback?: ReactNode
    children: (data: T) => ReactNode
}

function QuerySuspense<T>({
    query,
    fallback = "Loading...",
    children,
}: QuerySuspenseProps<T>) {
    if (query.isLoading) return <>{fallback}</>
    if (query.isError) return <div>Error: {(query.error as Error).message}</div>

    return <>{children(query.data!)}</>
}

export default QuerySuspense
