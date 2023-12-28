import React, { ChangeEvent, useEffect, useState } from "react";
import { ToggleSwitchWrapper, ToggleChkBox, ToggleLabel, ToggleSpan } from "./toggleSwitch.style";

type Props = {
    id: string;
    isLoading?: boolean;
    actualValue: boolean;
    callback: (b: boolean) => void;
};

const ToggleSwitch = ({ id, isLoading, actualValue, callback }: Props) => {
    const [isActive, setActive] = useState<boolean>(actualValue);

    useEffect(() => {
        setActive(actualValue);
    }, [actualValue]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        callback(e.currentTarget.checked);
    };

    return (
        <ToggleSwitchWrapper>
            <ToggleChkBox
                type="checkbox"
                checked={isActive}
                onChange={onChange}
                id={`chkbox_${id}`}
                disabled={isLoading}
            />
            <ToggleLabel htmlFor={`chkbox_${id}`} isChecked={isActive}>
                <ToggleSpan isChecked={isActive} />
            </ToggleLabel>
        </ToggleSwitchWrapper>
    );
};

export default ToggleSwitch;
