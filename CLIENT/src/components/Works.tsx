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
