import { useState } from "react"

export const useToggle = (initial = false) => {
	const [status, setStatus] = useState(initial)
	const toggle = () => {
		setStatus(!status)
	}
	return [status, toggle]
}
