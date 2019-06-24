import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { H1 } from "./BaseElements/H1";
import { Teaser } from "./Teaser";
import { Query } from "react-apollo";
import { WORKS_QUERY } from "../apollo";
import { IWork } from "../models";
import { Spinner } from "office-ui-fabric-react/lib/Spinner";

const Layout = styled.div`
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    align-self: center;
    justify-content: center;
    width: 100%;
`;

interface IData {
    works: IWork[];
}

export const Works: FunctionComponent = () => (
    <>
        <H1 as="h2">{`< works />`}</H1>
        <Layout>
            <Query<IData> query={WORKS_QUERY}>
                {({ loading, data, error }) => {
                    if (error) return <div>Error fetching data</div>;
                    if (loading) return <Spinner label="fetching works..." />;
                    return data && data.works.map((work, index) => <Teaser key={index} data={work} />);
                }}
            </Query>
        </Layout>
    </>
);

/**
 * using compose
 */
/*
interface IData {
    data: {
        works: IWork[];
    };
    error: Error;
    loading: boolean;
}

const _Works: FunctionComponent<IData> = props => {
    const { data, error, loading } = props;
    return (
        <>
            <H1 as="h2">{`< works />`}</H1>
            <Layout>
                {error ? (
                    <div>Error fetching data</div>
                ) : loading ? (
                    <Spinner label="fetching works..." />
                ) : (
                    data &&
                    data.works &&
                    data.works.map((work: any, index: number) => <Teaser key={index} data={work} />)
                )}
            </Layout>
        </>
    );
};

export const Works = compose(graphql(WORKS_QUERY))(_Works);
*/
