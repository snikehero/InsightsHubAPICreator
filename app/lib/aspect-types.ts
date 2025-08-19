export type AspectVariable = {
name: string;
dataType: "DOUBLE" | "INT" | "STRING" | "BOOLEAN" | "DATE";
unit: string;
qualityCode: boolean;
searchable: boolean;
};


export type AspectTypePayload = {
name: string;
category: "dynamic" | "static";
scope: "private" | "public";
description: string;
variables: AspectVariable[];
};


export const DATA_TYPES: AspectVariable["dataType"][] = [
"DOUBLE",
"INT",
"STRING",
"BOOLEAN",
"DATE",
];


export const DEFAULT_ASPECT: AspectTypePayload = {
name: "",
category: "dynamic",
scope: "private",
description: "",
variables: [],
};