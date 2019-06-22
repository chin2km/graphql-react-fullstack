import { PrimaryButton, TextField } from "office-ui-fabric-react";
import React, { FunctionComponent, useState, useEffect } from "react";
import styled from "styled-components";
import { H1 } from "./BaseElements/H1";
import { IWork } from "../models";
import * as R from "ramda";
import { EditableList } from "./EditableList";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    transition: all 0.5s ease-in-out;
    color: #000;
    margin: 1rem;
    padding: 1rem;
    position: relative;
    box-shadow: 2px 3px 15px #5e318c63;
    border: 1px solid #8d27da;
    text-align: left;

    > * {
        margin-bottom: 1rem;
    }
`;

interface IProps {
    data: IWork;
}

export const Teaser: FunctionComponent<IProps> = ({ data }) => {
    const [model, setModel] = useState(data);
    useEffect(() => {
        setModel(data);
    }, [data]);

    const updateWork = (path: (string | number)[], value: string) => {
        setModel({ ...R.assocPath(path, value, model) });
    };

    const onChangeHandler = (path: (string | number)[]) => (event: any): void => {
        updateWork(path, event.target.value);
    };

    const onRemoveHandler = (path: (string | number)[]) => (): void => {
        const pathToList = R.pipe<(string | number)[], (string | number)[], (string | number)[]>(
            // @ts-ignore
            R.reverse,
            R.tail,
            R.reverse,
        )(path);
        const updatedList = R.pipe(
            R.path(pathToList),
            R.reject(R.equals(R.path(path, model))),
        )(model) as any;
        setModel({ ...((R.assocPath(pathToList, updatedList, model) as unknown) as IWork) });
    };

    const onAddHandler = (path: (string | number)[]) => (): void => {
        const updatedList = R.path(path, model) as string[];
        setModel({ ...R.assocPath(path, R.append("", updatedList), model) });
    };

    const { name, tags, chats } = model;
    return (
        <Box>
            <H1 as="h4">{data.name}</H1>
            <TextField label={"Project name"} value={name} type={"text"} onChange={onChangeHandler(["name"])} />
            <EditableList
                onAddHandler={onAddHandler}
                onRemoveHandler={onRemoveHandler}
                multiline={false}
                data={tags}
                dataKey={["tags"]}
                label="Tags"
                onChange={onChangeHandler}
                horizontal={true}
            />
            <EditableList
                onAddHandler={onAddHandler}
                onRemoveHandler={onRemoveHandler}
                multiline={true}
                data={chats.chat}
                dataKey={["chats", "chat"]}
                label="Chats"
                onChange={onChangeHandler}
                horizontal={false}
            />
            <EditableList
                multiline={true}
                horizontal={false}
                onAddHandler={onAddHandler}
                onRemoveHandler={onRemoveHandler}
                data={chats.link}
                dataKey={["chats", "link"]}
                label="Links"
                onChange={onChangeHandler}
            />
            <PrimaryButton disabled={R.equals(data, model)}>Save</PrimaryButton>
        </Box>
    );
};
