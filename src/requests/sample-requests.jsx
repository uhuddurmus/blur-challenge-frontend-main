import { simpleAPICall } from "../utils/requesting"


export const requestSampleRequest = ({ message, verbose = false }) => {
    const formData = new FormData()
    formData.append("message", message)
    return simpleAPICall({ endpoint: "http://localhost:5153/api/sample/sample-request", body: formData, verbose: verbose })
}