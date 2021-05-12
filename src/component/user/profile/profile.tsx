import React, {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './profile.css';
import '../../css/overall-b.css';
import CommonData from '../../common/commonData';
import ProfileData from './profileData';
import store from '../../../mobx/store';
import { observer } from 'mobx-react';
import ProfilePresenter from './profilePresenter';

interface MatchProps {
    id: string
}

const Profile = observer(() => {
    const [profileData, setProfileData] = useState(new ProfileData())
    const [isOwnAccount, setOwnAccount] = useState(false)
    const [isCommentOpen, setCommentOpen] = useState(false)
    const [isCountOpen, setCountOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [openUserInfo, setOpenUserInfo] = useState('N')

    const {language, loginUser} = store
    const lang = language.lang

    const {id} = useParams<MatchProps>()

    const commentInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(parseInt(loginUser.user.id) === parseInt(id)) {
            setOwnAccount(true)
        }

        axios.post(`${CommonData.dataUrl}getuserid/${id}`)
        .then((res) => {
            const json = JSON.parse(res.data.mydata);
            setProfileData(json)
            setComment(json.comment)
            setOpenUserInfo(json.opencount)
        });
    }, [])

    // function for count
    const setCountDlgOpen = () => {
        setCountOpen(true)
	}
	
	const setCountDlgClose = () => {
        setCountOpen(false)
	}
	
	const submitOpen = (id: string, open: string) => {
        axios.get(`${CommonData.dataUrl}setopencount`, {
            params: {
                open: open,
                id: parseInt(id)
            }
        })
        .then((res) => {
            setCountDlgClose();
        });
    }

    const updateOpenValue = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setOpenUserInfo(e.currentTarget.value)
    }
	
	// Functions for comment
	const setCommentDlgOpen = () => {
        setCommentOpen(true)
	}
	
	const closeComment = () => {
        setCommentOpen(false)
	}
	
	const submitComment = (id: string, comment: string) => {
        axios.get(`${CommonData.dataUrl}setcomment`, {
            params: {
                val: comment,
                id: id
            }
        })
        .then((res) => {
            closeComment()
            setComment(comment)
        });
    }
    
    const countUpdate = () => {
		axios.post(`${CommonData.dataUrl}profile/countupdate/${loginUser.user.id}`)
        .then((data) => {
            window.location.reload();
        });
    }

    if(profileData == null) {
        // show loading
        return null;
    }
    else {
        return (
            <ProfilePresenter
                lang={lang}
                comment={comment}
                
                isCountOpen={isCountOpen}
                openUserInfo={openUserInfo}
                updateOpenValue={updateOpenValue}
                submitOpen={submitOpen}
                setCountDlgClose={setCountDlgClose}
                
                isCommentOpen={isCommentOpen}
                commentInput={commentInput}
                submitComment={submitComment}
                closeComment={closeComment}
                
                isOwnAccount={isOwnAccount}
                profileData={profileData}
                id={id}
                
                setCommentDlgOpen={setCommentDlgOpen}
                setCountDlgOpen={setCountDlgOpen}
                countUpdate={countUpdate} />
        )
    }
})

export default Profile