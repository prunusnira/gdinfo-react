import { apiForceCountUpdate, apiSubmitDataOpen } from '@/api/updateUserData';
import { atomLoginUser } from '@/jotai/loginUser';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';

const useInfoOpen = () => {
    const [isInfoDlgOpen, setIsInfoDlgOpen] = useState(false);
    const [isInfoOpen, setInfoOpen] = useState(false);
    const loginUser = useAtomValue(atomLoginUser);
    const [submit, setSubmit] = useState(false);
    const [id, setId] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);

    const setInfoDlgOpen = () => {
        setIsInfoDlgOpen(true);
    };

    const setInfoDlgClose = () => {
        setIsInfoDlgOpen(false);
    };

    const submitOpen = ({id, open}: {id: string, open: boolean}) =>
        apiSubmitDataOpen(id, open ? 'Y' : 'N');

    const forceCountUpdate = () => {
        if (loginUser) {
            apiForceCountUpdate(loginUser.id)
                .then(() => {
                    window.location.reload();
                });
        }
    };

    const setSubmitData = (
        {id, open, submit}:
            {id: string, open: boolean, submit: boolean},
    ) => {
        setId(id);
        setOpen(open);
        setSubmit(submit);
    }

    const {mutate, data} = useMutation({
        mutationKey: ['profile', 'infoopen'],
        mutationFn: submitOpen,
    });

    useEffect(() => {
        if(submit) {
            setSubmit(false);
            mutate({
                id,
                open,
            });
        }
    }, [submit]);

    useEffect(() => {
        if(data) {
            setInfoDlgClose();
        }
    }, [data]);

    return {
        isInfoOpen,
        isInfoDlgOpen,
        setInfoDlgOpen,
        setInfoDlgClose,
        setSubmitData,
        forceCountUpdate,
    };
};

export default useInfoOpen;