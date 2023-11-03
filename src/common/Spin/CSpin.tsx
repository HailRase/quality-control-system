import React from 'react';
import {Spin} from "antd";

interface SpinType {
    size? : "small" | "medium" | "large"
}

const CSpin: React.FC<SpinType> = ({size}) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            height: '90vh',
            width: '90vw'
        }}>
            <Spin />
        </div>
    );
};

export default CSpin;