import { PrimaryButton, TextField } from "office-ui-fabric-react";
import * as R from "ramda";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { IWork } from "../models";
import { H1 } from "./BaseElements/H1";
import { EditableList } from "./EditableList";
import { EDIT_WORK_MUTATION } from "../apollo/mutations";
import { WORKS_QUERY } from "../apollo";

const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.5s ease-in-out;
    color: #000;
    margin: 1rem;
    padding: 1rem;
    position: relative;
    box-shadow: 2px 3px 15px #5e318c63;
    border: 1px solid #8d27da;
    text-align: left;
    height: 1rem;
    overflow: hidden;
    &:focus,
    &:focus-within {
        height: auto;
        overflow: visible;
        outline: none;
    }

    > * {
        margin-bottom: 1rem;
    }
    position: relative;
`;
const Reset = styled.div`
    height: 15px;
    width: 15px;
    align-self: flex-end;
    justify-self: flex-end;
    margin-top: -2.5rem;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;
interface IProps {
    data: IWork;
}

interface IData {
    editWork: IWork;
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
    const resetForm = (): void => {
        setModel(data);
    };

    return (
        <Mutation<IData>
            mutation={EDIT_WORK_MUTATION}
            refetchQueries={[
                {
                    query: WORKS_QUERY,
                },
            ]}
        >
            {(editWork, { error }) => {
                const { name, tags, chats } = model;
                return (
                    <Box tabIndex={Math.random()}>
                        {error && JSON.stringify(error)}
                        <H1 as="h4" style={{ cursor: "pointer" }}>
                            {data.name}
                        </H1>
                        <Reset onClick={resetForm}>🔄</Reset>
                        <TextField
                            label={"Project name"}
                            value={name}
                            type={"text"}
                            onChange={onChangeHandler(["name"])}
                        />
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
                        <PrimaryButton
                            onClick={() => editWork({ variables: { id: model.id, work: R.omit(["id"], model) } })}
                            disabled={R.equals(data, model)}
                        >
                            Save
                        </PrimaryButton>
                    </Box>
                );
            }}
        </Mutation>
    );
};
