import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styled, { css } from "styled-components";
import { Header, Works } from "../components";
import { onScreenLarge, onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";

const Layout = styled.div`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    max-width: 110rem;
    width: 100%;

    ${onScreenLarge(css`
        width: 80%;
    `)}
    ${onScreenXtraLarge(css`
        width: 80%;
    `)}

    b.emoji {
        transform: scale(1.3);
        display: inline-block;
        margin-left: 0.5rem;
        vertical-align: middle;
        margin-right: 0.3rem;
        ${onScreenMedium(css`
            vertical-align: middle;
            transform: scale(1.6);
            margin-right: 0.2rem;
        `)}
    }
    a.fancy {
        color: white;
        text-decoration: none;
        border-bottom: solid 1.5px;
        padding-bottom: 1px;
        line-height: 2rem;
    }
`;

export class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Header></Header>
                    <Route exact={true} path="/" component={Works} />
                </Layout>
            </Router>
        );
    }
}
