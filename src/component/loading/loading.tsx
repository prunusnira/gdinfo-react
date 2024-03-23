import React from 'react';
import {ReactComponent as IconLoading} from '@/svg/loading.svg';

const Loading = () => (
    <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
        <IconLoading viewBox={'0 0 40 40'} width={100} height={100} />
    </div>
)

export default Loading;