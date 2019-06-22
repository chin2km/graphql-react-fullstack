import React, { FunctionComponent } from "react";
import { Label, TextField, IconButton } from "office-ui-fabric-react";
import styled, { css } from "styled-components";

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;

    i {
        margin-top: -13px;
    }
`;
const MylList = styled.div<{ horizontal: boolean }>`
    ${({ horizontal }) =>
        horizontal &&
        css`
            display: flex;
        `}
    flex-wrap: wrap;
    .textArea {
        margin: 0.5rem 0.5rem;
        min-width: 10rem;
    }
`;
const Field = styled.div`
    position: relative;
`;
const Close = styled.div`
    background: red;
    position: absolute;
    width: 10px;
    height: 10px;
    top: -2px;
    right: 4px;
    border-radius: 70%;
    color: white;
    border: solid 1px #d82881;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-weight: bold;
    cursor: pointer;
`;

interface IEditableList {
    label: string;
    data?: string[];
    dataKey: string[];
    multiline: boolean;
    horizontal: boolean;
    onChange: (path: (string | number)[]) => (event: any) => void;
    onAddHandler: (path: (string | number)[]) => () => void;
    onRemoveHandler: (path: (string | number)[]) => () => void;
}

export const EditableList: FunctionComponent<IEditableList> = ({
    data,
    dataKey,
    label,
    onChange,
    multiline,
    onAddHandler,
    onRemoveHandler,
    horizontal,
}) => {
    return (
        <ListWrapper>
            <Label>
                <span> {label}</span>
                <IconButton iconProps={{ iconName: "add" }} onClick={onAddHandler([...dataKey])} />
            </Label>
            <MylList horizontal={horizontal}>
                {data &&
                    data.map((elem, index) => (
                        <Field key={index}>
                            <TextField
                                className={"textArea"}
                                autoAdjustHeight={true}
                                multiline={multiline}
                                value={elem}
                                type={"text"}
                                onChange={onChange([...dataKey, index])}
                            />
                            <Close onClick={onRemoveHandler([...dataKey, index])}>x</Close>
                        </Field>
                    ))}
            </MylList>
        </ListWrapper>
    );
};
