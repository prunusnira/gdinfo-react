import { useState } from "react"
import { apiSubmitComment } from "@/api/updateUserData"

type CommentReturn = [
    boolean, () => void, () => void, () => void,
]

const useComment = (
    id: string,
    nextComment: string,
    setComment: (s: string) => void
): CommentReturn => {
    const [isCommentOpen, setCommentOpen] = useState(false)

	const setCommentDlgOpen = () => {
        setCommentOpen(true)
	}
	
	const closeComment = () => {
        setCommentOpen(false)
	}
	
	const submitComment = () => {
        apiSubmitComment(nextComment, id)
        .then((res) => {
            closeComment()
            setComment(nextComment)
        });
    }
    return [isCommentOpen, setCommentDlgOpen, closeComment, submitComment]
}

export default useComment