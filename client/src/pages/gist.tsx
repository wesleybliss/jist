import { useParams } from "wouter"
import GistView from "@/components/gist/gist-view"

const GistPage = () => {
    const { id } = useParams()
    
    if (!id) return null
    
    return <GistView id={id} />
}

export default GistPage
