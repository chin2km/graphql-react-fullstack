import React, { Component } from "react";
import styled from "styled-components";

const Layout = styled.div`
    font-size: 1.5rem;
    font-family: "Lato";
    text-align: center;
    padding: 1rem 5rem;
    background: #dadada;
    margin: 0px;
    display: flex;
    flex-direction: column;

    select:disabled {
        cursor: not-allowed;
    }
`;

export class App extends Component {
    render() {
        return (
            <Layout>
                <h1>react-pwa-starter-typescript</h1>
            </Layout>
        );
    }
}
