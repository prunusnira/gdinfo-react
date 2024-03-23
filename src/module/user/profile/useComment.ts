import { apiSubmitComment } from '@/api/updateUserData';
import { useState } from 'react';

type CommentReturn = [
    boolean, () => void, () => void, () => void,
]

const useComment = ({ id, nextComment, setComment }: {
    id?: string,
    nextComment: string,
    setComment: (s: string) => void
}): CommentReturn => {
    const [isCommentOpen, setCommentOpen] = useState(false);

    const setCommentDlgOpen = () => {
        setCommentOpen(true);
    };

    const closeComment = () => {
        setCommentOpen(false);
    };

    const submitComment = () => {
        if (id) {
            apiSubmitComment(nextComment, id)
                .then(() => {
                    closeComment();
                    setComment(nextComment);
                });
        }
    };
    return [isCommentOpen, setCommentDlgOpen, closeComment, submitComment];
};

export default useComment;