import React from 'react';
import 'antd/dist/antd.css';
import {Spin} from 'antd';


export const SuperLoader = () => {

    return (
        <div>
            <Spin tip="Loading..." />
        </div>
    )
}


