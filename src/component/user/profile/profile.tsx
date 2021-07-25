import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import './profile.css'
import '@/component/css/overall-b.css'
import { observer } from 'mobx-react'
import ProfilePresenter from './profilePresenter'
import useProfileLoader from './useProfileLoader'
import useComment from './useComment'
import useInfoOpen from './useInfoOpen'

interface MatchProps {
    id: string
}

const Profile = observer(() => {
    const [comment, setComment] = useState('')
    const [openUserInfo, setOpenUserInfo] = useState('N')
    const {id} = useParams<MatchProps>()
    const [profileData, isOwnAccount] = useProfileLoader(id, setComment, setOpenUserInfo)
    const [
        isCommentOpen, setCommentDlgOpen, closeComment, submitComment
    ] = useComment(id, comment, setComment)
    const [
        isInfoOpen, setInfoDlgOpen, setInfoDlgClose, submitOpen, infoUpdate, updateOpenValue
    ] = useInfoOpen(setOpenUserInfo)

    if(profileData == null) {
        // show loading
        return null;
    }
    else {
        return (
            <ProfilePresenter
                comment={comment}
                
                isInfoOpen={isInfoOpen}
                openUserInfo={openUserInfo}
                updateOpenValue={updateOpenValue}
                submitOpen={submitOpen}
                setInfoDlgClose={setInfoDlgClose}
                
                isCommentOpen={isCommentOpen}
                submitComment={submitComment}
                closeComment={closeComment}
                setComment={setComment}
                
                isOwnAccount={isOwnAccount}
                profileData={profileData}
                id={id}
                
                setCommentDlgOpen={setCommentDlgOpen}
                setInfoDlgOpen={setInfoDlgOpen}
                infoUpdate={infoUpdate} />
        )
    }
})

export default Profile