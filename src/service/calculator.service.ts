import type { Operation } from '@/components/Calculator/types'

const apiUrl = 'http://localhost:8080/calculate'
export const postOperation = async (requestData): Promise<Operation> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return await response.json()
}
