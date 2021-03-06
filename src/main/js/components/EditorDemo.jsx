// @flow

import React, { Component, PropTypes } from 'react';
import { EditorPage } from './editor/EditorPage';
import { EditorMain } from './editor/EditorMain';

import type {StepInfo, StageInfo} from './editor/common';

const pageStyles = {
    display: "flex",
    width: "100%",
    height: "100%"
};

/// Simple helpers for data generation

var __id = 1;

function makeStage(name, children = []):StageInfo {
    const id = __id++;
    return {name, children, id};
}

function makeStep(type:string, label:string, nestedSteps?:Array<StepInfo>):StepInfo {
    const id = __id++;
    const children = nestedSteps || [];
    const isContainer = !!children.length;
    const data = {}; // TODO: Put stuff here at some point
    return {
        id,
        type,
        label,
        isContainer,
        children,
        data
    };
}

/**
 This is basically adapted from the Storybooks entry, for the purposes of connecting a demo into the main appendEvent
 */
export class EditorDemo extends Component {
    render() {

        let bt = [
            makeStage("Firefox"),
            makeStage("Safari"),
            makeStage("Chrome"),
            makeStage("Internet Explorer"),
        ];

        let stages = [
            makeStage("Build"),
            makeStage("Browser Tests", bt),
            makeStage("Static Analysis"),
            makeStage("Package"),
        ];

        let stageSteps = {};

        stageSteps[stages[0].id] = [makeStep("sh", "Run Script")];
        stageSteps[bt[3].id] = [
            makeStep("sh", "Run Script"),
            makeStep("sh", "Run Script")
        ];

        return (
            <EditorPage style={pageStyles}>
                <EditorMain stages={stages} stageSteps={stageSteps}/>
            </EditorPage>
        );
    }
}

export default EditorDemo;
