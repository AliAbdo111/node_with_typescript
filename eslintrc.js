module.exports={
    parser:"@typescript-eslint/parser",
    extends:[
        "plugin:@typescript-eslint/recommended",
        "prettier: @typescript-eslint",
        "plugin:prettier/recommended"

    ],
    parseOptions:{
    ecmaVercion:2018,
    sourcetype:'module',
    },
    rules:{},
}