import React from 'react';
import {Spin} from "antd";

interface SpinType {
    size? : "small" | "medium" | "large"
    title?: boolean
}

const CSpin: React.FC<SpinType> = ({size, title}) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: 'center',
            height: '90vh',
            width: '90vw',
            gap: 20,
        }}>
            <Spin />
            {title && <div>Инициализация приложения..</div>}
        </div>
    );
};

export default CSpin;